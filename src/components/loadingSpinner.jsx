import { ThreeDots } from "react-loader-spinner"
import { motion } from "framer-motion"
import { useContext } from "react"
import { ThemeContext } from "../App"

const LoadingSpinner = () => {
  const { darkMode } = useContext(ThemeContext)

  return (
    <main className="w-full mt-40 flex items-center justify-center flex-col gap-10">
      <ThreeDots
        visible={true}
        height="120"
        width="120"
        color={`${darkMode ? "#fff" : "#000"}`}
        radius="9"
        ariaLabel="three-dots-loading"
      />
      <motion.p
        className="text-3xl dark:text-white"
        animate={{
          x: [0, 5, 0],
        }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        Loading...
      </motion.p>
    </main>
  )
}

export default LoadingSpinner
