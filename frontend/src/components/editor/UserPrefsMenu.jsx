import { useState } from "react";

import { Editor } from "@tldraw/tldraw";

/**
 *
 * @param {Object} param0
 * @param {Editor} param0.editor
 */
function UserPrefsMenu({ editor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(editor.user.isDarkMode);
  const [gridMode, setGridMode] = useState(editor.instanceState.isGridMode);
  const [snapMode, setSnapMode] = useState(editor.user.isSnapMode);

  const toggleTheme = () => {
    const value = !isDarkTheme;
    editor.user.updateUserPreferences({ isDarkMode: value });
    setIsDarkTheme(value);

    setIsOpen(false);
  };

  const toggleSnapMode = () => {
    const value = !snapMode;
    editor.user.updateUserPreferences({ isSnapMode: value });
    setSnapMode(value);

    setIsOpen(false);
  };

  const toggleGridMode = () => {
    const value = !gridMode;
    editor.updateInstanceState({ isGridMode: value });
    setGridMode(value);

    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`user-prefs${isOpen ? " open" : ""}`}>
      <div className="container">
        <button
          className="material-symbols-rounded"
          data-isactive={isOpen}
          onClick={toggleMenu}
        >
          settings
        </button>
      </div>

      <ul className="container user-prefs__content select-list">
        <li tabIndex={0} onClick={toggleTheme}>
          <span className="material-symbols-rounded">
            {isDarkTheme ? "light_mode" : "dark_mode"}
          </span>
          Change theme
        </li>
        <li tabIndex={0} onClick={toggleGridMode}>
          <span className="material-symbols-rounded">
            {gridMode ? "grid_off" : "grid_on"}
          </span>
          Toggle grid mode
        </li>
        <li tabIndex={0} onClick={toggleSnapMode}>
          <span className="material-symbols-rounded">
            {snapMode ? "grid_3x3_off" : "grid_3x3"}
          </span>
          Toggle snap mode
        </li>
      </ul>
    </div>
  );
}

export default UserPrefsMenu;
