import { Block } from "./block.js";
type WidthHeight = number | "wrap_content" | "match_parent";
export declare class Button extends Block {
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
    onClickAction?: string;
    constructor(props: {
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
        onClickAction?: string;
    });
    JSON(): Record<string, any>;
}
export {};
//# sourceMappingURL=button.d.ts.map