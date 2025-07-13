import { Block } from "./block.js";
export class Expanded extends Block {
    child;
    constructor(props) {
        super();
        this.child = props.child;
    }
    JSON() {
        return {
            type: "expanded",
            child: this.child.JSON(),
        };
    }
}
//# sourceMappingURL=expanded.js.map