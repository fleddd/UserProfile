import { useContext } from "react"
import { SoundContext } from "../App"
import { Image } from "."
const SoundToggle = () => {
  const { toggleSoundAllowed, isSoundAllowed } = useContext(SoundContext)

  function onClickHandle() {
    toggleSoundAllowed()
  }
  return (
    <div
      className="hover:translate-y-[-1px] transition-all ease-in-out cursor-pointer"
      onClick={onClickHandle}
    >
      {isSoundAllowed ? <Image.SoundEnabled /> : <Image.SoundDisabled />}
    </div>
  )
}

export default SoundToggle
