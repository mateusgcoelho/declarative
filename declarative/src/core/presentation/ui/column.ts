import { Block } from "./block.js";

class column extends Block {
  children: Block[] = [];

  /**
   * Creates a new Column instance.
   * @param {Object} props - The properties for the Column.
   * @param {Block[]} [props.children=[]] - An array of Block instances to be added as children of this column.
   * @example
   * const column = new Column({
   *  children: [new Block(), new Block()]s
   * });
   * This will create a Column with two Block children.
   * */
  constructor(props: { children: Block[] } = { children: [] }) {
    super();
    this.children = props.children;
  }

  JSON(): Record<string, any> {
    const renderedChildren = this.children.map((child) => child.JSON());

    return {
      type: "column",
      children: renderedChildren,
    };
  }
}

export const Column = (
  props: { children: Block[] } = { children: [] }
): column => new column(props);
