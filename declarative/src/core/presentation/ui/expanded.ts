import { Block } from "./block.js";

class expanded extends Block {
  child: Block;

  constructor(props: { child: Block }) {
    super();
    this.child = props.child;
  }

  JSON(): Record<string, any> {
    return {
      type: "expanded",
      child: this.child.JSON(),
    };
  }
}

export const Expanded = (props: { child: Block }): expanded =>
  new expanded(props);
