/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
// Components
import App from './App.vue'
// Composables
import { createApp } from 'vue'
// App
const app = createApp(App)
// Plugins
registerPlugins(app)
// Mount
app.mount('#app')
