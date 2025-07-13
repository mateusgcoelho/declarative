import { Block } from "../ui/block.js";

export abstract class Page extends Block {
  abstract build(): Block;

  JSON(): Record<string, any> {
    return this.build().JSON();
  }

  updateStateUI(): void {
    let blockUpdated = JSON.stringify(this.build().JSON());
    (globalThis as any).notifyNative(blockUpdated);
  }
}
