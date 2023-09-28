import { memo, useEffect } from "react";

import { useEditor, track } from "@tldraw/tldraw";

import "./styles.css";
import IconSelector from "../iconSelector/IconSelector";

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
  { type: "asset", title: "Insert Attachment - i", icon: "attach_file_add" }
];

function CustomUI() {
  const editor = useEditor();

  useEffect(() => {
    const handleKeyUp = (e) => {
      if(document.activeElement.tagName === "TEXTAREA") return;
      
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
          editor.setCurrentTool("asset");
          break;
        case "o":
          editor.setCurrentTool("icon", {
            icon: "hand"
          });
          editor.setCurrentTool("icon").prop
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

  const onToolSelect = (tool) => {
    editor.setCurrentTool(tool);
  };

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

      <aside className="container right-aside">
        <div className="right-aside__content">
          <div className="tab-buttons">
            <button className="material-symbols-rounded">interests</button>
            <button className="material-symbols-rounded">add_reaction</button>
          </div>
          <div className="tab-contents">
            {/* <IconSelector /> */}
          </div>
        </div>
      </aside>
    </>
  );
};

export default track(CustomUI);
