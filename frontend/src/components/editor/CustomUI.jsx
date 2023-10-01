import { useRef, useEffect, useCallback } from "react";

import { useEditor, track } from "@tldraw/tldraw";

import "./styles.css";

import ExtraShapeTabs from "../extraShapeTabs/ExtraShapeTabs";
import IconSelector from "../iconSelector/IconSelector";
import EmojiPicker from "../emojiPicker";

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
  { type: "geo", title: "Ellipse - o", icon: "circle" },
  { type: "line", title: "Line - l", icon: "pen_size_2" }
];

const extraTools = [
  { type: "icon", title: "Icon - i", icon: "interests", picker: IconSelector },
  {
    type: "emoji",
    title: "Openmoji - o",
    icon: "add_reaction",
    picker: EmojiPicker
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
  }, []);

  useEffect(() => {
    const handleKeyUp = (e) => {
      const activeElTag = document.activeElement.tagName;

      if (activeElTag === "TEXTAREA" || activeElTag === "INPUT") return;

      switch (e.key) {
        case "s":
          editor.setCurrentTool("select");
          break;
        case "h":
          editor.setCurrentTool("hand");
          break;
        case "p":
          editor.setCurrentTool("draw");
          break;
        case "t":
          editor.setCurrentTool("text");
          break;
        case "e":
          editor.setCurrentTool("eraser");
          break;
        case "a":
          editor.setCurrentTool("arrow");
          break;
        case "r":
          editor.setCurrentTool("geo");
          break;
        case "i":
          editor.setCurrentTool("icon", {
            name: lastChoices.current.icon
          });
          break;
        case "o":
          editor.setCurrentTool("emoji", {
            hexcode: lastChoices.current.emoji
          });
          break;
        case "c":
          editor.setCurrentTool("geo");
          break;
        case "l":
          editor.setCurrentTool("line");
          break;
        case "Delete":
        case "Backspace":
          editor.deleteShapes(editor.selectedShapeIds);
          break;
      }
    };

    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [editor]);

  const onToolSelect = useCallback(
    (tool, info) => {
      if (tool === editor.currentToolId) editor.currentTool.enter(info);
      else editor.setCurrentTool(tool, info);

      if (info) {
        if (tool === "icon") lastChoices.current.icon = tool.name;
        else if (tool === "emoji") lastChoices.current.emoji = tool.hexcode;
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

      {/* <aside className="container right-aside">
        <div className="right-aside__content">
          <div className="tab-buttons">
            <button
              className="material-symbols-rounded"
              data-isactive={editor.currentToolId === "icon"}
              onClick={onToolSelect.bind(null, "icon")}
            >
              interests
            </button>
            <button
              className="material-symbols-rounded"
              data-isactive={editor.currentToolId === "emoji"}
              onClick={onToolSelect.bind(null, "emoji")}
            >
              add_reaction
            </button>
          </div>
          <div className="tab-contents">
            <section className="emoji" style={{display: editor.currentToolId === "icon" ? "" : "none"}}>
              <IconSelector onToolSelect={onToolSelect} />
            </section>
            <section className="icon" style={{display: editor.currentToolId === "icon" ? "" : "none"}}>
              <EmojiPicker onToolSelect={onToolSelect} />
            </section>
          </div>
        </div>
      </aside> */}
    </>
  );
}

export default track(CustomUI);
