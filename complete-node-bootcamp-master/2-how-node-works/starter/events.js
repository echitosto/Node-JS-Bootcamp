const EventEmitter = require('events');
const http = require('http')

class Emitidor extends EventEmitter{
    constructor(){
        super();
    }
}

myEmitter = new Emitidor();
myEmitter.on('newEvent', () =>{
    console.log('evento');
});

myEmitter.on('newEvent', () =>{
    console.log('evento2')
})

myEmitter.on('newEvent', value => {
    console.log(`${value}`)
})

myEmitter.emit('newEvent', 5);

////////////////////////////

const server = http.createServer();

server.on('request', (req, res) =>{
    console.log('Request received');
    res.end('Req received');
})

server.on('request', (req, res) =>{
    console.log('Req2 received');
})

server.on('close', ()=>{
    console.log('Server closed');
})

server.listen(8000, 'localhost', ()=>{
    console.log("Listening...")
})