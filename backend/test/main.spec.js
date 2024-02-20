const environment = require("../common/environment")
const data = require("./data")
const request = require("supertest")

const baseUrl = environment.SERVER.URL_BASE
const authenticateUrl = data.URLS.AUTHENTICATE
const usersListUrl = data.URLS.USERS_LIST
const userCreateUrl = data.URLS.USER_CREATE
const userUpdateUrl = data.URLS.USER_UPDATE
const userDeleteUrl = data.URLS.USER_DELETE

const emailBase = environment.SERVER.DEFAULT_ADMIN.EMAIL
const passwordBase = environment.SERVER.DEFAULT_ADMIN.PASSWORD

let authToken = ""
let userId = -1

describe("NOAUTH - ADMIN", () => {

    describe("POST - AUTH", () => {
        it ("Should be able authenticate", async () => {
            const data = {
                email: emailBase,
                password: passwordBase
            }

            return request(baseUrl).post(authenticateUrl).send(data).then((response) => {
                authToken = response.body.data.token

                expect(response.status).toBe(200)
                expect(response.body.success).toBe(true)
                expect(response.body.message).toBe("Administrador autenticado com sucesso")
            })
        })
    })
})

describe("AUTH - USER", () => {

    describe("POST", () => {
        it ("Should be able to create user", async () => {
            const data = {
                name: "User Test Create",
                ra: 123141,
                email: "test@oi.com",
                cpf: "000.000.000-00",
                isTest: true
            }

            const response = await request(baseUrl)
                .post(userCreateUrl)
                .set("Authorization", authToken)
                .send(data)

            userId = response.body.data.id

            expect(response.status).toBe(200)
            expect(response.body.success).toBe(true)
            expect(response.body.message).toBe("Usuário criado com sucesso")

            expect(response.body.data.name).toBe(data.name)
            expect(response.body.data.ra).toBe(data.ra)
            expect(response.body.data.email).toBe(data.email)
            expect(response.body.data.cpf).toBe(data.cpf)
        })
    })

    describe("GET", () => {
        it ("Should be able to get the list of users", async () => {
            const response = await request(baseUrl)
                .get(usersListUrl)
                .set("Authorization", authToken)
            
            expect(response.status).toBe(200)
            expect(response.body.success).toBe(true)
            expect(response.body.message).toBe("Usuários obtidos com sucesso")
            expect(response.body.data).toBeInstanceOf(Array)
        })
    })

    describe("UPDATE", () => {
        it("Should be able to update user from database", async () => {
            const data = {
                name: "Olá mundo"
            }

            const response = await request(baseUrl)
                .put(userUpdateUrl + userId)
                .send(data)
                .set("Authorization", authToken)
            
            expect(response.status).toBe(200)
            expect(response.body.success).toBe(true)
            expect(response.body.message).toBe("Usuário atualizado com sucesso")
        })
    })

    describe("DELETE", () => {
        it("Should be able to delete user from database", async () => {
            const response = await request(baseUrl)
                .delete(userDeleteUrl + userId)
                .set("Authorization", authToken)
            
            expect(response.status).toBe(200)
            expect(response.body.success).toBe(true)
            expect(response.body.message).toBe("Usuário deletado com sucesso")
        })
    })
})