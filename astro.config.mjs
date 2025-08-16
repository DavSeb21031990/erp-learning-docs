// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://davseb21031990.github.io/erp-learning-docs",
  base: "/erp-learning-docs/",
  integrations: [
    starlight({
      title: "My Docs",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      sidebar: [
        {
          label: "Guias",
          items: [
            {
              label: "Servidores",
              items: [
                {
                  label: "Configuración Servidor",
                  slug: "guias/servers/configuration",
                },
                {
                  label: "Configuración SSH Keys",
                  slug: "guias/servers/configuration-ssh",
                },
              ],
            },
            {
              label: "Gestor de Versiones",
              items: [
                { label: "SDKMAN", slug: "guias/management-versions/sdkman" },
                { label: "NVM", slug: "guias/management-versions/nvm" },
              ],
            },
            {
              label: "Gestor de Dependencias",
              items: [
                {
                  label: "Maven vs Gradle",
                  slug: "guias/management-dependencies/maven-vs-gradle",
                },
                {
                  label: "Gradle Wrapper",
                  slug: "guias/management-dependencies/gradle-wrapper",
                },
                {
                  label: "Estructura Proyecto Gradle",
                  slug: "guias/management-dependencies/structure-project-gradle",
                },
                {
                  label: "Secciones de build.gradle",
                  slug: "guias/management-dependencies/sections-gradle",
                },
              ],
            },
            {
              label: "Languages",
              items: [
                {
                  label: "Java",
                  items: [
                    {
                      label: "Nuevas Caracteristicas",
                      slug: "guias/languages/java/new-features",
                    },
                  ],
                },
                {
                  label: "TypeScript",
                  items: [
                    {
                      label: "Introducción",
                      slug: "guias/languages/typescript/introduction",
                    },
                    {
                      label: "Conceptos Fundamentales",
                      slug: "guias/languages/typescript/fundamental-concepts",
                    },
                    {
                      label: "Objetos e Interfaces",
                      slug: "guias/languages/typescript/object-interface",
                    },
                    {
                      label: "Funciones",
                      slug: "guias/languages/typescript/function",
                    },
                    {
                      label: "Tipos Avanzados",
                      slug: "guias/languages/typescript/type-avanced",
                    },
                    {
                      label: "Clases",
                      slug: "guias/languages/typescript/class",
                    },
                    {
                      label: "Script NPM",
                      slug: "guias/languages/typescript/script-npm",
                    },
                  ],
                },
              ],
            },
            {
              label: "Backend",
              items: [
                {
                  label: "Node.js",
                  items: [
                    {
                      label: "Fundamental Concepts",
                      items: [
                        {
                          label: "Event Loop",
                          slug: "guias/backend/node/fundamental-concepts/event-loop",
                        },
                        {
                          label: "Node.js LTS vs Node.js Current",
                          slug: "guias/backend/node/fundamental-concepts/node-lts-vs-node-current",
                        },
                        {
                          label: "Package.json",
                          slug: "guias/backend/node/fundamental-concepts/package",
                        },
                        {
                          label: "Node_modules",
                          slug: "guias/backend/node/fundamental-concepts/node-modules",
                        },
                      ],
                    },
                    {
                      label: "Sintaxis",
                      items: [
                        {
                          label: "Environment",
                          slug: "guias/backend/node/sintaxis/environment",
                        },
                        {
                          label: "Management Exceptions",
                          slug: "guias/backend/node/sintaxis/management-exceptions",
                        },
                      ],
                    },
                    {
                      label: "Middlewares",
                      items: [
                        {
                          label: "Introducción",
                          slug: "guias/backend/node/middelware/introduction",
                        },
                      ],
                    },
                    {
                      label: "Express",
                      items: [
                        {
                          label: "Introducción",
                          slug: "guias/backend/node/express/introduction",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              label: "Frontend",
              items: [
                {
                  label: "Astro",
                  items: [
                    {
                      label: "Introducción",
                      slug: "guias/frontend/astro/introduction",
                    },
                  ],
                },
                {
                  label: "Angular",
                  items: [
                    {
                      label: "Introducción",
                      slug: "guias/frontend/angular/introduction",
                    },
                    { label: "Bundle", slug: "guias/frontend/angular/bundle" },
                    {
                      label: "Métricas Performance",
                      slug: "guias/frontend/angular/metrics-perfomance",
                    },
                    {
                      label: "Configuración Budget y Alertas",
                      slug: "guias/frontend/angular/configuration-budget-alerts",
                    },
                  ],
                },
                {
                  label: "React",
                  items: [
                    {
                      label: "Introducción",
                      slug: "guias/frontend/react/introduction",
                    },
                    { label: "Bundle", slug: "guias/frontend/react/bundle" },
                    {
                      label: "Métricas Performance",
                      slug: "guias/frontend/react/metrics-perfomance",
                    },
                    {
                      label: "Configuración Budget y Alertas",
                      slug: "guias/frontend/react/configuration-budget-alerts",
                    },
                  ],
                },
                {
                  label: "Vue",
                  items: [
                    {
                      label: "Introducción",
                      slug: "guias/frontend/vue/introduction",
                    },
                    { label: "Bundle", slug: "guias/frontend/vue/bundle" },
                    {
                      label: "Métricas Performance",
                      slug: "guias/frontend/vue/metrics-perfomance",
                    },
                    {
                      label: "Configuración Budget y Alertas",
                      slug: "guias/frontend/vue/configuration-budget-alerts",
                    },
                  ],
                },
              ],
            },
            {
              label: "Infraestructura",
              items: [
                {
                  label: "Containerización",
                  items: [
                    {
                      label: "Docker",
                      items: [
                        {
                          label: "Introducción",
                          slug: "guias/infrastructure/containerization/docker/introduction",
                        },
                        {
                          label: "Image, Container y Volume",
                          slug: "guias/infrastructure/containerization/docker/image-container-volume",
                        },
                        {
                          label: "Arquitectura y Componentes",
                          slug: "guias/infrastructure/containerization/docker/architecture",
                        },
                        {
                          label: "Configuración",
                          slug: "guias/infrastructure/containerization/docker/configuration",
                        },
                        {
                          label: "Comandos Esenciales",
                          slug: "guias/infrastructure/containerization/docker/cheat-sheet",
                        },
                      ],
                    },
                  ],
                },
                {
                  label: "Bases de Datos",
                  items: [
                    {
                      label: "Conceptos Fundamentales",
                      slug: "guias/infrastructure/database/concepts-fundamentals/introduction",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
