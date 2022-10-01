import fs from "fs"
import path from "path"

export const read = dir => {
    return JSON.parse(fs.readFileSync(path.normalize(`${process.cwd()}/src/model/${dir}`)))
}

export const write = (dir, data) => {
    fs.writeFileSync(path.normalize(`${process.cwd()}/src/model/${dir}`), JSON.stringify(data, null ,4))
    return "ok"
}