// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useGraph, useThree } from '@react-three/fiber';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

export function Model2Avatar(props: any) {
	const { scene } = useGLTF('models/model2.glb');
	const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
	const { nodes, materials } = useGraph(clone);

	const group = React.useRef();
	const { animations: walkingAnimation } = useFBX('animations/Walking.fbx');
	const { animations: VictoryAnimation } = useFBX('animations/Victory.fbx');
	const { animations: DefeatAnimation } = useFBX('animations/Defeat.fbx');

	const THREE = useThree();

	walkingAnimation[0].name = 'Walking';
	VictoryAnimation[0].name = 'Victory';
	DefeatAnimation[0].name = 'Defeat';

	const { actions } = useAnimations(walkingAnimation, group);

	const { actions: actionsVictory } = useAnimations(VictoryAnimation, group);
	const { actions: actionsDefeat } = useAnimations(DefeatAnimation, group);

	useEffect(() => {
		actions['Walking']?.reset().play();
	}, []);

	// useEffect(() => {
	// 	console.log('triggerAction', props.triggerAction);

	// 	if (props.triggerAction.action === 'Victory') {
	// 		console.log('Victory');
	// 		// change animation
	// 		actionsVictory['Victory']?.reset().play();
	// 	} else if (props.triggerAction.action === 'Defeat') {
	// 		// Riproduce l'animazione della sconfitta e riprende a camminare solo dopo che l'animazione di Defeat è finita
	// 		actionsDefeat['Defeat']?.reset().play().clampWhenFinished = true;

	// 		// Quando l'animazione della sconfitta finisce, torna alla camminata
	// 		actionsDefeat['Defeat']?.crossFadeTo(actions['Walking'], 1, true).play();

	// 		console.log('Defeat');
	// 	}
	// }, [props.triggerAction.trigger]);

	return (
		<group rotation-x={-Math.PI / 2} rotation-z={0.1}>
			<group ref={group} {...props} dispose={null}>
				<primitive object={nodes.Hips} />
				<skinnedMesh
					geometry={nodes.Wolf3D_Hair.geometry}
					material={materials.Wolf3D_Hair}
					skeleton={nodes.Wolf3D_Hair.skeleton}
				/>
				<skinnedMesh
					geometry={nodes.Wolf3D_Body.geometry}
					material={materials.Wolf3D_Body}
					skeleton={nodes.Wolf3D_Body.skeleton}
				/>
				<skinnedMesh
					geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
					material={materials.Wolf3D_Outfit_Bottom}
					skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
				/>
				<skinnedMesh
					geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
					material={materials.Wolf3D_Outfit_Footwear}
					skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
				/>
				<skinnedMesh
					geometry={nodes.Wolf3D_Outfit_Top.geometry}
					material={materials.Wolf3D_Outfit_Top}
					skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
				/>
				<skinnedMesh
					name='EyeLeft'
					geometry={nodes.EyeLeft.geometry}
					material={materials.Wolf3D_Eye}
					skeleton={nodes.EyeLeft.skeleton}
					morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
					morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
				/>
				<skinnedMesh
					name='EyeRight'
					geometry={nodes.EyeRight.geometry}
					material={materials.Wolf3D_Eye}
					skeleton={nodes.EyeRight.skeleton}
					morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
					morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
				/>
				<skinnedMesh
					name='Wolf3D_Head'
					geometry={nodes.Wolf3D_Head.geometry}
					material={materials.Wolf3D_Skin}
					skeleton={nodes.Wolf3D_Head.skeleton}
					morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
					morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
				/>
				<skinnedMesh
					name='Wolf3D_Teeth'
					geometry={nodes.Wolf3D_Teeth.geometry}
					material={materials.Wolf3D_Teeth}
					skeleton={nodes.Wolf3D_Teeth.skeleton}
					morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
					morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
				/>
			</group>
		</group>
	);
}

useGLTF.preload('models/model2.glb');
