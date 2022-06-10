import { createInertiaApp } from '@inertiajs/inertia-svelte'
import { importPageComponent } from '@/scripts/vite/import-page-component'
import { InertiaProgress } from '@inertiajs/progress'

InertiaProgress.init()

createInertiaApp({
	resolve: (name) => importPageComponent(name, import.meta.glob('../views/pages/**/*.svelte')),
	setup({ el, App, props }) {
        new App({ target: el, props })
      },
})
