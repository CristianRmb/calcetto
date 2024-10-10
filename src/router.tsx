import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
} from 'react-router-dom';

import App from './App';
import AuthLayout from './AppLayout';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route>
				<Route path='*' element={<Navigate to={'/'} />} />
			</Route>
			<Route element={<AuthLayout />}>
				<Route path='/' element={<App />} />
			</Route>
		</>
	)
	// { basename: '/restrai' }
);
