const service = require("../services/user.service")
const messages = require("../common/messages")
const logger = require("../log")
const { sign } = require("jsonwebtoken")
const environment = require("../common/environment")
const { Like } = require("typeorm")

module.exports = {

    create: async (req, res, next) => {
        try {
            if (!req.body) {
                return res.status(400).json({ success: false, message: messages.check_documentation })
            }

            const { name, ra, email, cpf } = req.body
            if (!name || !ra || !email || !cpf) {
                return res.status(400).json({ success: false, message: messages.check_documentation })
            }

            const user = await service.findOne({
                where: [{ name }, { email }, { cpf }, { ra }]
            })

            // User exists
            if (user) {
                return res.status(400).json({ success: false, message: "Usuário já está registrado no banco de dados!" })
            }

            const userSave = await service.save({ ...req.body })
            if (!userSave) throw new Error("User not created")

            return res.json({ success: true, message: "Usuário criado com sucesso", data: userSave })
        } catch (err) {
            logger.error("An error occurred to create user", {
                function: "list",
                error: {
                    message: err.message,
                    stack: err.stack
                }
            })
        }
    },

    list: async (req, res, next) => {
        try {
            const { name } = req.query
            const options = {
                where: {
                    name: name ? Like(`%${name}%`) : undefined
                }
            }

            service.findAndCount(options, (data, total) => {
                if (!data) throw new Error(total)
                return res.json({ success: true, message: "Usuários obtidos com sucesso", data })
            })
        } catch (err) {
            logger.error("An error occurred to get list of users", {
                function: "list",
                error: {
                    message: err.message,
                    stack: err.stack
                }
            })
        }
    },

    update: async (req, res, next) => {
        try {
            if (!req.body) {
                return res.status(400).json({ success: false, message: messages.check_documentation })
            }

            const { name, email } = req.body
            if (!name && !email) {
                return res.status(400).json({ success: false, message: messages.check_documentation })
            }
            
            if (!req.params.userId) {
                return res.status(400).json({ success: false, message: messages.check_documentation })
            }

            const user = await service.findOne({ where: { id: req.params.userId } })
            if (!user) {
                return res.status(400).json({ success: false, message: "Usuário informado não existe" })
            }

            await service.updateUser({ id: user.id }, { name, email })
            return res.json({ success: true, message: "Usuário atualizado com sucesso" })
        } catch (err) {
            logger.error("An error occurred in update user from database", {
                function: "update",
                error: {
                    message: err.message,
                    stack: err.stack
                }
            })
        }
    },

    delete: async (req, res, next) => {
        try {
            if (!req.params.userId) {
                return res.status(400).json({ success: false, message: messages.check_documentation })
            }

            const user = await service.findOne({ where: { id: req.params.userId } })
            if (!user) {
                return res.status(400).json({ success: false, message: "Usuário informado não existe" })
            }

            await service.removeUser(user)

            return res.json({ success: true, message: "Usuário deletado com sucesso" })
        } catch (err) {
            logger.error("An error occurred in delete user from database", {
                function: "delete",
                error: {
                    message: err.message,
                    stack: err.stack
                }
            })
        }
    },

}