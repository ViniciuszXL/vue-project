const typeorm = require("typeorm")
const models = require("./models")
const environment = require("./common/environment")

const dataSource = new typeorm.DataSource({
    type: "mariadb",
    host: environment.MARIA.HOST,
    port: environment.MARIA.PORT,
    username: environment.MARIA.USERNAME,
    password: environment.MARIA.PASSWORD,
    database: environment.MARIA.DATABASE,
    synchronize: Boolean(environment.SERVER.SYNCHRONIZE || 'true'),
    entities: models
})

global.dataSource = dataSource

module.exports = dataSource