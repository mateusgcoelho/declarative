import { Page } from "../state/page.js";
type PageState = {
    block: Page;
    params?: Record<string, string>;
};
export declare class RouterManager {
    initialPath: string;
    routes: Record<string, Page>;
    history: PageState[];
    currentRoute?: PageState;
    constructor({ routes, initialPath, }: {
        routes?: Record<string, Page>;
        initialPath?: string;
    });
    push(path: string, params?: Record<string, string>): void;
    pop(): void;
    navigate(path: string, params?: Record<string, string>): void;
}
export {};
//# sourceMappingURL=manager.d.ts.map