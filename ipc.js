// ipc.js - Inter-Process Communication (Pipes & Messages)
export class IPCManager {
    constructor() {
        this.pipes = new Map();
        this.nextPipeId = 1;
    }

    createPipe() {
        let id = this.nextPipeId++;
        let buffer = [];
        this.pipes.set(id, {
            write: (data) => buffer.push(data),
            read: () => buffer.shift() || null
        });
        return id;
    }
}