const service = require("../services/admin.service")
const messages = require("../common/messages")
const logger = require("../log")
const { sign } = require("jsonwebtoken")
const environment = require("../common/environment")

module.exports = {

    authenticate: async (req, res, next) => {
        try {
            if (!req.body) {
                return res.status(400).json({ success: false, message: messages.check_documentation })
            }
    
            const { email, password } = req.body
            if (!email || !password) {
                return res.status(400).json({ success: false, message: messages.check_documentation })
            }
    
            const admin = await service.findOne({
                where: { email },
                select: ["password", "id"]
            })
    
            // Admin not found
            if (!admin) {
                return res.status(404).json({ success: false, message: messages.unauthorized })
            }
    
            const compare = await service.comparePassword(password, admin.password)
            if (!compare) throw new Error("An error occurred in compare password")
            // Password is incorrect
            if (!compare.success) {
                return res.status(400).json({ success: false, message: messages.unauthorized })
            }

            const payload = { userId: admin.id, name: admin.name }
            const token = sign(payload, environment.TOKEN.API_SECRET)
            return res.json({ success: true, message: "Administrador autenticado com sucesso", data: {
                token
            }})
        } catch (err) {
            logger.error("An error occurred to authenticate admin", {
                function: "authenticate",
                error: {
                    message: err.message,
                    stack: err.stack
                }
            })
        }
    }

}