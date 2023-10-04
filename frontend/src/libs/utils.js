import { Box2d, compact } from "@tldraw/tldraw";

export function groupByCount(arr, size = 1) {
  if (arr.length < size) return [arr];

  return arr.reduce((acc, cur, idx) => {
    if (idx % size === 0) acc.push([cur]);
    else acc[acc.length - 1].push(cur);

    return acc;
  }, []);
}

export function getEmoji(emoji) {
  const emojiCode = emoji.codePointAt(0).toString(16).toUpperCase();
  return `https://openmoji.org/data/color/svg/${emojiCode}.svg`;
}

export function duplicateShapes(editor) {
  const ids = editor.selectedShapeIds;
  const commonBounds = Box2d.Common(
    compact(ids.map((id) => editor.getShapePageBounds(id)))
  );
  const offset = editor.instanceState.canMoveCamera
    ? {
        x: commonBounds.width + 10,
        y: 0
      }
    : {
        x: 16 / editor.zoomLevel,
        y: 16 / editor.zoomLevel
      };

  editor.mark("duplicate shapes");
  editor.duplicateShapes(ids, offset);
}
