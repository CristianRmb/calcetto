import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	createMatch,
	get_ranking,
	updatePlayerLose,
	updatePlayerWin,
} from './api';

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

export default function useClassificaQuery({}) {
	const queryClient = useQueryClient();
	const { data, isLoading, isFetching } = useQuery({
		queryKey: ['players'],
		queryFn: () => get_ranking(),
	});

	const setPlayerWinMutation = useMutation({
		mutationFn: updatePlayerWin,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [`players`] });
		},
	});

	const setPlayerLoseMutation = useMutation({
		mutationFn: updatePlayerLose,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [`players`] });
		},
	});

	const setPlayerWin = (player_id: number) => {
		setPlayerWinMutation.mutateAsync(player_id);
	};

	const setPlayerLose = (player_id: number) => {
		setPlayerLoseMutation.mutateAsync(player_id);
	};

	const createMatchMutation = useMutation<MatchResponse, Error, MatchInput>({
		mutationFn: createMatch,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [`players`] });
		},
	});

	const setMatch = (match: MatchInput) => {
		createMatchMutation.mutateAsync(match);
	};

	return {
		classifica: data,
		classificaLoading: isLoading,
		classificaFetching: isFetching,
		setPlayerWin,
		setPlayerLose,
		setMatch,
	};
}
