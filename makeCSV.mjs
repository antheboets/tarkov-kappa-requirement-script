import {readJsonAsync,writeCSVAsync} from './fileIOLib.mjs'
//deli = delimiter
const deli = ";"
const newLine = () => {return "\n"}
const header = () => {return `Id${deli}Trader${deli}Name${deli}Type${deli}Link${deli}Kappa requirement${newLine()}`}

async function main(){
    const data = await readJsonAsync("data")
    let csvData = header()
    data.forEach(quest => {
        csvData += `${quest.id}${deli}${quest.trader}${deli}${quest.name}${deli}${quest.type}${deli}${quest.link}${deli}${quest.kappa}${newLine()}`
    })
    await writeCSVAsync("quests",csvData)
}
main()