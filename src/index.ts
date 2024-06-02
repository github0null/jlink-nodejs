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
export type ffi_charPtr   = Buffer;
export type ffi_intPtr    = Buffer;
export type ffi_uint8Ptr  = Buffer;
export type ffi_uint16Ptr = Buffer;
export type ffi_uint32Ptr = Buffer;
export type ffi_uint64Ptr = Buffer;

/* ------------------------------------------------------------------------------- */
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
};

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
            'JLINK_AddMirrorArea': ["void",["uint32"]],
            'JLINK_AddMirrorAreaEx': ["void",["uint32","uint32"]],
            'JLINK_BeginDownload': ["void",["uint32"]],
            'JLINK_Clock': ["uint8",[]],
            'JLINK_Close': ["void",[]],
            'JLINK_ClrBP': ["void",["uint"]],
            'JLINK_ClrBPEx': ["int",["int"]],
            'JLINK_ClrDataEvent': ["int",["uint32"]],
            'JLINK_ClrError': ["void",[]],
            'JLINK_ClrExecTime': ["void",[]],
            'JLINK_ClrRESET': ["void",[]],
            'JLINK_ClrTCK': ["int",[]],
            'JLINK_ClrTDI': ["void",[]],
            'JLINK_ClrTMS': ["void",[]],
            'JLINK_ClrTRST': ["void",[]],
            'JLINK_ClrWP': ["int",["int"]],
            'JLINK_Communicate': ["int",[this.voidPtrType,"int",this.voidPtrType,"int"]],
            'JLINK_ConfigJTAG': ["void",["int","int"]],
            'JLINK_Configure': ["int",["string"]],
            'JLINK_Connect': ["int",[]],
            'JLINK_CORE_GetFound': ["uint32",[]],
            'JLINK_CORE_Select': ["void",["uint32"]],
            'JLINK_CORESIGHT_Configure': ["int",["string"]],
            'JLINK_CORESIGHT_ReadAPDPReg': ["int",["uint8","uint8",this.uint32PtrType]],
            'JLINK_CORESIGHT_WriteAPDPReg': ["int",["uint8","uint8","uint32"]],
            'JLINK_CP15_IsPresent': ["int",[]],
            'JLINK_CP15_ReadEx': ["int",["uint8","uint8","uint8","uint8",this.uint32PtrType]],
            'JLINK_CP15_ReadReg': ["int",["uint",this.uint32PtrType]],
            'JLINK_CP15_WriteEx': ["int",["uint8","uint8","uint8","uint8","uint32"]],
            'JLINK_CP15_WriteReg': ["int",["uint32","uint32"]],
            'JLINK_DEVICE_GetIndex': ["int",["string"]],
            'JLINK_DIALOG_Configure': ["int",["string",this.charPtrType,"uint32"]],
            'JLINK_DIALOG_ConfigureEx': ["int",[this.voidPtrType,"uint32","string",this.charPtrType,"uint32"]],
            'JLINK_DownloadECode': ["void",[this.uint8PtrType,"uint32"]],
            'JLINK_DownloadFile': ["int",["string","uint32"]],
            'JLINK_EMU_AddLicense': ["int",["string"]],
            'JLINK_EMU_COM_IsSupported': ["int",[]],
            'JLINK_EMU_COM_Read': ["int",["uint","uint",this.voidPtrType]],
            'JLINK_EMU_COM_Write': ["int",["uint","uint",this.voidPtrType]],
            'JLINK_EMU_EraseLicenses': ["int",[]],
            'JLINK_EMU_FILE_Delete': ["int",["string"]],
            'JLINK_EMU_FILE_GetList': ["int",["string",this.charPtrType,"uint32"]],
            'JLINK_EMU_FILE_GetSize': ["int",["string"]],
            'JLINK_EMU_FILE_Read': ["int",["string",this.uint8PtrType,"uint32","uint32"]],
            'JLINK_EMU_FILE_Write': ["int",["string",this.uint8PtrType,"uint32","uint32"]],
            'JLINK_EMU_GetCounters': ["int",["uint32",this.uint32PtrType]],
            'JLINK_EMU_GetLicenses': ["int",[this.charPtrType,"uint32"]],
            'JLINK_EMU_GetMaxMemBlock': ["uint32",[]],
            'JLINK_EMU_GetNumConnections': ["int",[]],
            'JLINK_EMU_GetNumDevices': ["uint32",[]],
            'JLINK_EMU_GetProductId': ["int",[]],
            'JLINK_EMU_GetProductName': ["void",[this.charPtrType,"uint32"]],
            'JLINK_EMU_GPIO_GetState': ["int",[this.uint8PtrType,this.uint8PtrType,"uint32"]],
            'JLINK_EMU_GPIO_SetState': ["int",[this.uint8PtrType,this.uint8PtrType,this.uint8PtrType,"uint32"]],
            'JLINK_EMU_HasCapEx': ["int",["int"]],
            'JLINK_EMU_HasCPUCap': ["int",["uint32"]],
            'JLINK_EMU_IsConnected': ["char",[]],
            'JLINK_EMU_SelectByIndex': ["uint32",["uint32"]],
            'JLINK_EMU_SelectByUSBSN': ["int",["uint32"]],
            'JLINK_EMU_SelectIP': ["int",[this.charPtrType,"int",this.uint16PtrType]],
            'JLINK_EMU_SelectIPBySN': ["void",["uint32"]],
            'JLINK_EMU_TestNRSpeed': ["int",["uint32","uint32"]],
            'JLINK_EMU_TestNWSpeed': ["int",["uint32","uint32"]],
            'JLINK_EnableCheckModeAfterWrite': ["int",["int"]],
            'JLINK_EnableFlashCache': ["void",["char"]],
            'JLINK_EnablePerformanceCnt': ["void",["uint32","uint32"]],
            'JLINK_EnableSoftBPs': ["void",["char"]],
            'JLINK_EndDownload': ["int",[]],
            'JLINK_EraseChip': ["int",[]],
            'JLINK_ETB_IsPresent': ["char",[]],
            'JLINK_ETB_ReadReg': ["uint32",["uint32"]],
            'JLINK_ETB_WriteReg': ["void",["uint32","uint32","int"]],
            'JLINK_ETM_IsPresent': ["char",[]],
            'JLINK_ETM_ReadReg': ["uint32",["uint32"]],
            'JLINK_ETM_StartTrace': ["void",[]],
            'JLINK_ETM_WriteReg': ["void",["uint32","uint32","int"]],
            'JLINK_ExecCommand': ["int",["string",this.charPtrType,"int"]],
            'JLINK_ExecECode': ["void",[]],
            'JLINK_FindBP': ["int",["uint32"]],
            'JLINK_GetAvailableLicense': ["int",[this.charPtrType,"uint32"]],
            'JLINK_GetCompileDateTime': ["string",[]],
            'JLINK_GetConfigData': ["void",[this.intPtrType,this.intPtrType]],
            'JLINK_GetDebugInfo': ["int",["uint32",this.uint32PtrType]],
            'JLINK_GetDeviceFamily': ["int",[]],
            'JLINK_GetDLLVersion': ["uint32",[]],
            'JLINK_GetEmbeddedFWString': ["int",["string",this.charPtrType,"uint32"]],
            'JLINK_GetEmuCaps': ["uint32",[]],
            'JLINK_GetEmuCapsEx': ["void",[this.uint8PtrType,"int"]],
            'JLINK_GetExecTime': ["void",[this.uint32PtrType,this.uint32PtrType]],
            'JLINK_GetFeatureString': ["void",["string"]],
            'JLINK_GetFirmwareString': ["void",[this.charPtrType,"int"]],
            'JLINK_GetHardwareVersion': ["int",[]],
            'JLINK_GetHWInfo': ["int",["uint32",this.uint32PtrType]],
            'JLINK_GetId': ["uint32",[]],
            'JLINK_GetIRLen': ["int",[]],
            'JLINK_GetNumBPs': ["uint",[]],
            'JLINK_GetNumBPUnits': ["int",["uint32"]],
            'JLINK_GetNumWPs': ["uint",[]],
            'JLINK_GetNumWPUnits': ["int",[]],
            'JLINK_GetOEMString': ["char",["string"]],
            'JLINK_GetPCode': [this.uint8PtrType,["int",this.uint32PtrType]],
            'JLINK_GetPerformanceCnt': ["uint32",["uint32"]],
            'JLINK_GetpSharedMem': [this.voidPtrType,[]],
            'JLINK_GetRegisterList': ["int",[this.uint32PtrType,"int"]],
            'JLINK_GetRegisterName': ["string",["uint32"]],
            'JLINK_GetScanLen': ["int",[]],
            'JLINK_GetSelDevice': ["uint16",[]],
            'JLINK_GetSN': ["int",[]],
            'JLINK_GetSpeed': ["uint16",[]],
            'JLINK_Go': ["void",[]],
            'JLINK_GoAllowSim': ["void",["uint32"]],
            'JLINK_GoEx': ["void",["uint32","uint32"]],
            'JLINK_GoHalt': ["int",["uint32"]],
            'JLINK_GoIntDis': ["void",[]],
            'JLINK_Halt': ["char",[]],
            'JLINK_HasError': ["int",[]],
            'JLINK_HSS_Read': ["int",[this.voidPtrType,"uint32"]],
            'JLINK_HSS_Stop': ["int",[]],
            'JLINK_IsConnected': ["char",[]],
            'JLINK_IsHalted': ["char",[]],
            'JLINK_IsOpen': ["char",[]],
            'JLINK_JTAG_DisableIF': ["int",[]],
            'JLINK_JTAG_EnableIF': ["int",[]],
            'JLINK_JTAG_GetData': ["void",[this.uint8PtrType,"int","int"]],
            'JLINK_JTAG_GetDeviceId': ["uint32",["uint"]],
            'JLINK_JTAG_GetU16': ["uint32",["int"]],
            'JLINK_JTAG_GetU32': ["uint32",["int"]],
            'JLINK_JTAG_GetU8': ["uint32",["int"]],
            'JLINK_JTAG_StoreData': ["int",[this.uint8PtrType,"int"]],
            'JLINK_JTAG_StoreGetData': ["void",[this.uint8PtrType,this.uint8PtrType,"int"]],
            'JLINK_JTAG_StoreGetRaw': ["void",[this.uint8PtrType,this.uint8PtrType,this.uint8PtrType,"uint32"]],
            'JLINK_JTAG_StoreInst': ["int",[this.uint8PtrType,"int"]],
            'JLINK_JTAG_StoreRaw': ["int",[this.uint8PtrType,this.uint8PtrType,"uint32"]],
            'JLINK_JTAG_SyncBits': ["void",[]],
            'JLINK_JTAG_SyncBytes': ["void",[]],
            'JLINK_JTAG_WriteData': ["int",[this.uint8PtrType,this.uint8PtrType,"int"]],
            'JLINK_Lock': ["void",[]],
            'JLINK_MeasureCPUSpeed': ["int",["uint32","int"]],
            'JLINK_MeasureCPUSpeedEx': ["int",["uint32","int","int"]],
            'JLINK_MeasureSCLen': ["int",["int"]],
            'JLINK_NET_Close': ["void",[]],
            'JLINK_NET_Open': ["int",[]],
            'JLINK_Open': ["string",[]],
            'JLINK_PCODE_GetCaps': ["int",[this.uint32PtrType]],
            'JLINK_PCODE_GetS32Version': ["int",[this.uint32PtrType]],
            'JLINK_POWERTRACE_Control': ["int",["uint32",this.voidPtrType,this.voidPtrType]],
            'JLINK_PrintConfig': ["int",["string","uint32",this.charPtrType,"uint32"]],
            'JLINK_RAWTRACE_Control': ["int",["uint32",this.voidPtrType]],
            'JLINK_RAWTRACE_Read': ["int",[this.uint8PtrType,"uint32"]],
            'JLINK_ReadCodeMem': ["int",["uint32","uint32",this.voidPtrType]],
            'JLINK_ReadConfigReg': ["int",["uint32",this.uint32PtrType]],
            'JLINK_ReadControlReg': ["int",["uint32",this.uint32PtrType]],
            'JLINK_ReadDCC': ["int",[this.uint32PtrType,"uint32","int"]],
            'JLINK_ReadDCCFast': ["void",[this.uint32PtrType,"uint32"]],
            'JLINK_ReadDebugPort': ["int",["uint32",this.uint32PtrType]],
            'JLINK_ReadDebugReg': ["int",["uint32",this.uint32PtrType]],
            'JLINK_ReadEmu': ["int",[this.voidPtrType,"uint32"]],
            'JLINK_ReadEmuConfigMem': ["int",[this.uint8PtrType,"uint32","uint32"]],
            'JLINK_ReadICEReg': ["uint32",["int"]],
            'JLINK_ReadMem': ["int",["uint32","uint32",this.voidPtrType]],
            'JLINK_ReadMemEx': ["int",["uint32","uint32",this.voidPtrType,"uint32"]],
            'JLINK_ReadMemEx_64': ["int",["uint64","uint32",this.voidPtrType,"uint32"]],
            'JLINK_ReadMemHW': ["int",["uint32","uint32",this.voidPtrType]],
            'JLINK_ReadMemIndirect': ["int",["uint32","uint32",this.voidPtrType]],
            'JLINK_ReadMemU16': ["int",["uint32","uint32",this.uint16PtrType,this.uint8PtrType]],
            'JLINK_ReadMemU16_64': ["int",["uint64","uint32",this.uint16PtrType,this.uint8PtrType]],
            'JLINK_ReadMemU32': ["int",["uint32","uint32",this.uint32PtrType,this.uint8PtrType]],
            'JLINK_ReadMemU32_64': ["int",["uint64","uint32",this.uint32PtrType,this.uint8PtrType]],
            'JLINK_ReadMemU64': ["int",["uint32","uint32",this.uint64PtrType,this.uint8PtrType]],
            'JLINK_ReadMemU64_64': ["int",["uint64","uint32",this.uint64PtrType,this.uint8PtrType]],
            'JLINK_ReadMemU8': ["int",["uint32","uint32",this.uint8PtrType,this.uint8PtrType]],
            'JLINK_ReadMemU8_64': ["int",["uint64","uint32",this.uint8PtrType,this.uint8PtrType]],
            'JLINK_ReadMemZonedEx': ["int",["uint32","uint32",this.voidPtrType,"uint32","string"]],
            'JLINK_ReadMemZonedEx_64': ["int",["uint64","uint32",this.voidPtrType,"uint32","string"]],
            'JLINK_ReadMemZonedU16': ["int",["uint32","uint32",this.uint16PtrType,this.uint8PtrType,"string"]],
            'JLINK_ReadMemZonedU16_64': ["int",["uint64","uint32",this.uint16PtrType,this.uint8PtrType,"string"]],
            'JLINK_ReadMemZonedU32': ["int",["uint32","uint32",this.uint32PtrType,this.uint8PtrType,"string"]],
            'JLINK_ReadMemZonedU32_64': ["int",["uint64","uint32",this.uint32PtrType,this.uint8PtrType,"string"]],
            'JLINK_ReadReg': ["uint32",["int"]],
            'JLINK_ReadRegs': ["int",[this.uint32PtrType,this.uint32PtrType,this.uint8PtrType,"uint32"]],
            'JLINK_ReadRegs_64': ["int",[this.uint32PtrType,this.uint64PtrType,this.uint8PtrType,"uint32"]],
            'JLINK_ReadTerminal': ["int",[this.uint8PtrType,"uint32"]],
            'JLINK_Reset': ["int",[]],
            'JLINK_ResetNoHalt': ["void",[]],
            'JLINK_ResetPullsRESET': ["void",["uint8"]],
            'JLINK_ResetPullsTRST': ["void",["uint8"]],
            'JLINK_ResetTRST': ["void",[]],
            'JLINK_RTTERMINAL_Control': ["int",["uint32",this.voidPtrType]],
            'JLINK_RTTERMINAL_Read': ["int",["uint32",this.charPtrType,"uint32"]],
            'JLINK_RTTERMINAL_Write': ["int",["uint32","string","uint32"]],
            'JLINK_SelectDeviceFamily': ["void",["int"]],
            'JLINK_SelectIP': ["char",["string","int"]],
            'JLINK_SelectTraceSource': ["void",["int"]],
            'JLINK_SelectUSB': ["char",["int"]],
            'JLINK_SetBP': ["void",["uint","uint32"]],
            'JLINK_SetBPEx': ["int",["uint32","uint32"]],
            'JLINK_SetBPEx_64': ["int",["uint64","uint32"]],
            'JLINK_SetDebugUnitBlockMask': ["void",["int","uint32"]],
            'JLINK_SetEndian': ["int",["int"]],
            'JLINK_SetInitRegsOnReset': ["int",["int"]],
            'JLINK_SetLogFile': ["void",["string"]],
            'JLINK_SetMaxSpeed': ["void",[]],
            'JLINK_SetRESET': ["void",[]],
            'JLINK_SetResetDelay': ["void",["int"]],
            'JLINK_SetResetPara': ["int",["int"]],
            'JLINK_SetResetType': ["int",["int"]],
            'JLINK_SetSpeed': ["void",["uint32"]],
            'JLINK_SetTCK': ["int",[]],
            'JLINK_SetTDI': ["void",[]],
            'JLINK_SetTMS': ["void",[]],
            'JLINK_SetTRST': ["void",[]],
            'JLINK_SetWP': ["int",["uint32","uint32","uint32","uint32","uint8","uint8"]],
            'JLINK_SimulateInstruction': ["char",["uint32"]],
            'JLINK_SPI_Transfer': ["int",[this.uint8PtrType,this.uint8PtrType,"uint32","uint32"]],
            'JLINK_Step': ["char",[]],
            'JLINK_StoreBits': ["void",["uint32","uint32","int"]],
            'JLINK_STRACE_Config': ["int",["string"]],
            'JLINK_STRACE_Control': ["int",["uint32",this.voidPtrType]],
            'JLINK_STRACE_GetInstStats': ["int",[this.voidPtrType,"uint32","uint32","uint32","uint32"]],
            'JLINK_STRACE_Read': ["int",[this.uint32PtrType,"uint32"]],
            'JLINK_STRACE_Start': ["int",[]],
            'JLINK_STRACE_Stop': ["int",[]],
            'JLINK_SWD_DisableSWCLK': ["int",[]],
            'JLINK_SWD_EnableSWCLK': ["int",[]],
            'JLINK_SWD_GetData': ["void",[this.uint8PtrType,"int","int"]],
            'JLINK_SWD_GetU16': ["uint32",["int"]],
            'JLINK_SWD_GetU32': ["uint32",["int"]],
            'JLINK_SWD_GetU8': ["uint32",["int"]],
            'JLINK_SWD_SetDirIn': ["int",[]],
            'JLINK_SWD_SetDirOut': ["int",[]],
            'JLINK_SWD_StoreGetRaw': ["void",[this.uint8PtrType,this.uint8PtrType,this.uint8PtrType,"uint32"]],
            'JLINK_SWD_StoreRaw': ["int",[this.uint8PtrType,this.uint8PtrType,"uint32"]],
            'JLINK_SWD_SyncBits': ["void",[]],
            'JLINK_SWD_SyncBytes': ["void",[]],
            'JLINK_SWO_Control': ["int",["uint32",this.voidPtrType]],
            'JLINK_SWO_Read': ["void",[this.uint8PtrType,"uint32",this.uint32PtrType]],
            'JLINK_Test': ["int",[]],
            'JLINK_TIF_GetAvailable': ["void",[this.uint32PtrType]],
            'JLINK_TIF_Select': ["int",["int"]],
            'JLINK_TRACE_Control': ["uint32",["uint32",this.uint32PtrType]],
            'JLINK_Unlock': ["void",[]],
            'JLINK_UpdateFirmware': ["uint16",[]],
            'JLINK_UpdateFirmwareIfNewer': ["uint32",[]],
            'JLINK_UpdateReplaceFirmware': ["int",["int","string"]],
            'JLINK_WA_AddRange': ["char",["uint32","uint32"]],
            'JLINK_WA_Restore': ["char",[]],
            'JLINK_WaitDCCRead': ["int",["int"]],
            'JLINK_WaitForHalt': ["int",["int"]],
            'JLINK_WriteConfigReg': ["int",["uint32","uint32"]],
            'JLINK_WriteControlReg': ["int",["uint32","uint32"]],
            'JLINK_WriteDCC': ["int",[this.uint32PtrType,"uint32","int"]],
            'JLINK_WriteDCCFast': ["void",[this.uint32PtrType,"uint32"]],
            'JLINK_WriteDebugPort': ["int",["uint32","uint32"]],
            'JLINK_WriteDebugReg': ["int",["uint32","uint32"]],
            'JLINK_WriteEmu': ["int",[this.voidPtrType,"uint32"]],
            'JLINK_WriteEmuConfigMem': ["int",[this.uint8PtrType,"uint32","uint32"]],
            'JLINK_WriteICEReg': ["void",["uint32","uint32","int"]],
            'JLINK_WriteMem': ["int",["uint32","uint32",this.voidPtrType]],
            'JLINK_WriteMemDelayed': ["int",["uint32","uint32",this.voidPtrType]],
            'JLINK_WriteMemEx': ["int",["uint32","uint32",this.voidPtrType,"uint32"]],
            'JLINK_WriteMemEx_64': ["int",["uint64","uint32",this.voidPtrType,"uint32"]],
            'JLINK_WriteMemHW': ["int",["uint32","uint32",this.voidPtrType]],
            'JLINK_WriteMemZonedEx': ["int",["uint32","uint32",this.voidPtrType,"uint32","string"]],
            'JLINK_WriteMemZonedEx_64': ["int",["uint64","uint32",this.voidPtrType,"uint32","string"]],
            'JLINK_WriteReg': ["char",["int","uint32"]],
            'JLINK_WriteRegs': ["int",[this.uint32PtrType,this.uint32PtrType,this.uint8PtrType,"uint32"]],
            'JLINK_WriteRegs_64': ["int",[this.uint32PtrType,this.uint64PtrType,this.uint8PtrType,"uint32"]],
            'JLINK_WriteU16': ["int",["uint32","uint16"]],
            'JLINK_WriteU16_64': ["int",["uint64","uint16"]],
            'JLINK_WriteU32': ["int",["uint32","uint32"]],
            'JLINK_WriteU32_64': ["int",["uint64","uint32"]],
            'JLINK_WriteU64': ["int",["uint32","uint64"]],
            'JLINK_WriteU64_64': ["int",["uint64","uint64"]],
            'JLINK_WriteU8': ["int",["uint32","uint8"]],
            'JLINK_WriteU8_64': ["int",["uint64","uint8"]],
            'JLINK_WriteVectorCatch': ["int",["uint32"]],
            'JLINK_WriteVerifyMem': ["int",["uint32","uint32",this.voidPtrType,"uint32"]],
            'JLINK_WriteZonedU16': ["int",["uint32","uint16","string"]],
            'JLINK_WriteZonedU16_64': ["int",["uint64","uint16","string"]],
            'JLINK_WriteZonedU32': ["int",["uint32","uint32","string"]],
            'JLINK_WriteZonedU32_64': ["int",["uint64","uint32","string"]],
        });
    }

    AddMirrorArea(Addr: number): void {
        
        this.jlink.JLINK_AddMirrorArea(Addr);
    }

    AddMirrorAreaEx(Addr: number, Size: number): void {
        
        this.jlink.JLINK_AddMirrorAreaEx(Addr, Size);
    }

    BeginDownload(Flags: number): void {
        
        this.jlink.JLINK_BeginDownload(Flags);
    }

    Clock(): number {
        
        return this.jlink.JLINK_Clock();
    }

    Close(): void {
        
        this.jlink.JLINK_Close();
    }

    ClrBP(BPIndex: number): void {
        
        this.jlink.JLINK_ClrBP(BPIndex);
    }

    ClrBPEx(BPHandle: number): number {
        
        return this.jlink.JLINK_ClrBPEx(BPHandle);
    }

    ClrDataEvent(Handle: number): number {
        
        return this.jlink.JLINK_ClrDataEvent(Handle);
    }

    ClrError(): void {
        
        this.jlink.JLINK_ClrError();
    }

    ClrExecTime(): void {
        
        this.jlink.JLINK_ClrExecTime();
    }

    ClrRESET(): void {
        
        this.jlink.JLINK_ClrRESET();
    }

    ClrTCK(): number {
        
        return this.jlink.JLINK_ClrTCK();
    }

    ClrTDI(): void {
        
        this.jlink.JLINK_ClrTDI();
    }

    ClrTMS(): void {
        
        this.jlink.JLINK_ClrTMS();
    }

    ClrTRST(): void {
        
        this.jlink.JLINK_ClrTRST();
    }

    ClrWP(WPHandle: number): number {
        
        return this.jlink.JLINK_ClrWP(WPHandle);
    }

    Communicate(pWrite: ffi_voidPtr, WrSize: number, pRead: ffi_voidPtr, RdSize: number): number {
        pWrite.type = ref.types.void;
        pRead.type = ref.types.void;
        return this.jlink.JLINK_Communicate(pWrite, WrSize, pRead, RdSize);
    }

    ConfigJTAG(IRPre: number, DRPre: number): void {
        
        this.jlink.JLINK_ConfigJTAG(IRPre, DRPre);
    }

    Configure(pConfig: string): number {
        
        return this.jlink.JLINK_Configure(pConfig);
    }

    Connect(): number {
        
        return this.jlink.JLINK_Connect();
    }

    CORE_GetFound(): number {
        
        return this.jlink.JLINK_CORE_GetFound();
    }

    CORE_Select(Core: number): void {
        
        this.jlink.JLINK_CORE_Select(Core);
    }

    CORESIGHT_Configure(sConfig: string): number {
        
        return this.jlink.JLINK_CORESIGHT_Configure(sConfig);
    }

    CORESIGHT_ReadAPDPReg(RegIndex: number, APnDP: number, pData: ffi_uint32Ptr): number {
        pData.type = ref.types.uint32;
        return this.jlink.JLINK_CORESIGHT_ReadAPDPReg(RegIndex, APnDP, pData);
    }

    CORESIGHT_WriteAPDPReg(RegIndex: number, APnDP: number, Data: number): number {
        
        return this.jlink.JLINK_CORESIGHT_WriteAPDPReg(RegIndex, APnDP, Data);
    }

    CP15_IsPresent(): number {
        
        return this.jlink.JLINK_CP15_IsPresent();
    }

    CP15_ReadEx(CRn: number, CRm: number, op1: number, op2: number, pData: ffi_uint32Ptr): number {
        pData.type = ref.types.uint32;
        return this.jlink.JLINK_CP15_ReadEx(CRn, CRm, op1, op2, pData);
    }

    CP15_ReadReg(RegIndex: number, pData: ffi_uint32Ptr): number {
        pData.type = ref.types.uint32;
        return this.jlink.JLINK_CP15_ReadReg(RegIndex, pData);
    }

    CP15_WriteEx(CRn: number, CRm: number, op1: number, op2: number, Data: number): number {
        
        return this.jlink.JLINK_CP15_WriteEx(CRn, CRm, op1, op2, Data);
    }

    CP15_WriteReg(RegIndex: number, Data: number): number {
        
        return this.jlink.JLINK_CP15_WriteReg(RegIndex, Data);
    }

    DEVICE_GetIndex(sDeviceName: string): number {
        
        return this.jlink.JLINK_DEVICE_GetIndex(sDeviceName);
    }

    DIALOG_Configure(pConfigIn: string, pConfigOut: ffi_charPtr, BufferSize: number): number {
        pConfigOut.type = ref.types.char;
        return this.jlink.JLINK_DIALOG_Configure(pConfigIn, pConfigOut, BufferSize);
    }

    DIALOG_ConfigureEx(hParent: ffi_voidPtr, Mask: number, pConfigIn: string, pConfigOut: ffi_charPtr, BufferSize: number): number {
        hParent.type = ref.types.void;
        pConfigOut.type = ref.types.char;
        return this.jlink.JLINK_DIALOG_ConfigureEx(hParent, Mask, pConfigIn, pConfigOut, BufferSize);
    }

    DownloadECode(pECode: ffi_uint8Ptr, NumBytes: number): void {
        pECode.type = ref.types.uint8;
        this.jlink.JLINK_DownloadECode(pECode, NumBytes);
    }

    DownloadFile(sFileName: string, Addr: number): number {
        
        return this.jlink.JLINK_DownloadFile(sFileName, Addr);
    }

    EMU_AddLicense(sLic: string): number {
        
        return this.jlink.JLINK_EMU_AddLicense(sLic);
    }

    EMU_COM_IsSupported(): number {
        
        return this.jlink.JLINK_EMU_COM_IsSupported();
    }

    EMU_COM_Read(Channel: number, NumBytes: number, pData: ffi_voidPtr): number {
        pData.type = ref.types.void;
        return this.jlink.JLINK_EMU_COM_Read(Channel, NumBytes, pData);
    }

    EMU_COM_Write(Channel: number, NumBytes: number, pData: ffi_voidPtr): number {
        pData.type = ref.types.void;
        return this.jlink.JLINK_EMU_COM_Write(Channel, NumBytes, pData);
    }

    EMU_EraseLicenses(): number {
        
        return this.jlink.JLINK_EMU_EraseLicenses();
    }

    EMU_FILE_Delete(sFile: string): number {
        
        return this.jlink.JLINK_EMU_FILE_Delete(sFile);
    }

    EMU_FILE_GetList(sFile: string, pBuffer: ffi_charPtr, BufferSize: number): number {
        pBuffer.type = ref.types.char;
        return this.jlink.JLINK_EMU_FILE_GetList(sFile, pBuffer, BufferSize);
    }

    EMU_FILE_GetSize(sFile: string): number {
        
        return this.jlink.JLINK_EMU_FILE_GetSize(sFile);
    }

    EMU_FILE_Read(sFile: string, pData: ffi_uint8Ptr, Offset: number, NumBytes: number): number {
        pData.type = ref.types.uint8;
        return this.jlink.JLINK_EMU_FILE_Read(sFile, pData, Offset, NumBytes);
    }

    EMU_FILE_Write(sFile: string, pData: ffi_uint8Ptr, Offset: number, NumBytes: number): number {
        pData.type = ref.types.uint8;
        return this.jlink.JLINK_EMU_FILE_Write(sFile, pData, Offset, NumBytes);
    }

    EMU_GetCounters(BitMask: number, pCounters: ffi_uint32Ptr): number {
        pCounters.type = ref.types.uint32;
        return this.jlink.JLINK_EMU_GetCounters(BitMask, pCounters);
    }

    EMU_GetLicenses(pBuffer: ffi_charPtr, BufferSize: number): number {
        pBuffer.type = ref.types.char;
        return this.jlink.JLINK_EMU_GetLicenses(pBuffer, BufferSize);
    }

    EMU_GetMaxMemBlock(): number {
        
        return this.jlink.JLINK_EMU_GetMaxMemBlock();
    }

    EMU_GetNumConnections(): number {
        
        return this.jlink.JLINK_EMU_GetNumConnections();
    }

    EMU_GetNumDevices(): number {
        
        return this.jlink.JLINK_EMU_GetNumDevices();
    }

    EMU_GetProductId(): number {
        
        return this.jlink.JLINK_EMU_GetProductId();
    }

    EMU_GetProductName(pBuffer: ffi_charPtr, BufferSize: number): void {
        pBuffer.type = ref.types.char;
        this.jlink.JLINK_EMU_GetProductName(pBuffer, BufferSize);
    }

    EMU_GPIO_GetState(paIndex: ffi_uint8Ptr, paResult: ffi_uint8Ptr, NumPorts: number): number {
        paIndex.type = ref.types.uint8;
        paResult.type = ref.types.uint8;
        return this.jlink.JLINK_EMU_GPIO_GetState(paIndex, paResult, NumPorts);
    }

    EMU_GPIO_SetState(paIndex: ffi_uint8Ptr, paState: ffi_uint8Ptr, paResult: ffi_uint8Ptr, NumPorts: number): number {
        paIndex.type = ref.types.uint8;
        paState.type = ref.types.uint8;
        paResult.type = ref.types.uint8;
        return this.jlink.JLINK_EMU_GPIO_SetState(paIndex, paState, paResult, NumPorts);
    }

    EMU_HasCapEx(CapEx: number): number {
        
        return this.jlink.JLINK_EMU_HasCapEx(CapEx);
    }

    EMU_HasCPUCap(CPUCap: number): number {
        
        return this.jlink.JLINK_EMU_HasCPUCap(CPUCap);
    }

    EMU_IsConnected(): number {
        
        return this.jlink.JLINK_EMU_IsConnected();
    }

    EMU_SelectByIndex(iEmu: number): number {
        
        return this.jlink.JLINK_EMU_SelectByIndex(iEmu);
    }

    EMU_SelectByUSBSN(SerialNo: number): number {
        
        return this.jlink.JLINK_EMU_SelectByUSBSN(SerialNo);
    }

    EMU_SelectIP(pIPAddr: ffi_charPtr, BufferSize: number, pPort: ffi_uint16Ptr): number {
        pIPAddr.type = ref.types.char;
        pPort.type = ref.types.uint16;
        return this.jlink.JLINK_EMU_SelectIP(pIPAddr, BufferSize, pPort);
    }

    EMU_SelectIPBySN(SerialNo: number): void {
        
        this.jlink.JLINK_EMU_SelectIPBySN(SerialNo);
    }

    EMU_TestNRSpeed(NumReps: number, NumBytes: number): number {
        
        return this.jlink.JLINK_EMU_TestNRSpeed(NumReps, NumBytes);
    }

    EMU_TestNWSpeed(NumReps: number, NumBytes: number): number {
        
        return this.jlink.JLINK_EMU_TestNWSpeed(NumReps, NumBytes);
    }

    EnableCheckModeAfterWrite(OnOff: number): number {
        
        return this.jlink.JLINK_EnableCheckModeAfterWrite(OnOff);
    }

    EnableFlashCache(Enable: number): void {
        
        this.jlink.JLINK_EnableFlashCache(Enable);
    }

    EnablePerformanceCnt(Index: number, OnOff: number): void {
        
        this.jlink.JLINK_EnablePerformanceCnt(Index, OnOff);
    }

    EnableSoftBPs(Enable: number): void {
        
        this.jlink.JLINK_EnableSoftBPs(Enable);
    }

    EndDownload(): number {
        
        return this.jlink.JLINK_EndDownload();
    }

    EraseChip(): number {
        
        return this.jlink.JLINK_EraseChip();
    }

    ETB_IsPresent(): number {
        
        return this.jlink.JLINK_ETB_IsPresent();
    }

    ETB_ReadReg(RegIndex: number): number {
        
        return this.jlink.JLINK_ETB_ReadReg(RegIndex);
    }

    ETB_WriteReg(RegIndex: number, Data: number, AllowDelay: number): void {
        
        this.jlink.JLINK_ETB_WriteReg(RegIndex, Data, AllowDelay);
    }

    ETM_IsPresent(): number {
        
        return this.jlink.JLINK_ETM_IsPresent();
    }

    ETM_ReadReg(Reg: number): number {
        
        return this.jlink.JLINK_ETM_ReadReg(Reg);
    }

    ETM_StartTrace(): void {
        
        this.jlink.JLINK_ETM_StartTrace();
    }

    ETM_WriteReg(Reg: number, Data: number, AllowDelay: number): void {
        
        this.jlink.JLINK_ETM_WriteReg(Reg, Data, AllowDelay);
    }

    ExecCommand(pIn: string, pOut: ffi_charPtr, BufferSize: number): number {
        pOut.type = ref.types.char;
        return this.jlink.JLINK_ExecCommand(pIn, pOut, BufferSize);
    }

    ExecECode(): void {
        
        this.jlink.JLINK_ExecECode();
    }

    FindBP(Addr: number): number {
        
        return this.jlink.JLINK_FindBP(Addr);
    }

    GetAvailableLicense(pBuffer: ffi_charPtr, BufferSize: number): number {
        pBuffer.type = ref.types.char;
        return this.jlink.JLINK_GetAvailableLicense(pBuffer, BufferSize);
    }

    GetCompileDateTime(): string {
        
        return this.jlink.JLINK_GetCompileDateTime();
    }

    GetConfigData(pIRPre: ffi_intPtr, pDRPre: ffi_intPtr): void {
        pIRPre.type = ref.types.int;
        pDRPre.type = ref.types.int;
        this.jlink.JLINK_GetConfigData(pIRPre, pDRPre);
    }

    GetDebugInfo(Index: number, pInfo: ffi_uint32Ptr): number {
        pInfo.type = ref.types.uint32;
        return this.jlink.JLINK_GetDebugInfo(Index, pInfo);
    }

    GetDeviceFamily(): number {
        
        return this.jlink.JLINK_GetDeviceFamily();
    }

    GetDLLVersion(): number {
        
        return this.jlink.JLINK_GetDLLVersion();
    }

    GetEmbeddedFWString(sFWId: string, pBuffer: ffi_charPtr, BufferSize: number): number {
        pBuffer.type = ref.types.char;
        return this.jlink.JLINK_GetEmbeddedFWString(sFWId, pBuffer, BufferSize);
    }

    GetEmuCaps(): number {
        
        return this.jlink.JLINK_GetEmuCaps();
    }

    GetEmuCapsEx(pCaps: ffi_uint8Ptr, BufferSize: number): void {
        pCaps.type = ref.types.uint8;
        this.jlink.JLINK_GetEmuCapsEx(pCaps, BufferSize);
    }

    GetExecTime(pExecTimeLow: ffi_uint32Ptr, pExecTimeHigh: ffi_uint32Ptr): void {
        pExecTimeLow.type = ref.types.uint32;
        pExecTimeHigh.type = ref.types.uint32;
        this.jlink.JLINK_GetExecTime(pExecTimeLow, pExecTimeHigh);
    }

    GetFeatureString(pOut: string): void {
        
        this.jlink.JLINK_GetFeatureString(pOut);
    }

    GetFirmwareString(s: ffi_charPtr, BufferSize: number): void {
        s.type = ref.types.char;
        this.jlink.JLINK_GetFirmwareString(s, BufferSize);
    }

    GetHardwareVersion(): number {
        
        return this.jlink.JLINK_GetHardwareVersion();
    }

    GetHWInfo(BitMask: number, pHWInfo: ffi_uint32Ptr): number {
        pHWInfo.type = ref.types.uint32;
        return this.jlink.JLINK_GetHWInfo(BitMask, pHWInfo);
    }

    GetId(): number {
        
        return this.jlink.JLINK_GetId();
    }

    GetIRLen(): number {
        
        return this.jlink.JLINK_GetIRLen();
    }

    GetNumBPs(): number {
        
        return this.jlink.JLINK_GetNumBPs();
    }

    GetNumBPUnits(Type: number): number {
        
        return this.jlink.JLINK_GetNumBPUnits(Type);
    }

    GetNumWPs(): number {
        
        return this.jlink.JLINK_GetNumWPs();
    }

    GetNumWPUnits(): number {
        
        return this.jlink.JLINK_GetNumWPUnits();
    }

    GetOEMString(pOut: string): number {
        
        return this.jlink.JLINK_GetOEMString(pOut);
    }

    GetPCode(PCodeIndex: number, pNumBytes: ffi_uint32Ptr): ffi_uint8Ptr {
        pNumBytes.type = ref.types.uint32;
        return this.jlink.JLINK_GetPCode(PCodeIndex, pNumBytes);
    }

    GetPerformanceCnt(Index: number): number {
        
        return this.jlink.JLINK_GetPerformanceCnt(Index);
    }

    GetpSharedMem(): ffi_voidPtr {
        
        return this.jlink.JLINK_GetpSharedMem();
    }

    GetRegisterList(paList: ffi_uint32Ptr, MaxNumItems: number): number {
        paList.type = ref.types.uint32;
        return this.jlink.JLINK_GetRegisterList(paList, MaxNumItems);
    }

    GetRegisterName(RegIndex: number): string {
        
        return this.jlink.JLINK_GetRegisterName(RegIndex);
    }

    GetScanLen(): number {
        
        return this.jlink.JLINK_GetScanLen();
    }

    GetSelDevice(): number {
        
        return this.jlink.JLINK_GetSelDevice();
    }

    GetSN(): number {
        
        return this.jlink.JLINK_GetSN();
    }

    GetSpeed(): number {
        
        return this.jlink.JLINK_GetSpeed();
    }

    Go(): void {
        
        this.jlink.JLINK_Go();
    }

    GoAllowSim(NumInsts: number): void {
        
        this.jlink.JLINK_GoAllowSim(NumInsts);
    }

    GoEx(MaxEmulInsts: number, Flags: number): void {
        
        this.jlink.JLINK_GoEx(MaxEmulInsts, Flags);
    }

    GoHalt(NumClocks: number): number {
        
        return this.jlink.JLINK_GoHalt(NumClocks);
    }

    GoIntDis(): void {
        
        this.jlink.JLINK_GoIntDis();
    }

    Halt(): number {
        
        return this.jlink.JLINK_Halt();
    }

    HasError(): number {
        
        return this.jlink.JLINK_HasError();
    }

    HSS_Read(pBuffer: ffi_voidPtr, BufferSize: number): number {
        pBuffer.type = ref.types.void;
        return this.jlink.JLINK_HSS_Read(pBuffer, BufferSize);
    }

    HSS_Stop(): number {
        
        return this.jlink.JLINK_HSS_Stop();
    }

    IsConnected(): number {
        
        return this.jlink.JLINK_IsConnected();
    }

    IsHalted(): number {
        
        return this.jlink.JLINK_IsHalted();
    }

    IsOpen(): number {
        
        return this.jlink.JLINK_IsOpen();
    }

    JTAG_DisableIF(): number {
        
        return this.jlink.JLINK_JTAG_DisableIF();
    }

    JTAG_EnableIF(): number {
        
        return this.jlink.JLINK_JTAG_EnableIF();
    }

    JTAG_GetData(pTDO: ffi_uint8Ptr, BitPos: number, NumBits: number): void {
        pTDO.type = ref.types.uint8;
        this.jlink.JLINK_JTAG_GetData(pTDO, BitPos, NumBits);
    }

    JTAG_GetDeviceId(DeviceIndex: number): number {
        
        return this.jlink.JLINK_JTAG_GetDeviceId(DeviceIndex);
    }

    JTAG_GetU16(BitPos: number): number {
        
        return this.jlink.JLINK_JTAG_GetU16(BitPos);
    }

    JTAG_GetU32(BitPos: number): number {
        
        return this.jlink.JLINK_JTAG_GetU32(BitPos);
    }

    JTAG_GetU8(BitPos: number): number {
        
        return this.jlink.JLINK_JTAG_GetU8(BitPos);
    }

    JTAG_StoreData(pTDI: ffi_uint8Ptr, NumBits: number): number {
        pTDI.type = ref.types.uint8;
        return this.jlink.JLINK_JTAG_StoreData(pTDI, NumBits);
    }

    JTAG_StoreGetData(pTDI: ffi_uint8Ptr, pTDO: ffi_uint8Ptr, NumBits: number): void {
        pTDI.type = ref.types.uint8;
        pTDO.type = ref.types.uint8;
        this.jlink.JLINK_JTAG_StoreGetData(pTDI, pTDO, NumBits);
    }

    JTAG_StoreGetRaw(pTDI: ffi_uint8Ptr, pTDO: ffi_uint8Ptr, pTMS: ffi_uint8Ptr, NumBits: number): void {
        pTDI.type = ref.types.uint8;
        pTDO.type = ref.types.uint8;
        pTMS.type = ref.types.uint8;
        this.jlink.JLINK_JTAG_StoreGetRaw(pTDI, pTDO, pTMS, NumBits);
    }

    JTAG_StoreInst(pTDI: ffi_uint8Ptr, NumBits: number): number {
        pTDI.type = ref.types.uint8;
        return this.jlink.JLINK_JTAG_StoreInst(pTDI, NumBits);
    }

    JTAG_StoreRaw(pTDI: ffi_uint8Ptr, pTMS: ffi_uint8Ptr, NumBits: number): number {
        pTDI.type = ref.types.uint8;
        pTMS.type = ref.types.uint8;
        return this.jlink.JLINK_JTAG_StoreRaw(pTDI, pTMS, NumBits);
    }

    JTAG_SyncBits(): void {
        
        this.jlink.JLINK_JTAG_SyncBits();
    }

    JTAG_SyncBytes(): void {
        
        this.jlink.JLINK_JTAG_SyncBytes();
    }

    JTAG_WriteData(pTDI: ffi_uint8Ptr, pTDO: ffi_uint8Ptr, NumBits: number): number {
        pTDI.type = ref.types.uint8;
        pTDO.type = ref.types.uint8;
        return this.jlink.JLINK_JTAG_WriteData(pTDI, pTDO, NumBits);
    }

    Lock(): void {
        
        this.jlink.JLINK_Lock();
    }

    MeasureCPUSpeed(RAMAddr: number, PreserveMem: number): number {
        
        return this.jlink.JLINK_MeasureCPUSpeed(RAMAddr, PreserveMem);
    }

    MeasureCPUSpeedEx(RAMAddr: number, PreserveMem: number, AllowFail: number): number {
        
        return this.jlink.JLINK_MeasureCPUSpeedEx(RAMAddr, PreserveMem, AllowFail);
    }

    MeasureSCLen(ScanChain: number): number {
        
        return this.jlink.JLINK_MeasureSCLen(ScanChain);
    }

    NET_Close(): void {
        
        this.jlink.JLINK_NET_Close();
    }

    NET_Open(): number {
        
        return this.jlink.JLINK_NET_Open();
    }

    Open(): string {
        
        return this.jlink.JLINK_Open();
    }

    PCODE_GetCaps(pCaps: ffi_uint32Ptr): number {
        pCaps.type = ref.types.uint32;
        return this.jlink.JLINK_PCODE_GetCaps(pCaps);
    }

    PCODE_GetS32Version(pVersion: ffi_uint32Ptr): number {
        pVersion.type = ref.types.uint32;
        return this.jlink.JLINK_PCODE_GetS32Version(pVersion);
    }

    POWERTRACE_Control(Cmd: number, pIn: ffi_voidPtr, pOut: ffi_voidPtr): number {
        pIn.type = ref.types.void;
        pOut.type = ref.types.void;
        return this.jlink.JLINK_POWERTRACE_Control(Cmd, pIn, pOut);
    }

    PrintConfig(pConfig: string, Mask: number, pBuffer: ffi_charPtr, BufferSize: number): number {
        pBuffer.type = ref.types.char;
        return this.jlink.JLINK_PrintConfig(pConfig, Mask, pBuffer, BufferSize);
    }

    RAWTRACE_Control(Cmd: number, pData: ffi_voidPtr): number {
        pData.type = ref.types.void;
        return this.jlink.JLINK_RAWTRACE_Control(Cmd, pData);
    }

    RAWTRACE_Read(pData: ffi_uint8Ptr, NumBytes: number): number {
        pData.type = ref.types.uint8;
        return this.jlink.JLINK_RAWTRACE_Read(pData, NumBytes);
    }

    ReadCodeMem(Addr: number, NumBytes: number, pData: ffi_voidPtr): number {
        pData.type = ref.types.void;
        return this.jlink.JLINK_ReadCodeMem(Addr, NumBytes, pData);
    }

    ReadConfigReg(RegIndex: number, pData: ffi_uint32Ptr): number {
        pData.type = ref.types.uint32;
        return this.jlink.JLINK_ReadConfigReg(RegIndex, pData);
    }

    ReadControlReg(RegIndex: number, pData: ffi_uint32Ptr): number {
        pData.type = ref.types.uint32;
        return this.jlink.JLINK_ReadControlReg(RegIndex, pData);
    }

    ReadDCC(pData: ffi_uint32Ptr, NumItems: number, TimeOut: number): number {
        pData.type = ref.types.uint32;
        return this.jlink.JLINK_ReadDCC(pData, NumItems, TimeOut);
    }

    ReadDCCFast(pData: ffi_uint32Ptr, NumItems: number): void {
        pData.type = ref.types.uint32;
        this.jlink.JLINK_ReadDCCFast(pData, NumItems);
    }

    ReadDebugPort(RegIndex: number, pData: ffi_uint32Ptr): number {
        pData.type = ref.types.uint32;
        return this.jlink.JLINK_ReadDebugPort(RegIndex, pData);
    }

    ReadDebugReg(RegIndex: number, pData: ffi_uint32Ptr): number {
        pData.type = ref.types.uint32;
        return this.jlink.JLINK_ReadDebugReg(RegIndex, pData);
    }

    ReadEmu(p: ffi_voidPtr, NumBytes: number): number {
        p.type = ref.types.void;
        return this.jlink.JLINK_ReadEmu(p, NumBytes);
    }

    ReadEmuConfigMem(p: ffi_uint8Ptr, Off: number, NumBytes: number): number {
        p.type = ref.types.uint8;
        return this.jlink.JLINK_ReadEmuConfigMem(p, Off, NumBytes);
    }

    ReadICEReg(RegIndex: number): number {
        
        return this.jlink.JLINK_ReadICEReg(RegIndex);
    }

    ReadMem(Addr: number, NumBytes: number, pData: ffi_voidPtr): number {
        pData.type = ref.types.void;
        return this.jlink.JLINK_ReadMem(Addr, NumBytes, pData);
    }

    ReadMemEx(Addr: number, NumBytes: number, pData: ffi_voidPtr, AccessWidth: number): number {
        pData.type = ref.types.void;
        return this.jlink.JLINK_ReadMemEx(Addr, NumBytes, pData, AccessWidth);
    }

    ReadMemEx_64(Addr: number, NumBytes: number, pData: ffi_voidPtr, Flags: number): number {
        pData.type = ref.types.void;
        return this.jlink.JLINK_ReadMemEx_64(Addr, NumBytes, pData, Flags);
    }

    ReadMemHW(Addr: number, Count: number, pData: ffi_voidPtr): number {
        pData.type = ref.types.void;
        return this.jlink.JLINK_ReadMemHW(Addr, Count, pData);
    }

    ReadMemIndirect(Addr: number, NumBytes: number, pData: ffi_voidPtr): number {
        pData.type = ref.types.void;
        return this.jlink.JLINK_ReadMemIndirect(Addr, NumBytes, pData);
    }

    ReadMemU16(Addr: number, NumItems: number, pData: ffi_uint16Ptr, pStatus: ffi_uint8Ptr): number {
        pData.type = ref.types.uint16;
        pStatus.type = ref.types.uint8;
        return this.jlink.JLINK_ReadMemU16(Addr, NumItems, pData, pStatus);
    }

    ReadMemU16_64(Addr: number, NumItems: number, pData: ffi_uint16Ptr, pStatus: ffi_uint8Ptr): number {
        pData.type = ref.types.uint16;
        pStatus.type = ref.types.uint8;
        return this.jlink.JLINK_ReadMemU16_64(Addr, NumItems, pData, pStatus);
    }

    ReadMemU32(Addr: number, NumItems: number, pData: ffi_uint32Ptr, pStatus: ffi_uint8Ptr): number {
        pData.type = ref.types.uint32;
        pStatus.type = ref.types.uint8;
        return this.jlink.JLINK_ReadMemU32(Addr, NumItems, pData, pStatus);
    }

    ReadMemU32_64(Addr: number, NumItems: number, pData: ffi_uint32Ptr, pStatus: ffi_uint8Ptr): number {
        pData.type = ref.types.uint32;
        pStatus.type = ref.types.uint8;
        return this.jlink.JLINK_ReadMemU32_64(Addr, NumItems, pData, pStatus);
    }

    ReadMemU64(Addr: number, NumItems: number, pData: ffi_uint64Ptr, pStatus: ffi_uint8Ptr): number {
        pData.type = ref.types.uint64;
        pStatus.type = ref.types.uint8;
        return this.jlink.JLINK_ReadMemU64(Addr, NumItems, pData, pStatus);
    }

    ReadMemU64_64(Addr: number, NumItems: number, pData: ffi_uint64Ptr, pStatus: ffi_uint8Ptr): number {
        pData.type = ref.types.uint64;
        pStatus.type = ref.types.uint8;
        return this.jlink.JLINK_ReadMemU64_64(Addr, NumItems, pData, pStatus);
    }

    ReadMemU8(Addr: number, NumItems: number, pData: ffi_uint8Ptr, pStatus: ffi_uint8Ptr): number {
        pData.type = ref.types.uint8;
        pStatus.type = ref.types.uint8;
        return this.jlink.JLINK_ReadMemU8(Addr, NumItems, pData, pStatus);
    }

    ReadMemU8_64(Addr: number, NumItems: number, pData: ffi_uint8Ptr, pStatus: ffi_uint8Ptr): number {
        pData.type = ref.types.uint8;
        pStatus.type = ref.types.uint8;
        return this.jlink.JLINK_ReadMemU8_64(Addr, NumItems, pData, pStatus);
    }

    ReadMemZonedEx(Addr: number, NumBytes: number, pData: ffi_voidPtr, Flags: number, sZone: string): number {
        pData.type = ref.types.void;
        return this.jlink.JLINK_ReadMemZonedEx(Addr, NumBytes, pData, Flags, sZone);
    }

    ReadMemZonedEx_64(Addr: number, NumBytes: number, pData: ffi_voidPtr, Flags: number, sZone: string): number {
        pData.type = ref.types.void;
        return this.jlink.JLINK_ReadMemZonedEx_64(Addr, NumBytes, pData, Flags, sZone);
    }

    ReadMemZonedU16(Addr: number, NumItems: number, pData: ffi_uint16Ptr, pStatus: ffi_uint8Ptr, sZone: string): number {
        pData.type = ref.types.uint16;
        pStatus.type = ref.types.uint8;
        return this.jlink.JLINK_ReadMemZonedU16(Addr, NumItems, pData, pStatus, sZone);
    }

    ReadMemZonedU16_64(Addr: number, NumItems: number, pData: ffi_uint16Ptr, pStatus: ffi_uint8Ptr, sZone: string): number {
        pData.type = ref.types.uint16;
        pStatus.type = ref.types.uint8;
        return this.jlink.JLINK_ReadMemZonedU16_64(Addr, NumItems, pData, pStatus, sZone);
    }

    ReadMemZonedU32(Addr: number, NumItems: number, pData: ffi_uint32Ptr, pStatus: ffi_uint8Ptr, sZone: string): number {
        pData.type = ref.types.uint32;
        pStatus.type = ref.types.uint8;
        return this.jlink.JLINK_ReadMemZonedU32(Addr, NumItems, pData, pStatus, sZone);
    }

    ReadMemZonedU32_64(Addr: number, NumItems: number, pData: ffi_uint32Ptr, pStatus: ffi_uint8Ptr, sZone: string): number {
        pData.type = ref.types.uint32;
        pStatus.type = ref.types.uint8;
        return this.jlink.JLINK_ReadMemZonedU32_64(Addr, NumItems, pData, pStatus, sZone);
    }

    ReadReg(RegIndex: number): number {
        
        return this.jlink.JLINK_ReadReg(RegIndex);
    }

    ReadRegs(paRegIndex: ffi_uint32Ptr, paData: ffi_uint32Ptr, paStatus: ffi_uint8Ptr, NumRegs: number): number {
        paRegIndex.type = ref.types.uint32;
        paData.type = ref.types.uint32;
        paStatus.type = ref.types.uint8;
        return this.jlink.JLINK_ReadRegs(paRegIndex, paData, paStatus, NumRegs);
    }

    ReadRegs_64(paRegIndex: ffi_uint32Ptr, paData: ffi_uint64Ptr, paStatus: ffi_uint8Ptr, NumRegs: number): number {
        paRegIndex.type = ref.types.uint32;
        paData.type = ref.types.uint64;
        paStatus.type = ref.types.uint8;
        return this.jlink.JLINK_ReadRegs_64(paRegIndex, paData, paStatus, NumRegs);
    }

    ReadTerminal(pBuffer: ffi_uint8Ptr, BufferSize: number): number {
        pBuffer.type = ref.types.uint8;
        return this.jlink.JLINK_ReadTerminal(pBuffer, BufferSize);
    }

    Reset(): number {
        
        return this.jlink.JLINK_Reset();
    }

    ResetNoHalt(): void {
        
        this.jlink.JLINK_ResetNoHalt();
    }

    ResetPullsRESET(OnOff: number): void {
        
        this.jlink.JLINK_ResetPullsRESET(OnOff);
    }

    ResetPullsTRST(OnOff: number): void {
        
        this.jlink.JLINK_ResetPullsTRST(OnOff);
    }

    ResetTRST(): void {
        
        this.jlink.JLINK_ResetTRST();
    }

    RTTERMINAL_Control(Cmd: number, p: ffi_voidPtr): number {
        p.type = ref.types.void;
        return this.jlink.JLINK_RTTERMINAL_Control(Cmd, p);
    }

    RTTERMINAL_Read(BufferIndex: number, sBuffer: ffi_charPtr, BufferSize: number): number {
        sBuffer.type = ref.types.char;
        return this.jlink.JLINK_RTTERMINAL_Read(BufferIndex, sBuffer, BufferSize);
    }

    RTTERMINAL_Write(BufferIndex: number, sBuffer: string, BufferSize: number): number {
        
        return this.jlink.JLINK_RTTERMINAL_Write(BufferIndex, sBuffer, BufferSize);
    }

    SelectDeviceFamily(DeviceFamily: number): void {
        
        this.jlink.JLINK_SelectDeviceFamily(DeviceFamily);
    }

    SelectIP(sHost: string, Port: number): number {
        
        return this.jlink.JLINK_SelectIP(sHost, Port);
    }

    SelectTraceSource(Source: number): void {
        
        this.jlink.JLINK_SelectTraceSource(Source);
    }

    SelectUSB(Port: number): number {
        
        return this.jlink.JLINK_SelectUSB(Port);
    }

    SetBP(BPIndex: number, Addr: number): void {
        
        this.jlink.JLINK_SetBP(BPIndex, Addr);
    }

    SetBPEx(Addr: number, Type: number): number {
        
        return this.jlink.JLINK_SetBPEx(Addr, Type);
    }

    SetBPEx_64(Addr: number, TypeFlags: number): number {
        
        return this.jlink.JLINK_SetBPEx_64(Addr, TypeFlags);
    }

    SetDebugUnitBlockMask(Type: number, Mask: number): void {
        
        this.jlink.JLINK_SetDebugUnitBlockMask(Type, Mask);
    }

    SetEndian(v: number): number {
        
        return this.jlink.JLINK_SetEndian(v);
    }

    SetInitRegsOnReset(v: number): number {
        
        return this.jlink.JLINK_SetInitRegsOnReset(v);
    }

    SetLogFile(sFilename: string): void {
        
        this.jlink.JLINK_SetLogFile(sFilename);
    }

    SetMaxSpeed(): void {
        
        this.jlink.JLINK_SetMaxSpeed();
    }

    SetRESET(): void {
        
        this.jlink.JLINK_SetRESET();
    }

    SetResetDelay(ms: number): void {
        
        this.jlink.JLINK_SetResetDelay(ms);
    }

    SetResetPara(Value: number): number {
        
        return this.jlink.JLINK_SetResetPara(Value);
    }

    SetResetType(ResetType: number): number {
        
        return this.jlink.JLINK_SetResetType(ResetType);
    }

    SetSpeed(Speed: number): void {
        
        this.jlink.JLINK_SetSpeed(Speed);
    }

    SetTCK(): number {
        
        return this.jlink.JLINK_SetTCK();
    }

    SetTDI(): void {
        
        this.jlink.JLINK_SetTDI();
    }

    SetTMS(): void {
        
        this.jlink.JLINK_SetTMS();
    }

    SetTRST(): void {
        
        this.jlink.JLINK_SetTRST();
    }

    SetWP(Addr: number, AddrMask: number, Data: number, DataMask: number, Ctrl: number, CtrlMask: number): number {
        
        return this.jlink.JLINK_SetWP(Addr, AddrMask, Data, DataMask, Ctrl, CtrlMask);
    }

    SimulateInstruction(Inst: number): number {
        
        return this.jlink.JLINK_SimulateInstruction(Inst);
    }

    SPI_Transfer(pDataDown: ffi_uint8Ptr, pDataUp: ffi_uint8Ptr, NumBits: number, Flags: number): number {
        pDataDown.type = ref.types.uint8;
        pDataUp.type = ref.types.uint8;
        return this.jlink.JLINK_SPI_Transfer(pDataDown, pDataUp, NumBits, Flags);
    }

    Step(): number {
        
        return this.jlink.JLINK_Step();
    }

    StoreBits(TMS: number, TDI: number, NumBits: number): void {
        
        this.jlink.JLINK_StoreBits(TMS, TDI, NumBits);
    }

    STRACE_Config(sConfig: string): number {
        
        return this.jlink.JLINK_STRACE_Config(sConfig);
    }

    STRACE_Control(Cmd: number, pData: ffi_voidPtr): number {
        pData.type = ref.types.void;
        return this.jlink.JLINK_STRACE_Control(Cmd, pData);
    }

    STRACE_GetInstStats(paItem: ffi_voidPtr, Addr: number, NumItems: number, SizeOfStruct: number, Type: number): number {
        paItem.type = ref.types.void;
        return this.jlink.JLINK_STRACE_GetInstStats(paItem, Addr, NumItems, SizeOfStruct, Type);
    }

    STRACE_Read(paItem: ffi_uint32Ptr, NumItems: number): number {
        paItem.type = ref.types.uint32;
        return this.jlink.JLINK_STRACE_Read(paItem, NumItems);
    }

    STRACE_Start(): number {
        
        return this.jlink.JLINK_STRACE_Start();
    }

    STRACE_Stop(): number {
        
        return this.jlink.JLINK_STRACE_Stop();
    }

    SWD_DisableSWCLK(): number {
        
        return this.jlink.JLINK_SWD_DisableSWCLK();
    }

    SWD_EnableSWCLK(): number {
        
        return this.jlink.JLINK_SWD_EnableSWCLK();
    }

    SWD_GetData(pOut: ffi_uint8Ptr, BitPos: number, NumBits: number): void {
        pOut.type = ref.types.uint8;
        this.jlink.JLINK_SWD_GetData(pOut, BitPos, NumBits);
    }

    SWD_GetU16(BitPos: number): number {
        
        return this.jlink.JLINK_SWD_GetU16(BitPos);
    }

    SWD_GetU32(BitPos: number): number {
        
        return this.jlink.JLINK_SWD_GetU32(BitPos);
    }

    SWD_GetU8(BitPos: number): number {
        
        return this.jlink.JLINK_SWD_GetU8(BitPos);
    }

    SWD_SetDirIn(): number {
        
        return this.jlink.JLINK_SWD_SetDirIn();
    }

    SWD_SetDirOut(): number {
        
        return this.jlink.JLINK_SWD_SetDirOut();
    }

    SWD_StoreGetRaw(pDir: ffi_uint8Ptr, pIn: ffi_uint8Ptr, pOut: ffi_uint8Ptr, NumBits: number): void {
        pDir.type = ref.types.uint8;
        pIn.type = ref.types.uint8;
        pOut.type = ref.types.uint8;
        this.jlink.JLINK_SWD_StoreGetRaw(pDir, pIn, pOut, NumBits);
    }

    SWD_StoreRaw(pDir: ffi_uint8Ptr, pIn: ffi_uint8Ptr, NumBits: number): number {
        pDir.type = ref.types.uint8;
        pIn.type = ref.types.uint8;
        return this.jlink.JLINK_SWD_StoreRaw(pDir, pIn, NumBits);
    }

    SWD_SyncBits(): void {
        
        this.jlink.JLINK_SWD_SyncBits();
    }

    SWD_SyncBytes(): void {
        
        this.jlink.JLINK_SWD_SyncBytes();
    }

    SWO_Control(Cmd: number, pData: ffi_voidPtr): number {
        pData.type = ref.types.void;
        return this.jlink.JLINK_SWO_Control(Cmd, pData);
    }

    SWO_Read(pData: ffi_uint8Ptr, Offset: number, pNumBytes: ffi_uint32Ptr): void {
        pData.type = ref.types.uint8;
        pNumBytes.type = ref.types.uint32;
        this.jlink.JLINK_SWO_Read(pData, Offset, pNumBytes);
    }

    Test(): number {
        
        return this.jlink.JLINK_Test();
    }

    TIF_GetAvailable(pMask: ffi_uint32Ptr): void {
        pMask.type = ref.types.uint32;
        this.jlink.JLINK_TIF_GetAvailable(pMask);
    }

    TIF_Select(Interface: number): number {
        
        return this.jlink.JLINK_TIF_Select(Interface);
    }

    TRACE_Control(Cmd: number, p: ffi_uint32Ptr): number {
        p.type = ref.types.uint32;
        return this.jlink.JLINK_TRACE_Control(Cmd, p);
    }

    Unlock(): void {
        
        this.jlink.JLINK_Unlock();
    }

    UpdateFirmware(): number {
        
        return this.jlink.JLINK_UpdateFirmware();
    }

    UpdateFirmwareIfNewer(): number {
        
        return this.jlink.JLINK_UpdateFirmwareIfNewer();
    }

    UpdateReplaceFirmware(Replace: number, sInfo: string): number {
        
        return this.jlink.JLINK_UpdateReplaceFirmware(Replace, sInfo);
    }

    WA_AddRange(Addr: number, NumBytes: number): number {
        
        return this.jlink.JLINK_WA_AddRange(Addr, NumBytes);
    }

    WA_Restore(): number {
        
        return this.jlink.JLINK_WA_Restore();
    }

    WaitDCCRead(TimeOut: number): number {
        
        return this.jlink.JLINK_WaitDCCRead(TimeOut);
    }

    WaitForHalt(Timeout: number): number {
        
        return this.jlink.JLINK_WaitForHalt(Timeout);
    }

    WriteConfigReg(RegIndex: number, Data: number): number {
        
        return this.jlink.JLINK_WriteConfigReg(RegIndex, Data);
    }

    WriteControlReg(RegIndex: number, Data: number): number {
        
        return this.jlink.JLINK_WriteControlReg(RegIndex, Data);
    }

    WriteDCC(pData: ffi_uint32Ptr, NumItems: number, TimeOut: number): number {
        pData.type = ref.types.uint32;
        return this.jlink.JLINK_WriteDCC(pData, NumItems, TimeOut);
    }

    WriteDCCFast(pData: ffi_uint32Ptr, NumItems: number): void {
        pData.type = ref.types.uint32;
        this.jlink.JLINK_WriteDCCFast(pData, NumItems);
    }

    WriteDebugPort(RegIndex: number, Data: number): number {
        
        return this.jlink.JLINK_WriteDebugPort(RegIndex, Data);
    }

    WriteDebugReg(RegIndex: number, Data: number): number {
        
        return this.jlink.JLINK_WriteDebugReg(RegIndex, Data);
    }

    WriteEmu(p: ffi_voidPtr, NumBytes: number): number {
        p.type = ref.types.void;
        return this.jlink.JLINK_WriteEmu(p, NumBytes);
    }

    WriteEmuConfigMem(p: ffi_uint8Ptr, Off: number, NumBytes: number): number {
        p.type = ref.types.uint8;
        return this.jlink.JLINK_WriteEmuConfigMem(p, Off, NumBytes);
    }

    WriteICEReg(RegIndex: number, Value: number, AllowDelay: number): void {
        
        this.jlink.JLINK_WriteICEReg(RegIndex, Value, AllowDelay);
    }

    WriteMem(Addr: number, Count: number, pData: ffi_voidPtr): number {
        pData.type = ref.types.void;
        return this.jlink.JLINK_WriteMem(Addr, Count, pData);
    }

    WriteMemDelayed(Addr: number, Count: number, pData: ffi_voidPtr): number {
        pData.type = ref.types.void;
        return this.jlink.JLINK_WriteMemDelayed(Addr, Count, pData);
    }

    WriteMemEx(Addr: number, NumBytes: number, p: ffi_voidPtr, AccessWidth: number): number {
        p.type = ref.types.void;
        return this.jlink.JLINK_WriteMemEx(Addr, NumBytes, p, AccessWidth);
    }

    WriteMemEx_64(Addr: number, NumBytes: number, p: ffi_voidPtr, Flags: number): number {
        p.type = ref.types.void;
        return this.jlink.JLINK_WriteMemEx_64(Addr, NumBytes, p, Flags);
    }

    WriteMemHW(Addr: number, NumBytes: number, p: ffi_voidPtr): number {
        p.type = ref.types.void;
        return this.jlink.JLINK_WriteMemHW(Addr, NumBytes, p);
    }

    WriteMemZonedEx(Addr: number, NumBytes: number, p: ffi_voidPtr, Flags: number, sZone: string): number {
        p.type = ref.types.void;
        return this.jlink.JLINK_WriteMemZonedEx(Addr, NumBytes, p, Flags, sZone);
    }

    WriteMemZonedEx_64(Addr: number, NumBytes: number, p: ffi_voidPtr, Flags: number, sZone: string): number {
        p.type = ref.types.void;
        return this.jlink.JLINK_WriteMemZonedEx_64(Addr, NumBytes, p, Flags, sZone);
    }

    WriteReg(RegIndex: number, Data: number): number {
        
        return this.jlink.JLINK_WriteReg(RegIndex, Data);
    }

    WriteRegs(paRegIndex: ffi_uint32Ptr, paData: ffi_uint32Ptr, paStatus: ffi_uint8Ptr, NumRegs: number): number {
        paRegIndex.type = ref.types.uint32;
        paData.type = ref.types.uint32;
        paStatus.type = ref.types.uint8;
        return this.jlink.JLINK_WriteRegs(paRegIndex, paData, paStatus, NumRegs);
    }

    WriteRegs_64(paRegIndex: ffi_uint32Ptr, paData: ffi_uint64Ptr, paStatus: ffi_uint8Ptr, NumRegs: number): number {
        paRegIndex.type = ref.types.uint32;
        paData.type = ref.types.uint64;
        paStatus.type = ref.types.uint8;
        return this.jlink.JLINK_WriteRegs_64(paRegIndex, paData, paStatus, NumRegs);
    }

    WriteU16(Addr: number, Data: number): number {
        
        return this.jlink.JLINK_WriteU16(Addr, Data);
    }

    WriteU16_64(Addr: number, Data: number): number {
        
        return this.jlink.JLINK_WriteU16_64(Addr, Data);
    }

    WriteU32(Addr: number, Data: number): number {
        
        return this.jlink.JLINK_WriteU32(Addr, Data);
    }

    WriteU32_64(Addr: number, Data: number): number {
        
        return this.jlink.JLINK_WriteU32_64(Addr, Data);
    }

    WriteU64(Addr: number, Data: number): number {
        
        return this.jlink.JLINK_WriteU64(Addr, Data);
    }

    WriteU64_64(Addr: number, Data: number): number {
        
        return this.jlink.JLINK_WriteU64_64(Addr, Data);
    }

    WriteU8(Addr: number, Data: number): number {
        
        return this.jlink.JLINK_WriteU8(Addr, Data);
    }

    WriteU8_64(Addr: number, Data: number): number {
        
        return this.jlink.JLINK_WriteU8_64(Addr, Data);
    }

    WriteVectorCatch(Value: number): number {
        
        return this.jlink.JLINK_WriteVectorCatch(Value);
    }

    WriteVerifyMem(Addr: number, NumBytes: number, p: ffi_voidPtr, AccessWidth: number): number {
        p.type = ref.types.void;
        return this.jlink.JLINK_WriteVerifyMem(Addr, NumBytes, p, AccessWidth);
    }

    WriteZonedU16(Addr: number, Data: number, sZone: string): number {
        
        return this.jlink.JLINK_WriteZonedU16(Addr, Data, sZone);
    }

    WriteZonedU16_64(Addr: number, Data: number, sZone: string): number {
        
        return this.jlink.JLINK_WriteZonedU16_64(Addr, Data, sZone);
    }

    WriteZonedU32(Addr: number, Data: number, sZone: string): number {
        
        return this.jlink.JLINK_WriteZonedU32(Addr, Data, sZone);
    }

    WriteZonedU32_64(Addr: number, Data: number, sZone: string): number {
        
        return this.jlink.JLINK_WriteZonedU32_64(Addr, Data, sZone);
    }
};
