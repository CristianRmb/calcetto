import { OrbitControls, TransformControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { CristianAvatar } from '../components/CristianAvatar';
import { Stack } from '@mui/material';

function ModelsPage() {
	return (
		<Stack>
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
						<CristianAvatar />
					</group>
					<ambientLight intensity={2} />
				</>
			</Canvas>
		</Stack>
	);
}

export default ModelsPage;
