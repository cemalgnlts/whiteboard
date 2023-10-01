import { Tldraw } from "@tldraw/tldraw";
import { getAssetUrls } from "@tldraw/assets/selfHosted";
import "@tldraw/tldraw/tldraw.css";

import CustomUI from "./CustomUI";

const assetUrls = getAssetUrls({
  baseUrl: "/assets/"
});

import {
  IconShapeUtil,
  IconShapeTool,
  EmojiShapeUtil,
  EmojiShapeTool
} from "../../shapes";

const customShapeUtils = [IconShapeUtil, EmojiShapeUtil];
const customTools = [IconShapeTool, EmojiShapeTool];

export default function Editor() {
  return (
    <Tldraw
      assetUrls={assetUrls}
      shapeUtils={customShapeUtils}
      tools={customTools}
      autoFocus
      hideUi
    >
      <CustomUI />
    </Tldraw>
  );
}
