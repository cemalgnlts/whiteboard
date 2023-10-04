import {
  BaseBoxShapeTool,
  BaseBoxShapeUtil,
  Box2d,
  HTMLContainer,
  T,
  DefaultSizeStyle
} from "@tldraw/tldraw";

import hljs from "../assets/highlightjs/highlight.js";
import { useEffect, useState } from "react";

export class CodeBlockShapeTool extends BaseBoxShapeTool {
  static id = "codeblock";
  shapeType = "codeblock";
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
    const isSelected = this.editor.onlySelectedShape?.id === shape.id;
    let fontSize = 0.75;

    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    useEffect(() => {
      if (!isSelected) setIsLangMenuOpen(false);
    }, [isSelected]);

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
      setIsLangMenuOpen(false);
      this.completeEdit(shape, ev.currentTarget.value);
    };

    const onPointerDown = (ev) => {
      ev.stopPropagation();
    };

    const toggleLangMenu = () => {
      setIsLangMenuOpen(!isLangMenuOpen);
    };

    const updateCodeLanguage = (ev) => {
      const language = ev.target.innerText.toLowerCase();
      setIsLangMenuOpen(false);

      this.editor.updateShape({
        id: shape.id,
        props: { language }
      });
    };

    const textAreaOnKeDown = (ev) => {
      /** @type {HTMLTextAreaElement} */
      const textArea = ev.currentTarget;

      if (ev.key === "Tab") {
        ev.preventDefault();
        textArea.setRangeText("\t");
        textArea.selectionStart = textArea.selectionStart + 1;

        return;
      }

      const isCtrl = ev.ctrlKey || ev.shiftKey || ev.metaKey;
      if (isCtrl && ev.key === "Enter") textArea.blur();
    };

    return (
      <HTMLContainer
        id={shape.id}
        style={{
          width: shape.props.w,
          height: shape.props.h
        }}
      >
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
            className="code-block hljs tl-text tl-text-input"
            tabIndex={-1}
            onBlur={onBlur}
            onKeyDown={textAreaOnKeDown}
            defaultValue={shape.props.text}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            autoFocus
          ></textarea>
        )}

        {isSelected && (
          <div
            className="container shape-customize-wrapper"
            onPointerDown={onPointerDown}
          >
            <div className="select">
              <button
                className="material-symbols-rounded"
                data-isactive={isLangMenuOpen}
                onClick={toggleLangMenu}
              >
                code
              </button>
              <ul
                className="container select-list"
                onClick={updateCodeLanguage}
              >
                <li tabIndex={0}>HTML</li>
                <li tabIndex={0}>CSS</li>
                <li tabIndex={0}>JavaScript</li>
              </ul>
            </div>

            {shape.props.isEditing && (
              <button className="material-symbols-rounded" onClick={onBlur}>
                edit_off
              </button>
            )}
          </div>
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
      w: 300,
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
