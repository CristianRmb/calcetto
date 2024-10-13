import { Environment, OrbitControls, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Button, Stack } from '@mui/material';

import { useState } from 'react';
import { DefaultAvatar } from '../components/DefaultAvatar';

function ModelsPage() {
	const [triggerAction, setTriggerAction] = useState({
		trigger: false,
		action: 'Walking',
	});

	return (
		<Stack direction={'row'}>
			<Canvas
				style={{
					width: '50vw',
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
						<DefaultAvatar
							model={'models/Default.glb'}
							triggerAction={triggerAction}
						/>
					</group>
					<mesh position-y={-1} scale={5} rotation-x={-Math.PI * 0.5}>
						<planeGeometry args={[100, 100]} />
						<meshStandardMaterial color='white' />
					</mesh>
					{/* <ambientLight intensity={2} /> */}
				</>
			</Canvas>
			<Stack sx={{ ml: '20px', mt: '30px' }} direction={'row'} gap={2}>
				<Button
					variant='contained'
					color='success'
					sx={{ height: 'max-content' }}
					onClick={() =>
						setTriggerAction({
							trigger: !triggerAction.trigger,
							action: 'Victory',
						})
					}
				>
					Win
				</Button>
				<Button
					variant='contained'
					color='error'
					sx={{ height: 'max-content' }}
					onClick={() =>
						setTriggerAction({
							trigger: !triggerAction.trigger,
							action: 'Defeat',
						})
					}
				>
					Lose
				</Button>
			</Stack>
		</Stack>
	);
}

export default ModelsPage;
