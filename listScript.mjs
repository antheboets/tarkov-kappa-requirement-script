import {readJsonAsync} from './fileIOLib.mjs'

const ignoreList = ["Compensation for Damage - Collection","Hippocratic Oath","Compensation for Damage - Wager","Compensation for Damage - Trust","Compensation for Damage - Wergild","Compensation for Damage - Barkeep"]

function getTextFromObjectives(objectives){
    let text = ""
    objectives.forEach(objective =>{
        text += `${objective} |`
    })
    return text
}

function printAllNotrequiretQuests(data){
    let questCount = 0
    data.forEach(quest => {
        if(!quest.kappa && !ignoreList.includes(quest.name)){
            console.log(`${quest.name} ${getTextFromObjectives(quest.objectives)}`)
            questCount++
        }
    })
    console.log(questCount)
}

function printAllNotrequiretQuestsInMarkDown(data){
    data.forEach(quest => {
        if(!quest.kappa){
            console.log(`* [${quest.name}](${quest.link})`)
        }
    })
}
function printNotrequiretQuestsInMarkDown(data){
    data.forEach(quest => {
        if(!quest.kappa && !ignoreList.includes(quest.name)){
            let objectives = ""
            if(quest.shortObjectives !== undefined){
                quest.shortObjectives.forEach((objective)=>{
                    objectives += objective
                })
            }
            else{
                quest.objectives.forEach((objective)=>{
                    objectives += objective
                })
            }
            console.log(`* [${quest.name} - ${objectives}](${quest.link})`)
        }
    })
}

function printAllNotrequiretQuestsCount(data){
    let count = 0
    data.forEach(quest => {
        if(!quest.kappa && !ignoreList.includes(quest.name)){
            count++
        }
    })
    console.log(count)
}

async function main(){
    const data = await readJsonAsync("data")
    //printAllNotrequiretQuests(data)
    printNotrequiretQuestsInMarkDown(data)
    console.log("------------------------------------------------")
    printAllNotrequiretQuestsInMarkDown(data)
    //printAllNotrequiretQuestsCount(data)
}
main()