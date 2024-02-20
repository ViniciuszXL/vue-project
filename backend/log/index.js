const writeToConsole = (message) => process.stdout.write(`${message}\n`)

const log = (data) => writeToConsole(JSON.stringify(data))

module.exports = {
    info: (message, json) => log({ level: "info", message, json }),
    debug: (message, json) => log({ level: "debug", message, json }),
    warn: (message, json) => log({ level: "warn", message, json }),
    error: (message, json) => log({ level: "error", message, json }),
    fatal: (message, json) => {
        log({ level: "fatal", message, json })
        process.exit(1)
    },
}