import { JLinkDLL, JLinkCONST_ARM_REG, JLinkCONST_TIF } from "../src";

const jlink = new JLinkDLL('../jlink-lib/JLink_x64.dll');

console.log(jlink.Open());

console.log('>>> setup and connect ...');

let buf = Buffer.alloc(256);
{
    console.log(jlink.GetFirmwareString(buf, buf.length));
    console.log(buf.toString());

    console.log(jlink.ExecCommand('device = STM32F407VG', buf, buf.length));
    console.log(buf.toString());
}

console.log(jlink.TIF_Select(JLinkCONST_TIF.JLINKARM_TIF_SWD));
console.log(jlink.SetSpeed(4000));
console.log(jlink.Connect());
console.log(jlink.IsConnected());

jlink.Halt();
jlink.GoEx(150, 0);
jlink.Halt();

console.log('>>> read ARM_REG');

for (let i = JLinkCONST_ARM_REG.ARM_REG_R0; i < JLinkCONST_ARM_REG.ARM_NUM_REGS; i++) {
    const v = jlink.ReadReg(i);
    console.log(`  ${JLinkCONST_ARM_REG[i]}\t: 0x${v.toString(16).padStart(8, '0')}`);
}

console.log('>>> close');
console.log(jlink.Close());
