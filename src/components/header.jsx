import { NavLink, useLocation } from 'react-router-dom'
import { faBars} from "@fortawesome/free-solid-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useState} from 'react';
import { motion } from "framer-motion";
import HeaderModal from './headerModal';

library.add(faBars)
function Header() {
    const routerPath = useLocation()
    const [isBurgerMenu, toggleBurgerMenu] = useState(false)
    const closeModal = () => {
        toggleBurgerMenu(false)
    }
   
    return (
        <header className={`w-full mb-5 static top-0 z-2`}>
            <div className='w-full font-bold h-[100px] bg-blue-500 flex items-center justify-between px-10 sm:pr-40'>
                <h1 className="text-2xl sm:text-3xl md:text-4xl   text-white select-none">
                    Bussiness Tools
                </h1>
                    <div>
                        <motion.div whileHover={{ scale: 1.2, rotate: 90 }}
                                    whileTap={{
                                        scale: 0.8,
                                        rotate: -90,
                                        borderRadius: "100%"
                                    }} className='sm:hidden' onClick={() => toggleBurgerMenu(prev => !prev)}>
                            <FontAwesomeIcon icon={faBars} className='text-4xl text-white p-2 border-2 rounded-3xl'/>
                        </motion.div>
                        <nav className='hidden h-full sm:flex justify-center gap-3 items-center sm:text-md md:text-xl font-bold'>
                            <NavLink className={` transition-all bg-white text-blue-500 ease px-4 py-2 rounded-xl hover:translate-y-[-2px] ${routerPath.pathname === '/' && 'activeNav'}`} to={'/'}>Dashboard</NavLink>
                            <NavLink className={` transition-all bg-white text-blue-500 ease px-4 py-2 rounded-xl hover:translate-y-[-2px] ${routerPath.pathname === '/form' && 'activeNav'}`} to={'/form'}>Add</NavLink>
                            <NavLink className={` transition-all bg-white text-blue-500 ease px-4 py-2 rounded-xl hover:translate-y-[-2px] ${routerPath.pathname === '/list'  && 'activeNav'}`} to={'/list'}>List</NavLink>
                        </nav>
                        
                       
                    </div>
            </div>
            
            {isBurgerMenu && <HeaderModal closeModal={closeModal}/>}

        </header>
    );
}

export default Header;