const typeorm = require("typeorm")

module.exports = new typeorm.EntitySchema({
    name: "Admin",
    tableName: "admin",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        email: {
            type: "varchar",
            nullable: false
        },
        password: {
            type: "text",
            nullable: false
        }
    }
})