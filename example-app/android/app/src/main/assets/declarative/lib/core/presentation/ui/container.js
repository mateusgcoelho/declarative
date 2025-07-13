import { Block } from "./block.js";
export class Container extends Block {
    child;
    padding;
    paddingLeft;
    paddingRight;
    paddingTop;
    paddingBottom;
    margin;
    marginLeft;
    marginRight;
    marginTop;
    marginBottom;
    backgroundColor;
    width;
    height;
    gravity;
    constructor(props) {
        super();
        this.child = props.child;
        this.padding = props.padding;
        this.paddingLeft = props.paddingLeft;
        this.paddingRight = props.paddingRight;
        this.paddingTop = props.paddingTop;
        this.paddingBottom = props.paddingBottom;
        this.margin = props.margin;
        this.marginLeft = props.marginLeft;
        this.marginRight = props.marginRight;
        this.marginTop = props.marginTop;
        this.marginBottom = props.marginBottom;
        this.backgroundColor = props.backgroundColor;
        this.width = props.width;
        this.height = props.height;
        this.gravity = props.gravity;
    }
    JSON() {
        const result = {
            type: "container",
        };
        if (this.child) {
            result.child = this.child.JSON();
        }
        if (this.padding !== undefined)
            result.padding = this.padding;
        if (this.paddingLeft !== undefined)
            result.paddingLeft = this.paddingLeft;
        if (this.paddingRight !== undefined)
            result.paddingRight = this.paddingRight;
        if (this.paddingTop !== undefined)
            result.paddingTop = this.paddingTop;
        if (this.paddingBottom !== undefined)
            result.paddingBottom = this.paddingBottom;
        if (this.margin !== undefined)
            result.margin = this.margin;
        if (this.marginLeft !== undefined)
            result.marginLeft = this.marginLeft;
        if (this.marginRight !== undefined)
            result.marginRight = this.marginRight;
        if (this.marginTop !== undefined)
            result.marginTop = this.marginTop;
        if (this.marginBottom !== undefined)
            result.marginBottom = this.marginBottom;
        if (this.backgroundColor !== undefined)
            result.backgroundColor = this.backgroundColor;
        if (this.width !== undefined)
            result.width = this.width;
        if (this.height !== undefined)
            result.height = this.height;
        if (this.gravity !== undefined)
            result.gravity = this.gravity;
        return result;
    }
}
//# sourceMappingURL=container.js.map