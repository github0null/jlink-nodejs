import { JLinkDLL } from "../src";

const jlink = new JLinkDLL('../jlink-lib/JLink_x64.dll');

console.log(jlink.Open());
console.log(jlink.Connect());
console.log(jlink.Close());
