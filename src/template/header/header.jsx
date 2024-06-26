import { NavLink, useLocation } from "react-router-dom"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { motion } from "framer-motion"

import HeaderModal from "./headerModal"
import SoundToggle from "./soundToggle"
import ThemeToggle from "./themeToggle"
import useAuth from "../../hooks/useAuth"

library.add(faBars)

function Header() {
  const { isUserLoggedIn } = useAuth()
  const routerPath = useLocation()
  const [isBurgerMenu, toggleBurgerMenu] = useState(false)
  const closeModal = () => {
    toggleBurgerMenu(false)
  }

  return (
    <header className={`w-full static top-0 z-2 pb-5`}>
      <div className="w-full font-bold h-[100px] gap-3 bg-blue-500 dark:bg-neutral-950 flex items-center justify-between px-10">
        <NavLink
          to={"/UserProfile/"}
          className="text-2xl sm:text-3xl md:text-4xl   text-white select-none"
        >
          Bussiness Tools
        </NavLink>
        <div className="flex gap-5 items-center justify-center">
          <div className="flex gap-4">
            <ThemeToggle />
            <SoundToggle />
          </div>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{
              scale: 0.8,
              rotate: -90,
              borderRadius: "100%",
            }}
            className="sm:hidden"
            onClick={() => toggleBurgerMenu((prev) => !prev)}
          >
            <FontAwesomeIcon
              icon={faBars}
              className="text-4xl text-white p-2 border-2 rounded-3xl"
            />
          </motion.div>
          <nav className="hidden h-full sm:flex justify-center gap-3 items-center sm:text-md md:text-xl font-bold">
            {isUserLoggedIn && (
              <>
                <NavLink
                  className={` transition-all ease px-4 py-2 rounded-xl hover:translate-y-[-2px] ${routerPath.pathname === "/UserProfile/dashboard" ? "border-2 bg-blue-500 text-white dark:bg-transparent dark:text-white dark:border-2" : "text bg-white text-blue-500 dark:text-neutral-900"}`}
                  to={"/UserProfile/dashboard"}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  className={` transition-allease px-4 py-2 rounded-xl hover:translate-y-[-2px] ${routerPath.pathname === "/UserProfile/form" ? "border-2 bg-blue-500 text-white dark:bg-transparent dark:text-white dark:border-2" : "text bg-white text-blue-500 dark:text-neutral-900"}`}
                  to={"/UserProfile/form"}
                >
                  Add
                </NavLink>
                <NavLink
                  className={` transition-all ease px-4 py-2 rounded-xl hover:translate-y-[-2px] ${routerPath.pathname === "/UserProfile/list" ? "border-2 bg-blue-500 text-white dark:bg-transparent dark:text-white dark:border-2" : "text bg-white text-blue-500 dark:text-neutral-900"}`}
                  to={"/UserProfile/list"}
                >
                  List
                </NavLink>
              </>
            )}
            <NavLink
              className={` transition-all ease px-4 py-2 rounded-xl hover:translate-y-[-2px] ${routerPath.pathname === "/UserProfile/profile" ? "border-2 bg-blue-500 text-white dark:bg-transparent dark:text-white dark:border-2" : "text bg-white text-blue-500 dark:text-neutral-900"}`}
              to={"/UserProfile/profile"}
            >
              Profile
            </NavLink>
            {!isUserLoggedIn && (
              <NavLink
                className={` transition-all ease px-4 py-2 rounded-xl hover:translate-y-[-2px] ${routerPath.pathname === "/UserProfile/" ? "border-2 bg-blue-500 text-white dark:bg-transparent dark:text-white dark:border-2" : "text bg-white text-blue-500 dark:text-neutral-900"}`}
                to={"/UserProfile/"}
              >
                Home
              </NavLink>
            )}
          </nav>
        </div>
      </div>

      {isBurgerMenu && <HeaderModal closeModal={closeModal} />}
    </header>
  )
}

export default Header
