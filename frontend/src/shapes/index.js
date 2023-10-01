import { IconShapeTool, IconShapeUtil } from "./Icon";
import { EmojiShapeTool, EmojiShapeUtil } from "./Emoji";
import { EllipseShapeTool } from "./Ellipse";

const customShapeUtils = [IconShapeUtil, EmojiShapeUtil];
const customTools = [IconShapeTool, EmojiShapeTool, EllipseShapeTool];

export {
    customShapeUtils,
    customTools
}