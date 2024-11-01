import { create } from 'zustand';
import { Vector2 } from 'three';

export const useCursorStore = create(set => ({
	isRippleZone: true,
	isCustomCursor: true,
	ndcPosition: new Vector2(0, 0),
	curr: { x: 0, y: 0, cursor: 'auto' },
}));
