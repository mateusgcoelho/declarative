import { Block } from "./block.js";
type WidthHeight = number | "wrap_content" | "match_parent";
export declare class Container extends Block {
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
    constructor(props: {
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
    });
    JSON(): Record<string, any>;
}
export {};
//# sourceMappingURL=container.d.ts.map