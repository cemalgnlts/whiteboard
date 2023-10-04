/**
 * 
 * @param {KeyboardEvent} ev 
 * @param {import("@tldraw/tldraw").Editor} editor 
 * @param {Object} lastChoices 
 * @returns 
 */
function handleKeyboardShortcuts(ev, editor, lastChoices) {
  const activeElTag = document.activeElement.tagName;

  if (activeElTag === "TEXTAREA" || activeElTag === "INPUT") return;

  switch (ev.key) {
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
        name: lastChoices.icon
      });
      break;
    case "o":
      editor.setCurrentTool("emoji", {
        hexcode: lastChoices.emoji
      });
      break;
    case "c":
      editor.setCurrentTool("ellipse");
      break;
    case "l":
      editor.setCurrentTool("line");
      break;
    case "Delete":
    case "Backspace":
      editor.deleteShapes(editor.selectedShapeIds);
      break;
    case "f":
      editor.zoomToSelection({
        duration: 250
      })
      break;
  }
}

export default handleKeyboardShortcuts;