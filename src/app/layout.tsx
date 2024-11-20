import SmoothScrolling from '@/components/dom/SmoothScroll';
import localFont from 'next/font/local';

// type
import type { Metadata, Viewport } from 'next';

import './globals.css';

const boxing = localFont({ src: '../../public/font/Boxing-Regular.woff', variable: '--font-boxing' });
const satoshi = localFont({ src: '../../public/font/Satoshi-Bold.woff', variable: '--font-satoshi' });
const fonts = `${boxing.variable} ${satoshi.variable}`;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

export const viewport: Viewport = {
	themeColor: '#1a1a1a',
	colorScheme: 'dark',
};

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
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
	alternates: {
		canonical: './',
	},

	openGraph: {
		title: 'Layne Chen | Front-end Developer',
		description:
			'Proficient in TypeScript/JavaScript, React, Angular, Node.js, and MongoDB. Skilled in SSG/SSR, RESTful APIs, and UX design, with a focus on performance and aesthetics.',
		url: new URL('/', baseUrl),
		siteName: 'Layne Chen | Front-end Developer',
		images: [
			{
				url: new URL(`${baseUrl}/meta/layne-chen-socials.png`),
				width: 1200,
				height: 630,
			},
		],
		locale: 'en_US',
		type: 'website',
	},
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
			<head>
				<link
					fetchPriority='low'
					rel='mask-icon'
					href='/meta/safari-pinned-tab.svg'
					color='#25fea8'
				/>
				<link
					rel='shortcut icon'
					href='/favicon.ico'></link>
				<meta
					name='msapplication-TileColor'
					content='#1a1a1a'
				/>
				<meta
					name='msapplication-config'
					content={`${baseUrl}/meta/browserconfig.xml`}
				/>
			</head>
			<body>
				<SmoothScrolling>{children}</SmoothScrolling>
			</body>
		</html>
	);
}
