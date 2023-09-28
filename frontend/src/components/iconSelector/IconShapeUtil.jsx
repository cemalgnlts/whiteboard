import {
  HTMLContainer,
  BaseBoxShapeUtil,
  Box2d,
  T
} from "@tldraw/tldraw";

export class IconShapeUtil extends BaseBoxShapeUtil {
  static type = "icon";

  static props = {
    w: T.number,
    h: T.number,
    icon: T.string
  }

  getDefaultProps() {
    return {
      w: 100,
      h: 100,
      icon: ""
    };
  }

  canResize = () => true;
  isAspectRatioLocked = () => true;

  getBounds(shape) {
    return new Box2d(0, 0, shape.props.w, shape.props.h);
  }

  /**
   *
   * @param {IconShapeUtil} shape
   */
  component(shape) {
    const isHovered = this.editor.hoveredShapeId === shape.id;

    return (
      <HTMLContainer id={shape.id}>
        {isHovered && (
          <svg
            width={shape.props.w}
            height={shape.props.h}
            fill="none"
            strokeWidth="3"
            style={{ stroke: "var(--color-selected)", position: "absolute" }}
          >
            <text x="50" y="100" fontSize="100" style={{fontFamily: "'Material Symbols Rounded'"}}>help</text>
            {this.indicator(shape)}
          </svg>
        )}
        {/* <span class="material-symbols-rounded" style={{color: "red", width: "100%", height: "100%", fontSize: "100%"}}>{shape.props.icon || "help"}</span> */}
      </HTMLContainer>
    );
  }

  indicator(shape) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }
}
