const { exec } = require('child_process');

const numThreads = 1000

const cmd = 'httrack -v -w https://upky.io'
//cmd = 'ls ../'

let threads = {}

const run = (i, cmd) => {
    ls = exec(cmd, function (error, stdout, stderr) {            

        if (!threads[i]) {
            threads[i] = { iteration: 0 }
        }

        if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' + error.signal)
        }
        if (stdout) {
            console.log(`Thread ${i} Iteration: ${threads[i].iteration} `)
            threads[i].iteration++
            launch()
        }
        if (stderr) {
            console.log('Child Process STDERR: ' + stderr)
        }
        
    })

    ls.on('exit', function (code) {
        //console.log('Child process exited with exit code ' + code)
        //launch()
    })
}

const launch = () => {    

    for (i = 0; i < numThreads; i++) {        
        run(i, cmd)
    }
}

launch()
