import { Block } from "./block.js";
export declare class SimpleText extends Block {
    text: string;
    textColor?: string;
    textSize?: number;
    fontWeight?: "normal" | "bold";
    fontStyle?: "normal" | "italic";
    textAlign?: "left" | "center" | "right" | "justify";
    maxLines?: number;
    ellipsize?: "end" | "start" | "middle" | "none";
    lineHeight?: number;
    constructor(text: string, props: {
        textColor?: string;
        textSize?: number;
        fontWeight?: "normal" | "bold";
        fontStyle?: "normal" | "italic";
        textAlign?: "left" | "center" | "right" | "justify";
        maxLines?: number;
        ellipsize?: "end" | "start" | "middle" | "none";
        lineHeight?: number;
    });
    JSON(): Record<string, any>;
}
//# sourceMappingURL=text.d.ts.map