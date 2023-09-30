import { useRef, useEffect, useCallback } from "react";

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
	{ type: "asset", title: "Insert Attachment - i", icon: "attach_file_add" },
];

function CustomUI() {
	const editor = useEditor();
	const lastIcon = useRef("help");

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
					editor.setCurrentTool("asset");
					break;
				case "o":
					editor.setCurrentTool("icon", {
						name: lastIcon.current,
					});
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

	const onToolSelect = useCallback((tool, info = {}) => {
		if (editor.currentToolId === "icon") editor.currentTool.enter(info);
		else editor.setCurrentTool(tool, info);

		if (tool === "icon") lastIcon.current = info.name;
	}, [editor]);

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
						<button
							className="material-symbols-rounded"
							data-isactive={editor.currentToolId === "icon"}
							onClick={onToolSelect.bind(null, "icon")}
						>
							interests
						</button>
						<button className="material-symbols-rounded">add_reaction</button>
					</div>
					<div
						className={`tab-contents ${
							editor.currentToolId === "icon" ? "open" : ""
						}`}
					>
						<IconSelector onToolSelect={onToolSelect} />
					</div>
				</div>
			</aside>
		</>
	);
}

export default track(CustomUI);
