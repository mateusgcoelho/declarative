import { Block } from "./block.js";
export class Button extends Block {
    text;
    textColor; // ex: "#FFFFFF"
    backgroundColor; // ex: "#6200EE"
    textSize; // em sp
    padding; // em dp (uniforme)
    paddingLeft;
    paddingRight;
    paddingTop;
    paddingBottom;
    enabled;
    width;
    height;
    onClickAction;
    constructor(props) {
        super();
        this.text = props.text;
        this.textColor = props.textColor;
        this.backgroundColor = props.backgroundColor;
        this.textSize = props.textSize;
        this.padding = props.padding;
        this.paddingLeft = props.paddingLeft;
        this.paddingRight = props.paddingRight;
        this.paddingTop = props.paddingTop;
        this.paddingBottom = props.paddingBottom;
        this.enabled = props.enabled ?? true;
        this.width = props.width;
        this.height = props.height;
        this.onClickAction = props.onClickAction;
    }
    JSON() {
        const result = {
            type: "button",
            text: this.text,
            enabled: this.enabled,
        };
        if (this.textColor !== undefined) {
            result.textColor = this.textColor;
        }
        if (this.backgroundColor !== undefined) {
            result.backgroundColor = this.backgroundColor;
        }
        if (this.textSize !== undefined) {
            result.textSize = this.textSize;
        }
        if (this.padding !== undefined) {
            result.padding = this.padding;
        }
        if (this.paddingLeft !== undefined) {
            result.paddingLeft = this.paddingLeft;
        }
        if (this.paddingRight !== undefined) {
            result.paddingRight = this.paddingRight;
        }
        if (this.paddingTop !== undefined) {
            result.paddingTop = this.paddingTop;
        }
        if (this.paddingBottom !== undefined) {
            result.paddingBottom = this.paddingBottom;
        }
        if (this.width !== undefined) {
            result.width = this.width;
        }
        if (this.height !== undefined) {
            result.height = this.height;
        }
        if (this.onClickAction !== undefined) {
            result.onClickAction = this.onClickAction;
        }
        return result;
    }
}
//# sourceMappingURL=button.js.map