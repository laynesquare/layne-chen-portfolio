// zustand
import { create } from 'zustand';

// three
import { Vector2 } from 'three';

// type
import type { cursorStore } from '@/types';

export const useCursorStore = create<cursorStore>(set => ({
	isRippleZone: true,
	isCustomCursor: true,
	ndcPosition: new Vector2(0, 0),
	curr: { x: 0, y: 0, cursor: 'auto' },
}));
