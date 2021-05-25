// First, we need a js script to link in the ecosystem file,
// This is the script that will run our `npm start` command.

const exec = require("child_process").exec; // Or es6 modules, you know, I'm not your supervisor.

console.log(
    `Starting app for production` // you may have different envs...
);

// Here's the good part
// by default the command line tool will be cmd! Check the docs:
// https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback

const build = exec("yarn run start", { stdio: "inherit", windowsHide: true });

build.stdout && build.stdout.on("data", console.log);
build.stderr && build.stderr.on("data", console.log);

build.on("close", code => {
    if (code !== 0) {
        console.log(`Build process exited with code ${code}`);
    }

    if (build.stdin) {
        build.stdin.end();
    }
});
