import { Stack, Typography } from '@mui/material';
import Box from './3dBox';
import { Canvas } from '@react-three/fiber';
import { get_ranking } from './api';
import { useEffect, useState } from 'react';

interface Team {
	image_url: string;
	name: string;
	win_match: number;
	total_match: number;
	win_perc: number;
}

function App() {
	const [classifica, setClassifica] = useState<Team[]>([]);

	useEffect(() => {
		get_ranking().then((data) => {
			setClassifica(data);
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
							image={team.image_url}
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
