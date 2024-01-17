import { appendFile } from "node:fs/promises";
import { Config } from "./config.js";

let errFile: string;

export function init(c: Config) {
    errFile = c.log.error;
}

export function error(str: string): Promise<void> {
    const errMsg = composeMsg("ERROR", str);
    console.error(errMsg)
    return appendFile(errFile, str, {encoding: "utf-8"});
}

export function warn(str: string): Promise<void> {
    const errMsg = composeMsg("WARN ", str);
    console.warn(errMsg)
    return appendFile(errFile, str, {encoding: "utf-8"});
}

function composeMsg(lvl: string, msg: string): string {
    return `${new Date().toISOString()}  [${lvl}]  ${msg}`
}
