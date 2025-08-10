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
							label: 'Gestor de Versiones',
							items: [
								{ label: 'SDKMAN', slug: 'guias/management-versions/sdkman' },
							]
						},
						{
							label: 'Gestor de Dependencias',
							items: [
								{ label: 'Maven vs Gradle', slug: 'guias/management-dependencies/maven-vs-gradle' },
								{ label: 'Gradle Wrapper', slug: 'guias/management-dependencies/gradle-wrapper' },
							]
						},
						{
							label: 'Java',
							items: [
								{ label: 'Nuevas Caracteristicas', slug: 'guias/java/new-features' }
							],
						}
					],
				},
			],
		}),
	],
});