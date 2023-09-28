import { memo } from "react";

import icons from "./icons.json";

import "./styles.css";

function IconSelector() {
  console.log("render");
  return (
    <div className="icon-container">
      {icons.map((name) => (
        <div key={name} className="icon">
          <button className="material-symbols-rounded">{name}</button>
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
}

export default memo(IconSelector);