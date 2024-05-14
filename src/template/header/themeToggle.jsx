import { Image } from "../../components"
import useTheme from "../../hooks/useTheme"

const ThemeToggle = () => {
  function onClickHandle() {
    toggleDarkMode()
  }
  const { darkMode, toggleDarkMode } = useTheme()
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
