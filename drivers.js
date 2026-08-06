// drivers.js - Hardware Drivers (Console, Keyboard, Storage)
export class DriverManager {
    constructor() {
        this.loadedDrivers = ["tty_driver", "keyboard_driver", "storage_driver", "fb_driver"];
    }

    getLoadedDrivers() {
        return this.loadedDrivers;
    }
}