const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');
const replaceTemplate = require('./modules/replaceTemplate');
const slugify = require('slugify');

/////////////////////////////////////////
// FILES

/*
Blocking:
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);
const textOut = `Lucho es trolo porque: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File written!');
*/


/*
Non blocking: 
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if (err) return console.log('error perri');
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3);
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
                console.log('fachaaa');
            });
        });
    });
});
console.log('Reading file...');*/

//////////////////////////////////////////
// SERVER

const tempOverview = fs.readFileSync(path.join(__dirname,'/templates/template-overview.html'),'utf-8');
const tempCard = fs.readFileSync(path.join(__dirname,'/templates/template-card.html'),'utf-8');
const tempProduct = fs.readFileSync(path.join(__dirname,'/templates/template-product.html'),'utf-8');
const products = fs.readFileSync(path.join(__dirname,'/dev-data/data.json'),'utf-8');
const productsObj = JSON.parse(products);
const server = http.createServer((req , res) =>{
    const {query, pathname} = url.parse(req.url, true);
    // Overview page
    if(pathname === '/overview' || pathname === '/'){
        res.writeHead(200,{'Content-type':'text/html'})
        const cardsHtml = productsObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
        res.end(output);
    // Product page
    } else if(pathname === '/product'){
        const product = productsObj[query.id];
        const output = replaceTemplate(tempProduct,product);
        res.end(output);

    // API
    } else if(pathname === '/api'){
        res.writeHead(200,{'Content-type':'application/json'})
        res.end(products);

    // 404: NOT FOUND
    } else{
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-header':'header'
        });
        res.end('<h1> ERROR 404 </h1>');
    }
}); 
server.listen(8000, 'localhost', () =>{
    console.log('Running server on localhost:8000');
});
