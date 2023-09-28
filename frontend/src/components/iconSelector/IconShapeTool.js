import { BaseBoxShapeTool } from "@tldraw/tldraw";

export class IconShapeTool extends BaseBoxShapeTool {
  static id = "icon";
  static initial = "idle";
  shapeType = "icon";

  onDoubleClick(_info) {}
}
