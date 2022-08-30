import fetch from 'node-fetch'
import DomParser from 'dom-parser'
import {readJsonAsync,writeJsonAsync} from './fileIOLib.mjs'

async function main(){

    const parser = new DomParser()
    const data = await readJsonAsync("data")
    const shortObjectivesData = await readJsonAsync("shortObjectives")
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
                for(let i = 0; i < contentTrList.length && !kappaRequiredFound; i++){
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
                        kappaRequiredFound = true
                    }
                }
                return quest
            })
        })).then((data)=>{
            data.forEach((row)=>{
                newList.push(row)
            })
        })
    }
    newList.forEach((quest)=>{
        console.log(shortObjectivesData[quest.name] !== undefined,quest.name)
        if(shortObjectivesData[quest.name] !== undefined){
            quest.shortObjectives = shortObjectivesData[quest.name].shortObjectives
        }
    })
    await writeJsonAsync("data",newList)
}
main()