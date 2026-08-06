// kernel.js - Core Kernel Orchestrator
import { CONFIG } from './include.js';
import { Architecture } from './arch.js';
import { MemoryManager } from './mm.js';
import { VirtualFileSystem } from './fs.js';
import { NetworkStack } from './net.js';
import { SecurityManager } from './security.js';
import { CryptoSubsystem } from './crypto.js';
import { DriverManager } from './drivers.js';
import { SoundSubsystem } from './sound.js';
import { BlockSubsystem } from './block.js';
import { IOURing } from './io_uring.js';
import { Hypervisor } from './virt.js';
import { DebugTools } from './tools.js';
import { UserBinaries } from './usr.js';
import { systemInit } from './init.js';

class ProcessManager {
    constructor() {
        this.processTable = new Map();
        this.nextPid = 1;
    }
    createProcess(name, executionFunction) {
        let pid = this.nextPid++;
        this.processTable.set(pid, { pid, name, state: "running", function: executionFunction });
        return pid;
    }
}

export class LinuxKernel {
    constructor() {
        this.version = CONFIG.VERSION;
        this.arch = new Architecture();
        this.memoryManager = new MemoryManager();
        this.fileSystem = new VirtualFileSystem();
        this.processManager = new ProcessManager();
        this.network = new NetworkStack();
        this.security = new SecurityManager();
        this.crypto = new CryptoSubsystem();
        this.drivers = new DriverManager();
        this.sound = new SoundSubsystem();
        this.block = new BlockSubsystem();
        this.ioUring = new IOURing();
        this.virt = new Hypervisor();
        this.tools = new DebugTools();
        
        this.commandRegistry = new Map();
        this.currentPath = "/home/user";
        
        systemInit(this);
        this._initializeBaseCommands();
    }

    registerCommand(name, callback) {
        this.commandRegistry.set(name, callback);
    }

    executeCommand(inputString) {
        let parts = inputString.trim().split(" ");
        let commandName = parts[0];
        let args = parts.slice(1);

        if (!commandName) return "";

        if (this.commandRegistry.has(commandName)) {
            let handler = this.commandRegistry.get(commandName);
            return handler(args, this);
        }

        if (UserBinaries[commandName]) {
            return UserBinaries[commandName]();
        }

        return `bash: ${commandName}: command not found`;
    }

    _initializeBaseCommands() {
        this.registerCommand("pwd", (args, kernel) => kernel.currentPath);
        this.registerCommand("ls", (args, kernel) => {
            let node = kernel.fileSystem.findNode(kernel.currentPath);
            return node && node.content ? Object.keys(node.content).join("  ") : "";
        });
        this.registerCommand("uname", (args, kernel) => {
            if (args.includes("-a")) {
                return `Linux linux-js ${kernel.version} #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux`;
            }
            return "Linux.js";
        });
        this.registerCommand("cat", (args, kernel) => {
            if (!args[0]) return "cat: missing file argument";
            let node = kernel.fileSystem.findNode(args[0], kernel.currentPath);
            return node && node.type === "file" ? node.data : `cat: ${args[0]}: No such file or directory`;
        });
        this.registerCommand("echo", (args) => args.join(" "));
        this.registerCommand("ping", (args, kernel) => kernel.network.ping(args[0] || "127.0.0.1"));
        this.registerCommand("free", (args, kernel) => {
            let mem = kernel.memoryManager.getStatus();
            return `Total RAM: ${mem.total} bytes, Free: ${mem.free} bytes`;
        });
        this.registerCommand("dmesg", (args, kernel) => {
            return `[ 0.000000] Booting Linux.js kernel version ${kernel.version}\n[ 0.100000] Loaded drivers: ${kernel.drivers.getLoadedDrivers().join(", ")}`;
        });
    }
}

if (typeof window !== 'undefined') {
    window.LinuxJSKernel = LinuxKernel;
}