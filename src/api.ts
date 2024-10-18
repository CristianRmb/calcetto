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

export { get_ranking, updatePlayerWin, updatePlayerLose };
