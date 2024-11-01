/**
 * @export
 * @param {string} str
 * @param {number} maxLength
 * @return {*}  {string}
 */
export default function getTruncateText(str: string, maxLength: number): string {
	return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
}
