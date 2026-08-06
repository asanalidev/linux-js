// lib.js - Kernel Helper Data Structures
export class KernelList {
    constructor() {
        this.items = [];
    }
    push(item) { this.items.push(item); }
    shift() { return this.items.shift(); }
}