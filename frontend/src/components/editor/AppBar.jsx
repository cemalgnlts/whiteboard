import { useEffect, useId, useState } from "react";

import { duplicateShapes } from "../../libs/utils";
import { getIncrementedName } from "@tldraw/tldraw";

/**
 *
 * @param {Object} param0
 * @param {import("@tldraw/tldraw").Editor} param0.editor
 * @returns
 */
function AppBar({ editor }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedShapes, setSelectedShapes] = useState(editor.selectedShapeIds);
  const [{ canUndo, canRedo }, setHistoryState] = useState({
    canUndo: editor.canUndo,
    canRedo: editor.canRedo
  });

  useEffect(() => {
    const onHistoryChange = () => {
      setHistoryState({
        canUndo: editor.canUndo,
        canRedo: editor.canRedo
      });

      setSelectedShapes(editor.selectedShapes);
    };

    editor.addListener("change", onHistoryChange);
    return () => editor.removeListener("change", onHistoryChange);
  }, [editor]);

  const undo = () => editor.undo();
  const redo = () => editor.redo();
  const removeSelectedShapes = () => editor.deleteShapes(selectedShapes);
  const dublicateSelectedShapes = () => duplicateShapes(editor);

  const addNewPage = (ev) => {
    ev.stopPropagation();
    const pageNames = editor.pages.map((page) => page.name);
    const name = getIncrementedName("Page", [...pageNames, "Page"]);
    const id = `page:${name}`;

    editor.createPage({ name, id });

    editor.setCurrentPage(id);
  };

  const changePage = (ev) => {
    const id = ev.target.dataset.id;
    editor.setCurrentPage(id);
    setIsMenuOpen(false);
  };

  const openPageMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="appBar">
      <button className="material-symbols-rounded">arrow_back</button>
      
      <div className="tlui-toolbar__divider"></div>
      
      <div className="select">
        <button
          className="page-button"
          onClick={openPageMenu}
          data-isactive={isMenuOpen}
        >
          {editor.currentPage.name}
        </button>

        <ul className="container select-list" onClick={changePage}>
          <li tabIndex={0} onClick={addNewPage}>
            <span></span>
            <span className="material-symbols-rounded">add</span>
            <span></span>
          </li>
          {editor.pages.map((page) => (
            <li
              tabIndex={0}
              data-id={page.id}
              data-isactive={page.id === editor.currentPageId}
            >
              {page.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="tlui-toolbar__divider"></div>
      <button
        className="material-symbols-rounded"
        onClick={undo}
        disabled={!canUndo}
      >
        undo
      </button>
      <button
        className="material-symbols-rounded btn-duplicate"
        title="CTRL - y"
        onClick={redo}
        disabled={!canRedo}
      >
        redo
      </button>
      <button
        className="material-symbols-rounded btn-dublicate"
        onClick={dublicateSelectedShapes}
        disabled={selectedShapes.length === 0}
      >
        content_copy
      </button>
      <button
        className="material-symbols-rounded"
        title="Delete - ⌫"
        onClick={removeSelectedShapes}
        disabled={selectedShapes.length === 0}
      >
        delete
      </button>
    </header>
  );
}

export default AppBar;
