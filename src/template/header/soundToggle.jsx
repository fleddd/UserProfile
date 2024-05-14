import { Image } from "../../components"
import usePlaySound from "../../hooks/usePlaySound"
const SoundToggle = () => {
  const { toggleSoundAllowed, isSoundAllowed } = usePlaySound()

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
