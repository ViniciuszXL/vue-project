const environment = require("./common/environment")
const logger = require("./log")
const moment = require("moment-timezone")
const express = require("express")
const datasource = require("./datasource")
const jwt = require("jsonwebtoken")
const middleware = require("./middleware")
const adminService = require("./services/admin.service")

// Promise config
Promise = require("bluebird")
// Moment config
moment.tz.setDefault("America/Sao_Paulo")

// Server configuration
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")

// to get ip
app.enable("trust proxy")
// Port
app.set("port", environment.SERVER.PORT)
// Body parser
app.use(bodyParser.json({ limit: '1mb' }), bodyParser.urlencoded({ limit: '1mb', extended: true }))
// Cors
app.use(cors())

// Connection
global.dataSource = datasource
datasource
    .initialize()
    .then(async () => {
        logger.info("Successfully connected database!", {
            function: "app"
        })

        await adminService.createAdmin()

        const server = app.listen(app.get("port"), () => {
            logger.info(`Service started on port ${app.get("port")}`, {
                function: "app"
            })
        })

        server.timeout = 45000

        app.get("/healthz", (req, res) => res.json({ success: true, message: "Server is online" }))

        const routes = require("./routes")
        app.use("/", routes)

        // routes here 
        app.use(middleware.basicConfig)
    })
    .catch(err => {
        logger.error("An error occurred in database connection", {
            function: "app",
            error: {
                message: err.message,
                stack: err.stack
            }
        })
    })

module.exports = app