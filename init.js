// init.js - System Initialization (PID 1)
export function systemInit(kernel) {
    kernel.processManager.createProcess("init", () => {
        console.log("[PID 1] Initializing Linux.js system services...");
    });
}