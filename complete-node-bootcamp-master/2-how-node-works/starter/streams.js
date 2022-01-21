const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res)=>{
    //Primera manera (Local way, no esta piola para cosas grandes)
    //
    // fs.readFile('test-file.txt', (err, data) => {
    //     if (err) console.log(err);
    //     res.end(data);
    // });

    //Segunda manera: streams (Problema: Leer es mas rapido que devolver al client)
    // const readable = fs.createReadStream('test-file.txt');
    // readable.on('data', info => {
    //     res.write(info);
    // });
    // readable.on('end', () => {
    //     res.end();
    // });
    // readable.on('error', err =>{
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end('File not found');
    // });

    //Tercera manera: Pipe operator
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);
    //readableSource.pipe(writeableDestination)
});

server.listen(8000, 'localhost', () =>{
    console.log("Listening...");
});