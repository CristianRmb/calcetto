import * as THREE from 'three';
import React, { useEffect, useMemo } from 'react';
import { useGraph } from '@react-three/fiber';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { GLTF, SkeletonUtils } from 'three-stdlib';

type GLTFResult = GLTF & {
	nodes: {
		Wolf3D_Hair: THREE.SkinnedMesh;
		Wolf3D_Glasses: THREE.SkinnedMesh;
		Wolf3D_Body: THREE.SkinnedMesh;
		Wolf3D_Outfit_Bottom: THREE.SkinnedMesh;
		Wolf3D_Outfit_Footwear: THREE.SkinnedMesh;
		Wolf3D_Outfit_Top: THREE.SkinnedMesh;
		EyeLeft: THREE.SkinnedMesh;
		EyeRight: THREE.SkinnedMesh;
		Wolf3D_Head: THREE.SkinnedMesh;
		Wolf3D_Teeth: THREE.SkinnedMesh;
		Hips: THREE.Bone;
	};
	materials: {
		Wolf3D_Hair: THREE.MeshStandardMaterial;
		Wolf3D_Glasses: THREE.MeshStandardMaterial;
		Wolf3D_Body: THREE.MeshStandardMaterial;
		Wolf3D_Outfit_Bottom: THREE.MeshStandardMaterial;
		Wolf3D_Outfit_Footwear: THREE.MeshStandardMaterial;
		Wolf3D_Outfit_Top: THREE.MeshStandardMaterial;
		Wolf3D_Eye: THREE.MeshStandardMaterial;
		Wolf3D_Skin: THREE.MeshStandardMaterial;
		Wolf3D_Teeth: THREE.MeshStandardMaterial;
	};
};

interface Player {
	id: number;
	model: string;
	trigger: boolean;
	action: string;
	defaultAction: string;
	sendAction: string;
	defaultVictory: string;
	defaultDefeat: string;
}

export function DefaultModel(
	props: JSX.IntrinsicElements['group'] & { player: Player }
) {
	const {
		model,
		trigger,
		defaultAction,
		sendAction,
		defaultVictory,
		defaultDefeat,
	} = props.player;

	// Usa il caching per i modelli
	const { scene } = useGLTF(model);
	const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
	const { nodes, materials } = useGraph(clone) as GLTFResult;
	const group = React.useRef<THREE.Group>(null);

	// Carica tutti gli hooks necessari in modo incondizionale
	// questo rispetta le regole degli hooks React
	const walking1Animation = useFBX('animations/Walking_1.fbx');
	const walking2Animation = useFBX('animations/Walking_2.fbx');
	const walking3Animation = useFBX('animations/Walking_3.fbx');
	const walking4Animation = useFBX('animations/Walking_4.fbx');
	const walking5Animation = useFBX('animations/Walking_5.fbx');
	const walking6Animation = useFBX('animations/Walking_6.fbx');
	const walking7Animation = useFBX('animations/Walking_7.fbx');
	const walking8Animation = useFBX('animations/Walking_8.fbx');
	const oldManWalkAnimation = useFBX('animations/Old_Man_Walk.fbx');
	const injuredWalkingAnimation = useFBX('animations/Injured_Walking.fbx');
	const walkerWalkAnimation = useFBX('animations/Walker_Walk.fbx');
	const sneakWalkAnimation = useFBX('animations/Sneak_Walk.fbx');
	const crouchedWalkingAnimation = useFBX('animations/Crouched_Walking.fbx');
	const catwalkWalkAnimation = useFBX('animations/Catwalk_Walk.fbx');
	const victoryAnimation = useFBX('animations/Victory.fbx');
	const defeatAnimation = useFBX('animations/Defeat.fbx');

	// Mappa delle animazioni caricate
	const animationMap = useMemo(
		() => ({
			Walking1: walking1Animation,
			Walking2: walking2Animation,
			Walking3: walking3Animation,
			Walking4: walking4Animation,
			Walking5: walking5Animation,
			Walking6: walking6Animation,
			Walking7: walking7Animation,
			Walking8: walking8Animation,
			Old_Man_Walk: oldManWalkAnimation,
			Injured_Walking: injuredWalkingAnimation,
			Walker_Walk: walkerWalkAnimation,
			Sneak_Walk: sneakWalkAnimation,
			Crouched_Walking: crouchedWalkingAnimation,
			Catwalk_Walk: catwalkWalkAnimation,
			Victory: victoryAnimation,
			Defeat: defeatAnimation,
		}),
		[
			walking1Animation,
			walking2Animation,
			walking3Animation,
			walking4Animation,
			walking5Animation,
			walking6Animation,
			walking7Animation,
			walking8Animation,
			oldManWalkAnimation,
			injuredWalkingAnimation,
			walkerWalkAnimation,
			sneakWalkAnimation,
			crouchedWalkingAnimation,
			catwalkWalkAnimation,
			victoryAnimation,
			defeatAnimation,
		]
	);

	// Ora possiamo utilizzare la mappa in modo sicuro con useMemo
	const createAnimations = useMemo(() => {
		const actions: { [key: string]: ReturnType<typeof useAnimations> } = {};
		const keys = new Set(
			[defaultAction, sendAction, defaultVictory, defaultDefeat].filter(Boolean)
		);

		keys.forEach((key) => {
			//@ts-ignore
			if (key && animationMap[key]) {
				// @ts-ignore
				const { animations } = animationMap[key] as any;
				animations[0].name = key;
				actions[key] = useAnimations(animations, group);
			}
		});

		return actions;
	}, [animationMap, defaultAction, sendAction, defaultVictory, defaultDefeat]);

	const animations = createAnimations;

	// Esegui le azioni di default
	useEffect(() => {
		if (defaultAction && animations[defaultAction]) {
			changeAction(defaultAction, '');
		}
	}, [defaultAction, animations]);

	useEffect(() => {
		if (sendAction && animations[sendAction]) {
			changeAction(sendAction, defaultAction);
		}
	}, [sendAction, animations, defaultAction]);

	// Gestione del trigger per azioni specifiche come Victory/Defeat
	useEffect(() => {
		if (trigger) {
			switch (sendAction) {
				case 'Victory':
					animations.Victory?.actions[defaultVictory]
						?.setLoop(THREE.LoopOnce, 1)
						?.reset()
						?.play();
					break;
				case 'Defeat':
					animations.Defeat?.actions[defaultDefeat]
						?.setLoop(THREE.LoopOnce, 1)
						?.reset()
						?.play();
					break;
				default:
					break;
			}
		}
	}, [trigger, sendAction, defaultVictory, defaultDefeat, animations]);

	const stopAllAnimations = (exclude: string) => {
		Object.keys(animations).forEach((key) => {
			if (key !== exclude && animations[key]) {
				animations[key].actions[key]?.stop();
			}
		});
	};

	// Cambia l'azione corrente
	const changeAction = (action: string, previousAction: string) => {
		stopAllAnimations(previousAction);
		animations[action]?.actions[action]?.reset().play();
	};

	// Ottimizzazione dei materiali
	useMemo(() => {
		Object.values(materials).forEach((material) => {
			material.roughness = 0.8; // Riduce la qualità dei riflessi
			material.envMapIntensity = 0.5; // Riduce l'intensità della mappa ambientale
		});
	}, [materials]);

	return (
		<group key={model} rotation-x={-Math.PI / 2} rotation-z={0.1}>
			<group ref={group} {...props} dispose={null}>
				<primitive object={nodes.Hips} />
				{nodes.Wolf3D_Hair && (
					<skinnedMesh
						geometry={nodes.Wolf3D_Hair.geometry}
						material={materials.Wolf3D_Hair}
						skeleton={nodes.Wolf3D_Hair.skeleton}
					/>
				)}
				{nodes.Wolf3D_Glasses && (
					<skinnedMesh
						geometry={nodes.Wolf3D_Glasses.geometry}
						material={materials.Wolf3D_Glasses}
						skeleton={nodes.Wolf3D_Glasses.skeleton}
					/>
				)}
				{nodes.Wolf3D_Body && (
					<skinnedMesh
						geometry={nodes.Wolf3D_Body.geometry}
						material={materials.Wolf3D_Body}
						skeleton={nodes.Wolf3D_Body.skeleton}
					/>
				)}
				{nodes.Wolf3D_Outfit_Bottom && (
					<skinnedMesh
						geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
						material={materials.Wolf3D_Outfit_Bottom}
						skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
					/>
				)}
				{nodes.Wolf3D_Outfit_Footwear && (
					<skinnedMesh
						geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
						material={materials.Wolf3D_Outfit_Footwear}
						skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
					/>
				)}
				{nodes.Wolf3D_Outfit_Top && (
					<skinnedMesh
						geometry={nodes.Wolf3D_Outfit_Top.geometry}
						material={materials.Wolf3D_Outfit_Top}
						skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
					/>
				)}
				{nodes.EyeLeft && (
					<skinnedMesh
						name='EyeLeft'
						geometry={nodes.EyeLeft.geometry}
						material={materials.Wolf3D_Eye}
						skeleton={nodes.EyeLeft.skeleton}
						morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
						morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
					/>
				)}
				{nodes.EyeRight && (
					<skinnedMesh
						name='EyeRight'
						geometry={nodes.EyeRight.geometry}
						material={materials.Wolf3D_Eye}
						skeleton={nodes.EyeRight.skeleton}
						morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
						morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
					/>
				)}
				{nodes.Wolf3D_Head && (
					<skinnedMesh
						name='Wolf3D_Head'
						geometry={nodes.Wolf3D_Head.geometry}
						material={materials.Wolf3D_Skin}
						skeleton={nodes.Wolf3D_Head.skeleton}
						morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
						morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
					/>
				)}
				{nodes.Wolf3D_Teeth && (
					<skinnedMesh
						name='Wolf3D_Teeth'
						geometry={nodes.Wolf3D_Teeth.geometry}
						material={materials.Wolf3D_Teeth}
						skeleton={nodes.Wolf3D_Teeth.skeleton}
						morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
						morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
					/>
				)}
			</group>
		</group>
	);
}

// Precarica solo il modello di default per migliorare le prestazioni iniziali
useGLTF.preload('models/Default.glb');
