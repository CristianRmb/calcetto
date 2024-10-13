import { Button, Grid2, Stack, Typography } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { get_ranking } from '../api';
import { Environment, OrbitControls, Sky } from '@react-three/drei';
import { DefaultAvatar } from '../components/DefaultAvatar';

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

	const [players, setPlayers] = useState([
		{
			id: 1,
			model: 'models/Loris.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Walking2',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
		{
			id: 2,
			model: 'models/Francesco.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Walking4',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
		{
			id: 3,
			model: 'models/Ale.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Old_Man_Walk',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
		{
			id: 4,
			model: 'models/Laura.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Injured_Walking',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
		{
			id: 5,
			model: 'models/Achille.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Walking5',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
		{
			id: 6,
			model: 'models/Cristian.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Walking3',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
		{
			id: 7,
			model: 'models/Default.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Catwalk_Walk',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
		{
			id: 8,
			model: 'models/Default.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Catwalk_Walk',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
		{
			id: 9,
			model: 'models/Mattia.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Sneak_Walk',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
		{
			id: 10,
			model: 'models/Cristina.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Walking1',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
		{
			id: 11,
			model: 'models/Enrico.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Walking6',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
		{
			id: 12,
			model: 'models/Default.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Catwalk_Walk',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
	]);

	useEffect(() => {
		get_ranking().then((data) => {
			if (data != null) {
				setClassifica(data);
			}
		});
	}, []);

	return (
		<Grid2
			id='grid_data'
			container
			spacing={2}
			className='h-full'
			justifyContent='center' // Centers content horizontally
			alignItems='center'
		>
			{classifica.map((team, index) => (
				<Stack
					direction={'row'}
					justifyContent={'space-between'}
					alignItems={'center'}
					id={'team'}
				>
					{/* <Canvas style={{ width: '50%' }}>
						<OrbitControls />
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
					</Canvas> */}
					<Canvas
						style={{
							width: '250px',
							height: '400px',
						}}
						shadows
						camera={{ position: [0, 0.5, 5], fov: 30 }}
						id='canvas'
					>
						<color attach='background' args={['#f0f0f0']} />
						<>
							{/* <ambientLight intensity={Math.PI / 2} /> */}
							{/* <Environment preset='sunset' />
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
							/> */}
							<OrbitControls />
							<Sky sunPosition={[-100, 50, 100]} />
							<Environment preset='sunset' />
							<group position-y={-1}>
								<DefaultAvatar player={players.find((f) => f.id === team.id)} />
							</group>
							<mesh position-y={-1} scale={5} rotation-x={-Math.PI * 0.5}>
								<planeGeometry args={[100, 100]} />
								<meshStandardMaterial color='white' />
							</mesh>
							{/* <ambientLight intensity={2} /> */}
						</>
					</Canvas>
					<Stack direction={'column'} width={200} pl={2}>
						<Typography variant='h6'>{index + 1}</Typography>
						<Typography variant='h6'>{team.name}</Typography>
						<Typography variant='body1'>
							{team.win_match}/{team.total_match} - {team.win_perc + '%'}
						</Typography>

						<Stack sx={{ ml: '20px', mt: '30px' }} direction={'row'} gap={2}>
							<Button
								variant='contained'
								color='success'
								sx={{ height: 'max-content' }}
								onClick={() => {
									const newPlayers = [...players];
									const player = newPlayers.find((f) => f.id === team.id);
									if (player) {
										player.trigger = !player.trigger;
										player.sendAction = 'Victory';
									}
									setPlayers(newPlayers);
								}}
							>
								Win
							</Button>
							<Button
								variant='contained'
								color='error'
								sx={{ height: 'max-content' }}
								onClick={() => {
									const newPlayers = [...players];
									const player = newPlayers.find((f) => f.id === team.id);
									if (player) {
										player.trigger = !player.trigger;
										player.sendAction = 'Defeat';
									}
									setPlayers(newPlayers);
								}}
							>
								Lose
							</Button>
						</Stack>
					</Stack>
				</Stack>
			))}
		</Grid2>
	);
}

export default App;
