import { RouterManager } from "../router/manager.js";
import { Block } from "./index.js";
export class DeclarativeUI extends Block {
    router;
    constructor(props) {
        super();
        this.router = props.router ?? new RouterManager({});
    }
    JSON() {
        return {
            type: "declarative-ui",
        };
    }
    actualBlockToBridge() {
        return JSON.stringify(this.router.currentRoute?.block.JSON()) ?? "{}";
    }
}
export const runApp = (app) => {
    globalThis.actualBlock = app.actualBlockToBridge();
};
//# sourceMappingURL=declarative.js.map