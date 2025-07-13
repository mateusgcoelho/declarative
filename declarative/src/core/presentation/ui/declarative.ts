import { RouterManager } from "../router/manager.js";
import { Block } from "./index.js";

export class DeclarativeUI extends Block {
  router: RouterManager;

  constructor(props: { router?: RouterManager }) {
    super();
    this.router = props.router ?? new RouterManager({});
  }

  JSON(): Record<string, any> {
    return {
      type: "declarative-ui",
    };
  }

  actualBlockToBridge(): string {
    return JSON.stringify(this.router.currentRoute?.block.JSON()) ?? "{}";
  }
}

export const runApp = (app: DeclarativeUI): void => {
  (globalThis as any).actualBlock = app.actualBlockToBridge();
};
