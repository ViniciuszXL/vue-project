const typeorm = require("typeorm")

module.exports = new typeorm.EntitySchema({
    name: "Users",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        ra: {
            primary: true,
            type: "int",
            nullable: false
        },
        name: {
            type: "varchar",
            nullable: false
        },
        email: {
            type: "varchar",
            nullable: false
        },
        cpf: {
            type: "varchar",
            nullable: false
        },
        isTest: {
            type: "boolean",
            default: false
        }
    }
})