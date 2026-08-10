# @asanalidev/linux-js ![Linux.js](https://img.shields.io/badge/%20-black?style=for-the-badge&logo=linux) ![Node.js](https://img.shields.io/badge/%20-white?style=for-the-badge&logo=nodedotjs)
> A lightweight Linux kernel emulation framework written in modular JavaScript.

Linux.js is a lightweight framework that emulates the Linux kernel architecture and its key subsystems in pure JavaScript. The project is designed according to the canonical structure of the `torvalds/linux` kernel source code, divided into independent modules, and can be used to create browser terminals, OS simulators, or for educational purposes.

---

## 📦 Installation

Install the package via npm:

```bash
npm install @asanalidev/linux-js
```

---

## 🏛️ Project Architecture (Modules)

The project is divided into subsystems that reflect the real Linux kernel architecture:

* **`kernel.js`** — The main kernel dispatcher and process manager.
* **`fs.js`** — The virtual file system (VFS) with support for directories and files.
* **`arch.js`** — Architecture-specific layer (x86_64 and system call emulation).
* **`mm.js`** — Memory Management.
* **`net.js`** — The network stack (simulation of sockets, interfaces, and pings).
* **`security.js`** — Security and access control subsystem.
* **`crypto.js`** — Cryptographic algorithms and hashing.
* **`drivers.js`** — Peripheral, console, and storage drivers.
* **`sound.js`** — Audio subsystem (ALSA-like).
* **`block.js`** — Block devices (drives, partitions).
* **`io_uring.js`** — Asynchronous I/O interface.
* **`virt.js`** — Virtualization and hypervisor module.
* **`init.js`** — System initializer (PID 1).
* **`include.js`** — Kernel configuration constants and error codes.

---

## 🚀 Quick Start

Example of initializing the kernel and executing commands programmatically:

```javascript
import { LinuxKernel } from '@asanali/linux-js';
const kernel = new LinuxKernel();

console.log(kernel.executeCommand("uname -a"));
console.log(kernel.executeCommand("ls"));
console.log(kernel.executeCommand("free"));
```

---

## 🛠️ Development and Testing

1. Clone the repository:
```bash
git clone [https://github.com/asanali/linux-js.git](https://github.com/asanali/linux-js.git)
```

2. Install dependencies (if required) and run tests:
```bash
npm test
```

---

## 📄 License

[MIT](https://github.com/asanalidev/linux-js/blob/main/LICENSE)
