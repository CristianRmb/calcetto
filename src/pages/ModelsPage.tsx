import {
	Environment,
	OrbitControls,
	Sky,
	Preload,
	useGLTF,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	CircularProgress,
} from '@mui/material';

import { Suspense, useState, useEffect, useMemo } from 'react';
import { DefaultAvatar } from '../components/DefaultAvatar';
import { useMatches } from '../useMatch';

function ModelsPage() {
	const [loading, setLoading] = useState(true);
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

	// Precaricare il modello default per migliorare il caricamento iniziale
	useEffect(() => {
		// Indica il caricamento completato dopo un breve ritardo
		const timer = setTimeout(() => {
			setLoading(false);
		}, 800);

		// Pre-carica il modello default
		useGLTF.preload('models/Default.glb');

		return () => clearTimeout(timer);
	}, []);

	const canvasWidth = useMemo(
		() => (!match.matchSM ? 'calc(100vw - 58px)' : '50vw'),
		[match.matchSM]
	);

	return (
		<Stack direction={{ xs: 'column-reverse', md: 'row' }} gap={2}>
			{loading ? (
				<div
					style={{
						width: canvasWidth,
						height: 'calc(100vh - 64px)',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<CircularProgress />
				</div>
			) : (
				<Canvas
					style={{
						width: canvasWidth,
						height: 'calc(100vh - 64px)',
					}}
					shadows
					camera={{ position: [0, 0.5, 5], fov: 30 }}
					// Rimuoviamo frameloop="demand" per consentire animazioni continue
					dpr={[1, 1.5]} // Limita il Device Pixel Ratio per migliori performance
				>
					<Suspense fallback={null}>
						<Sky sunPosition={[-100, 50, 100]} />
						<Environment preset='sunset' />
						<OrbitControls enableDamping={false} makeDefault />
						<group position-y={-1}>
							<DefaultAvatar player={player} />
						</group>
						<mesh position-y={-1} scale={5} rotation-x={-Math.PI * 0.5}>
							<planeGeometry args={[100, 100]} />
							<meshStandardMaterial color='white' />
						</mesh>
						<Preload all /> {/* Precarica tutte le texture e i materiali */}
					</Suspense>
				</Canvas>
			)}
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
								defaultAction: e.target.value as string,
								action: e.target.value as string,
								sendAction: e.target.value as string,
							});
						}}
					>
						<MenuItem value={'Walking1'}>Walking1</MenuItem>
						<MenuItem value={'Walking2'}>Walking2</MenuItem>
						<MenuItem value={'Walking3'}>Walking3</MenuItem>
						<MenuItem value={'Walking4'}>Walking4</MenuItem>
						<MenuItem value={'Walking5'}>Walking5</MenuItem>
						<MenuItem value={'Walking6'}>Walking6</MenuItem>
						<MenuItem value={'Walking7'}>Walking7</MenuItem>
						<MenuItem value={'Walking8'}>Walking8</MenuItem>
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
			</Stack>
		</Stack>
	);
}

export default ModelsPage;
