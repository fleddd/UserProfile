const Button = ({ text, onClick, styles }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-bold px-3 py-2 text-[17px] bg-blue-600 dark:bg-neutral-950 rounded-2xl hover:scale-95 transition-all ease text-white ${styles}`}
    >
      {text}
    </button>
  )
}

export default Button
