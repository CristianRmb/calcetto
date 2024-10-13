import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
} from 'react-router-dom';

import AuthLayout from './AppLayout';
import App from './pages/App';
import ModelsPage from './pages/ModelsPage';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route>
				<Route path='*' element={<Navigate to={'/'} />} />
			</Route>
			<Route element={<AuthLayout />}>
				<Route path='/' element={<App />} />
				<Route path='/models' element={<ModelsPage />} />
			</Route>
		</>
	),
	{ basename: '/calcetto' }
);
