import { Block } from "./block.js";

type RowConfig = {
  children?: Block[];
};

class row extends Block {
  children: Block[] = [];

  /**
   * Creates a new Row instance.
   * @param {Object} props - The properties for the Row.
   * @param {Block[]} [props.children=[]] - An array of Block instances to be added as children of this row.
   * @example
   * const row = new Row({
   *  children: [new Block(), new Block()]
   * });
   * This will create a Row with two Block children.
   * */
  constructor(props: RowConfig) {
    super();
    this.children = props.children ?? [];
  }

  JSON(): Record<string, any> {
    const renderedChildren = this.children.map((child) => child.JSON());

    return {
      type: "row",
      children: renderedChildren,
    };
  }
}

export const Row = (props: RowConfig): row => new row(props);
