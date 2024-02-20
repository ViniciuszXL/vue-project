import axios, { AxiosRequestConfig } from 'axios'
import store from '@/store'
import router from '@/router'
import { environment } from '@/common/environment'

axios.defaults.baseURL = environment.SERVER.BASEURL

export function request(options: AxiosRequestConfig) {
    const userToken = store.getters.userToken
    const isLogged = store.getters.isAuthenticated
    return axios({
        ...options,
        headers: isLogged ? { "Authorization": userToken } : undefined
    })
}