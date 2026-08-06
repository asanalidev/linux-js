// security.js - Security & Permissions Subsystem
export class SecurityManager {
    constructor() {
        this.enforcing = true;
    }

    checkPermission(node, user, requestedAction) {
        if (user === "root") return true;
        // Базовая проверка прав (owner/group/others)
        return node.permissions ? node.permissions.startsWith("7") || node.permissions.endsWith("5") : false;
    }
}