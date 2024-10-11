import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame, ThreeElements, useLoader } from '@react-three/fiber';

function Box(props: ThreeElements['mesh'] & { image: string; speed: number }) {
	const meshRef = useRef<THREE.Mesh>(null!);
	const [hovered] = useState(false);

	const adjustedSpeed = 0.001 + 0.002 * props.speed;
	useFrame((_state, _delta) => {
		meshRef.current.rotation.x += adjustedSpeed; // Rotation on the x-axis
		meshRef.current.rotation.y -= adjustedSpeed * 0.5; // Reverse rotation on the y-axis
	});

	const texture = useLoader(THREE.TextureLoader, props.image);
	return (
		<mesh
			{...props}
			ref={meshRef}
			scale={3}
			// onClick={(event) => setActive(!active)}
			// onPointerOver={(event) => setHover(true)}
			// onPointerOut={(event) => setHover(false)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial
				map={texture}
				color={hovered ? 'hotpink' : 'white'}
			/>
		</mesh>
	);
}

export default Box;
