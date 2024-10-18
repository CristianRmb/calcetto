import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { get_ranking, updatePlayerLose, updatePlayerWin } from './api';
export default function useClassificaQuery({}) {
	const queryClient = useQueryClient();
	const { data, isLoading, isFetching } = useQuery({
		queryKey: ['players'],
		queryFn: () => get_ranking(),
	});

	const setPlayerWinMutation = useMutation({
		mutationFn: updatePlayerWin,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [`players`] });
		},
	});

	const setPlayerLoseMutation = useMutation({
		mutationFn: updatePlayerLose,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [`players`] });
		},
	});

	const setPlayerWin = (player_id: number) => {
		setPlayerWinMutation.mutateAsync(player_id);
	};

	const setPlayerLose = (player_id: number) => {
		setPlayerLoseMutation.mutateAsync(player_id);
	};

	return {
		classifica: data,
		classificaLoading: isLoading,
		classificaFetching: isFetching,
		setPlayerWin,
		setPlayerLose,
	};
}
