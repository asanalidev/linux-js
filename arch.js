// arch.js - Architecture Specific Layer (x86_64 emulation)
import { CONFIG } from './include.js';

export class Architecture {
    constructor() {
        this.archName = "x86_64";
        this.registers = {
            rax: 0, rbx: 0, rcx: 0, rdx: 0,
            rsi: 0, rdi: 0, rsp: 0, rbp: 0,
            rip: 0
        };
    }

    getCPUInfo() {
        return `Architecture: ${this.archName}, Kernel: ${CONFIG.VERSION}, Endianness: Little`;
    }

    syscall(number, ...args) {
        // Эмуляция системных вызовов процессора
        switch(number) {
            case 1: return "sys_exit";
            case 60: return "sys_exit_group";
            default: return `unknown_syscall_${number}`;
        }
    }
}