import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Outlet } from 'react-router-dom';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import ChurchIcon from '@mui/icons-material/Church';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	variants: [
		{
			props: ({ open }) => open,
			style: {
				marginLeft: drawerWidth,
				width: `calc(100% - ${drawerWidth}px)`,
				transition: theme.transitions.create(['width', 'margin'], {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.enteringScreen,
				}),
			},
		},
	],
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	variants: [
		{
			props: ({ open }) => open,
			style: {
				...openedMixin(theme),
				'& .MuiDrawer-paper': openedMixin(theme),
			},
		},
		{
			props: ({ open }) => !open,
			style: {
				...closedMixin(theme),
				'& .MuiDrawer-paper': closedMixin(theme),
			},
		},
	],
}));

export default function Sidebar() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const menu = [
		{
			name: 'Classifica',
			icon: <SportsSoccerIcon />,
		},
		{
			name: 'Santo del giorno',
			icon: <ChurchIcon />,
		},
		{
			name: 'Battuta random ',
			icon: <SentimentVerySatisfiedIcon />,
		},
	];

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position='fixed' open={open}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						sx={[
							{
								marginRight: 5,
							},
							open && { display: 'none' },
						]}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap component='div'>
						Loris Scarso
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer variant='permanent' open={open}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{menu.map((item) => (
						<ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
							<ListItemButton
								sx={[
									{
										minHeight: 48,
										px: 2.5,
									},
									open
										? {
												justifyContent: 'initial',
										  }
										: {
												justifyContent: 'center',
										  },
								]}
							>
								<ListItemIcon
									sx={[
										{
											minWidth: 0,
											justifyContent: 'center',
										},
										open
											? {
													mr: 3,
											  }
											: {
													mr: 'auto',
											  },
									]}
								>
									{item.icon}
								</ListItemIcon>
								<ListItemText
									primary={item.name}
									sx={[
										open
											? {
													opacity: 1,
											  }
											: {
													opacity: 0,
											  },
									]}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
				{/* <Divider />
				<List>
					{['All mail', 'Trash', 'Spam'].map((text, index) => (
						<ListItem key={text} disablePadding sx={{ display: 'block' }}>
							<ListItemButton
								sx={[
									{
										minHeight: 48,
										px: 2.5,
									},
									open
										? {
												justifyContent: 'initial',
										  }
										: {
												justifyContent: 'center',
										  },
								]}
							>
								<ListItemIcon
									sx={[
										{
											minWidth: 0,
											justifyContent: 'center',
										},
										open
											? {
													mr: 3,
											  }
											: {
													mr: 'auto',
											  },
									]}
								>
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText
									primary={text}
									sx={[
										open
											? {
													opacity: 1,
											  }
											: {
													opacity: 0,
											  },
									]}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List> */}
			</Drawer>
			<Box component='main' sx={{ flexGrow: 1 }}>
				<DrawerHeader />
				<Box>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
}