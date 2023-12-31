import {
  BaseBoxShapeTool,
  BaseBoxShapeUtil,
  Box2d,
  DefaultColorStyle,
  SVGContainer,
  T,
  getDefaultColorTheme
} from "@tldraw/tldraw";

export class IconShapeTool extends BaseBoxShapeTool {
  static id = "icon";
  shapeType = "icon";
  iconName = "";

  onEnter = (info = {}) => {
    this.iconName = info.name;
  };

  onExit = () => {
    const shapeId = this.editor.selectedShapeIds[0];
    if (!shapeId) return;

    this.editor.updateShape({
      id: shapeId,
      props: {
        name: this.iconName
      }
    });
  };
}

export class IconShapeUtil extends BaseBoxShapeUtil {
  static type = "icon";

  static props = {
    w: T.number,
    h: T.number,
    name: T.string,
    color: DefaultColorStyle
  };

  isAspectRatioLocked = () => true;

  /**
   *
   * @param {IconShapeUtil} shape
   */
  component(shape) {
    const theme = getDefaultColorTheme({
      isDarkMode: this.editor.user.isDarkMode
    });
    const color = theme[shape.props.color].solid;

    return (
      <SVGContainer id={shape.id}>
        <text
          x="0"
          y={shape.props.w}
          fontSize={shape.props.w}
          fontFamily="Material Symbols Rounded"
          fill={color}
        >
          {shape.props.name}
        </text>
      </SVGContainer>
    );
  }

  getDefaultProps() {
    return {
      w: 56,
      h: 56,
      name: "help",
      color: "black"
    };
  }

  getBounds(shape) {
    return new Box2d(0, 0, shape.props.w, shape.props.h);
  }

  indicator(shape) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }
}
