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
						{ label: 'SDKMAN', slug: 'guias/sdkman' },
					],
				}
			],
		}),
	],
});
