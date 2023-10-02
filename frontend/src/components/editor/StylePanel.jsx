import { useEffect, useState } from "react";

import { HexAlphaColorPicker } from "react-colorful";

import { material as materialColors } from "../../libs/colors.json";
import {
  DefaultColorStyle,
  DefaultColorThemePalette,
  DefaultDashStyle,
  DefaultFillStyle,
  DefaultSizeStyle,
  Editor
} from "@tldraw/tldraw";

import { colord } from "colord";

const paletteColorNames = ["red", "green", "blue", "orange", "violet"];

const borderSizeValues = ["s", "m", "l", "xl"];
const borderStyleValues = ["solid", "dashed", "dotted", "draw"];
const fillStyleValues = ["none", "solid", "semi", "pattern"];

const borderStyleIcons = ["crop_square", "select", "select", "crop_square"];

/**
 *
 * @param {Object} param0
 * @param {Editor} param0.editor
 * @returns
 */
function StylePanel({ editor }) {
  const [colors, setColors] = useState(materialColors);
  const [activeColor, setActiveColor] = useState(undefined);
  const [borderSize, setBorderSize] = useState("s");
  const [borderStyle, setBorderStyle] = useState("solid");
  const [fillStyle, setFillStyle] = useState("none");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    upateDefaultPalette();
  }, []);

  // Colors
  useEffect(() => {
    if (activeColor === undefined) return;

    const colorIndex = colors.findIndex((clr) => clr === activeColor);
    const colorName = paletteColorNames[colorIndex];

    upateDefaultPalette();

    if (editor.isIn("select"))
      editor.setStyleForSelectedShapes(DefaultColorStyle, colorName);

    editor.setStyleForNextShapes(DefaultColorStyle, colorName);

    blinkStyle();
  }, [activeColor]);

  // Border size
  useEffect(() => {
    if (editor.isIn("select"))
      editor.setStyleForSelectedShapes(DefaultSizeStyle, borderSize);

    editor.setStyleForNextShapes(DefaultSizeStyle, borderSize);

    blinkStyle();
  }, [borderSize]);

  // Border style
  useEffect(() => {
    if (editor.isIn("select"))
      editor.setStyleForSelectedShapes(DefaultDashStyle, borderStyle);

    editor.setStyleForNextShapes(DefaultDashStyle, borderStyle);

    blinkStyle();
  }, [borderStyle]);

  // Fill style
  useEffect(() => {
    if (editor.isIn("select"))
      editor.setStyleForSelectedShapes(DefaultFillStyle, fillStyle);

    editor.setStyleForNextShapes(DefaultFillStyle, fillStyle);

    blinkStyle();
  }, [fillStyle]);

  const blinkStyle = () => {
    const selectedIds = editor.selectedShapeIds;

    if (selectedIds.length === 0) return;

    editor.selectNone();

    setTimeout(() => editor.select(...selectedIds), 500);
  };

  const onColorChange = (color) => {
    const newPalette = colors.map((prevColor) =>
      prevColor === activeColor ? color : prevColor
    );

    setColors([...newPalette]);
    setActiveColor(color);
  };

  const upateDefaultPalette = () => {
    for (let i = 0; i < paletteColorNames.length; i++) {
      const name = paletteColorNames[i];
      const color = colors[i];

      const solid = color;
      const semi = colord(color).lighten(0.25).toHex();

      // Dark
      DefaultColorThemePalette.darkMode[name].solid = solid;
      DefaultColorThemePalette.darkMode[name].semi = semi;
      DefaultColorThemePalette.darkMode[name].pattern = semi;
      // Light
      DefaultColorThemePalette.lightMode[name].solid = solid;
      DefaultColorThemePalette.lightMode[name].semi = semi;
      DefaultColorThemePalette.lightMode[name].pattern = semi;
    }
  };

  const updateBorderSize = (ev) => {
    const size = ev.currentTarget.dataset.size;
    setBorderSize(size);
  };

  const updateBorderStyle = (ev) => {
    const style = ev.currentTarget.dataset.style;
    setBorderStyle(style);
  };

  const updateFillStyle = (ev) => {
    const style = ev.currentTarget.dataset.style;
    setFillStyle(style);
  };

  const toggleStylePanel = (ev) => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="container style-panel">
      <button
        className="style-panel__toggler material-symbols-rounded"
        alt="Toggle formatter"
        data-isactive={isOpen}
        onClick={toggleStylePanel}
      >
        format_paint
      </button>

      <div className="style-panel__content">
        <section>
          <h2>Color</h2>
          <div className="style-panel__section__content">
            <div className="color-palette">
              {colors.map((color) => (
                <button
                  key={color}
                  className="color-palette__color small"
                  style={{ color }}
                  data-isactive={activeColor === color}
                  onClick={() => setActiveColor(color)}
                ></button>
              ))}
            </div>
            <HexAlphaColorPicker color={activeColor} onChange={onColorChange} />
          </div>
        </section>

        <section>
          <h2>Border Width</h2>
          <div className="style-panel__section__content equal-size">
            {borderSizeValues.map((val, idx) => (
              <button
                key={val}
                className="material-symbols-rounded"
                onClick={updateBorderSize}
                data-isactive={val === borderSize}
                data-size={val}
                title={val}
              >
                pen_size_{idx + 1}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2>Border Style</h2>
          <div className="style-panel__section__content equal-size">
            {borderStyleValues.map((val, idx) => (
              <button
                key={val}
                className="material-symbols-rounded"
                onClick={updateBorderStyle}
                data-isactive={val === borderStyle}
                data-style={val}
                title={val}
              >
                {borderStyleIcons[idx]}
              </button>
            ))}
          </div>
        </section>

        <section className="style-panel__section__fill-style">
          <h2>Fill Style</h2>
          <div className="style-panel__section__content equal-size">
            {fillStyleValues.map((val, idx) => (
              <button
                key={val}
                className="material-symbols-rounded"
                onClick={updateFillStyle}
                data-isactive={val === fillStyle}
                data-style={val}
                title={val}
              >
                <img src={`/assets/icons/fill-${val}.svg`} />
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default StylePanel;
