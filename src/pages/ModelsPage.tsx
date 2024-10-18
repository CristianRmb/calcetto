import { Environment, OrbitControls, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
} from '@mui/material';

import { useState } from 'react';
import { DefaultAvatar } from '../components/DefaultAvatar';
import { useMatches } from '../useMatch';

function ModelsPage() {
	const [player, setPlayer] = useState({
		id: 7,
		model: 'models/Default.glb',
		trigger: false,
		action: 'Walking1',
		defaultAction: 'Walking1',
		sendAction: 'Walking1',
		defaultVictory: 'Victory',
		defaultDefeat: 'Defeat',
	});

	const match = useMatches();

	return (
		<Stack direction={{ xs: 'column-reverse', md: 'row' }} gap={2}>
			<Canvas
				style={{
					width: !match.matchSM ? 'calc(100vw - 58px)' : '50vw',
					height: 'calc(100vh - 64px)',
				}}
				shadows
				camera={{ position: [0, 0.5, 5], fov: 30 }}
			>
				<>
					<Sky sunPosition={[-100, 50, 100]} />
					<Environment preset='sunset' />

					<OrbitControls />
					{/* <TransformControls mode='translate' /> */}
					<group position-y={-1}>
						<DefaultAvatar player={player} />
					</group>
					<mesh position-y={-1} scale={5} rotation-x={-Math.PI * 0.5}>
						<planeGeometry args={[100, 100]} />
						<meshStandardMaterial color='white' />
					</mesh>
					{/* <ambientLight intensity={2} /> */}
				</>
			</Canvas>
			<Stack sx={{ ml: '20px', mt: '30px', width: '300px' }} gap={2}>
				<FormControl fullWidth>
					<InputLabel id='select_animation_id'>Select Animation</InputLabel>
					<Select
						labelId='select_animation_id'
						id='simple-select-animation'
						value={player.defaultAction}
						label='Select Animation'
						onChange={(e) => {
							setPlayer({
								...player,
								trigger: !player.trigger,
								defaultAction: e.target.value,
								action: e.target.value,
								sendAction: e.target.value,
							});
						}}
					>
						<MenuItem value={'Walking1'}>Walking1</MenuItem>
						<MenuItem value={'Walking2'}>Walking2</MenuItem>
						<MenuItem value={'Walking3'}>Walking3</MenuItem>
						<MenuItem value={'Walking4'}>Walking4</MenuItem>
						<MenuItem value={'Walking5'}>Walking5</MenuItem>
						<MenuItem value={'Walking6'}>Walking6</MenuItem>
						<MenuItem value={'Injured_Walking'}>Injured Walking</MenuItem>
						<MenuItem value={'Old_Man_Walk'}>Old Man Walk</MenuItem>
						<MenuItem value={'Walker_Walk'}>Walker Walk</MenuItem>
						<MenuItem value={'Sneak_Walk'}>Sneak Walk</MenuItem>
						<MenuItem value={'Crouched_Walking'}>Crouched Walking</MenuItem>
						<MenuItem value={'Catwalk_Walk'}>Catwalk Walk</MenuItem>
						<MenuItem value={'Victory'}>Victory</MenuItem>
						<MenuItem value={'Defeat'}>Defeat</MenuItem>
					</Select>
				</FormControl>
				{/* <FormControl fullWidth>
					<InputLabel id='select_avatar_id'>Select Avatar</InputLabel>
					<Select
						labelId='select_avatar_id'
						id='select_avatar'
						value={player.model}
						label='Select Avatar'
						onChange={(e) => {
							setPlayer({
								...player,
								model: e.target.value,
							});
						}}
					>
						<MenuItem value={'models/Default.glb'}>Default</MenuItem>
						<MenuItem value={'models/Loris.glb'}>Loris</MenuItem>
						<MenuItem value={'models/Francesco.glb'}>Francesco</MenuItem>
						<MenuItem value={'models/Ale.glb'}>Ale</MenuItem>
						<MenuItem value={'models/Laura.glb'}>Laura</MenuItem>
						<MenuItem value={'models/Cristian.glb'}>Cristian</MenuItem>
						<MenuItem value={'models/Mattia.glb'}>Mattia</MenuItem>
						<MenuItem value={'models/Cristina.glb'}>Cristina</MenuItem>
						<MenuItem value={'models/Enrico.glb'}>Enrico</MenuItem>
					</Select>
				</FormControl> */}
			</Stack>
		</Stack>
	);
}

export default ModelsPage;
