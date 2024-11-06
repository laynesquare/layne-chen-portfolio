// store
import { useDomStore } from '@/store';

// component
import { Hero, About, Skill, Experience, Project, Contact } from '@/components';

export default function Body() {
	const setTorso = useDomStore(state => state?.setTorso);

	return (
		<article
			className={`w-full h-full relative z-10 font-boxing pointer-events-none`}
			ref={setTorso}>
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
