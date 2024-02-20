/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import sweetalert from './sweetalert'
import router from '../router'
import vuex from '../store'

// Types
import type { App } from 'vue'

// axios

export function registerPlugins (app: App) {
   loadFonts()

   app
      .use(vuetify)
      .use(sweetalert.VueSweetalert2)
      .use(router)
      .use(vuex)
}
