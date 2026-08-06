// net.js - Network Subsystem (Sockets & IP simulation)
export class NetworkStack {
    constructor() {
        this.interfaces = {
            "lo": { ip: "127.0.0.1", status: "UP" },
            "eth0": { ip: "192.168.1.15", status: "UP" }
        };
        this.sockets = new Map();
    }

    getInterfaces() {
        return this.interfaces;
    }

    ping(host) {
        return `64 bytes from ${host}: icmp_seq=1 ttl=118 time=0.421 ms`;
    }
}