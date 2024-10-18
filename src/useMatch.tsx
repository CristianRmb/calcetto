import { useMediaQuery } from '@mui/material';

/* MUI breackpoints */
export const useMatches = () => {
	const matchXS = useMediaQuery('(min-width: 0px)');
	const matchSM = useMediaQuery('(min-width: 600px)');
	const matchMD = useMediaQuery('(min-width: 900px)');
	const matchLG = useMediaQuery('(min-width: 1200px)');
	return {
		matchXS,
		matchSM,
		matchMD,
		matchLG,
	};
};
