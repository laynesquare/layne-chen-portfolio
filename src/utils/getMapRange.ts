import { getClampVal } from '@/utils';

export default function getMapRange(value: number, start1: number, stop1: number, start2: number, stop2: number) {
	return getClampVal(start2 + ((value - start1) * (stop2 - start2)) / (stop1 - start1), 0, 100);
}
