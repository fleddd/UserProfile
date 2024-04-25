import { useState } from 'react'
import Header from './components/header'
import { NavLink, useLocation } from 'react-router-dom'

function App() {

  const routerPath = useLocation()


  return (
    <>
      <Header/>
      <nav className='flex w-full gap-3 items-center justify-center py-5 text-xl  font-bold'>
        <NavLink className={` transition-all ease px-4 py-2 rounded-xl ${routerPath.pathname === '/' && 'activeNav'}`} to={'/'}>Dashboard</NavLink>
        <NavLink className={` transition-all ease px-4 py-2 rounded-xl ${routerPath.pathname === '/form' && 'activeNav'}`} to={'/form'}>Add</NavLink>
        <NavLink className={` transition-all ease px-4 py-2 rounded-xl ${routerPath.pathname === '/list'  && 'activeNav'}`} to={'/list'}>List</NavLink>
      </nav>
      <hr className='p-5'/>

    </>
  )
}

export default App
