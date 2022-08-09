import * as fs from 'node:fs/promises'

export async function writeJsonAsync(filename,data){
    await fs.writeFile(`${filename}.json`,JSON.stringify(data,null,3), function () {})
}

export async function readJsonAsync(path){
    return JSON.parse(await fs.readFile(`./${path}.json`, 'utf8'))
}

export async function writeCSVAsync(filename,csv){
    await fs.writeFile(`${filename}.csv`,csv, function () {})
}