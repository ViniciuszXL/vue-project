const dataSource = global.dataSource;

module.exports = {
    /**
     * @name findOne - Get specific data from database
     * @param {*} options
     */
    findOne: async (options) => {
        const repository = dataSource.getRepository("Users");
        return repository.findOne(options);
    },

    /**
     * @name update - Update user information
     * @param {*} options 
     * @param {*} query 
     */
    updateUser: async (options, query) => {
        const repository = dataSource.getRepository("Users");
        return repository.update(options, query)
    },

    /**
     * @name remove - Remove user from database
     * @param {*} user 
     */
    removeUser: async (user) => {
        const repository = dataSource.getRepository("Users");
        return repository.remove(user)
    },

    /**
     * @name removeUsers - Remove all users
     */
    removeUsers: async () => {
        const repository = dataSource.getRepository("Users");
        const entities = await repository.find({ where: { isTest: true } })
        return repository.remove(entities)
    },

    /**
     * @name findMany - Get datas from database
     * @param {*} options
     */
    find: async (options) => {
        const repository = dataSource.getRepository("Users");
        return repository.find(options);
    },

    /**
     * @name findAndCount - Find data and count
     * @param {*} options 
     */
    findAndCount: async (options, callback) => {
        const repository = dataSource.getRepository("Users");
        repository.findAndCount(options)
            .then((data) => callback(data[0], data[1]))
            .catch(e => callback(undefined, e))
    },

    /**
     * @name save - Create user in database
     * @param {*} user 
     */
    save: async (user) => {
        const repository = dataSource.getRepository("Users");
        return repository.save(repository.create(user))
    }
};
