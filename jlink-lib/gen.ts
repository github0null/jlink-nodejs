import * as fs from 'fs';
import * as os from 'os';

interface func_arg { 
    type: string;
    name: string;
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
    const r: { type:string, name: string }[] = [];
    for (const part of l) {
        const m = /^(.+?)\b(\w+)$/.exec(part);
        if (m && m.length > 1) {
            r.push({
                type: m[1].trim().replace('const ', ''),
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
    def.f_type = m.groups['r_type'].trim().replace('const ', '');
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
    'char *': 'string',
    //'char**': 'stringPtr',

    'U8': 'uint8',
    'U8 *': 'ffi_uint8Ptr',
    'U8*': 'ffi_uint8Ptr',

    'U16': 'uint16',
    'U16*': 'ffi_uint16Ptr',

    'int': 'int',
    'int*': 'ffi_intPtr',
    'unsigned': 'uint',

    'U32': 'uint32',
    'U32 *': 'ffi_uint32Ptr',
    'U32*': 'ffi_uint32Ptr',

    'U64': 'uint64',
    'U64*': 'ffi_uint64Ptr',

    'void': 'void',
    'void*': 'ffi_voidPtr',
    'void *': 'ffi_voidPtr',
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

for (const def of defs) {

    if (!TYPE_MAP__C2FFI[def.f_type])
        continue;
    def.f_type = TYPE_MAP__C2FFI[def.f_type];

    let breaked = false;
    for (const arg of def.f_args) {
        if (TYPE_MAP__C2FFI[arg.type])
            arg.type = TYPE_MAP__C2FFI[arg.type];
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

let cont: string = `
/*
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
export type ffi_intPtr    = Buffer;
export type ffi_uint8Ptr  = Buffer;
export type ffi_uint16Ptr = Buffer;
export type ffi_uint32Ptr = Buffer;
export type ffi_uint64Ptr = Buffer;

export class JLinkDLL {

    private jlink: any;

    private voidPtrType   = ref.refType(ref.types.void);
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