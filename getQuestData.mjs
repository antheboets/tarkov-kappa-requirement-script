import fetch from 'node-fetch'
import * as fs from 'node:fs/promises'
import DomParser from 'dom-parser'
//import writeFile from './writeToFile.mjs'
function writeFile(filename,data){
    fs.writeFile(filename + ".json",JSON.stringify(data,null,3), function () {})
}


async function main(){

    const parser = new DomParser()
    const data = JSON.parse(await fs.readFile('./data.json', 'utf8'))
    let dataSliced = []
    const newList = []

    for(let i = 0; i < Math.ceil(data.length / 50);i++){
        dataSliced = data.slice(i * 50, (i + 1) * 50)
        await Promise.all(dataSliced.map((quest)=>{
            return fetch(quest.link,{method:'GET'}).then((res)=>{return res.text()}).then((html)=>{
                //get kappa form html
                quest.kappa = "undefined"
                const dom = parser.parseFromString(html)
                const tableTrList = dom.getElementsByClassName("va-infobox-group")[1].firstChild.childNodes
                const contentTrList = []
                let firstTr = true
                tableTrList.forEach((tr)=>{
                    if(tr.attributes.length === 0){
                        if(firstTr){
                            firstTr = false
                        }
                        else{
                            contentTrList.push(tr)
                        }
                    }
                })
                let kappaRequiredFound = false
                for(let i = 0;i < contentTrList.length;i++){
                    if(contentTrList[i].getElementsByClassName("va-infobox-label")[0].textContent === "Required forKappa container"){
                        switch(contentTrList[i].getElementsByClassName("va-infobox-content")[0].textContent){
                            case"Yes":
                                quest.kappa = true
                            break
                            case "No":
                                quest.kappa = false
                            break
                            default:
                                quest.kappa = "undefined"
                            break
                        }
                    }
                    
                    //console.log(contentTrList[i].textContent)
                }
                return quest
            })
        })).then((data)=>{
            data.forEach((row)=>{
                newList.push(row)
            })
        })
    }
    //console.log(newList)
    writeFile("data",newList)
}

main()