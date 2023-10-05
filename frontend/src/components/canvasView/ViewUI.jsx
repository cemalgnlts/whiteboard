import { useState, useEffect } from "react";

import { track, useEditor } from "@tldraw/tldraw";

function ViewUI() {
  const editor = useEditor();
  const [tool, setTool] = useState(editor.currentToolId);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(editor.user.isDarkMode);

  useEffect(() => {
    const onKeyDown = (ev) => {
      switch (ev.key) {
        case "j":
          nextPage();
          break;
        case "k":
          prevPage();
          break;
        case "l":
          toggleLaser();
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [editor]);

  useEffect(() => {
    editor.setCurrentTool(tool);
  });

  // useEffect(() => {
  //   console.log(currentPage.id);
  //   editor.setCurrentPage(currentPage.id);
  //   fitScreen();
  // }, [currentPage]);

  const nextPage = () => {
    const pages = editor.pages;
    let index = pages.findIndex((p) => p.id === editor.currentPagId) + 1;

    if (index > pages.length) index = pages.length - 1;
    editor.setCurrentPage(pages[index]);
  };

  const prevPage = () => {
    const pages = editor.pages;
    let index = pages.findIndex((p) => p.id === editor.currentPageId) - 1;

    if (index < pages.length) index = 0;

    editor.setCurrentPage(pages[index]);
  };

  const changePage = (ev) => {
    const id = ev.target.dataset.id;
    editor.setCurrentPage(editor.pages.find((p) => p.id === id));

    fitScreen();
    setIsMenuOpen(false);
  };

  const fitScreen = () => {
    editor.updateViewportScreenBounds(true);
    editor.zoomToFit();

    if (editor.zoomLevel > 1) editor.resetZoom();
  };

  const openPageMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    const value = !isDarkMode;

    editor.user.updateUserPreferences({
      isDarkMode: value
    });

    setIsDarkMode(value);
  };

  const toggleLaser = () => {
    if (tool === "laser") setTool("hand");
    else setTool("laser");
  };

  return (
    <div
      className={`canvas-view-ui tl-container tl-theme__${
        editor.user.isDarkMode ? "dark" : "light"
      }`}
    >
      <header className="appBar">
        <div className="select">
          <button
            className="page-button"
            onClick={openPageMenu}
            data-isactive={isMenuOpen}
          >
            {editor.currentPage.name}
          </button>

          <ul className="container select-list" onClick={changePage}>
            {editor.pages.map((page) => (
              <li
                key={page.id}
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
          onClick={toggleTheme}
          title="Toggle"
        >
          {isDarkMode ? "light_mode" : "dark_mode"}
        </button>
        <button
          className="material-symbols-rounded"
          onClick={toggleLaser}
          title="Laser"
        >
          {tool === "hand" ? "stylus_laser_pointer" : "pan_tool"}
        </button>
      </header>
    </div>
  );
}

export default track(ViewUI);
