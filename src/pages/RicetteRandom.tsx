import {
	Avatar,
	Box,
	Card,
	CardHeader,
	Grid2,
	IconButton,
	IconButtonProps,
	List,
	ListItem,
	Stack,
	styled,
} from '@mui/material';
import { useMatches } from '../useMatch';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Ricetta {
	idMeal: string;
	strMeal: string;
	strDrinkAlternate: string;
	strCategory: string;
	strArea: string;
	strInstructions: string;
	strMealThumb: string;
	strTags: string;
	strYoutube: string;
	strIngredient1: string;
	strIngredient2: string;
	strIngredient3: string;
	strIngredient4: string;
	strIngredient5: string;
	strIngredient6: string;
	strIngredient7: string;
	strIngredient8: string;
	strIngredient9: string;
	strIngredient10: string;
	strIngredient11: string;
	strIngredient12: string;
	strIngredient13: string;
	strIngredient14: string;
	strIngredient15: string;
	strIngredient16: string;
	strIngredient17: string;
	strIngredient18: string;
	strIngredient19: string;
	strIngredient20: string;
	strMeasure1: string;
	strMeasure2: string;
	strMeasure3: string;
	strMeasure4: string;
	strMeasure5: string;
	strMeasure6: string;
	strMeasure7: string;
	strMeasure8: string;
	strMeasure9: string;
	strMeasure10: string;
	strMeasure11: string;
	strMeasure12: string;
	strMeasure13: string;
	strMeasure14: string;
	strMeasure15: string;
	strMeasure16: string;
	strMeasure17: string;
	strMeasure18: string;
	strMeasure19: string;
	strMeasure20: string;
	strSource: string;
	strImageSource: string;
	strCreativeCommonsConfirmed: string;
	dateModified: string;
}

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme }) => ({
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
	variants: [
		{
			props: ({ expand }) => !expand,
			style: {
				transform: 'rotate(0deg)',
			},
		},
		{
			props: ({ expand }) => !!expand,
			style: {
				transform: 'rotate(180deg)',
			},
		},
	],
}));

function RicetteRandom() {
	// const match = useMatches();

	const [ricetta, setRicetta] = useState<Ricetta>();
	const [ingredients, setIngredients] = useState<string[]>([]);

	const [expanded, setExpanded] = useState(false);

	const [expanded2, setExpanded2] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleExpandClick2 = () => {
		setExpanded2(!expanded2);
	};

	useEffect(() => {
		axios
			.get('https://www.themealdb.com/api/json/v1/1/random.php')
			.then((response) => {
				// @ts-ignore
				response.data.meals[0].strYoutube =
					response.data.meals[0].strYoutube.replace('watch?v=', 'embed/');
				setRicetta(response.data.meals[0]);
			});
	}, []);

	useEffect(() => {
		// if ingredients != "" then setIngredients
		if (ricetta != null && ricetta != undefined) {
			const ingredients = [];
			for (let i = 1; i <= 20; i++) {
				// @ts-ignore
				if (ricetta[`strIngredient${i}`]) {
					ingredients.push(
						// @ts-ignore
						`${ricetta[`strIngredient${i}`]} - ${ricetta[`strMeasure${i}`]}`
					);
				}
			}
			setIngredients(ingredients);
		}
	}, [ricetta]);

	return (
		<Stack
			sx={{ width: '90vw', margin: 3 }}
			direction={{ xs: 'column', md: 'row' }}
			gap={1}
		>
			<Card sx={{ maxWidth: 345 }}>
				<CardHeader
					avatar={
						<Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
							R
						</Avatar>
					}
					action={
						<IconButton aria-label='settings'>
							<MoreVertIcon />
						</IconButton>
					}
					title={ricetta?.strMeal}
					subheader={'Category: ' + `${ricetta?.strCategory}`}
				/>
				<CardMedia
					component='img'
					height='194'
					src={ricetta?.strMealThumb}
					alt='Paella dish'
				/>
				<CardContent sx={{ padding: '8px' }}>
					<Stack
						direction={'row'}
						justifyContent={'space-between'}
						alignItems={'center'}
						pt={1}
						pb={1}
					>
						<Typography variant='body2' sx={{ color: 'text.secondary' }}>
							Ingredients
						</Typography>
						<ExpandMore
							expand={expanded2}
							onClick={handleExpandClick2}
							aria-expanded={expanded2}
							aria-label='show more'
						>
							<ExpandMoreIcon />
						</ExpandMore>
					</Stack>
					<Collapse in={expanded2} timeout='auto' unmountOnExit>
						<List sx={{ padding: 0 }}>
							<Grid2
								container
								spacing={2}
								rowSpacing={1}
								columnSpacing={{ xs: 1, sm: 2, md: 3 }}
							>
								{ingredients.map((ingredient, index) => (
									// <Grid item xs={6}>
									<ListItem
										sx={{
											color: 'text.secondary',
											fontSize: '12px',
											padding: 0,
										}}
										key={index}
									>
										{ingredient}
									</ListItem>
									// </Grid>
								))}
							</Grid2>
						</List>
					</Collapse>

					{/* <List sx={{ padding: 0 }}>
						<Grid2
							container
							spacing={2}
							rowSpacing={1}
							columnSpacing={{ xs: 1, sm: 2, md: 3 }}
						>
							{ingredients.map((ingredient, index) => (
								// <Grid item xs={6}>
								<ListItem
									sx={{
										color: 'text.secondary',
										fontSize: '12px',
										padding: 0,
									}}
									key={index}
								>
									{ingredient}
								</ListItem>
								// </Grid>
							))}
						</Grid2>
					</List> */}
				</CardContent>
				<CardActions disableSpacing>
					<IconButton aria-label='add to favorites'>
						<FavoriteIcon />
					</IconButton>
					<IconButton aria-label='share'>
						<ShareIcon />
					</IconButton>
					<ExpandMore
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label='show more'
					>
						<ExpandMoreIcon />
					</ExpandMore>
				</CardActions>
				<Collapse in={expanded} timeout='auto' unmountOnExit>
					<CardContent>
						<Typography sx={{ marginBottom: 2 }}>Method:</Typography>
						<Typography sx={{ marginBottom: 2 }}>
							{`${ricetta?.strInstructions}`}
						</Typography>
						<Typography sx={{ marginBottom: 2 }}>
							Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
							over medium-high heat. Add chicken, shrimp and chorizo, and cook,
							stirring occasionally until lightly browned, 6 to 8 minutes.
							Transfer shrimp to a large plate and set aside, leaving chicken
							and chorizo in the pan. Add pimentón, bay leaves, garlic,
							tomatoes, onion, salt and pepper, and cook, stirring often until
							thickened and fragrant, about 10 minutes. Add saffron broth and
							remaining 4 1/2 cups chicken broth; bring to a boil.
						</Typography>
						{/* <Typography sx={{ marginBottom: 2 }}>
							Add rice and stir very gently to distribute. Top with artichokes
							and peppers, and cook without stirring, until most of the liquid
							is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
							reserved shrimp and mussels, tucking them down into the rice, and
							cook again without stirring, until mussels have opened and rice is
							just tender, 5 to 7 minutes more. (Discard any mussels that
							don&apos;t open.)
						</Typography>
						<Typography>
							Set aside off of the heat to let rest for 10 minutes, and then
							serve.
						</Typography> */}
					</CardContent>
				</Collapse>
			</Card>
			<Box sx={{ width: '100%', mixHeight: '400px' }}>
				<iframe
					width='100%'
					height='100%'
					src={ricetta?.strYoutube}
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen
					title='Embedded youtube'
				/>
			</Box>
		</Stack>
	);
}

export default RicetteRandom;
