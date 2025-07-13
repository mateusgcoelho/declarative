import { Block } from "./block.js";
export class Scaffold extends Block {
    appBar;
    body;
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
    constructor(props) {
        super();
        this.appBar = props.appBar;
        this.body = props.body;
    }
    JSON() {
        let result = {
            type: "scaffold",
        };
        if (this.appBar) {
            result.appBar = this.appBar.JSON();
        }
        if (this.body) {
            result.body = this.body.JSON();
        }
        return result;
    }
}
//# sourceMappingURL=scaffold.js.map