import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"
import useAuth from "../../hooks/useAuth"

const HeaderModal = ({ closeModal }) => {
  const { isUserLoggedIn } = useAuth()
  return (
    <motion.div
      animate={{
        opacity: [0, 1],
      }}
      exit={{ x: -500, opacity: 0 }}
      className="py-4 bg-white dark:bg-neutral-950 border-b-4 border-blue-500  dark:border-neutral-700 absolute w-full h-[45%] z-[1]"
    >
      <motion.div
        initial={{
          x: -500,
        }}
        animate={{
          x: 0,
          transition: {
            delay: 0.2,
          },
        }}
        className="flex h-full flex-col gap-4 justify-center items-center"
      >
        {isUserLoggedIn && (
          <>
            <NavLink
              onClick={closeModal}
              className={
                "bg-white dark:bg-neutral-900 text-4xl font-bold p-2 text-blue-500 dark:text-white border-2 border-blue-500 dark:border-neutral-800 rounded-xl hover:bg-blue-500 hover:text-white transition-all ease-in-out"
              }
              to={"/UserProfile/dashboard"}
            >
              Dashboard
            </NavLink>
            <NavLink
              onClick={closeModal}
              className={
                "bg-white dark:bg-neutral-900 text-4xl font-bold p-2 text-blue-500 dark:text-white border-2 border-blue-500 dark:border-neutral-800 rounded-xl hover:bg-blue-500 hover:text-white transition-all ease-in-out"
              }
              to={"/UserProfile/form"}
            >
              Add user
            </NavLink>
            <NavLink
              onClick={closeModal}
              className={
                "bg-white dark:bg-neutral-900 text-4xl font-bold p-2 text-blue-500 dark:text-white border-2 border-blue-500 dark:border-neutral-800 rounded-xl hover:bg-blue-500 hover:text-white transition-all ease-in-out"
              }
              to={"/UserProfile/list"}
            >
              List
            </NavLink>
          </>
        )}
        <NavLink
          onClick={closeModal}
          className={
            "bg-white dark:bg-neutral-900 text-4xl font-bold p-2 text-blue-500 dark:text-white border-2 border-blue-500 dark:border-neutral-800 rounded-xl hover:bg-blue-500 hover:text-white transition-all ease-in-out"
          }
          to={"/UserProfile/profile"}
        >
          Profile
        </NavLink>
        {!isUserLoggedIn && (
          <NavLink
            onClick={closeModal}
            className={
              "bg-white dark:bg-neutral-900 text-4xl font-bold p-2 text-blue-500 dark:text-white border-2 border-blue-500 dark:border-neutral-800 rounded-xl hover:bg-blue-500 hover:text-white transition-all ease-in-out"
            }
            to={"/UserProfile/"}
          >
            Home
          </NavLink>
        )}
      </motion.div>
    </motion.div>
  )
}

export default HeaderModal
