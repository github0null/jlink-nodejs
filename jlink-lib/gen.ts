import * as fs from 'fs';
import * as os from 'os';

interface func_arg { 
    type: string;
    name: string;
    const: boolean;
};

interface func_def {
    ffi_ok: boolean;
    declaration: string;
    f_type: string;
    f_name: string;
    f_args: func_arg[];
};

export function ArrayDelRepetition<T>(arr: T[]): T[] {
    return Array.from(new Set<T>(arr));
}

// JLINKARMDLL_API int                         JLINKARM_SetDataEvent             (JLINKARM_DATA_EVENT* pEvent, U32* pHandle);
// JLINK_API       int               STDCALL   JLINK_SetDataEvent                (JLINKARM_DATA_EVENT* pEvent, U32* pHandle);
// JLINKARMDLL_API void                        JLINKARM_SetDebugUnitBlockMask    (int Type, U32 Mask);
// JLINK_API       void              STDCALL   JLINK_SetDebugUnitBlockMask       (int Type, U32 Mask);
// JLINKARMDLL_API int                         JLINKARM_SetEndian                (int v);

console.log('>>> parse JLinkARMDLL.h');

const lines = fs.readFileSync('./JLinkARMDLL.h').toString().split(/\r\n|\n/);

const defs: func_def[] = [];

const parseArgs = (str: string): func_arg [] => {
    const l = str.split(',').map(s => s.trim());
    const r: func_arg[] = [];
    for (const part of l) {
        const m = /^(.+?)\b(\w+)$/.exec(part);
        if (m && m.length > 1) {
            const typ = m[1].trim().replace(/(\w+)\s+\*/, '$1*');
            const is_const = typ.includes('const ');
            r.push({
                type: typ.replace('const ', ''),
                const: is_const,
                name: m[2].trim()
            });
        } else {
            if (part.trim() != 'void')
                console.log('unknown syntax: ' + part);
        }
    }
    return r;
};

for (const line_ of lines) {

    const line = line_.trim();
    if (!line.startsWith('JLINK_API'))
        continue;

    const m = /JLINK_API\s+(?<r_type>.+?)\s+STDCALL\s+(?<f_name>JLINK_\w+)\s*\((?<f_args>.+?)\)\s*;/.exec(line);
    if (!m || !m.groups || m.length < 1) {
        console.log('skip line: ' + line);
        continue;
    }

    const def: func_def = <any>{};
    def.ffi_ok = false;
    def.f_type = m.groups['r_type'].trim().replace('const ', '').replace(/(\w+)\s+\*/, '$1*');
    def.f_name = m.groups['f_name'].trim();
    const args_str = m.groups['f_args'].trim();
    def.f_args = parseArgs(args_str);
    def.declaration = `${def.f_type} ${def.f_name} (${args_str});`;
    defs.push(def);
}

console.log('>>> list all types');
let jtypes: string[] = [];
for (const def of defs) {
    jtypes.push(def.f_type);
    def.f_args.forEach(a => jtypes.push(a.type));
}
jtypes = ArrayDelRepetition(jtypes).sort();
console.log(jtypes);

const TYPE_MAP__C2FFI: { [t: string]: string } = {

    'ARM_REG': 'int',
    'JLINKARM_RESET_TYPE': 'int',

    'char': 'char',
    'char*': 'string',
    //'char**': 'stringPtr',

    'U8': 'uint8',
    'U8*': 'ffi_uint8Ptr',

    'U16': 'uint16',
    'U16*': 'ffi_uint16Ptr',

    'int': 'int',
    'int*': 'ffi_intPtr',
    'unsigned': 'uint',

    'U32': 'uint32',
    'U32*': 'ffi_uint32Ptr',

    'U64': 'uint64',
    'U64*': 'ffi_uint64Ptr',

    'void': 'void',
    'void*': 'ffi_voidPtr',
};

const TYPE_MAP__FFI2JS: { [t: string]: string } = {
    'int': 'number',
    'uint': 'number',
    'char': 'number',
    'uint8': 'number',
    'uint16': 'number',
    'uint32': 'number',
    'uint64': 'number',
};

const charPtr_IsBuffer = (arg: func_arg, allargs: func_arg[]): boolean => {
    if (arg.type.includes('char') && !arg.const && allargs.some(a => a.name.includes('BufferSize'))) {
        return true;
    }
    return false;
};

for (const def of defs) {

    if (!TYPE_MAP__C2FFI[def.f_type])
        continue;
    def.f_type = TYPE_MAP__C2FFI[def.f_type];

    let breaked = false;
    for (const arg of def.f_args) {
        if (TYPE_MAP__C2FFI[arg.type]) {
            if (charPtr_IsBuffer(arg, def.f_args)) {
                arg.type = 'ffi_charPtr';
            } else {
                arg.type = TYPE_MAP__C2FFI[arg.type];
            }
        }
        else {
            breaked = true;
            break;
        }
    }

    if (!breaked)
        def.ffi_ok = true;
}

console.log('>>> list ffi funcs');
console.log('can ffi funcs:');
for (const def of defs) {
    if (def.ffi_ok)
        console.log(' ' + def.f_name);
}
console.log('can not ffi funcs:');
for (const def of defs) {
    if (!def.ffi_ok)
        console.log(' ' + def.declaration);
}

console.log('>>> write into JLinkARMDLL.json');
fs.writeFileSync('JLinkARMDLL.json', JSON.stringify(defs, undefined, 4));

console.log('>>> gen JLinkDLL class');

const cont_0 = `/* ------------------------------------------------------------------------------- */
/* - ARM_REG_xx */
/* ------------------------------------------------------------------------------- */
export enum JLinkCONST_ARM_REG {

    ARM_REG_R0 = 0,                     // Index  0
    ARM_REG_R1,                         // Index  1
    ARM_REG_R2,                         // Index  2
    ARM_REG_R3,                         // Index  3
    ARM_REG_R4,                         // Index  4
    ARM_REG_R5,                         // Index  5
    ARM_REG_R6,                         // Index  6
    ARM_REG_R7,                         // Index  7
    ARM_REG_CPSR,                       // Index  8
    ARM_REG_R15,                        // Index  9
    ARM_REG_R8_USR,                     // Index 10
    ARM_REG_R9_USR,                     // Index 11
    ARM_REG_R10_USR,                    // Index 12
    ARM_REG_R11_USR,                    // Index 13
    ARM_REG_R12_USR,                    // Index 14
    ARM_REG_R13_USR,                    // Index 15
    ARM_REG_R14_USR,                    // Index 16
    ARM_REG_SPSR_FIQ,                   // Index 17
    ARM_REG_R8_FIQ,                     // Index 18
    ARM_REG_R9_FIQ,                     // Index 19
    ARM_REG_R10_FIQ,                    // Index 20
    ARM_REG_R11_FIQ,                    // Index 21
    ARM_REG_R12_FIQ,                    // Index 22
    ARM_REG_R13_FIQ,                    // Index 23
    ARM_REG_R14_FIQ,                    // Index 24
    ARM_REG_SPSR_SVC,                   // Index 25
    ARM_REG_R13_SVC,                    // Index 26
    ARM_REG_R14_SVC,                    // Index 27
    ARM_REG_SPSR_ABT,                   // Index 28
    ARM_REG_R13_ABT,                    // Index 29
    ARM_REG_R14_ABT,                    // Index 30
    ARM_REG_SPSR_IRQ,                   // Index 31
    ARM_REG_R13_IRQ,                    // Index 32
    ARM_REG_R14_IRQ,                    // Index 33
    ARM_REG_SPSR_UND,                   // Index 34
    ARM_REG_R13_UND,                    // Index 35
    ARM_REG_R14_UND,                    // Index 36
    ARM_REG_FPSID,                      // Index 37
    ARM_REG_FPSCR,                      // Index 38
    ARM_REG_FPEXC,                      // Index 39
    ARM_REG_FPS0,                       // Index 40
    ARM_REG_FPS1,                       // Index 41
    ARM_REG_FPS2,                       // Index 42
    ARM_REG_FPS3,                       // Index 43
    ARM_REG_FPS4,                       // Index 44
    ARM_REG_FPS5,                       // Index 45
    ARM_REG_FPS6,                       // Index 46
    ARM_REG_FPS7,                       // Index 47
    ARM_REG_FPS8,                       // Index 48
    ARM_REG_FPS9,                       // Index 49
    ARM_REG_FPS10,                      // Index 50
    ARM_REG_FPS11,                      // Index 51
    ARM_REG_FPS12,                      // Index 52
    ARM_REG_FPS13,                      // Index 53
    ARM_REG_FPS14,                      // Index 54
    ARM_REG_FPS15,                      // Index 55
    ARM_REG_FPS16,                      // Index 56
    ARM_REG_FPS17,                      // Index 57
    ARM_REG_FPS18,                      // Index 58
    ARM_REG_FPS19,                      // Index 59
    ARM_REG_FPS20,                      // Index 60
    ARM_REG_FPS21,                      // Index 61
    ARM_REG_FPS22,                      // Index 62
    ARM_REG_FPS23,                      // Index 63
    ARM_REG_FPS24,                      // Index 64
    ARM_REG_FPS25,                      // Index 65
    ARM_REG_FPS26,                      // Index 66
    ARM_REG_FPS27,                      // Index 67
    ARM_REG_FPS28,                      // Index 68
    ARM_REG_FPS29,                      // Index 69
    ARM_REG_FPS30,                      // Index 70
    ARM_REG_FPS31,                      // Index 71
    ARM_REG_R8,                         // Index 72
    ARM_REG_R9,                         // Index 73
    ARM_REG_R10,                        // Index 74
    ARM_REG_R11,                        // Index 75
    ARM_REG_R12,                        // Index 76
    ARM_REG_R13,                        // Index 77
    ARM_REG_R14,                        // Index 78
    ARM_REG_SPSR,                       // Index 79
    ARM_NUM_REGS,
};

/* ------------------------------------------------------------------------------- */
/* - JLINKARM_RESET_TYPE_xx */
/* ------------------------------------------------------------------------------- */
export enum JLinkCONST_RESET_TYPE {

    JLINKARM_RESET_TYPE_NORMAL = 0,    // Resets core + peripherals. Reset pin is avoided where possible and reset via SFR access is preferred.
    //
    // --- Start ---
    // Do NOT use anymore
    //
    JLINKARM_RESET_TYPE_BP0,
    JLINKARM_RESET_TYPE_ADI,
    JLINKARM_RESET_TYPE_NO_RESET,
    JLINKARM_RESET_TYPE_HALT_WP,
    JLINKARM_RESET_TYPE_HALT_DBGRQ,
    JLINKARM_RESET_TYPE_SOFT,
    JLINKARM_RESET_TYPE_HALT_DURING,
    JLINKARM_RESET_TYPE_SAM7,
    JLINKARM_RESET_TYPE_LPC,
    //
    // --- End ---
    //
    //
    // Generic J-Link reset types (core independent)
    // CPU-specific reset types are still in the header for backward compatibility but should not be used anymore
    // All reset types halt the CPU before executing the first instruction of the user application, after reset release
    // If the CPU incorporates a ROM bootloader, J-Link makes sure that this bootloader is executed and the CPU is halted as soon as it jumps into the user application code
    //
    // Note:
    // If a specific reset type also resets the debug logic, it may happen that the CPU cannot be halted immediately after reset
    // so it may have already executed some instructions before J-Link has a chance to halt it
    //
    JLINK_RESET_TYPE_CORE = 100,         // Resets core only
    JLINK_RESET_TYPE_RESET_PIN,          // Toggles reset pin in order to issue a reset. Requires reset pin to be connected, otherwise result will be unpredictable
};

/* ------------------------------------------------------------------------------- */
/* - JLINKARM_TIF_xx */
/* ------------------------------------------------------------------------------- */
export enum JLinkCONST_TIF {

    JLINKARM_TIF_JTAG             = 0,
    JLINKARM_TIF_SWD              = 1,
    JLINKARM_TIF_BDM3             = 2,  // Do NOT use. Not supported anymore. Only there for backward compatbility inside the DLL
    JLINKARM_TIF_FINE             = 3,
    JLINKARM_TIF_ICSP             = 4,  // Microchip 2-wire JTAG via TCK + TMS (e.g. PIC32)
    JLINKARM_TIF_SPI              = 5,
    JLINKARM_TIF_C2               = 6,
    JLINKARM_TIF_CJTAG            = 7,
    JLINKARM_TIF_SWIM             = 8,   // Only used Flasher PRO/ATE internally. J-Link does not support SWIM interface (yet)
    JLINKARM_TIF_PDI              = 9,   // Only used Flasher PRO/ATE internally. J-Link does not support PDI interface (yet)
    JLINKARM_TIF_MC2WJTAG_TDI     = 10,  // Microchip 2-wire JTAG via TCK + TDI (e.g. BT5511 8051 core)
    JLINKARM_TIF_SPI_IDLE_CLK_LOW = 11,  // Microchip 2-wire JTAG via TCK + TDI (e.g. ATMega)
    JLINKARM_TIF_I2C              = 12,  // Only used Flasher PRO/ATE internally. J-Link does not support I2C interface (yet)
    JLINKARM_TIF_SPI2FE           = 13,  // Only used Flasher PRO/ATE internally. J-Link does not support SPI2FE interface (yet)
    JLINKARM_TIF_QSPI             = 14,  // Currently, only supported by Flasher PRO
    JLINKARM_TIF_NUMTIFS          = 15,  // Increment when adding a new interface
};`;

let cont: string = `/*
	MIT License

	Copyright (c) 2019 github0null

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

/**
 * @author github0null
 * @version 1.0
 * @see https://github.com/github0null/
*/

import * as ffi from 'ffi-napi';
import * as ref from 'ref-napi';

export type ffi_voidPtr   = Buffer;
export type ffi_charPtr   = Buffer;
export type ffi_intPtr    = Buffer;
export type ffi_uint8Ptr  = Buffer;
export type ffi_uint16Ptr = Buffer;
export type ffi_uint32Ptr = Buffer;
export type ffi_uint64Ptr = Buffer;

${cont_0}

export class JLinkDLL {

    private jlink: any;

    private voidPtrType   = ref.refType(ref.types.void);
    private charPtrType   = ref.refType(ref.types.char);
    private intPtrType    = ref.refType(ref.types.int);
    private uint8PtrType  = ref.refType(ref.types.uint8);
    private uint16PtrType = ref.refType(ref.types.uint16);
    private uint32PtrType = ref.refType(ref.types.uint32);
    private uint64PtrType = ref.refType(ref.types.uint64);

    constructor (dll_path: string) {
        this.jlink = ffi.Library(dll_path, {
$<dll_funcs_declare>
        });
    }
$<class_funcs>
};
`;

const to_dll_funcs_type = (type: string): string => {
    const m = /ffi_(\w+)Ptr/.exec(type);
    if (m && m.length > 1) {
        const ffi_t = m[1];
        return `%this.${ffi_t}PtrType%`;
    }
    return type;
};

const to_class_funcs_type = (type: string): string => {
    if (TYPE_MAP__FFI2JS[type])
        return TYPE_MAP__FFI2JS[type];
    return type;
};

const dll_funcs: { [name: string]: any[] } = {};
const class_funcs: string[] = [];

for (const def of defs.sort((p1, p2) => p1.f_name.localeCompare(p2.f_name))) {

    if (!def.ffi_ok)
        continue;

    // gen $<dll_funcs_declare>
    dll_funcs[def.f_name] = [];
    dll_funcs[def.f_name].push(to_dll_funcs_type(def.f_type));
    const argTypes: string[] = [];
    def.f_args.forEach(arg => {
        if (arg.type == 'void')
            return;
        let t = to_dll_funcs_type(arg.type);
        argTypes.push(t);
    });
    dll_funcs[def.f_name].push(argTypes);

    // gen $<class_funcs>
    let func_template = `
$<f_name>($<cla_args>): $<f_ret> {
    $<statements>
    $<return>this.jlink.$<dll_f_name>($<ffi_args>);
}`;
    func_template = func_template
        .replace('$<f_name>', def.f_name.replace(/^JLINK_/, ''))
        .replace('$<dll_f_name>', def.f_name)
        .replace('$<f_ret>', to_class_funcs_type(def.f_type))
        .replace('$<return>', def.f_type == 'void' ? '' : 'return ');

    let cla_args: string[] = [];
    let ffi_args: string[] = [];
    let statements: string[] = [];

    for (const f_arg of def.f_args) {
        let t_js = f_arg.type;
        if (TYPE_MAP__FFI2JS[t_js])
            t_js = TYPE_MAP__FFI2JS[t_js];
        cla_args.push(`${f_arg.name}: ${t_js}`);
        const m = /ffi_(\w+)Ptr/.exec(t_js);
        if (m && m.length > 1) {
            const item_t = m[1];
            const b_name = f_arg.name;
            statements.push(
                `${b_name}.type = ref.types.${item_t};`);
            ffi_args.push(`${b_name}`);
        } else {
            ffi_args.push(`${f_arg.name}`);
        }
    }

    func_template = func_template
        .replace('$<statements>', statements.join(os.EOL + ''.padStart(4)))
        .replace('$<cla_args>', cla_args.join(', '))
        .replace('$<ffi_args>', ffi_args.join(', '));
    class_funcs.push(func_template.replace(/\n/g, '\n' + ''.padStart(4)));
}

// console.log(dll_funcs);
// console.log(class_funcs);

const dll_funcs_declare: string[] = [];
for (const func in dll_funcs) {
    const j_str = JSON.stringify(dll_funcs[func]);
    dll_funcs_declare.push(''.padEnd(4 * 3) + `'${func}': ${j_str},`);
}

cont = cont
    .replace('$<dll_funcs_declare>', dll_funcs_declare.join(os.EOL))
    .replace('$<class_funcs>', class_funcs.join(os.EOL))
    .replace(/"%([^%]+)%"/g, "$1");

fs.writeFileSync('../src/index.ts', cont);