import { Block } from "./block.js";
export declare class Scaffold extends Block {
    appBar?: Block;
    body?: Block;
    /**
     * Creates a new Scaffold instance.
     * @param {Object} props - The properties for the Scaffold.
     * @param {Block} [props.appBar] - A Block instance to be used as the app bar.
     * @param {Block} [props.body] - A Block instance to be used as the body.
     * @example
     * const scaffold = new Scaffold({
     * appBar: new SimpleText("App Bar"),
     * body: new Column({
     * children: [new SimpleText("Body Content")]
     * })
     * });
     * This will create a Scaffold with an app bar and a body containing a column with text.
     * */
    constructor(props: {
        appBar?: Block;
        body?: Block;
    });
    JSON(): Record<string, any>;
}
//# sourceMappingURL=scaffold.d.ts.map