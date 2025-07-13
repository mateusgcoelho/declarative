import { Block } from "./block.js";

type WidthHeight = number | "wrap_content" | "match_parent";

type ContainerConfig = {
  child?: Block;

  padding?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;

  margin?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;

  backgroundColor?: string;
  width?: WidthHeight;
  height?: WidthHeight;
  gravity?: "center" | "start" | "end" | "top" | "bottom";
};

class container extends Block {
  child?: Block;

  padding?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;

  margin?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;

  backgroundColor?: string;
  width?: WidthHeight;
  height?: WidthHeight;
  gravity?: "center" | "start" | "end" | "top" | "bottom";

  constructor(props: ContainerConfig) {
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

  JSON(): Record<string, any> {
    const result: any = {
      type: "container",
    };

    if (this.child) {
      result.child = this.child.JSON();
    }

    if (this.padding !== undefined) result.padding = this.padding;
    if (this.paddingLeft !== undefined) result.paddingLeft = this.paddingLeft;
    if (this.paddingRight !== undefined)
      result.paddingRight = this.paddingRight;
    if (this.paddingTop !== undefined) result.paddingTop = this.paddingTop;
    if (this.paddingBottom !== undefined)
      result.paddingBottom = this.paddingBottom;

    if (this.margin !== undefined) result.margin = this.margin;
    if (this.marginLeft !== undefined) result.marginLeft = this.marginLeft;
    if (this.marginRight !== undefined) result.marginRight = this.marginRight;
    if (this.marginTop !== undefined) result.marginTop = this.marginTop;
    if (this.marginBottom !== undefined)
      result.marginBottom = this.marginBottom;

    if (this.backgroundColor !== undefined)
      result.backgroundColor = this.backgroundColor;
    if (this.width !== undefined) result.width = this.width;
    if (this.height !== undefined) result.height = this.height;
    if (this.gravity !== undefined) result.gravity = this.gravity;

    return result;
  }
}

export const Container = (props: ContainerConfig): container =>
  new container(props);
