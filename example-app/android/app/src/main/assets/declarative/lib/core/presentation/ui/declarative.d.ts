import { RouterManager } from "../router/manager.js";
import { Block } from "./index.js";
export declare class DeclarativeUI extends Block {
    router: RouterManager;
    constructor(props: {
        router?: RouterManager;
    });
    JSON(): Record<string, any>;
    actualBlockToBridge(): string;
}
export declare const runApp: (app: DeclarativeUI) => void;
//# sourceMappingURL=declarative.d.ts.map