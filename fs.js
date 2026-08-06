// fs.js - Virtual File System
export class VirtualFileSystem {
    constructor() {
        this.rootNode = {
            type: "directory",
            permissions: "755",
            content: {
                "bin": { type: "directory", permissions: "755", content: {} },
                "etc": { 
                    type: "directory", 
                    permissions: "755", 
                    content: {
                        "os-release": { type: "file", permissions: "644", data: "NAME=Linux.js\nVERSION=1.0.0-torvalds\nID=linuxjs" },
                        "hostname": { type: "file", permissions: "644", data: "linux-js-kernel" }
                    } 
                },
                "home": { 
                    type: "directory", 
                    permissions: "755", 
                    content: {
                        "user": { type: "directory", permissions: "755", content: {} }
                    } 
                },
                "proc": { type: "directory", permissions: "555", content: {} }
            }
        };
    }

    findNode(path, currentPath = "/") {
        let absolutePath = path.startsWith("/") ? path : (currentPath === "/" ? "/" + path : currentPath + "/" + path);
        let segments = absolutePath.split("/").filter(Boolean);
        let currentNode = this.rootNode;

        for (let segment of segments) {
            if (segment === ".") continue;
            if (segment === "..") continue;
            if (currentNode.content && currentNode.content[segment]) {
                currentNode = currentNode.content[segment];
            } else {
                return null;
            }
        }
        return currentNode;
    }

    createFile(path, currentPath, data = "") {
        let segments = path.split("/").filter(Boolean);
        let fileName = segments.pop();
        let dirPath = "/" + segments.join("/");
        let parentNode = this.findNode(dirPath, currentPath);

        if (parentNode && parentNode.type === "directory") {
            parentNode.content[fileName] = {
                type: "file",
                permissions: "644",
                data: data
            };
            return true;
        }
        return false;
    }
}