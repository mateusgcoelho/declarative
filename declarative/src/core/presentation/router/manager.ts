import { Page } from "../state/page.js";

const DEFAULT_INITIAL_PATH = "/";

type PageState = {
  block: Page;
  params?: Record<string, string>;
};

export class RouterManager {
  initialPath: string = DEFAULT_INITIAL_PATH;
  routes: Record<string, Page>;
  history: PageState[] = [];
  currentRoute?: PageState;

  constructor({
    routes = {},
    initialPath = DEFAULT_INITIAL_PATH,
  }: {
    routes?: Record<string, Page>;
    initialPath?: string;
  }) {
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

  push(path: string, params?: Record<string, string>): void {
    if (!this.routes[path]) {
      throw new Error(`Route not found: ${path}`);
    }

    const page = this.routes[path];
    this.history.push({ block: page, params });
    this.currentRoute = { block: page, params };
  }

  pop(): void {
    if (this.history.length === 0) {
      throw new Error("No history to pop");
    }

    this.history.pop();
    this.currentRoute = this.history[this.history.length - 1];
  }

  navigate(path: string, params?: Record<string, string>): void {
    if (!this.routes[path]) {
      throw new Error(`Route not found: ${path}`);
    }

    this.history = [];
    this.push(path, params);
  }
}
