// samples.js - Kernel Module Samples
export function runKernelSample(kernel) {
    return kernel.executeCommand("uname -a");
}