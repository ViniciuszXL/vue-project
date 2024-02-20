module.exports = {
    apps: [{
        name: "backend-vueproject",
        script: "./app.js",

        instances: 2,
        exec_mode: "cluster",

        // Graceful start
        wait_ready: true,

        // Graceful stop
        listen_timeout: 5000,
        kill_timeout: 0,
    }]
}