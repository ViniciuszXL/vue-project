/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import store from '../store'

// Views
import Dashboard from "../views/dashboard.view.vue"
import UserCreate from '../views/user.create.view.vue'
import Login from "../views/login.view.vue"

const routes: RouteRecordRaw[] = [
    { 
        name: "Login", 
        path: "/", 
        component: Login,
        meta: {
            isPublic: true,
        }
    },
    { 
        name: "Dashboard",
        path: "/dashboard", 
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: "UserCreate",
        path: "/user/create",
        component: UserCreate,
        meta: {
            requiresAuth: true,
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Routes is auth
router.beforeEach((to, from, next) => {
    // Verificando se a rota exige autenticação
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // Verify user is authenticated
        if (!store.getters.isAuthenticated) {
            // User is not authenticated, redirecting
            return next({ name: "Login" })
        }

        // Access allowed
        return next()
    }

    // No exists
    return next()
})

// Routes is public
router.beforeEach((to, from, next) => {
    // Verify exists routes with "isPublic" in meta
    if (to.matched.some(record => record.meta.isPublic)) {
        // User has been authenticated
        if (store.getters.isAuthenticated) {
            return next({ name: "Dashboard" })
        }
        
        // User is not authenticated
        return next()
    }

    // No exists
    return next()
})

export default router
