const dataSource = global.dataSource
const environment = require("../common/environment")
const logger = require("../log")
const { hash, compare } = require("bcrypt")

module.exports = {

    /**
     * @name createAdmin - Create of user admin
     */
    createAdmin: async () => {
        try {
            const repository = dataSource.getRepository("Admin")
            const admin = await repository.findOne({ where: { email: environment.SERVER.DEFAULT_ADMIN.EMAIL }})
            // Admin has been created
            if (admin) return;

            // Creating admin
            const data = {
                email: environment.SERVER.DEFAULT_ADMIN.EMAIL,
                password: await hash(environment.SERVER.DEFAULT_ADMIN.PASSWORD, 14)
            }

            await repository
                // Save
                .save(data)
                // Success 
                .then((adminSaved) => {
                    logger.info("Admin has been saved in database", {
                        function: "createAdmin",
                        admin: {
                            ...adminSaved,
                            password: undefined,
                        }
                    })
                })
        } catch (err) {
            logger.error("An error occurred in create admin", {
                function: "createAdmin",
                error: {
                    message: err.message,
                    stack: err.stack
                }
            })
        }
    },

    /**
     * @anme findOne - Get specific data from database
     * @param {*} options 
     */
    findOne: async (options) => {
        const repository = dataSource.getRepository("Admin")
        return repository.findOne(options)
    },

    /**
     * @anme findMany - Get datas from database
     * @param {*} options 
     */
    find: async (options) => {
        const repository = dataSource.getRepository("Admin")
        return repository.find(options)
    },

    /**
     * @name comparePassword - Compare password if is correct
     * 
     * @param {*} password 
     * @param {*} adminPassword 
     * 
     * @returns Promise
     */
    comparePassword: (password, adminPassword) => {
        return new Promise(async (resolve) => {
            const value = await compare(password, adminPassword).catch(err => {
                return resolve({ success: false, err })
            })

            return resolve({ success: value })
        })
    }

}