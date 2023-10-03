import { IconShapeTool, IconShapeUtil } from "./Icon";
import { EmojiShapeTool, EmojiShapeUtil } from "./Emoji";
import { EllipseShapeTool } from "./Ellipse";
import { CodeBlockShapeTool, CodeBlockShapeUtil } from "./CodeBlock";

const customShapeUtils = [IconShapeUtil, EmojiShapeUtil, CodeBlockShapeUtil];
const customTools = [
  IconShapeTool,
  EmojiShapeTool,
  EllipseShapeTool,
  CodeBlockShapeTool
];

export { customShapeUtils, customTools };
