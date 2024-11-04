import { create } from 'zustand';
import { Vector2 } from 'three';

interface cursorStore {
	isRippleZone: boolean;
	isCustomCursor: boolean;
	ndcPosition: Vector2;
	curr: { x: number; y: number; cursor: string };
}

export const useCursorStore = create<cursorStore>(set => ({
	isRippleZone: true,
	isCustomCursor: true,
	ndcPosition: new Vector2(0, 0),
	curr: { x: 0, y: 0, cursor: 'auto' },
}));
