// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://davseb21031990.github.io/erp-learning-docs',
	base: '/erp-learning-docs/',
	integrations: [
		starlight({
			title: 'My Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: 'Guias',
					items: [
						{
							label: 'Servidores',
							items: [
								{ label: 'Configuración Servidor', slug: 'guias/servers/configuration' },
								{ label: 'Configuración SSH Keys', slug: 'guias/servers/configuration-ssh' }
							]
						},
						{
							label: 'Gestor de Versiones',
							items: [
								{ label: 'SDKMAN', slug: 'guias/management-versions/sdkman' },
								{ label: 'NVM', slug: 'guias/management-versions/nvm' }
							]
						},
						{
							label: 'Gestor de Dependencias',
							items: [
								{ label: 'Maven vs Gradle', slug: 'guias/management-dependencies/maven-vs-gradle' },
								{ label: 'Gradle Wrapper', slug: 'guias/management-dependencies/gradle-wrapper' },
								{ label: 'Estructura Proyecto Gradle', slug: 'guias/management-dependencies/structure-project-gradle' },
								{ label: 'Secciones de build.gradle', slug: 'guias/management-dependencies/sections-gradle' },
							]
						},
						{
							label: 'Java',
							items: [
								{ label: 'Nuevas Caracteristicas', slug: 'guias/java/new-features' }
							],
						},
						{
							label: 'Node.js',
							items: [
								{
									label: 'Fundamental Concepts',
									items: [
										{ label: 'Event Loop', slug: 'guias/node/fundamental-concepts/event-loop' },
										{ label: 'Node.js LTS vs Node.js Current', slug: 'guias/node/fundamental-concepts/node-lts-vs-node-current' },
										{ label: 'Package.json', slug: 'guias/node/fundamental-concepts/package' },
										{ label: 'Node_modules', slug: 'guias/node/fundamental-concepts/node-modules' }
									]
								},
								{
									label: 'Sintaxis',
									items: [
										{ label: 'Environment', slug: 'guias/node/sintaxis/environment' },
										{ label: 'Management Exceptions', slug: 'guias/node/sintaxis/management-exceptions' }
									]
								},
								{
									label: 'Middlewares',
									items: [
										{ label: 'Introducción', slug: 'guias/node/middelware/introduction' }
									]
								},
								{
									label: 'Express',
									items: [
										{ label: 'Introducción', slug: 'guias/node/express/introduction' }
									]
								}
							]
						}
					],
				},
			],
		}),
	],
});