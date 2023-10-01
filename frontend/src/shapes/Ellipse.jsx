import { BaseBoxShapeTool } from "@tldraw/tldraw";

export class EllipseShapeTool extends BaseBoxShapeTool {
  static id = "ellipse";
  shapeType = "geo";

  onExit = () => {
    const shapeId = this.editor.selectedShapeIds[0];
    if (!shapeId) return;

    this.editor.updateShape({
      id: shapeId,
      props: {
        geo: "ellipse"
      }
    });
  };
}
