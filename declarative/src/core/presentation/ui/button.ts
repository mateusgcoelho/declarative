import { registerFunction } from "../../../index.js";
import { Block } from "./block.js";

type WidthHeight = number | "wrap_content" | "match_parent";

type ButtonConfig = {
  text: string;
  textColor?: string;
  backgroundColor?: string;
  textSize?: number;
  padding?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  enabled?: boolean;
  width?: WidthHeight;
  height?: WidthHeight;
  onPressed?: Function;
};

class button extends Block {
  text: string;

  textColor?: string;
  backgroundColor?: string;
  textSize?: number;
  padding?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  enabled?: boolean;
  width?: WidthHeight;
  height?: WidthHeight;
  onPressed?: Function;
  functionId?: string;

  constructor(props: ButtonConfig) {
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
    this.onPressed = props.onPressed;

    if (this.onPressed) {
      this.functionId = registerFunction(this.onPressed);
    }
  }

  JSON(): Record<string, any> {
    const result: any = {
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
    if (this.onPressed && this.functionId) {
      result.functionId = this.functionId;
    }

    return result;
  }
}

export const Button = (props: ButtonConfig): button => new button(props);
