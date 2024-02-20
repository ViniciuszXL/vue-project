const messages = require("../common/messages")
const environment = require("../common/environment")
const { verify } = require("jsonwebtoken")

module.exports = {

    /**
     * @name basicConfig - Basic config of express
     */
    basicConfig: (req, res, next) => {
        res.status(404)

        // respond with html page
        if (req.accepts("html")) {
            res.send("Not found")
            return
        }

        // respond with json
        if (req.accepts("json")) {
            res.send({ error: "Not found" })
            return
        }

        // default to plain-text. send()
        res.type("txt").send("Not found")
    },

    /**
     * @name authToken - Verify exists token in request
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    authToken: (req, res, next) => {
        // check header or url parameters or post parameters for token
        const token = req.body.token || req.query.token || req.headers.authorization
        if (!token) {
            return res.status(403).json({ success: false, message: messages.token.no_token_specified })
        }

        verify(token, environment.TOKEN.API_SECRET, function (err, decoded) {
            if (err) {
                return res.status(403).json({ success: false, message: messages.token.failed_to_authenticate_token })
            }

            req.decoded = decoded
            return next()
        })
    }

}