import { memo, useState, useEffect, useRef } from "react";

import { FixedSizeGrid as Grid } from "react-window";

import { groupByCount } from "../../libs/utils";
import materialSymbolIcons from "../../libs/icons.json";

import { useDebounceCallback } from "../../hooks/useDebounceCallback";

let icons = [];

const Cell = memo(({ data, columnIndex, rowIndex, style }) => {
	const name = icons[rowIndex]?.[columnIndex];

	return name ? (
		<div className="picker-item" style={style}>
			<button
				className="material-symbols-rounded"
				onClick={() => data(name)}
			>
				{name}
			</button>
			<span>{name}</span>
		</div>
	) : null;
});

function IconSelector({ onToolSelect, isActive }) {
	const inpRef = useRef();
	const gridRef = useRef();
	const [debounce] = useDebounceCallback(onKeyDown, 500);

	const [{ colSize, rowSize }, setIconData] = useState({
		colSize: 0,
		rowSize: 0,
	});

	useEffect(() => {
		updateList(materialSymbolIcons);
	}, []);

	useEffect(() => {
		if(isActive) inpRef.current?.focus();
	}, [isActive]);

	const iconSelected = (name) => {
		onToolSelect("icon", { name });
	};

	const updateList = (data) => {
		icons = groupByCount(data, 5);

		setIconData({
			colSize: icons[0].length,
			rowSize: icons.length,
		});

		gridRef.current.scrollToItem({
			rowIndex: 0,
		});
	};

	const filterIcons = (query) => {
		const found = materialSymbolIcons.filter((icon) => icon.includes(query));
		updateList(found);
	}

	function onKeyDown() {
		const queryText = inpRef.current.value.trim().toLowerCase();

		if (queryText.length > 2) filterIcons(queryText);
		else if(queryText.length === 0) updateList(materialSymbolIcons);
	};

	return (
		<div className="picker-wrapper" data-isactive={isActive}>
			<input
				className="search-input"
				placeholder="Search"
				onKeyDown={debounce}
				ref={inpRef}
			/>
			<Grid
				className="picker-container"
				columnCount={colSize}
				columnWidth={54}
				rowCount={rowSize}
				rowHeight={58}
				width={280}
				height={350}
				itemData={iconSelected}
				ref={gridRef}
			>
				{Cell}
			</Grid>
		</div>
	);
}

export default memo(IconSelector);
