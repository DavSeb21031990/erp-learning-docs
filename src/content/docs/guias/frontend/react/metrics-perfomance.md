---
title: 'Métricas de Perfomance'
description: 'Guia para implementar métricas de perfomance'
---

## Instalación de dependencias
```bash
npm i web-vitals
npm i react-router-dom
```

## Crea un modulo `RUM`

`src/rum.ts`:
```typescript
import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals/attribution'

type RUMOpts = {
  sampleRate?: number       // 0..1
  endpoint?: string         // tu API para RUM
  toGA4?: boolean           // además, enviar a GA4 vía gtag
  appVersion?: string
}

const defaultOpts: Required<RUMOpts> = {
  sampleRate: 0.1,
  endpoint: '/rum',
  toGA4: false,
  appVersion: '0.0.0'
}

let enabled = false
let opts: Required<RUMOpts> = defaultOpts

export function initRUM(userOpts?: RUMOpts) {
  if (typeof window === 'undefined') return
  opts = { ...defaultOpts, ...(userOpts || {}) }
  if (Math.random() > opts.sampleRate) return

  enabled = true

  const send = (metric: Metric, extra?: Record<string, unknown>) => {
    if (!enabled) return
    const body = {
      id: metric.id,
      name: metric.name,
      value: Number((metric.value as number).toFixed?.(2) ?? metric.value),
      delta: Number((metric.delta as number) ?? 0),
      rating: metric.rating,
      navigationType: (metric as any).navigationType,
      attribution: (metric as any).attribution, // elemento, url, etc.
      page: location.href,
      path: location.pathname,
      appVersion: opts.appVersion,
      ...extra
    }
    const payload = JSON.stringify(body)
    navigator.sendBeacon?.(opts.endpoint, payload) ||
      fetch(opts.endpoint, { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: payload }).catch(() => {})

    if (opts.toGA4 && (window as any).gtag) {
      (window as any).gtag('event', 'web_vital', {
        event_category: 'Web Vitals',
        event_label: metric.name,
        value: Math.round(metric.value as number),
        metric_id: metric.id,
        metric_value: metric.value,
        metric_rating: metric.rating,
        page_path: location.pathname
      })
    }
  }

  // Core Web Vitals (con atribución)
  onLCP((m) => send(m))
  onCLS((m) => send(m))
  onINP((m) => send(m))
  onFCP((m) => send(m))
  onTTFB((m) => send(m))

  // Long Tasks (resumen al cerrar la página)
  try {
    const po = new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        longTaskCount++
        longTaskTotal += e.duration || 0
      }
    })
    po.observe({ type: 'longtask', buffered: true as any })
  } catch {}
  addEventListener('visibilitychange', () => document.visibilityState === 'hidden' && flushLongTasks(send))
  addEventListener('pagehide', () => flushLongTasks(send))
}

let longTaskCount = 0
let longTaskTotal = 0
function flushLongTasks(send: (m: Metric, extra?: Record<string, unknown>) => void) {
  if (longTaskCount === 0) return
  const value = longTaskTotal
  const metric: Metric = {
    name: 'longtasks',
    id: crypto?.randomUUID?.() || String(Date.now()),
    value,
    delta: value,
    rating: value < 200 ? 'good' : value < 600 ? 'needs-improvement' : 'poor'
  } as any
  send(metric, { longTaskCount, longTaskTotalMs: longTaskTotal })
  longTaskCount = 0
  longTaskTotal = 0
}
```

## Mide cambios de ruta (React Router v6)

Crea un `provider` que detecte transiciones. Si usas **data routers (v6.4+)**, `useNavigation()` te da estados `loading/idle`. Si no, usamos un fallback por cambio de `location`.

`src/RUMProvider.tsx`
```typescript
import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigation } from 'react-router-dom'
import type { Metric } from 'web-vitals'

const sendRouteMetric = (ms: number) => {
  const metric: Metric = {
    name: 'route-change',
    id: crypto?.randomUUID?.() || String(Date.now()),
    value: ms,
    delta: ms,
    rating: ms < 200 ? 'good' : ms < 1000 ? 'needs-improvement' : 'poor'
  } as any
  // Enviamos al mismo endpoint que en rum.ts
  const body = JSON.stringify({
    id: metric.id,
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    path: location.pathname,
    page: location.href
  })
  navigator.sendBeacon?.('/rum', body) ||
    fetch('/rum', { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body })
}

export const RUMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigation = (() => {
    try { return useNavigation() } catch { return undefined }
  })()
  const location = useLocation()
  const t0 = useRef(0)
  const usedNavAPI = useRef(false)

  // Preferido: data router
  useEffect(() => {
    if (!navigation) return
    if (navigation.state === 'loading') {
      usedNavAPI.current = true
      t0.current = performance.now()
    } else if (navigation.state === 'idle' && t0.current) {
      const ms = performance.now() - t0.current
      t0.current = 0
      sendRouteMetric(ms)
    }
  }, [navigation && navigation.state])

  // Fallback universal: al cambiar location, mide hasta el siguiente frame
  useEffect(() => {
    if (usedNavAPI.current) return
    t0.current = performance.now()
    const id = requestAnimationFrame(() => {
      const ms = performance.now() - t0.current
      t0.current = 0
      sendRouteMetric(ms)
    })
    return () => cancelAnimationFrame(id)
  }, [location.key])

  return <>{children}</>
}
```

## Uso en tu app (Vite/CRA):
```typescript
// src/main.tsx o src/index.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { initRUM } from './rum'
import { RUMProvider } from './RUMProvider'

initRUM({ sampleRate: 0.1, endpoint: '/rum', toGA4: false, appVersion: '1.0.0' })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RUMProvider>
        <App />
      </RUMProvider>
    </BrowserRouter>
  </React.StrictMode>
)
```