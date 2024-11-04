/**
 * @export
 * @param {number} val
 * @param {number} min
 * @param {number} max
 * @return {*}  {number}
 */
export default function getClampVal(val: number, min: number, max: number): number {
	return Math.min(Math.max(val, min), max);
}
