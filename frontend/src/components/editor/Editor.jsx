import { Tldraw } from "@tldraw/tldraw";
import { getAssetUrls } from "@tldraw/assets/selfHosted";
import "@tldraw/tldraw/tldraw.css";

import CustomUI from "./CustomUI";

const assetUrls = getAssetUrls({
	baseUrl: "/assets/",
});

import { IconShapeUtil, IconShapeTool } from "../../shapes";

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
