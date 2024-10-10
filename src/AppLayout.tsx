import { Outlet } from 'react-router-dom';
// import { useEffect } from 'react';

export default function AuthLayout() {
	return (
		<div className='flex bg-bg w-full h-screen max-md_lg:flex-col'>
			{/* <Sidebar /> */}
			<div
				className={`flex flex-col h-full pr-8 overflow-y-auto max-md_lg:order-1`}
			>
				<Outlet />
			</div>
		</div>
	);
}
