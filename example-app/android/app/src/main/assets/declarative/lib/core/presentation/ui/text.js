import { Block } from "./block.js";
export class SimpleText extends Block {
    text;
    textColor;
    textSize;
    fontWeight;
    fontStyle;
    textAlign;
    maxLines;
    ellipsize;
    lineHeight;
    constructor(text, props) {
        super();
        this.text = text;
        this.textColor = props.textColor;
        this.textSize = props.textSize;
        this.fontWeight = props.fontWeight;
        this.fontStyle = props.fontStyle;
        this.textAlign = props.textAlign;
        this.maxLines = props.maxLines;
        this.ellipsize = props.ellipsize;
        this.lineHeight = props.lineHeight;
    }
    JSON() {
        const result = {
            type: "text",
            text: this.text,
        };
        if (this.textColor !== undefined)
            result.textColor = this.textColor;
        if (this.textSize !== undefined)
            result.textSize = this.textSize;
        if (this.fontWeight !== undefined)
            result.fontWeight = this.fontWeight;
        if (this.fontStyle !== undefined)
            result.fontStyle = this.fontStyle;
        if (this.textAlign !== undefined)
            result.textAlign = this.textAlign;
        if (this.maxLines !== undefined)
            result.maxLines = this.maxLines;
        if (this.ellipsize !== undefined)
            result.ellipsize = this.ellipsize;
        if (this.lineHeight !== undefined)
            result.lineHeight = this.lineHeight;
        return result;
    }
}
//# sourceMappingURL=text.js.map