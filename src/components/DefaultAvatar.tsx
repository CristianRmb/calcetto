// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useGraph } from '@react-three/fiber';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

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
	// force remount on model change

	const { scene } = useGLTF(model);
	const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
	const { nodes, materials } = useGraph(clone);

	const group = React.useRef();

	const animationsMap = {
		Walking1: useFBX('animations/Walking_1.fbx'),
		Walking2: useFBX('animations/Walking_2.fbx'),
		Walking3: useFBX('animations/Walking_3.fbx'),
		Walking4: useFBX('animations/Walking_4.fbx'),
		Walking5: useFBX('animations/Walking_5.fbx'),
		Walking6: useFBX('animations/Walking_6.fbx'),
		Old_Man_Walk: useFBX('animations/Old_Man_Walk.fbx'),
		Injured_Walking: useFBX('animations/Injured_Walking.fbx'),
		Walker_Walk: useFBX('animations/Walker_Walk.fbx'),
		Sneak_Walk: useFBX('animations/Sneak_Walk.fbx'),
		Crouched_Walking: useFBX('animations/Crouched_Walking.fbx'),
		Catwalk_Walk: useFBX('animations/Catwalk_Walk.fbx'),
		Victory: useFBX('animations/Victory.fbx'),
		Defeat: useFBX('animations/Defeat.fbx'),
	};

	const createAnimations = () => {
		const actions = {};
		Object.keys(animationsMap).forEach((key) => {
			const { animations } = animationsMap[key];
			animations[0].name = key;
			actions[key] = useAnimations(animations, group);
		});
		return actions;
	};

	const animations = createAnimations();

	// Esegui le azioni di default
	useEffect(() => {
		if (defaultAction) {
			changeAction(defaultAction, '');
		}
	}, [defaultAction]);

	useEffect(() => {
		if (sendAction) {
			changeAction(sendAction, defaultAction);
		}
	}, [sendAction]);

	// Gestione del trigger per azioni specifiche come Victory/Defeat
	useEffect(() => {
		if (trigger) {
			switch (sendAction) {
				case 'Victory':
					animations.Victory.actions[defaultVictory]
						.setLoop(1, 1)
						.reset()
						.play();
					break;
				case 'Defeat':
					animations.Defeat.actions[defaultDefeat].setLoop(1, 1).reset().play();
					break;
				default:
					break;
			}
		}
	}, [trigger, sendAction, defaultVictory, defaultDefeat]);

	const stopAllAnimations = (exclude: string) => {
		Object.keys(animations).forEach((key) => {
			if (key !== exclude) {
				animations[key].actions[key]?.stop();
			}
		});
	};

	// Cambia l'azione corrente
	const changeAction = (action: string, defaultAction: string) => {
		stopAllAnimations(defaultAction);
		animations[action]?.actions[action]?.reset().play();
	};

	return (
		<group key={model} rotation-x={-Math.PI / 2} rotation-z={0.1}>
			<group ref={group} {...props} dispose={null}>
				<primitive object={nodes.Hips} />
				<skinnedMesh
					geometry={nodes.Wolf3D_Hair?.geometry}
					material={materials.Wolf3D_Hair}
					skeleton={nodes.Wolf3D_Hair?.skeleton}
				/>
				<skinnedMesh
					geometry={nodes.Wolf3D_Body?.geometry}
					material={materials.Wolf3D_Body}
					skeleton={nodes.Wolf3D_Body?.skeleton}
				/>
				<skinnedMesh
					geometry={nodes.Wolf3D_Outfit_Bottom?.geometry}
					material={materials.Wolf3D_Outfit_Bottom}
					skeleton={nodes.Wolf3D_Outfit_Bottom?.skeleton}
				/>
				<skinnedMesh
					geometry={nodes.Wolf3D_Outfit_Footwear?.geometry}
					material={materials.Wolf3D_Outfit_Footwear}
					skeleton={nodes.Wolf3D_Outfit_Footwear?.skeleton}
				/>
				<skinnedMesh
					geometry={nodes.Wolf3D_Outfit_Top?.geometry}
					material={materials.Wolf3D_Outfit_Top}
					skeleton={nodes.Wolf3D_Outfit_Top?.skeleton}
				/>
				<skinnedMesh
					name='EyeLeft'
					geometry={nodes.EyeLeft?.geometry}
					material={materials.Wolf3D_Eye}
					skeleton={nodes.EyeLeft?.skeleton}
					morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
					morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
				/>
				<skinnedMesh
					name='EyeRight'
					geometry={nodes.EyeRight?.geometry}
					material={materials.Wolf3D_Eye}
					skeleton={nodes.EyeRight?.skeleton}
					morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
					morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
				/>
				<skinnedMesh
					name='Wolf3D_Head'
					geometry={nodes.Wolf3D_Head?.geometry}
					material={materials.Wolf3D_Skin}
					skeleton={nodes.Wolf3D_Head?.skeleton}
					morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
					morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
				/>
				<skinnedMesh
					name='Wolf3D_Teeth'
					geometry={nodes.Wolf3D_Teeth?.geometry}
					material={materials.Wolf3D_Teeth}
					skeleton={nodes.Wolf3D_Teeth?.skeleton}
					morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
					morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
				/>
			</group>
		</group>
	);
}

useGLTF.preload('models/Default.glb');