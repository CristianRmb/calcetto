// @ts-nocheck
import React, { useEffect, useState, useMemo } from 'react';
import { useGraph } from '@react-three/fiber';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

interface Player {
	model: string;
	trigger: boolean;
	action: string;
	defaultAction: string;
	sendAction: string;
	defaultVictory: string;
	defaultDefeat: string;
}

// Funzione per caricare le animazioni solo quando necessario
const useRequiredAnimations = (actionNames) => {
	const animations = {};

	// Carica solo le animazioni richieste
	if (actionNames.includes('Walking1'))
		animations.Walking1 = useFBX('animations/Walking_1.fbx');
	if (actionNames.includes('Walking2'))
		animations.Walking2 = useFBX('animations/Walking_2.fbx');
	if (actionNames.includes('Walking3'))
		animations.Walking3 = useFBX('animations/Walking_3.fbx');
	if (actionNames.includes('Walking4'))
		animations.Walking4 = useFBX('animations/Walking_4.fbx');
	if (actionNames.includes('Walking5'))
		animations.Walking5 = useFBX('animations/Walking_5.fbx');
	if (actionNames.includes('Walking6'))
		animations.Walking6 = useFBX('animations/Walking_6.fbx');
	if (actionNames.includes('Walking7'))
		animations.Walking7 = useFBX('animations/Walking_7.fbx');
	if (actionNames.includes('Walking8'))
		animations.Walking8 = useFBX('animations/Walking_8.fbx');
	if (actionNames.includes('Old_Man_Walk'))
		animations.Old_Man_Walk = useFBX('animations/Old_Man_Walk.fbx');
	if (actionNames.includes('Injured_Walking'))
		animations.Injured_Walking = useFBX('animations/Injured_Walking.fbx');
	if (actionNames.includes('Walker_Walk'))
		animations.Walker_Walk = useFBX('animations/Walker_Walk.fbx');
	if (actionNames.includes('Sneak_Walk'))
		animations.Sneak_Walk = useFBX('animations/Sneak_Walk.fbx');
	if (actionNames.includes('Crouched_Walking'))
		animations.Crouched_Walking = useFBX('animations/Crouched_Walking.fbx');
	if (actionNames.includes('Catwalk_Walk'))
		animations.Catwalk_Walk = useFBX('animations/Catwalk_Walk.fbx');
	if (actionNames.includes('Victory'))
		animations.Victory = useFBX('animations/Victory.fbx');
	if (actionNames.includes('Defeat'))
		animations.Defeat = useFBX('animations/Defeat.fbx');

	return animations;
};

export function DefaultAvatar(props: any) {
	const {
		model,
		trigger,
		action,
		defaultAction,
		sendAction,
		defaultVictory,
		defaultDefeat,
	} = props.player;

	// Memorizza la lista di animazioni necessarie
	const requiredAnimations = useMemo(() => {
		return Array.from(
			new Set(
				[defaultAction, sendAction, defaultVictory, defaultDefeat].filter(
					Boolean
				)
			)
		);
	}, [defaultAction, sendAction, defaultVictory, defaultDefeat]);

	// Carica solo le animazioni necessarie
	const animationsMap = useRequiredAnimations(requiredAnimations);

	// Usa il caching per i modelli con useMemo
	const { scene } = useGLTF(model);
	const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
	const { nodes, materials } = useGraph(clone);

	const group = React.useRef();

	// Ottimizza i materiali per un rendering più veloce
	useMemo(() => {
		if (materials) {
			Object.values(materials).forEach((material) => {
				if (material) {
					material.roughness = 0.8;
					material.envMapIntensity = 0.5;
					material.needsUpdate = true;
				}
			});
		}
	}, [materials]);

	// Crea le azioni di animazione in modo ottimizzato
	const animations = useMemo(() => {
		const actions = {};
		Object.keys(animationsMap).forEach((key) => {
			const { animations } = animationsMap[key];
			animations[0].name = key;
			actions[key] = useAnimations(animations, group);
		});
		return actions;
	}, [animationsMap]);

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
						?.setLoop(1, 1)
						?.reset()
						?.play();
					break;
				case 'Defeat':
					animations.Defeat?.actions[defaultDefeat]
						?.setLoop(1, 1)
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
	const changeAction = (action: string, defaultAction: string) => {
		if (animations[action]) {
			stopAllAnimations(defaultAction);
			animations[action].actions[action]?.reset().play();
		}
	};

	// Usa il controllo condizionale per il rendering delle parti del modello
	return (
		<group key={model} rotation-x={-Math.PI / 2} rotation-z={0.1}>
			<group ref={group} {...props} dispose={null}>
				{nodes.Hips && <primitive object={nodes.Hips} />}
				{nodes.Wolf3D_Hair && (
					<skinnedMesh
						geometry={nodes.Wolf3D_Hair.geometry}
						material={materials.Wolf3D_Hair}
						skeleton={nodes.Wolf3D_Hair.skeleton}
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

// Precarica solo il modello default per migliorare le prestazioni iniziali
useGLTF.preload('models/Default.glb');
