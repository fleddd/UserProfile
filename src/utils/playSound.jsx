import success from "../assets/sounds/success.mp3"
import error from "../assets/sounds/error.m4a"
import click from "../assets/sounds/click.mp3"

function PlaySound({ sound }) {
  if (sound === "success") new Audio(success).play()
  if (sound === "error") new Audio(error).play()
  if (sound === "click") new Audio(click).play()

  console.error("The wrong sound was put into the function!")
}

export default PlaySound
