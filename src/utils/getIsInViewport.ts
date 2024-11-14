/**
 * Checks if the element is in the viewport.
 *
 * @param {Element | string} element - The DOM element or a selector string.
 * @param {number} [ratio=0] - The ratio of the element that needs to be visible (between 0 and 1).
 * @param {boolean} [horizontal=false] - Whether to check horizontally instead of vertically.
 * @returns {boolean} - True if the element is in the viewport based on the ratio and direction; otherwise, false.
 */
export default function isInViewport(
	element: Element | string,
	ratio: number = 0,
	horizontal: boolean = false,
): boolean {
	let el: Element | null;

	// Resolve the element if a selector string is provided
	if (typeof element === 'string') {
		el = document.querySelector(element);
		if (!el) {
			console.warn(`isInViewport: No element found for selector "${element}".`);
			return false;
		}
	} else {
		el = element;
	}

	const rect = el.getBoundingClientRect();
	const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
	const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

	if (horizontal) {
		// Horizontal check
		const elementWidth = rect.width;
		const visibleLeft = Math.max(rect.left, 0);
		const visibleRight = Math.min(rect.right, viewportWidth);
		const visibleWidth = Math.max(visibleRight - visibleLeft, 0);
		const visibleRatio = visibleWidth / elementWidth;

		return visibleRatio >= ratio;
	} else {
		// Vertical check
		const elementHeight = rect.height;
		const visibleTop = Math.max(rect.top, 0);
		const visibleBottom = Math.min(rect.bottom, viewportHeight);
		const visibleHeight = Math.max(visibleBottom - visibleTop, 0);
		const visibleRatio = visibleHeight / elementHeight;

		return visibleRatio >= ratio;
	}
}
