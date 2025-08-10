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
								{ label: 'Event Loop', slug: 'guias/node/event-loop' },
								{ label: 'Node.js LTS vs Node.js Current', slug: 'guias/node/node-lts-vs-node-current' }
							]	
						}
					],
				},
			],
		}),
	],
});