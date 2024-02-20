require("./app")
const jestCli = require("jest-cli")
const environment = require("./common/environment")

const afterAllTests = async () => {
    userService = require("./services/user.service")
    return userService.removeUsers().then(() => process.exit(0))
}

jestCli.run()
    // Shutdown api
    .then(() => afterAllTests())
    // Have a error?
    .catch(console.error)