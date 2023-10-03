import { useRef, useEffect, useCallback } from "react";

import { useEditor, track } from "@tldraw/tldraw";

import "./styles.css";

import ExtraShapeTabs from "../extraShapeTabs/ExtraShapeTabs";
import IconSelector from "../iconSelector/IconSelector";
import EmojiPicker from "../emojiPicker";
import StylePanel from "./StylePanel";
import handleKeyboardShortcuts from "./handleKeyboardShortcuts";
import UserPrefsMenu from "./UserPrefsMenu";

const tools = [
  { type: "select", title: "Select - s", icon: "arrow_selector_tool" },
  { type: "hand", title: "Hand - h", icon: "pan_tool" },
  { type: "divider" },
  { type: "draw", title: "Pencil - p", icon: "draw" },
  { type: "text", title: "Text - t", icon: "insert_text" },
  { type: "eraser", title: "Eraser - e", icon: "ink_eraser" },
  { type: "divider" },
  { type: "arrow", title: "Arrow - a", icon: "line_end_arrow" },
  { type: "geo", title: "Rectangle - r", icon: "rectangle" },
  { type: "ellipse", title: "Ellipse - o", icon: "circle" },
  { type: "line", title: "Line - l", icon: "pen_size_2" }
];

const extraTools = [
  { type: "icon", title: "Icon - i", icon: "interests", picker: IconSelector },
  {
    type: "emoji",
    title: "Openmoji - o",
    icon: "add_reaction",
    picker: EmojiPicker
  },
  {
    type: "codeblock",
    title: "Code",
    icon: "code",
    picker: null
  }
];

function CustomUI() {
  const editor = useEditor();
  const lastChoices = useRef(null);

  useEffect(() => {
    if (lastChoices.current === null) {
      lastChoices.current = {
        icon: "help",
        emoji: "1F607"
      };
    }

    editor.updateViewportScreenBounds(true);
    editor.zoomToFit();

    if (editor.zoomLevel > 1) editor.resetZoom();
  }, []);

  useEffect(() => {
    /** @param {KeyboardEvent} ev */
    const onKeyUp = (ev) => {
      ev.preventDefault();

      if (!ev.ctrlKey) {
        handleKeyboardShortcuts(ev, editor, lastChoices.current);
        return;
      }

      switch (ev.key) {
        case "a":
          editor.selectAll();
          break;
        case "z":
          editor.undo();
          break;
        case "y":
          editor.redo();
          break;
      }
    };

    document.addEventListener("keyup", onKeyUp);
    return () => document.removeEventListener("keyup", onKeyUp);
  }, [editor]);

  const onToolSelect = useCallback(
    (tool, info) => {
      if (tool === editor.currentToolId) editor.currentTool.enter(info);
      else editor.setCurrentTool(tool, info);

      if (info) {
        if (tool === "icon") lastChoices.current.icon = info.name;
        else if (tool === "emoji") lastChoices.current.emoji = info.hexcode;
      }
    },
    [editor]
  );

  return (
    <>
      <div className="container toolbar">
        {tools.map(({ type, title, icon }, index) =>
          type !== "divider" ? (
            <button
              key={type}
              className="material-symbols-rounded"
              onClick={onToolSelect.bind(null, type)}
              data-isactive={editor.currentToolId === type}
              title={title}
            >
              {icon}
            </button>
          ) : (
            <div key={index} className="tlui-toolbar__divider"></div>
          )
        )}
      </div>

      <ExtraShapeTabs
        tabs={extraTools}
        onToolSelect={onToolSelect}
        currentToolId={editor.currentToolId}
      />

      <StylePanel editor={editor} />

      <UserPrefsMenu editor={editor} />
    </>
  );
}

export default track(CustomUI);
