import { useRef, useEffect } from "react";

/**
 * @param {function} fun Function
 * @param {Number} ms Milliseconds
 * @returns {Array<function>}
 */
export function useDebounceCallback(fun, ms) {
	const timerRef = useRef(null);

	useEffect(() => {
		return () => cancelDebounce();
	}, []);

	const cancelDebounce = () => {
		if (timerRef.current !== null) clearTimeout(timerRef.current);
	};

	const debounce = () => {
		cancelDebounce();
		timerRef.current = setTimeout(fun, ms);
	};

	return [debounce, cancelDebounce];
}
