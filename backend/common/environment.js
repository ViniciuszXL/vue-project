module.exports = {
    SERVER: {
        PORT: process.env.API_PORT || 4000,
        NAME: process.env.SERVER_NAME || "backend-api",
        VERSION: process.env.SERVER_VERSION || "0.0.1",
        URL_BASE: process.env.SERVER_URL_BASE || "http://localhost:4000",
        ENV: process.env.ENV || "staging",
        SYNCHRONIZE: process.env.SYNCHRONIZE || 'true',

        DEFAULT_ADMIN: {
            EMAIL: process.env.DEFAULT_ADMIN_EMAIL || "teste@teste.com",
            PASSWORD: process.env.DEFAULT_ADMIN_PASSWORD || "123"
        }
    },

    MARIA: {
        HOST: process.env.MYSQL_HOST || "localhost",
        PORT: process.env.MYSQL_PORT || 3306,
        USERNAME: process.env.MYSQL_USERNAME || "root",
        PASSWORD: process.env.MYSQL_PASSWORD || "123",
        DATABASE: process.env.MYSQL_DATABASE || "growdev",
        
        POOL: {
            CONNECTION_LIMIT: process.env.MYSQL_CONNECTION_LIMIT || 2
        }
    },
    
    TOKEN: {
        API_SECRET: process.env.API_SECRET || "0p9o8i7u6y¨Y&U*I(O)Pvinicius!Q@W#E$R%Tt5r4e3w2q1",
    }
}