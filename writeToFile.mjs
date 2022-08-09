import * as fs from 'node:fs/promises'

export async function writeJson(filename,data){
    await fs.writeFile(`${filename}.json`,JSON.stringify(data,null,3), function () {})
}

export async function readJson(path){
    return JSON.parse(await fs.readFile(`./${path}.json`, 'utf8'))
}