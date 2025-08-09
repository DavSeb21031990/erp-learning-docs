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
    ```github-actions-workflow
    name: Deploy Documentation

    on:
    push:
        branches:
        - main
    workflow_dispatch:

    permissions:
    contents: read
    pages: write
    id-token: write

    concurrency: 
    group: "pages"
    cancel-in-progress: true

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

        # Sube el contenido de ./dist como un artefacto
        - name: Upload Pages artifact
            uses: actions/upload-pages-artifact@v3
            with:
            path: ./dist

    deploy:
        needs: build
        runs-on: ubuntu-latest

        # Especifica que este trabajo se ejecutará en el entorno de github-pages que creaste antes.
        environment:
            name: github-pages
            url: ${{ steps.deployment.outputs.page_url }}

        steps:
        # Configura la rama y la ruta de despliegue en GitHub Pages
        - name: Configure Pages
            uses: actions/configure-pages@v5
            with:
                enablement: true

        # Toma el artefacto que se subió en el paso anterior y lo despliega en GitHub Pages
        - name: Deploy to GitHub Pages
            id: deployment
            uses: actions/deploy-pages@v4
    ```