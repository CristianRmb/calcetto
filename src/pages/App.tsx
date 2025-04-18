import {
	Box,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid2,
	IconButton,
	Menu,
	MenuItem,
	Slide,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import { Canvas } from '@react-three/fiber';
import React, {
	useEffect,
	useState,
	Suspense,
	useMemo,
	useCallback,
} from 'react';
import { Environment, Html, OrbitControls, Sky } from '@react-three/drei';
import EditIcon from '@mui/icons-material/Edit';

import { TransitionProps } from '@mui/material/transitions';
import { useDialog } from '../useDialog';
import useClassificaQuery from '../useClassificaQuery';
import { DefaultModel } from '../components/DefaultModel';
import { SwordIcon } from '../assets/SwordIcon';
import { ShieldIcon } from '../assets/ShieldIcon';

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

	// Stati per gestire il menu dropdown delle animazioni
	const [animationMenuAnchor, setAnimationMenuAnchor] =
		useState<null | HTMLElement>(null);
	const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);

	// Lista delle animazioni disponibili
	const availableAnimations = [
		{ name: 'Walking 1', value: 'Walking1' },
		{ name: 'Walking 2', value: 'Walking2' },
		{ name: 'Walking 3', value: 'Walking3' },
		{ name: 'Walking 4', value: 'Walking4' },
		{ name: 'Walking 5', value: 'Walking5' },
		{ name: 'Walking 6', value: 'Walking6' },
		{ name: 'Walking 7', value: 'Walking7' },
		{ name: 'Walking 8', value: 'Walking8' },
		{ name: 'Old Man Walk', value: 'Old_Man_Walk' },
		{ name: 'Injured Walking', value: 'Injured_Walking' },
		{ name: 'Walker Walk', value: 'Walker_Walk' },
		{ name: 'Sneak Walk', value: 'Sneak_Walk' },
		{ name: 'Crouched Walking', value: 'Crouched_Walking' },
		{ name: 'Catwalk Walk', value: 'Catwalk_Walk' },
	];

	// Gestione apertura menu
	const handleAnimationMenuOpen = (
		event: React.MouseEvent<HTMLElement>,
		playerId: number
	) => {
		setAnimationMenuAnchor(event.currentTarget);
		setSelectedPlayerId(playerId);
	};

	// Gestione chiusura menu
	const handleAnimationMenuClose = () => {
		setAnimationMenuAnchor(null);
		setSelectedPlayerId(null);
	};

	// Funzione per cambiare l'animazione di un player
	const changePlayerAnimation = (animation: string) => {
		if (selectedPlayerId === null) return;

		// Aggiorna lo state dei player
		const newPlayers = [...players];
		const playerIndex = newPlayers.findIndex((p) => p.id === selectedPlayerId);

		if (playerIndex !== -1) {
			newPlayers[playerIndex] = {
				...newPlayers[playerIndex],
				defaultAction: animation,
			};
			setPlayers(newPlayers);

			// Salva nel file JSON
			// savePlayerAnimation(newPlayers[playerIndex]);
		}

		handleAnimationMenuClose();
	};

	const {
		classifica: data,
		classificaLoading,
		classificaFetching,
		setPlayerLose,
		setPlayerWin,
		setMatch,
	} = useClassificaQuery({});

	const confirmDialog = useDialog();

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// Inizializza con un array vuoto e carica i dati dal JSON
	const [players, setPlayers] = useState<Player[]>([]);

	// Carica i dati dei player dal JSON esterno quando il componente si monta
	useEffect(() => {
		// Utilizziamo il percorso relativo corretto per l'ambiente Vite
		fetch('./models_settings.json')
			.then((response) => {
				if (!response.ok) {
					throw new Error('Errore nel caricamento del file JSON');
				}
				return response.json();
			})
			.then((data) => {
				// Trasforma l'oggetto JSON in un array di player
				// Ogni chiave è il nome del giocatore, quindi lo aggiungiamo all'oggetto
				const playerArray = Object.entries(data).map(([name, playerData]) => ({
					...(playerData as Player),
					name, // Aggiungiamo il nome dal JSON alle proprietà del player
				}));
				setPlayers(playerArray);
			})
			.catch((error) => {
				console.error('Errore nel caricamento dei player:', error);
				// In caso di errore, utilizziamo un set di dati di fallback
				const fallbackPlayers = [
					{
						id: 0,
						model: 'models/Default.glb',
						trigger: false,
						action: 'Walking',
						defaultAction: 'Catwalk_Walk',
						sendAction: 'Walking',
						defaultVictory: 'Victory',
						defaultDefeat: 'Defeat',
						name: 'Default Player',
					},
				];
				setPlayers(fallbackPlayers);
			});
	}, []);

	// Memoize players to prevent unnecessary rerenders
	const memoizedPlayers = useMemo(() => players, [players]);

	// Add a safeguard function to prevent passing undefined to DefaultModel
	const getPlayerOrDefault = useCallback(
		(id: number) => {
			const player = memoizedPlayers.find((p) => p.id === id);
			// Return a default player if none is found to prevent undefined errors
			return (
				player || {
					id: 0,
					model: 'models/Default.glb',
					trigger: false,
					action: 'Walking',
					defaultAction: 'Catwalk_Walk',
					sendAction: 'Walking',
					defaultVictory: 'Victory',
					defaultDefeat: 'Defeat',
				}
			);
		},
		[memoizedPlayers]
	);

	// Render only visible models based on viewport
	const [visibleRangeStart, _setVisibleRangeStart] = useState(0);
	const [visibleRangeEnd, setVisibleRangeEnd] = useState(4); // Initially load only first 4 models

	// Use IntersectionObserver to detect when an element is in viewport
	const observerCallback = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry: IntersectionObserverEntry) => {
				if (entry.isIntersecting) {
					const teamId = parseInt(entry.target.id.split('_')[1]);
					setVisibleRangeEnd((prev) => Math.max(prev, teamId + 3));
				}
			});
		},
		[]
	);

	useEffect(() => {
		const observer = new IntersectionObserver(observerCallback, {
			root: null,
			rootMargin: '0px',
			threshold: 0.1,
		});

		document.querySelectorAll('[id^="team_"]').forEach((element) => {
			observer.observe(element);
		});

		return () => observer.disconnect();
	}, [observerCallback, classifica]);

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
					<Stack width={'300px'} height={'200px'}>
						<Stack
							bgcolor={'yellow'}
							gap={0}
							sx={{ borderBottom: '1px solid black', pb: '20px' }}
							justifyContent={'center'}
							alignContent={'center'}
							width={'100%'}
						>
							<Stack
								bgcolor={'yellow'}
								direction={'row'}
								gap={2}
								className='py-3 px-2'
								justifyContent={'space-around'}
								alignItems={'center'}
								flex={1}
							>
								<Stack direction={'row'} gap={2}>
									<SwordIcon />
									<Typography fontSize={'18'}>
										{randomTeams.team1[0]?.name}
									</Typography>
								</Stack>
								<Stack direction={'row'} gap={2}>
									<ShieldIcon />
									<Typography fontSize={'18'}>
										{randomTeams.team1[1]?.name}
									</Typography>
								</Stack>
							</Stack>
							<Button
								sx={{ width: 'min-content', ml: 'auto', mr: 'auto' }}
								variant='contained'
								color='success'
								onClick={() => {
									console.log('Team1 : ', randomTeams.team1[0]);
									const winner_1 = randomTeams.team1[0]?.id;
									const winner_2 = randomTeams.team1[1]?.id;
									const loser_1 = randomTeams.team2[0]?.id;
									const loser_2 = randomTeams.team2[1]?.id;

									setMatch({
										winner_1: winner_1,
										winner_2: winner_2,
										loser_1: loser_1,
										loser_2: loser_2,
									});
									handleClose();
								}}
							>
								Vinto
							</Button>
						</Stack>

						<Stack
							bgcolor={'lightblue'}
							gap={0}
							sx={{ borderBottom: '1px solid black', pb: '20px' }}
							justifyContent={'center'}
							alignContent={'center'}
							width={'100%'}
						>
							<Stack
								flex={1}
								bgcolor={'lightblue'}
								direction={'row'}
								alignItems={'center'}
								gap={2}
								className='py-3 px-2'
								justifyContent={'space-around'}
							>
								<Stack direction={'row'} gap={2}>
									<SwordIcon />
									<Typography fontSize={'18'}>
										{randomTeams.team2[0]?.name}
									</Typography>
								</Stack>
								<Stack direction={'row'} gap={2}>
									<ShieldIcon />
									<Typography fontSize={'18'}>
										{randomTeams.team2[1]?.name}
									</Typography>
								</Stack>
							</Stack>
							<Button
								sx={{ width: 'min-content', ml: 'auto', mr: 'auto' }}
								variant='contained'
								color='success'
								onClick={() => {
									console.log('Team2 : ', randomTeams.team2[0]);
									const winner_1 = randomTeams.team2[0]?.id;
									const winner_2 = randomTeams.team2[1]?.id;
									const loser_1 = randomTeams.team1[0]?.id;
									const loser_2 = randomTeams.team1[1]?.id;

									setMatch({
										winner_1: winner_1,
										winner_2: winner_2,
										loser_1: loser_1,
										loser_2: loser_2,
									});
									handleClose();
								}}
							>
								Vinto
							</Button>
						</Stack>
					</Stack>
				</DialogContent>
			</Dialog>
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
				id='grid_data_!23'
				width={'100%'}
				container
				spacing={2}
				className='h-full'
			>
				{classifica.map((team, index) => {
					const isVisible =
						index >= visibleRangeStart && index <= visibleRangeEnd;
					return (
						<Stack
							direction={'row'}
							justifyContent={'space-between'}
							alignItems={'center'}
							id={`team_${team.id}`}
							key={`team_${team.id}`}
						>
							{isVisible ? (
								<Canvas
									style={{
										width: '250px',
										height: '400px',
										position: 'relative',
										zIndex: 0,
									}}
									shadows
									camera={{ position: [0, 0.5, 5], fov: 30 }}
									id={`canvas_${team.id}`}
									key={`canvas_${team.id}`}
									dpr={[1, 1.5]} // Lower DPR for better performance
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
											id={`stack_1_${team.id}`}
											justifyContent={'space-between'}
										>
											<Stack
												direction={'row'}
												gap={2}
												alignItems={'center'}
												justifyContent={'space-between'}
												id={`stack_2_${team.id}`}
												key={`stack_2_${team.id}`}
											>
												<Typography fontSize={'18px'}>{index + 1}</Typography>

												<Typography fontWeight={600} fontSize={'12px'}>
													{team.name}
												</Typography>

												{/* qui va il dropdown */}
												<Tooltip title='Modifica animazione'>
													<IconButton
														onClick={(event) =>
															handleAnimationMenuOpen(event, team.id)
														}
														size='small'
														sx={{ padding: '2px' }}
													>
														<EditIcon fontSize='small' />
													</IconButton>
												</Tooltip>
												<Menu
													anchorEl={animationMenuAnchor}
													open={Boolean(animationMenuAnchor)}
													onClose={handleAnimationMenuClose}
													transitionDuration={0} // Immediate animation
													PaperProps={{
														elevation: 0, // Removes box shadow
														sx: {
															boxShadow: 'none',
															border: '1px solid #e0e0e0',
														},
													}}
												>
													{availableAnimations.map((animation) => (
														<MenuItem
															key={animation.value}
															onClick={() =>
																changePlayerAnimation(animation.value)
															}
														>
															{animation.name}
														</MenuItem>
													))}
												</Menu>

												<Typography fontWeight={500} fontSize={'12px'}>
													{team.win_match}/{team.total_match} -{' '}
													{team.total_match > 0
														? (
																(team.win_match / team.total_match) *
																100
														  ).toFixed(2)
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
												id={`stack_3_${team.id}`}
												key={`stack_3_${team.id}`}
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
									<Suspense fallback={null}>
										<>
											<OrbitControls enableDamping={false} />
											<Sky sunPosition={[-100, 50, 100]} />
											<Environment preset='sunset' />

											<group position-y={-1}>
												<DefaultModel player={getPlayerOrDefault(team.id)} />
											</group>
											<mesh
												position-y={-1}
												scale={5}
												rotation-x={-Math.PI * 0.5}
											>
												<planeGeometry args={[100, 100]} />
												<meshStandardMaterial color='white' />
											</mesh>
										</>
									</Suspense>
								</Canvas>
							) : (
								<div
									style={{
										width: '250px',
										height: '400px',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<Typography>Caricamento modello...</Typography>
								</div>
							)}
						</Stack>
					);
				})}
			</Grid2>
		</Stack>
	);
}

export default App;
