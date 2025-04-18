import axios from 'axios';
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

interface MatchInput {
	winner_1: number;
	winner_2: number;
	loser_1: number;
	loser_2: number;
}

interface MatchResponse {
	success: boolean; // Adjust based on the actual response structure
	data: any; // Replace with a specific type if you know it
}

interface PlayerAnimation {
	id: number;
	name: string;
	defaultAction: string;
}

// response.data is []Team
const get_ranking = async (): Promise<Team[] | null> => {
	try {
		const response = await axios.get<Team[]>(
			'https://mazino.pythonanywhere.com/calcetto/classifica/'
		);

		return response.data;
	} catch (error) {
		return [];
	}
};

const updatePlayerWin = async (player_id: number) => {
	try {
		const response = await axios.post(
			`https://mazino.pythonanywhere.com/calcetto/win_match/${player_id}/`
		);
		return response.data;
	} catch (error) {
		return null;
	}
};

const updatePlayerLose = async (player_id: number) => {
	try {
		const response = await axios.post(
			`https://mazino.pythonanywhere.com/calcetto/lost_match/${player_id}/`
		);
		return response.data;
	} catch (error) {
		return null;
	}
};

const createMatch = async (matchInput: MatchInput): Promise<MatchResponse> => {
	try {
		const response = await axios.post<MatchResponse>(
			`https://mazino.pythonanywhere.com/calcetto/create_match/`,
			matchInput
		);
		return response.data;
	} catch (error) {
		console.error('Error creating match:', error);
		throw error;
	}
};

const savePlayerAnimation = async (
	playerData: PlayerAnimation
): Promise<boolean> => {
	try {
		// In una vera implementazione, questa chiamata andrebbe ad un endpoint server
		// che salverebbe i dati nel file models_settings.json
		console.log('Salvando animazione per:', playerData);

		// Per ora simula un successo
		return true;
	} catch (error) {
		console.error("Errore nel salvare l'animazione:", error);
		return false;
	}
};

export {
	get_ranking,
	updatePlayerWin,
	updatePlayerLose,
	createMatch,
	savePlayerAnimation,
};
