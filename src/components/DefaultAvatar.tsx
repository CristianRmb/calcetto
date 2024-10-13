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
	const { scene } = useGLTF(model);
	const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
	const { nodes, materials } = useGraph(clone);

	const group = React.useRef();
	const { animations: WalkingAnimation1 } = useFBX('animations/Walking_1.fbx');
	const { animations: WalkingAnimation2 } = useFBX('animations/Walking_2.fbx');
	const { animations: WalkingAnimation3 } = useFBX('animations/Walking_3.fbx');
	const { animations: WalkingAnimation4 } = useFBX('animations/Walking_4.fbx');
	const { animations: WalkingAnimation5 } = useFBX('animations/Walking_5.fbx');
	const { animations: WalkingAnimation6 } = useFBX('animations/Walking_6.fbx');
	const { animations: Old_Man_Walk } = useFBX('animations/Old_Man_Walk.fbx');

	const { animations: Injured_Walking } = useFBX(
		'animations/Injured_Walking.fbx'
	);

	const { animations: VictoryAnimation } = useFBX('animations/Victory.fbx');
	const { animations: DefeatAnimation } = useFBX('animations/Defeat.fbx');
	const { animations: Walker_Walk } = useFBX('animations/Walker_Walk.fbx');
	const { animations: Sneak_Walk } = useFBX('animations/Sneak_Walk.fbx');
	const { animations: Crouched_Walking } = useFBX(
		'animations/Crouched_Walking.fbx'
	);
	const { animations: Catwalk_Walk } = useFBX('animations/Catwalk_Walk.fbx');

	WalkingAnimation1[0].name = 'Walking1';
	WalkingAnimation2[0].name = 'Walking2';
	WalkingAnimation3[0].name = 'Walking3';
	WalkingAnimation4[0].name = 'Walking4';
	WalkingAnimation5[0].name = 'Walking5';
	WalkingAnimation6[0].name = 'Walking6';
	Injured_Walking[0].name = 'Injured_Walking';
	Old_Man_Walk[0].name = 'Old_Man_Walk';
	Walker_Walk[0].name = 'Walker_Walk';
	Sneak_Walk[0].name = 'Sneak_Walk';
	Crouched_Walking[0].name = 'Crouched_Walking';
	Catwalk_Walk[0].name = 'Catwalk_Walk';
	VictoryAnimation[0].name = 'Victory';
	DefeatAnimation[0].name = 'Defeat';

	const { actions: actionsWalking1 } = useAnimations(WalkingAnimation1, group);
	const { actions: actionsWalking2 } = useAnimations(WalkingAnimation2, group);
	const { actions: actionsWalking3 } = useAnimations(WalkingAnimation3, group);
	const { actions: actionsWalking4 } = useAnimations(WalkingAnimation4, group);
	const { actions: actionsWalking5 } = useAnimations(WalkingAnimation5, group);
	const { actions: actionsWalking6 } = useAnimations(WalkingAnimation6, group);
	const { actions: actionsOld_Man_Walk } = useAnimations(Old_Man_Walk, group);
	const { actions: actionsInjured_Walking } = useAnimations(
		Injured_Walking,
		group
	);
	const { actions: actionsVictory } = useAnimations(VictoryAnimation, group);
	const { actions: actionsDefeat } = useAnimations(DefeatAnimation, group);
	const { actions: actionsWalker_Walk } = useAnimations(Walker_Walk, group);
	const { actions: actionsSneak_Walk } = useAnimations(Sneak_Walk, group);
	const { actions: actionsCrouched_Walking } = useAnimations(
		Crouched_Walking,
		group
	);
	const { actions: actionsCatwalk_Walk } = useAnimations(Catwalk_Walk, group);

	useEffect(() => {
		// actionsWalking1[defaultAction]?.reset().play();
		switch (defaultAction) {
			case 'Walking1':
				actionsWalking1[defaultAction]?.reset().play();
				break;
			case 'Walking2':
				actionsWalking2[defaultAction]?.reset().play();
				break;
			case 'Walking3':
				actionsWalking3[defaultAction]?.reset().play();
				break;
			case 'Walking4':
				actionsWalking4[defaultAction]?.reset().play();
				break;
			case 'Walking5':
				actionsWalking5[defaultAction]?.reset().play();
				break;
			case 'Walking6':
				actionsWalking6[defaultAction]?.reset().play();
				break;
			case 'Old_Man_Walk':
				actionsOld_Man_Walk[defaultAction]?.reset().play();
				break;
			case 'Injured_Walking':
				actionsInjured_Walking[defaultAction]?.reset().play();
				break;
			case 'Walker_Walk':
				actionsWalker_Walk[defaultAction]?.reset().play();
				break;
			case 'Sneak_Walk':
				actionsSneak_Walk[defaultAction]?.reset().play();
				break;
			case 'Crouched_Walking':
				actionsCrouched_Walking[defaultAction]?.reset().play();
				break;
			case 'Catwalk_Walk':
				actionsCatwalk_Walk[defaultAction]?.reset().play();
				break;
			default:
				break;
		}
	}, []);

	useEffect(() => {
		switch (sendAction) {
			case 'Victory':
				actionsVictory[defaultVictory].setLoop(1, 1).reset().play();
				break;
			case 'Defeat':
				actionsDefeat[defaultDefeat].setLoop(1, 1).reset().play();
				break;
			default:
				break;
		}
	}, [trigger]);

	return (
		<group rotation-x={-Math.PI / 2} rotation-z={0.1}>
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

// useGLTF.preload('models/Cristian.glb');
