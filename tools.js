// tools.js - Kernel Debug Tools
export class DebugTools {
    dumpTrace(kernel) {
        return `Trace: active path=${kernel.currentPath}, processes=${kernel.processManager.processTable.size}`;
    }
}