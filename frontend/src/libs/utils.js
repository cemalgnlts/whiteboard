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
