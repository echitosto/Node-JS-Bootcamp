const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = file => {
    return new Promise((resolve, reject) =>{
        fs.readFile(file, (err, data) =>{
            if(err) reject('No pude encontrar el archivo')
            resolve(data);
        })
    })
}

const writeFilePromise  = (file, data) =>{
    return new Promise((resolve, reject) =>{
        fs.writeFile(file, data, err =>{
            if(err) reject('No pude escribir el archivo')
            resolve('Done')
        })
    })
}

const getDogPic = async () =>{
    try{
        const data = await readFilePromise(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        const res1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        

        const res2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        

        const res3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        
        
        const all = await Promise.all([res1, res2, res3]);
        const imgs = all.map(el =>el.body.message);
        console.log(imgs)

        await writeFilePromise('random-dog.txt', imgs.join('\n'));
        console.log('Dog saved to file!')
    }
    catch(err){
        console.log(err)
        throw err
    }
    return '2: listo'
};
(async ()=>{
    try{
        console.log('1: Obtiene las fotos')
        const x = await getDogPic()
        console.log(x)
        console.log('3: Termino')
    }catch(err){
        console.log('ERROR')
    }
})();



/*
THEN/CATCH
console.log('1: Obtiene las fotos')
getDogPic().then(x => {
    console.log(x)
    console.log('3: Termino')
}).catch(err => {
    console.log('ERROR')
})
*/




/*
CONSUMING SELF BUILT PROMISES

readFilePromise(`${__dirname}/dog.txt`).then(data =>{
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
})
.then(res =>{
        console.log(res.body.message);
        return writeFilePromise('random-dog.txt', res.body.message);
})
.then(() =>{
    console.log("Dog saved to file!")
})
.catch(err =>{
    console.log(err.message);
});
*/

