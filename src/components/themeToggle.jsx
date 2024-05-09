const ThemeToggle = () => {
  function onClickHandle() {
    //...
  }

  return (
    <div
      className="hover:translate-y-[-1px] transition-all ease-in-out"
      onClick={onClickHandle}
    >
      <p>Theme</p>
    </div>
  )
}

export default ThemeToggle
