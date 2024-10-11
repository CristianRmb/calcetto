import Sidebar from './Sidebar';

export default function AuthLayout() {
	return (
		<div className='flex overflow-auto'>
			<Sidebar />
			{/* <div
				className={`flex flex-col h-full w-full pr-8 overflow-y-auto max-md_lg:order-1`}
			>
				<Outlet />
			</div> */}
		</div>
	);
}
