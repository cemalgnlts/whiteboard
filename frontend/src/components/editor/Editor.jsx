import { Tldraw } from "@tldraw/tldraw";
import { getAssetUrls } from "@tldraw/assets/selfHosted";

import CustomUI from "./CustomUI";

const assetUrls = getAssetUrls({
  baseUrl: "/assets/"
});

import {
  customShapeUtils,
  customTools
} from "../../shapes";

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
