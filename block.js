// block.js - Block Device Subsystem
export class BlockSubsystem {
    constructor() {
        this.devices = {
            "sda": { size: "512GB", type: "NVMe SSD" },
            "sda1": { size: "512GB", mount: "/" }
        };
    }

    getDevices() {
        return this.devices;
    }
}