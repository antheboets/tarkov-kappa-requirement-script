import * as fs from 'node:fs/promises'

export function writeFile(filename,data){
    fs.writeFile(filename + "1.json",data, function () {})
}

export default writeFile