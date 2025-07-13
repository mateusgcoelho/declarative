import { Block } from "./block.js";

type SimpleTextConfig = {
  textColor?: string;
  textSize?: number;
  fontWeight?: "normal" | "bold";
  fontStyle?: "normal" | "italic";
  textAlign?: "left" | "center" | "right" | "justify";
  maxLines?: number;
  ellipsize?: "end" | "start" | "middle" | "none";
  lineHeight?: number;
};

class simpleText extends Block {
  text: string;
  textColor?: string;
  textSize?: number;
  fontWeight?: "normal" | "bold";
  fontStyle?: "normal" | "italic";
  textAlign?: "left" | "center" | "right" | "justify";
  maxLines?: number;
  ellipsize?: "end" | "start" | "middle" | "none";
  lineHeight?: number;

  constructor(text: string, props: SimpleTextConfig) {
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

  JSON(): Record<string, any> {
    const result: any = {
      type: "text",
      text: this.text,
    };
    if (this.textColor !== undefined) result.textColor = this.textColor;
    if (this.textSize !== undefined) result.textSize = this.textSize;
    if (this.fontWeight !== undefined) result.fontWeight = this.fontWeight;
    if (this.fontStyle !== undefined) result.fontStyle = this.fontStyle;
    if (this.textAlign !== undefined) result.textAlign = this.textAlign;
    if (this.maxLines !== undefined) result.maxLines = this.maxLines;
    if (this.ellipsize !== undefined) result.ellipsize = this.ellipsize;
    if (this.lineHeight !== undefined) result.lineHeight = this.lineHeight;
    return result;
  }
}

export const SimpleText = (text: string, props: SimpleTextConfig): simpleText =>
  new simpleText(text, props);
