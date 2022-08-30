//https://escapefromtarkov.fandom.com/wiki/Quests
const array = []
const classess = ["wikitable Prapor-content","wikitable Mechanic-content","wikitable Skier-content","wikitable Fence-content","wikitable Ragman-content","wikitable Therapist-content","wikitable Peacekeeper-content","wikitable Jaeger-content"]
const traders = ["Prapor","Mechanic","Skier","Fence", "Ragman","Therapist","Peacekeeper","Jaeger"]
const txt = "https://escapefromtarkov.fandom.com"
let id = 1
for(let i = 0; i < classess.length ; i++){
    const rows = Array.from(document.getElementsByClassName(classess[i])[0].children[0].getElementsByTagName("tr"))
    rows.shift()
    rows.shift()
    rows.forEach((tr)=>{
        const name = tr.children[0].childNodes[0].children[0].text
        const type = tr.children[1].textContent.substring(0,tr.children[1].textContent.length - 1)
        const link = txt + tr.children[0].childNodes[0].children[0].attributes[0].value
        const objectives = []
        Array.from(tr.children[2].children[0].children).forEach((li)=>{
            objectives.push(li.textContent)
        })
        const rewards = []
        Array.from(tr.children[3].children[0].children).forEach((li)=>{
            rewards.push(li.textContent)
        })
        array.push({id:id,trader:traders[i],name:name,type:type,link:link,objectives:objectives,rewards:rewards,kappa:undefined})
        id++
    })
}
console.log(array)