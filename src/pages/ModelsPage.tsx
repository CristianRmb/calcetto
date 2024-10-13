import { OrbitControls, TransformControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Button, Stack } from '@mui/material';
import { Model2Avatar } from '../components/Model2Avatar';
import { useState } from 'react';

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
				camera={{ position: [0, 1, 5], fov: 30 }}
			>
				<color attach='background' args={['#f0f0f0']} />

				<>
					<OrbitControls />
					{/* <TransformControls mode='translate' /> */}
					<group position-y={-1}>
						<Model2Avatar triggerAction={triggerAction} />
					</group>
					<ambientLight intensity={2} />
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
