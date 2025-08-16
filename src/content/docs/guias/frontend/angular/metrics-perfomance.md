---
title: 'Métricas de Perfomance'
description: 'Guia para implementar métricas de perfomance'
---

## Instalación de dependencias
```bash
npm i web-vitals
# (opcional si vas a enviar a tu backend)
npm i @angular/common@latest @angular/router@latest

```

## Crea un servicio `RUM`

`src/app/rum.service.ts`:
```typescript
import { Injectable, NgZone } from '@angular/core'
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router'
import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from 'web-vitals/attribution'

type RUMPayload = {
  metric: Metric
  page: string
  path: string
  routeChangeMs?: number
  longTaskCount?: number
  longTaskTotalMs?: number
}

@Injectable({ providedIn: 'root' })
export class RUMService {
  private longTaskObserver?: PerformanceObserver
  private longTaskCount = 0
  private longTaskTotal = 0
  private routeStartTime = 0
  private samplingRate = 0.1 // 10% de usuarios; ajusta a tu gusto

  constructor(private zone: NgZone, private router: Router) {
    if (typeof window === 'undefined') return
    if (Math.random() > this.samplingRate) return // muestreo para no saturar

    this.setupWebVitals()
    this.setupLongTasks()
    this.setupRouterTimings()
  }

  // === 2.A Core Web Vitals ===
  private setupWebVitals() {
    const send = (metric: Metric) => this.sendToAnalytics({ metric, page: location.href, path: location.pathname })
    // Usa la variante /attribution para saber qué elemento causó LCP/CLS/INP
    onLCP(send)
    onCLS(send)
    onINP(send)
    onFCP(send)
    onTTFB(send) // idealmente lo más temprano posible (lo tenemos aquí por simplicidad)
  }

  // === 2.B Long Tasks (aprox TBT en campo) ===
  private setupLongTasks() {
    if (!('PerformanceObserver' in window)) return
    // Observer de 'longtask' (tareas >50ms en hilo principal)
    this.longTaskObserver = new PerformanceObserver((entryList) => {
      for (const e of entryList.getEntries()) {
        const dur = e.duration || 0
        this.longTaskCount++
        this.longTaskTotal += dur
      }
    })
    try {
      this.longTaskObserver.observe({ type: 'longtask', buffered: true as any })
    } catch {
      // Algunos navegadores no lo soportan; no es crítico
    }

    // Enviar un resumen al “ocultarse” la página (tab close/navigate)
    const flush = () => {
      if (this.longTaskCount > 0) {
        this.sendToAnalytics({
          metric: {
            name: 'longtasks',
            id: crypto?.randomUUID?.() || String(Date.now()),
            value: this.longTaskTotal,
            delta: this.longTaskTotal,
            rating: this.longTaskTotal < 200 ? 'good' : this.longTaskTotal < 600 ? 'needs-improvement' : 'poor'
          } as any,
          page: location.href,
          path: location.pathname,
          longTaskCount: this.longTaskCount,
          longTaskTotalMs: this.longTaskTotal
        })
      }
    }
    addEventListener('visibilitychange', () => document.visibilityState === 'hidden' && flush())
    addEventListener('pagehide', flush)
  }

  // === 2.C Métricas de navegación por ruta ===
  private setupRouterTimings() {
    this.zone.runOutsideAngular(() => {
      this.router.events.subscribe(evt => {
        if (evt instanceof NavigationStart) {
          this.routeStartTime = performance.now()
        } else if (evt instanceof NavigationEnd || evt instanceof NavigationCancel || evt instanceof NavigationError) {
          if (!this.routeStartTime) return
          const routeChangeMs = performance.now() - this.routeStartTime
          this.routeStartTime = 0
          const m: Metric = {
            name: 'route-change',
            id: crypto?.randomUUID?.() || String(Date.now()),
            value: routeChangeMs,
            delta: routeChangeMs,
            rating: routeChangeMs < 200 ? 'good' : routeChangeMs < 1000 ? 'needs-improvement' : 'poor'
          } as any
          this.sendToAnalytics({ metric: m, page: location.href, path: this.router.url, routeChangeMs })
        }
      })
    })
  }

  // === 2.D Envío a tu analítica ===
  private sendToAnalytics(payload: RUMPayload) {
    // A) Enviar a tu backend RUM (recomendado)
    try {
      const body = JSON.stringify({
        id: payload.metric.id,
        name: payload.metric.name,
        value: Number(payload.metric.value?.toFixed?.(2) ?? payload.metric.value),
        rating: payload.metric.rating,
        path: payload.path,
        page: payload.page,
        navigationType: (payload.metric as any).navigationType,
        attribution: (payload.metric as any).attribution, // elemento, recurso, etc.
        routeChangeMs: payload.routeChangeMs,
        longTaskCount: payload.longTaskCount,
        longTaskTotalMs: payload.longTaskTotalMs
      })
      navigator.sendBeacon?.('/rum', body) || fetch('/rum', { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body })
    } catch { /* ignora errores de red */ }

    // B) (Opcional) Enviar a GA4 vía gtag
    // if ((window as any).gtag) {
    //   (window as any).gtag('event', 'web_vital', {
    //     event_category: 'Web Vitals',
    //     event_label: payload.metric.name,
    //     value: Math.round(payload.metric.value), // GA4 usa enteros
    //     metric_id: payload.metric.id,
    //     metric_value: payload.metric.value,
    //     metric_rating: payload.metric.rating,
    //     page_path: payload.path
    //   })
    // }
  }
}
```

## Inyectar en el componente AppComponent
```typescript
// src/app/app.component.ts
import { Component } from '@angular/core'
import { RUMService } from './rum.service'

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<router-outlet></router-outlet>'
})

export class AppComponent {
  constructor(private _rum: RUMService) {} // con solo inyectarlo, arranca
}
```