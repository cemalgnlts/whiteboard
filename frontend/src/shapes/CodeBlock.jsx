import {
  BaseBoxShapeTool,
  BaseBoxShapeUtil,
  Box2d,
  HTMLContainer,
  T,
  DefaultSizeStyle
} from "@tldraw/tldraw";

import hljs from "highlight.js";

export class CodeBlockShapeTool extends BaseBoxShapeTool {
  static id = "codeblock";
  shapeType = "codeblock";

  onEnter = (info = {}) => {};

  onKeyDown = () => {
    alert(1);
  }

  onExit = () => {};
}

export class CodeBlockShapeUtil extends BaseBoxShapeUtil {
  static type = "codeblock";

  static props = {
    w: T.number,
    h: T.number,
    text: T.string,
    language: T.string,
    fontSize: DefaultSizeStyle,
    isEditing: T.boolean
  };

  canEdit = () => true;

  onDoubleClick = (shape) => {
    this.startEdit(shape);
  };

  /**
   *
   * @param {CodeBlockShapeUtil} shape
   */
  component(shape) {
    const isDarkMode = this.editor.user.isDarkMode;

    let fontSize = 0.75;

    switch (shape.props.fontSize) {
      case "m":
        fontSize = 1;
        break;
      case "l":
        fontSize = 1.2;
        break;
      case "xl":
        fontSize = 1.4;
        break;
    }

    const onBlur = (ev) => {
      this.completeEdit(shape, ev.currentTarget.value);
    };

    const preventDefault = (ev) => {
      /** @type {HTMLTextAreaElement} */
      const textArea = ev.currentTarget;

      if (ev.key === "Tab") {
        ev.preventDefault();
        textArea.setRangeText("\t");
        textArea.selectionStart = textArea.selectionStart + 1;
      }

      if (ev.ctrlKey && ev.key === "Enter") textArea.blur();
    };

    return (
      <HTMLContainer id={shape.id} className="pointer-events-tldraw">
        {!shape.props.isEditing ? (
          <code
            dangerouslySetInnerHTML={{
              __html: hljs.highlight(shape.props.text, {
                language: shape.props.language
              }).value
            }}
            className="code-block hljs"
            data-theme={isDarkMode ? "dark" : "light"}
            style={{
              fontSize: `${fontSize}rem`
            }}
          ></code>
        ) : (
          <textarea
            data-theme={isDarkMode ? "dark" : "light"}
            className="code-block hljs"
            tabIndex={0}
            onBlur={onBlur}
            onKeyDown={preventDefault}
            defaultValue={shape.props.text}
            autoFocus
          ></textarea>
        )}
      </HTMLContainer>
    );
  }

  startEdit(shape) {
    this.editor.updateShape({
      id: shape.id,
      props: {
        isEditing: true
      }
    });
  }

  completeEdit(shape, value) {
    this.editor.updateShape({
      id: shape.id,
      props: {
        isEditing: false,
        text: value
      }
    });
  }

  getDefaultProps() {
    return {
      w: 500,
      h: 300,
      text: 'console.log("Hello World");',
      language: "javascript",
      fontSize: "s",
      isEditing: false
    };
  }

  getBounds(shape) {
    return new Box2d(0, 0, shape.props.w, shape.props.h);
  }

  indicator(shape) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }
}
