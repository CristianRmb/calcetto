import { Stack, Typography } from '@mui/material';
import Box from './3dBox';
import { Canvas } from '@react-three/fiber';
import { get_ranking } from './api';
import { useEffect, useState } from 'react';

import alessandro from './assets/alessandro.webp';
import francesco from './assets/francesco.jpg';
import loris from './assets/loris.jpg';
import achille from './assets/achille.jpg';
import mattia from './assets/mattia.jpeg';
import enrico from './assets/enrico.webp';
import cristian from './assets/cristian.jpg';
import laura from './assets/laura.png';
import cristina from './assets/cristina.jpg';
import stefano from './assets/stefano.jpeg';
import claudio from './assets/claudio.jpeg';
import marco from './assets/marco.jpeg';

interface Team {
	id: number;
	image_url: string;
	name: string;
	win_match: number;
	total_match: number;
	win_perc: number;
}

function App() {
	const [classifica, setClassifica] = useState<Team[]>([]);

	const foto = [
		{ id: 1, src: loris },
		{ id: 2, src: francesco },
		{ id: 3, src: alessandro },
		{ id: 4, src: laura },
		{ id: 5, src: achille },
		{ id: 6, src: cristian },
		{ id: 7, src: stefano },
		{ id: 8, src: claudio },
		{ id: 9, src: mattia },
		{ id: 10, src: cristina },
		{ id: 11, src: enrico },
		{ id: 12, src: marco },
	];

	useEffect(() => {
		get_ranking().then((data) => {
			if (data != null) {
				setClassifica(data);
			}
		});
	}, []);

	return (
		<Stack className='h-full'>
			{classifica.map((team, index) => (
				<Stack
					direction={'row'}
					justifyContent={'space-between'}
					alignItems={'center'}
				>
					<Canvas style={{ width: '50%' }}>
						<ambientLight intensity={Math.PI / 2} />
						<spotLight
							position={[10, 10, 10]}
							angle={0.15}
							penumbra={1}
							decay={0}
							intensity={Math.PI}
						/>
						<pointLight
							position={[-10, -10, -10]}
							decay={0}
							intensity={Math.PI}
						/>
						<Box
							position={[0, 0, 0]}
							// filter by team.id to get the correct image
							image={foto.find((f) => f.id === team.id)?.src || ''}
							speed={classifica.length - index}
						/>
					</Canvas>
					<Stack direction={'column'} width={200} pl={2}>
						<Typography variant='h6'>{team.name}</Typography>
						<Typography variant='body1'>
							{team.win_match}/{team.total_match} - {team.win_perc + '%'}
						</Typography>
					</Stack>
				</Stack>
			))}
		</Stack>
	);
}

export default App;
