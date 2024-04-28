import { NavLink, useLocation } from 'react-router-dom'

function Header() {
    const routerPath = useLocation()

    return (
        <header className="w-full flex items-start flex-col justify-center mb-5">
            <div className='w-full font-bold h-[150px] bg-blue-500 flex items-center justify-between px-40'>
                <h1 className="text-4xl text-white select-none">
                    Bussiness Tools
                </h1>
                <nav className='flex px-5 py-5 gap-3 items-center justify-center text-xl  font-bold mb-5'>
                    <NavLink className={` transition-all bg-white text-blue-500 ease px-4 py-2 rounded-xl ${routerPath.pathname === '/' && 'activeNav'}`} to={'/'}>Dashboard</NavLink>
                    <NavLink className={` transition-all bg-white text-blue-500 ease px-4 py-2 rounded-xl ${routerPath.pathname === '/form' && 'activeNav'}`} to={'/form'}>Add</NavLink>
                    <NavLink className={` transition-all bg-white text-blue-500 ease px-4 py-2 rounded-xl ${routerPath.pathname === '/list'  && 'activeNav'}`} to={'/list'}>List</NavLink>
                </nav>
            </div>


        </header>
    );
}

export default Header;