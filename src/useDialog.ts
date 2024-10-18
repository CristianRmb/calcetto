import { useCallback, useState } from 'react';

export function useDialog() {
	const [state, setState] = useState<{ open: boolean; data: any }>({
		open: false,
		data: undefined,
	});

	const handleOpen = useCallback((data: any) => {
		setState({
			open: true,
			data,
		});
	}, []);

	const handleClose = useCallback((data: any) => {
		setState({
			open: false,
			// data: state.data,
			data,
		});
	}, []);

	return {
		data: state.data,
		handleClose,
		handleOpen,
		open: state.open,
	};
}
