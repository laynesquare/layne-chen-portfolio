import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		textColor: {
			primary: 'var(--color-font-primary)',
			secondary: 'var(--color-font-secondary)',
			neutral: 'var(--color-font-neutral)',
			neutralContrast: 'var(--color-font-neutral-contrast)',
			highlight: 'var(--color-font-highlight)',
		},
		backgroundColor: {
			primary: 'var(--color-bg-primary)',
			neutral: 'var(--color-bg-neutral)',
			neutralContrast: 'var(--color-bg-neutral-contrast)',
		},
		borderColor: {
			neutral: 'var(--color-border-neutral)',
			neutralContrast: 'var(--color-border-neutral-contrast)',
		},
		screens: {
			sm: '375px',
			md: '768px',
			lg: '1024px',
			xl: '1440px',
			'2xl': '1920px',
		},
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [],
};
export default config;
