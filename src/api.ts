import axios from 'axios';

const get_ranking = async () => {
	try {
		const response = await axios.get(
			'https://mazino.pythonanywhere.com/calcetto/classifica/'
		);
		return response.data;
	} catch (error) {
		return error;
	}
};

export { get_ranking };
