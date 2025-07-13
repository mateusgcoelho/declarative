import { Block } from "./block.js";
export class Row extends Block {
    children = [];
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
    constructor(props = { children: [] }) {
        super();
        this.children = props.children;
    }
    JSON() {
        const renderedChildren = this.children.map((child) => child.JSON());
        return {
            type: "row",
            children: renderedChildren,
        };
    }
}
//# sourceMappingURL=row.js.map