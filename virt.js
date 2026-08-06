// virt.js - Virtualization Subsystem
export class Hypervisor {
    constructor() {
        this.activeVMs = 0;
    }
    spawnVM(name) {
        this.activeVMs++;
        return `Virtual machine '${name}' spawned inside Linux.js`;
    }
}