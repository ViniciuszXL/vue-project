export const environment = {
    SERVER: {
        BASEURL: process.env.BASE_URL || "http://localhost:4000"
    },

    URLS: {
        AUTHENTICATE: "/admin/authenticate",
        CREATE: "/user/create",
        UPDATE: "/user/update/",
        DELETE: "/user/delete/",
        LIST: "/user/list",
    }
}