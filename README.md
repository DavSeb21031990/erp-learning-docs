# Configuracion con Github Pages
- Configurar Github Pages con Astro
En el archivo `astro.config.mjs` se realiza la siguiente configuración:
    ```javascript
    site: 'https://davseb21031990.github.io/erp-learning-docs',
    base: '/erp-learning-docs/',
    ```
- Crear el archivo `.nojekyll` en `public/.nojekyll`
- Crear la variable en entorno en Github
    - En tu repo: `Settings → Environments → New environment`
    - Crea uno llamado `github-pages` (exacto, en minúsculas)
- Realizar la configuración de **Github Actions**
    - Configuración de permisos
        - `contents: read:` Le da permiso al flujo de trabajo para leer tu código.
        - `pages: write:` Le da permiso para publicar archivos en tu sitio de GitHub Pages.
        - `id-token: write:` Le da permiso para generar el token de identidad necesario para autenticar la acción de despliegue. `
    - Sube el contenido de ./dist a un artefacto
        ```githubexpressionlanguage
        name: Upload Pages artifact
            uses: actions/upload-pages-artifact@v3
            with:
            path: ./dist
        ```
    - Toma los archivos de tu sitio web ya compilados y los publica en GitHub Pages para que estén disponibles públicamente.
        ```githubexpressionlanguage
        - name: Deploy to GitHub Pages
                id: deployment
                uses: actions/deploy-pages@v4
        ```
    ```githubexpressionlanguage
    name: Deploy Documentation

    on:
    push:
        branches:
        - main

    permissions:
    contents: read
    pages: write
    id-token: write

    jobs:
    build:
        runs-on: ubuntu-latest
        steps:
        - name: Checkout repository
            uses: actions/checkout@v4

        - name: Set up Node
            uses: actions/setup-node@v4
            with:
            node-version: '20'

        - name: Install dependencies
            run: npm ci

        - name: Build
            run: npm run build

        - name: Upload Pages artifact
            uses: actions/upload-pages-artifact@v3
            with:
            path: ./dist

        - name: Deploy to GitHub Pages
            id: deployment
            uses: actions/deploy-pages@v4

            env:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    ```