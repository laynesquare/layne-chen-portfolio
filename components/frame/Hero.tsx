import React, { useRef } from 'react';
import { Html, useProgress } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const Hero = ({}) => {
	const { progress, item } = useProgress();
	const ctnRef = useRef(null);

	useGSAP(() => {
		if (progress === 100) {
			gsap.to(ctnRef.current, {
				opacity: 1,
				duration: 1.5,
				ease: 'power2.inOut',
			});
		}
	}, [progress]);

	return (
		<div
			className='absolute w-full top-0 left-0 opacity-0'
			ref={ctnRef}>
			<div className='h-dvh w-dvw relative'>
				<div className='top-10 left-10 absolute'>
					<h1 className='text-primary kronaOne.className text-5xl '>Layne Chen</h1>
				</div>

				<div className='bottom-10 left-10 absolute'>
					<h2 className='kronaOne.className text-4xl max-w-screen-lg leading-snug'>
						Engin€€ring High-Performance Web Experiences with Pre©ision and Expertise.
					</h2>
				</div>
			</div>
			<h1>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis in enim aliquid fugit error dignissimos
				nostrum numquam eius. Ea provident ducimus sit eaque delectus expedita doloremque architecto nisi
				deserunt recusandae rerum sunt reiciendis nemo debitis, ratione aperiam est nihil nesciunt commodi
				quidem. Ab, quas tempore? Obcaecati optio odio ut illum saepe, veniam quod omnis dolor illo libero
				voluptatibus aliquid iusto error laborum sapiente soluta eveniet laudantium consectetur labore incidunt
				quam temporibus! Illo est fugiat soluta laboriosam ex iusto at inventore a iste vel, id laborum odit
				error? Voluptatum labore tenetur mollitia numquam, fuga maiores saepe ad, maxime cupiditate culpa iste
				accusamus, eius nam a possimus quos facilis magnam laborum autem nihil similique id. Debitis totam
				aperiam, maiores nam repellendus architecto incidunt voluptas perferendis vitae soluta et
				necessitatibus? Quo obcaecati fuga magnam voluptas, aut aperiam velit nostrum harum pariatur? Magnam,
				ipsam odio animi dolorem deleniti molestias enim aut quod maxime dolor at sed illo dolores. Nulla, ea!
				Corrupti dolores eum voluptate tempora facere doloremque perferendis hic accusamus porro cupiditate,
				laborum soluta voluptatibus dicta exercitationem neque maxime aut alias qui, consectetur velit! Tempore
				laudantium reiciendis ipsam sit pariatur quas perferendis voluptates nihil. Sequi voluptatum enim porro
				provident mollitia commodi ipsam. Earum blanditiis iste sequi, quos error alias laboriosam eum aliquam
				corporis soluta repellendus praesentium aliquid nostrum eveniet laborum. Tempore cumque voluptatum iste,
				alias optio illum, quasi atque unde eos molestiae, tempora molestias maxime? Culpa, aliquam alias, amet
				officiis molestiae nostrum ad numquam impedit voluptates delectus, odit obcaecati quam suscipit officia
				iste fuga quas magnam! Enim nemo a ullam ea dignissimos, architecto corrupti magnam repellendus deleniti
				sapiente soluta amet natus fugit non velit laudantium sint omnis corporis est nostrum! Libero deleniti
				repellendus qui nisi quasi atque dolor eum. Esse architecto iusto consequatur aliquam dolorem molestiae
				consectetur praesentium, magnam consequuntur dolore, laudantium quibusdam! Eaque provident ipsum
				blanditiis error, repudiandae porro similique modi eos debitis vitae quidem enim voluptatibus sunt
				culpa, fugiat quis consequuntur temporibus perspiciatis tenetur id voluptas aspernatur accusantium non?
				Asperiores assumenda reprehenderit aliquam veritatis incidunt illo iusto, laborum et neque minus
				explicabo, molestiae voluptate consectetur quia quasi officiis, placeat corrupti iste. Harum corporis
				modi blanditiis dignissimos, quia nihil. Sunt fugit nesciunt ullam eos! Molestiae fuga asperiores porro
				incidunt aliquam aut deserunt voluptates nisi repellendus provident atque magni blanditiis, obcaecati
				exercitationem alias voluptatum cum adipisci doloremque. Necessitatibus odit maiores eligendi illo
				labore expedita dolorem tempora, quae dolores deserunt amet perspiciatis nihil tenetur quos maxime
				debitis aliquid porro ex rem quo veritatis quisquam. Quod quae est inventore ut quo vitae minus officia
				animi fugit alias error sint eligendi atque porro pariatur amet, deleniti sed, aliquid nihil! Similique
				ipsum totam dignissimos aperiam cumque quos eius consectetur, eaque eligendi ipsam corrupti at esse
				minus, quia voluptate cum modi accusantium vero. Autem, deserunt optio provident aut enim maxime
				molestias modi et, ut reiciendis architecto libero incidunt nulla quis labore ex eaque odit numquam id
				earum doloremque repudiandae. Suscipit unde nobis tempore. Ipsa eum iure deserunt corrupti illum? Fugit
				et, possimus quod velit qui excepturi officia repellat soluta magni eos vel voluptatum atque cupiditate,
				aspernatur laborum obcaecati inventore, magnam consequuntur. Soluta, ad? Voluptatum, nostrum, odio
				laudantium fugit repudiandae iste architecto sunt exercitationem blanditiis quo labore aperiam totam
				libero est atque iusto sequi nemo enim assumenda animi error illo vel. Dolores quibusdam similique
				temporibus veniam hic culpa repudiandae magni atque minus animi voluptas pariatur, illo qui dolorum
				repellendus odit, iusto sequi, repellat ab eius ipsam?
			</h1>
		</div>
	);
};

export default Hero;
