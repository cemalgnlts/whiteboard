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

/**
 * @param {String} clr Hex value format.
 * @param {Number} amt lighten or darken decimal value, example 0.5 to lighten by 50% or 1.5 to darken by 50%.
 */
export function colorShade(clr, amt) {
  const color = clr.slice(1);

  let r = Math.round(parseInt(color.slice(0, 2), 16) / amt);
  let g = Math.round(parseInt(color.slice(2, 4), 16) / amt);
  let b = Math.round(parseInt(color.slice(4), 16) / amt);

  r = r < 255 ? r : 255;
  g = g < 255 ? g : 255;
  b = b < 255 ? b : 255;

  const rr = r.toString(16).padEnd(2, "0");
  const gg = g.toString(16).padEnd(2, "0");
  const bb = b.toString(16).padEnd(2, "0");

  return `#${rr}${gg}${bb}`;
}