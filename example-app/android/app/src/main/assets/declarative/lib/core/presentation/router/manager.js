const DEFAULT_INITIAL_PATH = "/";
export class RouterManager {
    initialPath = DEFAULT_INITIAL_PATH;
    routes;
    history = [];
    currentRoute;
    constructor({ routes = {}, initialPath = DEFAULT_INITIAL_PATH, }) {
        this.initialPath = initialPath;
        if (!Object.keys(routes).length) {
            throw new Error("RouterManager requires at least one route");
        }
        this.routes = routes;
        const initialPage = routes[initialPath];
        if (!initialPage) {
            throw new Error(`Initial path not found in routes: ${initialPath}`);
        }
        this.history.push({ block: initialPage, params: {} });
        this.currentRoute = { block: initialPage, params: {} };
    }
    push(path, params) {
        if (!this.routes[path]) {
            throw new Error(`Route not found: ${path}`);
        }
        const page = this.routes[path];
        this.history.push({ block: page, params });
        this.currentRoute = { block: page, params };
    }
    pop() {
        if (this.history.length === 0) {
            throw new Error("No history to pop");
        }
        this.history.pop();
        this.currentRoute = this.history[this.history.length - 1];
    }
    navigate(path, params) {
        if (!this.routes[path]) {
            throw new Error(`Route not found: ${path}`);
        }
        this.history = [];
        this.push(path, params);
    }
}
//# sourceMappingURL=manager.js.map