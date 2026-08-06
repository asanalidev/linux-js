// mm.js - Memory Management Subsystem
import { CONFIG, ErrorCodes } from './include.js';

export class MemoryManager {
    constructor() {
        this.totalMemory = 64 * 1024 * 1024; // 64 MB виртуального ОЗУ
        this.allocatedBlocks = new Map();
        this.freeMemory = this.totalMemory;
    }

    allocate(size, ownerPid) {
        if (size > this.freeMemory) {
            throw new Error(ErrorCodes.ENOMEM);
        }
        let address = Math.floor(Math.random() * 0x7fff0000);
        this.allocatedBlocks.set(address, { size, ownerPid });
        this.freeMemory -= size;
        return address;
    }

    free(address) {
        if (this.allocatedBlocks.has(address)) {
            let block = this.allocatedBlocks.get(address);
            this.freeMemory += block.size;
            this.allocatedBlocks.delete(address);
            return true;
        }
        return false;
    }

    getStatus() {
        return {
            total: this.totalMemory,
            free: this.freeMemory,
            used: this.totalMemory - this.freeMemory
        };
    }
}