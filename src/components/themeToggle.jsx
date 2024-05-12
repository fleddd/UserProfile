import { ThemeContext } from "../App"
import { useContext } from "react"
import { Image } from "."

const ThemeToggle = () => {
  function onClickHandle() {
    toggleDarkMode()
  }
  const { darkMode, toggleDarkMode } = useContext(ThemeContext)
  return (
    <div
      className="hover:translate-y-[-1px] transition-all ease-in-out"
      onClick={onClickHandle}
    >
      {darkMode ? <Image.Night /> : <Image.Sun />}
    </div>
  )
}

export default ThemeToggle
