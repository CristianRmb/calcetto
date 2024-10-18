import {
	Box,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid2,
	Slide,
	Stack,
	Typography,
} from '@mui/material';
import { Canvas } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import { get_ranking } from '../api';
import { Environment, Html, OrbitControls, Sky } from '@react-three/drei';
import { DefaultAvatar } from '../components/DefaultAvatar';

import { TransitionProps } from '@mui/material/transitions';
import { useDialog } from '../useDialog';
import useClassificaQuery from '../useClassificaQuery';

interface Team {
	id: number;
	name: string;
	total_match: number;
	win_match: number;
	image_url: string;
	briscola_total_match: number;
	briscola_win_match: number;
	params: {};
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction='down' ref={ref} {...props} />;
});

function App() {
	const [classifica, setClassifica] = useState<Team[]>([]);
	const [checked, setChecked] = useState<number[]>([]);
	const [randomTeams, setRandomTeams] = useState<{
		team1: Team[];
		team2: Team[];
	}>({
		team1: [],
		team2: [],
	});

	const {
		classifica: data,
		classificaLoading,
		classificaFetching,
		setPlayerLose,
		setPlayerWin,
	} = useClassificaQuery({});

	const confirmDialog = useDialog();

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const [players, setPlayers] = useState([
		{
			id: 1,
			model: 'models/Loris.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Walking2',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
		{
			id: 2,
			model: 'models/Francesco.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Walking4',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
		{
			id: 3,
			model: 'models/Ale.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Old_Man_Walk',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
		{
			id: 4,
			model: 'models/Laura.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Injured_Walking',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
		{
			id: 5,
			model: 'models/Achille.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Walking5',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
		{
			id: 6,
			model: 'models/Cristian.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Walking3',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
		{
			id: 7,
			model: 'models/Default.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Catwalk_Walk',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
		{
			id: 8,
			model: 'models/Default.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Catwalk_Walk',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
		{
			id: 9,
			model: 'models/Mattia.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Sneak_Walk',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
		{
			id: 10,
			model: 'models/Cristina.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Walking1',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
		{
			id: 11,
			model: 'models/Enrico.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Walking6',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
		{
			id: 12,
			model: 'models/Default.glb',
			trigger: false,
			action: 'Walking',
			defaultAction: 'Catwalk_Walk',
			sendAction: 'Walking',
			defaultVictory: 'Victory',
			defaultDefeat: 'Defeat',
		},
	]);

	useEffect(() => {
		console.log('DATA: ', data);

		if (classificaLoading === false && classificaFetching === false) {
			setClassifica(data as Team[]);
		}
		// setClassifica(data);
	}, [classificaLoading, classificaFetching, data]);

	return (
		<Stack width={'100%'}>
			<Stack direction={'row'} gap={5} sx={{ my: '20px', mx: '10px' }}>
				<Typography variant='h5'>Classifica</Typography>
				<Button
					variant='contained'
					disabled={checked.length < 4}
					onClick={() => {
						const team1: Team[] = [];
						const team2: Team[] = [];

						// Shuffle the checked array to ensure randomness
						const shuffledChecked = [...checked].sort(
							() => Math.random() - 0.5
						);

						shuffledChecked.forEach((id) => {
							const team = classifica.find((f) => f.id === id);
							if (team) {
								// Assign to team1 until it has 2 players, then to team2
								if (team1.length < 2) {
									team1.push(team);
								} else if (team2.length < 2) {
									team2.push(team);
								}
							}
						});

						// Make sure both teams have exactly 2 players
						if (team1.length === 2 && team2.length === 2) {
							setRandomTeams({ team1, team2 });
							handleClickOpen();
						} else {
							console.log(
								'Not enough players selected to form two teams of 2.'
							);
						}
					}}
				>
					Squadre Random
				</Button>
			</Stack>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby='alert-dialog-slide-description'
			>
				<DialogContent className='!p-0 !m-0'>
					<Stack>
						<Stack
							bgcolor={'yellow'}
							direction={'row'}
							gap={2}
							className='py-3 px-2'
							justifyContent={'center'}
						>
							<Typography fontSize={'18'}>
								{randomTeams.team1[0]?.name + ' - '}
							</Typography>
							<Typography fontSize={'18'}>
								{randomTeams.team1[1]?.name}
							</Typography>
						</Stack>

						<Stack
							bgcolor={'lightblue'}
							direction={'row'}
							gap={2}
							className='py-3 px-2'
							justifyContent={'center'}
						>
							<Typography fontSize={'18'}>
								{randomTeams.team2[0]?.name + ' - '}
							</Typography>
							<Typography fontSize={'18'}>
								{randomTeams.team2[1]?.name}
							</Typography>
						</Stack>
					</Stack>
				</DialogContent>
			</Dialog>{' '}
			<Dialog
				open={confirmDialog.open}
				onClose={confirmDialog.handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					{`${confirmDialog.data?.name} ha ${confirmDialog.data?.action} il match?`}
				</DialogTitle>
				<DialogContent></DialogContent>
				<DialogActions style={{ justifyContent: 'center' }}>
					<Button
						onClick={() => {
							const newPlayers = [...players];
							const player = newPlayers.find(
								(f) => f.id === confirmDialog.data?.id
							);

							if (player) {
								player.trigger = !player.trigger;
								player.sendAction = confirmDialog.data?.animation;
							}
							setPlayers(newPlayers);
							if (confirmDialog.data?.action === 'vinto') {
								setPlayerWin(confirmDialog.data?.id);
							}
							if (confirmDialog.data?.action === 'perso') {
								setPlayerLose(confirmDialog.data?.id);
							}
							confirmDialog.handleClose({});
						}}
						autoFocus
						variant='contained'
						color='success'
					>
						Si
					</Button>
					<Button
						onClick={() => {
							// const newPlayers = [...players];
							// const player = newPlayers.find(
							// 	(f) => f.id === confirmDialog.data.id
							// );
							// if (player) {
							// 	player.trigger = !player.trigger;
							// 	player.sendAction = 'Defeat';
							// }
							// setPlayers(newPlayers);
							confirmDialog.handleClose({});
						}}
						variant='contained'
						color='error'
					>
						No
					</Button>
				</DialogActions>
			</Dialog>
			<Grid2
				id='grid_data'
				width={'100%'}
				container
				spacing={2}
				className='h-full'
			>
				{classifica.map((team, index) => (
					<Stack
						direction={'row'}
						justifyContent={'space-between'}
						alignItems={'center'}
						id='team'
					>
						<Canvas
							style={{
								width: '250px',
								height: '400px',
								position: 'relative',
								zIndex: 0,
							}}
							shadows
							camera={{ position: [0, 0.5, 5], fov: 30 }}
							id='canvas'
						>
							<Html
								style={{
									position: 'absolute', // Posizione assoluta rispetto al canvas
									top: -180, // Fissa in alto
									left: -110, // Fissa a sinistra
									zIndex: 1, // Porta in primo piano rispetto alla scena 3D
								}}
								position={[0, 0, 0]}
							>
								<Stack
									direction={'column'}
									height={'368px'}
									width={220}
									id='form-data'
									justifyContent={'space-between'}
								>
									<Stack
										direction={'row'}
										gap={2}
										alignItems={'center'}
										justifyContent={'space-between'}
									>
										<Typography fontSize={'18px'}>{index + 1}</Typography>

										<Typography fontWeight={600} fontSize={'12px'}>
											{team.name}
										</Typography>

										<Typography fontWeight={500} fontSize={'12px'}>
											{team.win_match}/{team.total_match} -{' '}
											{team.total_match > 0
												? ((team.win_match / team.total_match) * 100).toFixed(2)
												: 0}
											%
										</Typography>
									</Stack>

									<Stack
										direction={'row'}
										style={{ width: '100%' }}
										gap={2}
										alignItems={'center'}
										justifyContent={'center'}
									>
										<Button
											variant='contained'
											color='success'
											sx={{ height: '20px' }}
											onClick={() => {
												confirmDialog.handleOpen({
													name: team.name,
													id: team.id,
													action: 'vinto',
													animation: 'Victory',
												});
											}}
										>
											Win
										</Button>
										<Button
											variant='contained'
											color='error'
											sx={{ height: '20px' }}
											onClick={() => {
												confirmDialog.handleOpen({
													name: team.name,
													id: team.id,
													action: 'perso',
													animation: 'Defeat',
												});
											}}
										>
											Lose
										</Button>
										<Box
											onClick={() => {
												const currentIndex = checked.indexOf(team.id);
												const newChecked = [...checked];

												if (currentIndex === -1) {
													newChecked.push(team.id);
												} else {
													newChecked.splice(currentIndex, 1);
												}

												setChecked(newChecked);
											}}
										>
											<Checkbox
												edge='start'
												checked={checked.includes(team.id)}
												tabIndex={-1}
												disableRipple
											/>
										</Box>
									</Stack>
								</Stack>
							</Html>
							<color attach='background' args={['#f0f0f0']} />
							<>
								<OrbitControls />
								<Sky sunPosition={[-100, 50, 100]} />
								<Environment preset='sunset' />

								<group position-y={-1}>
									<DefaultAvatar
										player={players.find((f) => f.id === team.id)}
									/>
								</group>
								<mesh position-y={-1} scale={5} rotation-x={-Math.PI * 0.5}>
									<planeGeometry args={[100, 100]} />
									<meshStandardMaterial color='white' />
								</mesh>
							</>
						</Canvas>
					</Stack>
				))}
			</Grid2>
		</Stack>
	);
}

export default App;
