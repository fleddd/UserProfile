import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"

const HeaderModal = ({ closeModal }) => {
  return (
    <motion.div
      animate={{
        opacity: [0, 1],
      }}
      exit={{ x: -500, opacity: 0 }}
      className="py-4 bg-white border-b-4 border-blue-500 absolute w-full h-[35%] z-[1]"
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
        <NavLink
          onClick={closeModal}
          className={
            "bg-white text-4xl font-bold p-2 text-blue-500 border-2 border-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all ease-in-out"
          }
          to={"/"}
        >
          Dashboard
        </NavLink>
        <NavLink
          onClick={closeModal}
          className={
            "bg-white text-4xl font-bold p-2 text-blue-500 border-2 border-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all ease-in-out"
          }
          to={"/form"}
        >
          Add employee
        </NavLink>
        <NavLink
          onClick={closeModal}
          className={
            "bg-white text-4xl font-bold p-2 text-blue-500 border-2 border-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all ease-in-out"
          }
          to={"/list"}
        >
          List
        </NavLink>
      </motion.div>
    </motion.div>
  )
}

export default HeaderModal
