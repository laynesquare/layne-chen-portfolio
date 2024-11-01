import { useRef } from 'react';

// three
import { useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Color, FrontSide, MeshBasicMaterial } from 'three';

// lenis
import { useLenis } from '@studio-freight/react-lenis';

// store
import { useDomStore } from '@/store';

// util
import { getScaleMultiplier } from '@/utils';

// constant
import { MESH_DISTANCE } from '@/config/constants';

export default function Texts() {
	const [viewport, size, camera] = useThree(state => [state.viewport, state.size, state.camera]);
	const textGroupRef = useRef(null);
	const textMeshRatio = getScaleMultiplier(MESH_DISTANCE.TEXT, viewport, camera, size);

	const materialDomText = useRef(
		new MeshBasicMaterial({
			color: new Color('#FFFFF0'),
			depthWrite: false,
			depthTest: false,
			side: FrontSide,
		}),
	);

	const materialDomTextHighlight = useRef(
		new MeshBasicMaterial({
			color: new Color('#FAFF00'),
			depthWrite: false,
			depthTest: false,
			side: FrontSide,
		}),
	);

	function updatePosition(offset: number) {
		if (!textGroupRef.current) return;
		const base = offset / viewport.factor;
		textGroupRef.current.position.y = base * textMeshRatio;
	}

	useLenis(event => updatePosition(event.scroll), [size]);

	return (
		<group
			name='text-mesh-group'
			ref={textGroupRef}>
			{[...useDomStore.getState().textEls].map((el, idx) => {
				const { fontSize, lineHeight, textAlign } = window.getComputedStyle(el);
				const { scrollY } = window;
				const { left, top, height, width } = el.getBoundingClientRect();
				const { fontFamily, scaleY, fontHighlight } = el.dataset;
				const { factor } = viewport;

				const parsedFontSize = parseFloat(fontSize);
				const parsedLineHeight = parseFloat(lineHeight);
				const ratio = textMeshRatio;
				const baseX = (-viewport.width / 2) * ratio;
				const baseY = (viewport.height / 2) * ratio;
				const scrollOffset = (scrollY / factor) * ratio;
				const material = fontHighlight ? materialDomTextHighlight.current : materialDomText.current;

				let pX = baseX + (left / factor) * ratio;
				let pY = baseY - (top / factor) * ratio - scrollOffset;
				let pZ = MESH_DISTANCE.TEXT;

				let sX = 1;
				let sY = 1;
				let sZ = 1;

				if (scaleY) {
					sY = parseFloat(scaleY);
				}

				return (
					<Text
						key={idx}
						{...domTextShared(fontFamily)}
						position={[pX, pY, pZ]}
						material={material}
						lineHeight={parsedLineHeight / parsedFontSize}
						maxWidth={(width / factor) * ratio * 1.03}
						scale={[sX, sY, sZ]}
						textAlign={textAlign}
						fontSize={(parsedFontSize / factor) * ratio}
						userData={el.dataset}
						characters={el.innerText}>
						{el.textContent}
					</Text>
				);
			})}
		</group>
	);
}

function domTextShared(type: 'boxing' | 'satoshi') {
	const fontFamily = {
		boxing: '/font/Boxing-Regular.woff',
		satoshi: '/font/Satoshi-Bold.woff',
	};

	return {
		font: fontFamily[type],
		anchorX: 'left',
		anchorY: 'top',
		overflowWrap: 'break-word',
	};
}
