const fs = require('fs');
const crypto = require('crypto');

const start = Date.now()
process.env.UV_THREADPOOL_SIZE = 1;
setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile('test-file.txt', () =>{
    console.log("I/O finished");
    setTimeout(() => console.log("Timer 1 finished"), 0);
    setTimeout(() => console.log("Timer 2 finished"), 3000);
    setImmediate(() => console.log("Immediate 1 finished"));

    process.nextTick(() => {
        console.log("Nexttick")
    });

    crypto.pbkdf2('echitosto','salt', 100000, 1024, 'sha512', () =>{
        console.log(Date.now() - start, "Encriptada")
    });
});

console.log("Top level");