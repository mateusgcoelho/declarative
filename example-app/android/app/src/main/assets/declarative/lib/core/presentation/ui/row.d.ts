import { Block } from "./block.js";
export declare class Row extends Block {
    children: Block[];
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
    constructor(props?: {
        children: Block[];
    });
    JSON(): Record<string, any>;
}
//# sourceMappingURL=row.d.ts.map