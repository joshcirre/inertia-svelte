import type { Plugin } from 'vite'

const PLUGIN_NAME = 'vite:inertia:layout'
const TEMPLATE_LAYOUT_REGEX = /<template +layout(?: *= *['"]([-_\w\/]+)['"] *)?>/

/**
 * A basic Vite plugin that adds a <template layout="name"> syntax to Vite SFCs.
 * It must be used before the Vue plugin. Need to update this accordingly for Svelte.
 */
export default (layouts: string = '@/views/layouts/'): Plugin => ({
	name: PLUGIN_NAME,
	transform: (code: string) => {
		if (!TEMPLATE_LAYOUT_REGEX.test(code)) {
			return
		}

		const isTypeScript = /lang=['"]ts['"]/.test(code)

		return code.replace(TEMPLATE_LAYOUT_REGEX, (_, layoutName) => `
			<script${isTypeScript ? ' lang="ts"' : ''} context="module>
			import layout from '${layouts}${layoutName ?? 'default'}.svelte'
			export const layout = layout
			</script>
		`)
	},
})
