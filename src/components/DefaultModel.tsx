import * as THREE from 'three';
import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useGraph } from '@react-three/fiber';
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
	name?: string;
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

	// Load the model and handle fallback
	const { scene } = useGLTF(model);
	const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
	const { nodes, materials } = useGraph(clone) as GLTFResult;
	const group = useRef<THREE.Group>(null);

	// Carica tutte le animazioni in modo incondizionale
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

	// Rinomina tutte le animazioni
	walking1Animation.animations[0].name = 'Walking1';
	walking2Animation.animations[0].name = 'Walking2';
	walking3Animation.animations[0].name = 'Walking3';
	walking4Animation.animations[0].name = 'Walking4';
	walking5Animation.animations[0].name = 'Walking5';
	walking6Animation.animations[0].name = 'Walking6';
	walking7Animation.animations[0].name = 'Walking7';
	walking8Animation.animations[0].name = 'Walking8';
	oldManWalkAnimation.animations[0].name = 'Old_Man_Walk';
	injuredWalkingAnimation.animations[0].name = 'Injured_Walking';
	walkerWalkAnimation.animations[0].name = 'Walker_Walk';
	sneakWalkAnimation.animations[0].name = 'Sneak_Walk';
	crouchedWalkingAnimation.animations[0].name = 'Crouched_Walking';
	catwalkWalkAnimation.animations[0].name = 'Catwalk_Walk';
	victoryAnimation.animations[0].name = 'Victory';
	defeatAnimation.animations[0].name = 'Defeat';

	// Aggiungi tutte le animazioni a un array
	const animations = [
		walking1Animation.animations[0],
		walking2Animation.animations[0],
		walking3Animation.animations[0],
		walking4Animation.animations[0],
		walking5Animation.animations[0],
		walking6Animation.animations[0],
		walking7Animation.animations[0],
		walking8Animation.animations[0],
		oldManWalkAnimation.animations[0],
		injuredWalkingAnimation.animations[0],
		walkerWalkAnimation.animations[0],
		sneakWalkAnimation.animations[0],
		crouchedWalkingAnimation.animations[0],
		catwalkWalkAnimation.animations[0],
		victoryAnimation.animations[0],
		defeatAnimation.animations[0],
	];

	// Usa il hook useAnimations standard fornito da drei
	const { actions } = useAnimations(animations, group);
	const activeAction = useRef('');

	// Simple helper function to play an animation
	const playAnimation = (name: string) => {
		// Stop all current animations
		if (activeAction.current && actions[activeAction.current]) {
			// @ts-ignore
			actions[activeAction.current].fadeOut(0.3);
		}

		// Start the new animation
		if (actions[name]) {
			actions[name].reset().fadeIn(0.3).play();
			activeAction.current = name;
		}
	};

	// Esegui l'animazione di default quando il componente viene montato
	useEffect(() => {
		if (defaultAction && actions[defaultAction]) {
			// Configurazione iniziale dell'animazione predefinita
			playAnimation(defaultAction);
		}
	}, [defaultAction, actions]);

	// Gestisci il cambio di animazione quando sendAction cambia
	useEffect(() => {
		if (
			sendAction &&
			sendAction !== activeAction.current &&
			actions[sendAction]
		) {
			playAnimation(sendAction);
		}
	}, [sendAction, actions]);

	// Gestione del trigger per victory/defeat
	useEffect(() => {
		if (trigger) {
			if (sendAction === 'Victory' && actions['Victory']) {
				actions['Victory'].reset().fadeIn(0.3).play();
				activeAction.current = 'Victory';

				// Torna all'animazione predefinita dopo 2 secondi
				const timer = setTimeout(() => {
					if (defaultAction && actions[defaultAction]) {
						playAnimation(defaultAction);
					}
				}, 2000);

				return () => clearTimeout(timer);
			} else if (sendAction === 'Defeat' && actions['Defeat']) {
				actions['Defeat'].reset().fadeIn(0.3).play();
				activeAction.current = 'Defeat';

				// Torna all'animazione predefinita dopo 2 secondi
				const timer = setTimeout(() => {
					if (defaultAction && actions[defaultAction]) {
						playAnimation(defaultAction);
					}
				}, 2000);

				return () => clearTimeout(timer);
			}
		}
	}, [trigger, sendAction, defaultAction, actions]);

	// Ottimizza i materiali
	useEffect(() => {
		if (materials) {
			Object.values(materials).forEach((material) => {
				material.roughness = 0.8;
				material.envMapIntensity = 0.5;
			});
		}
	}, [materials]);

	// Debug con useFrame (commentato)
	useFrame(() => {
		// Per debugging, se necessario
		// console.log(`Modello: ${model}, Animazione attiva: ${activeAction.current}`);
	});

	return (
		<group key={model} rotation-x={-Math.PI / 2} rotation-z={0.1}>
			<group ref={group} {...props} dispose={null}>
				{nodes?.Hips && <primitive object={nodes.Hips} />}
				{nodes?.Wolf3D_Hair && (
					<skinnedMesh
						geometry={nodes.Wolf3D_Hair.geometry}
						material={materials.Wolf3D_Hair}
						skeleton={nodes.Wolf3D_Hair.skeleton}
					/>
				)}
				{nodes?.Wolf3D_Glasses && (
					<skinnedMesh
						geometry={nodes.Wolf3D_Glasses.geometry}
						material={materials.Wolf3D_Glasses}
						skeleton={nodes.Wolf3D_Glasses.skeleton}
					/>
				)}
				{nodes?.Wolf3D_Body && (
					<skinnedMesh
						geometry={nodes.Wolf3D_Body.geometry}
						material={materials.Wolf3D_Body}
						skeleton={nodes.Wolf3D_Body.skeleton}
					/>
				)}
				{nodes?.Wolf3D_Outfit_Bottom && (
					<skinnedMesh
						geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
						material={materials.Wolf3D_Outfit_Bottom}
						skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
					/>
				)}
				{nodes?.Wolf3D_Outfit_Footwear && (
					<skinnedMesh
						geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
						material={materials.Wolf3D_Outfit_Footwear}
						skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
					/>
				)}
				{nodes?.Wolf3D_Outfit_Top && (
					<skinnedMesh
						geometry={nodes.Wolf3D_Outfit_Top.geometry}
						material={materials.Wolf3D_Outfit_Top}
						skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
					/>
				)}
				{nodes?.EyeLeft && (
					<skinnedMesh
						name='EyeLeft'
						geometry={nodes.EyeLeft.geometry}
						material={materials.Wolf3D_Eye}
						skeleton={nodes.EyeLeft.skeleton}
						morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
						morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
					/>
				)}
				{nodes?.EyeRight && (
					<skinnedMesh
						name='EyeRight'
						geometry={nodes.EyeRight.geometry}
						material={materials.Wolf3D_Eye}
						skeleton={nodes.EyeRight.skeleton}
						morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
						morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
					/>
				)}
				{nodes?.Wolf3D_Head && (
					<skinnedMesh
						name='Wolf3D_Head'
						geometry={nodes.Wolf3D_Head.geometry}
						material={materials.Wolf3D_Skin}
						skeleton={nodes.Wolf3D_Head.skeleton}
						morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
						morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
					/>
				)}
				{nodes?.Wolf3D_Teeth && (
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
