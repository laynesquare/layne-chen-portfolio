import type { Metadata } from 'next';
import Head from 'next/head';
import SmoothScrolling from '@/components/SmoothScroll';
import localFont from 'next/font/local';

import './globals.css';

const boxing = localFont({ src: '../public/font/Boxing-Regular.woff', variable: '--font-boxing' });
const satoshi = localFont({ src: '../public/font/Satoshi-Bold.woff', variable: '--font-satoshi' });
const fonts = `${boxing.variable} ${satoshi.variable}`;

export const metadata: Metadata = {
	title: 'Layne Chen | Front-end Developer',
	creator: 'Layne Chen',
	generator: 'Next.js',
	referrer: 'origin-when-cross-origin',
	description:
		'Proficient in TypeScript/JavaScript, React, Angular, Node.js, and MongoDB. Skilled in SSG/SSR, RESTful APIs, and UX design, with a focus on performance and aesthetics.',
	keywords: [
		'Frontend',
		'Backend',
		'TypeScript (JavaScript)',
		'HTML',
		'CSS/Sass',
		'Next.js',
		'React Router',
		'React Redux',
		'Angular',
		'Angular Universal',
		'RxJS',
		'Karma/Jasmine',
		'Tailwind CSS',
		'Bootstrap',
		'WebGL',
		'Three.js',
		'GSAP',
		'Node.js',
		'Express',
		'Mongoose',
		'MongoDB',
		'RESTful API',
		'Git (Sourcetree)',
		'GitLab',
		'Webpack',
		'Figma',
		'Illustrator',
		'Photoshop',
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			className={fonts}>
			<body>
				<SmoothScrolling>{children}</SmoothScrolling>
			</body>
		</html>
	);
}
