import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate' 
import auth from './modules/auth.module'

const vuex = new Vuex.Store({
    modules: {
        auth
    },
    plugins: [
        createPersistedState()
    ]
})

export default vuex;