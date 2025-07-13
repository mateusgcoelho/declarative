import { Block } from "./block.js";
export declare class Column extends Block {
    children: Block[];
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
    constructor(props?: {
        children: Block[];
    });
    JSON(): Record<string, any>;
}
//# sourceMappingURL=column.d.ts.map