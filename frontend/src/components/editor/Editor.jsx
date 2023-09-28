import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

import { getAssetUrls } from "@tldraw/assets/selfHosted";

import CustomUI from "./CustomUI";

const assetUrls = getAssetUrls({
  baseUrl: "/assets/"
});

import { IconShapeUtil } from "../iconSelector/IconShapeUtil";
import { IconShapeTool } from "../iconSelector/IconShapeTool";

const customShapeUtils = [IconShapeUtil];
const customTools = [IconShapeTool];

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
