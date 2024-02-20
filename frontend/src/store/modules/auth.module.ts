import { StateInterface } from '@/types/auth.type';
import { UserCreateResponse, UserInterface, UserListResponse, UserLoginInterface, UserLoginResponse, UserUpdateInterface } from '@/types/user.type';
import { request } from '../../request'
import { environment } from '@/common/environment';
import { DefaultResponse } from '@/types/response.type';

const state = {
    token: undefined
};

const getters = {
    isAuthenticated: (state: StateInterface) => state.token != undefined,
    userToken: (state: StateInterface) => state.token
};

const actions = {

    /**
     * @name LogIn - Login user
     * 
     * @param param0 
     * @param user 
     */
    async LogIn({ commit }: any, user: UserLoginInterface) {
        const response = await request({
            method: "POST",
            url: environment.URLS.AUTHENTICATE,
            data: { ...user }
        })

        if (!response || response && !response.data) throw new Error("No response has been found")
        const data: UserLoginResponse = response.data
        if (!data)  throw new Error("No data has been found")

        // An error occurred in login user
        if (!data.success) throw new Error(data.message)
        // User has been logged successfully
        await commit("setUser", data.data?.token)
        return data
    },

    /**
     * @name findUsers - Search list of users
     * 
     * @param param0 
     * @param params 
     */
    async findUsers({ commit }: any, params?: any) {
        const response = await request({
            method: "GET",
            url: environment.URLS.LIST,
            params,
        })

        if (!response || response && !response.data) throw new Error("No response has been found")
        const data: UserListResponse = response.data
        if (!data)  throw new Error("No data has been found")

        // An error occurred in get list of users
        if (!data.success) throw new Error(data.message)
        // List has been returned
        return data
    },

    /**
     * @name updateUser - Update user in database
     * 
     * @param param0 
     * @param user 
     * @param update 
     */
    async updateUser({ commit }: any, update: UserUpdateInterface) {
        const response = await request({
            method: "PUT",
            url: environment.URLS.UPDATE + update.user.id,
            data: update.update
        })

        if (!response || response && !response.data) throw new Error("No response has been found")
        const data: DefaultResponse = response.data
        if (!data)  throw new Error("No data has been found")

        // An error occurred in update user
        if (!data.success) throw new Error(data.message)
        // User has been updated, trying to get list of users
        return data
    },

    /**
     * @name deleteUser - Remove user
     * 
     * @param param0 
     * @param user 
     */
    async deleteUser({ commit }: any, user: UserInterface) {
        const response = await request({
            method: "DELETE",
            url: environment.URLS.DELETE + user.id,
        })

        if (!response || response && !response.data) throw new Error("No response has been found")
        const data: DefaultResponse = response.data
        if (!data)  throw new Error("No data has been found")

        // An error occurred in update user
        if (!data.success) throw new Error(data.message)
        // User has been updated, trying to get list of users
        return data
    },

    /**
     * @name createUser - Create user in database
     * 
     * @param param0 
     * @param user 
     * 
     * @returns User
     */
    async createUser({ commit }: any, user: any) {
        const response = await request({
            method: "POST",
            url: environment.URLS.CREATE,
            data: {
                ...user
            }
        })

        if (!response || response && !response.data) throw new Error("No response has been found")
        const data: UserCreateResponse = response.data
        if (!data)  throw new Error("No data has been found")

        // An error occurred in update user
        if (!data.success) throw new Error(data.message)
        return data
    },

    /**
     * @name LogOut - Disconect user
     * 
     * @param param0 
     */
    async LogOut({ commit }: any) {
        commit("logoutUser", undefined)
    }

};

const mutations = {

    /**
     * @name setUser - Specific user after he logged in
     * 
     * @param state
     * @param user 
     */
    setUser(state: StateInterface, token: string) {
        state.token = token
    },

    /**
     * @name logoutUser - Disconect user from app
     * 
     * @param state 
     */
    logoutUser(state: StateInterface) {
        state.token = undefined
    },

};

export default {
    state,
    getters,
    actions,
    mutations
}