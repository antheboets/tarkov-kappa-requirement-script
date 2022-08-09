import fetch from 'node-fetch';
import * as fs from 'node:fs/promises';

function writeInitFIle(filename,data){
    fs.writeFile(filename + ".json",data, function () {});
}

async function main(){

    const data = JSON.parse(await fs.readFile('./data.json', 'utf8'))
    let dataSliced = []
    const newList = []

    for(let i = 0; i < Math.ceil(data.length / 50);i++){
        dataSliced = data.slice(i * 50, (i + 1) * 50)
        await Promise.all(dataSliced.map(async (quest)=>{
            return fetch(quest.link,{method:'GET'}).then((res)=>{return res.text()}).then((html)=>{
                //get kappa form html
                return quest
            })
        })).then((data)=>{
            data.forEach((row)=>{
                newList.push(row)
            })
        })
    }
    console.log(newList)
    //writeInitFIle("data",newList)
}

main()