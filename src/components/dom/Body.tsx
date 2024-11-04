// store
import { useDomStore } from '@/store';

// component
import { Hero, About, Skill, Experience, Project, Contact } from '@/components';

// gsap
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

export default function Body() {
	const torsoElStoreRegister = useDomStore(state => state?.torsoElRegister);

	return (
		<article
			className={`w-full h-full relative z-10 font-boxing pointer-events-none`}
			ref={torsoElStoreRegister}>
			<Hero />

			<div className='p-[6rem_3rem] flex flex-col gap-12'>
				<About />
				<Skill />
				<Experience />
				<Project />
			</div>

			<Contact />
		</article>
	);
}