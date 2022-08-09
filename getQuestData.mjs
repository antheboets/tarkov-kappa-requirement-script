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
        if(i === Math.ceil(data.length / 50)){
            dataSliced = data.slice(i * 50, data.length)
        }
        else{
            dataSliced = data.slice(i * 50, (i + 1) * 50)
        }
        let it = 0
        let it2 = 0
        console.log("test",dataSliced.length,i,i < Math.ceil(data.length / 50))
        await Promise.all(dataSliced.map(async (quest)=>{
            console.log(quest.link,it)
            it++
            await fetch(quest.link,{method:'GET'}).then((res)=>{return res.json}).then((data)=>{
                quest.kappa = true
                console.log(it2,"done")
                it2++
                return quest
            })
        })).then((data)=>{
            data.forEach((row)=>{
                newList.push(row)
            })
        })
        console.log("tes")
    }
    console.log(newList)
    //writeInitFIle("data",newList)
}

main()