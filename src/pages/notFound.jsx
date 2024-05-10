import { NavLink } from "react-router-dom"

const NotFound = () => {
  return (
    <main className="w-full h-[500px] flex flex-col justify-center items-center">
      <div className="flex flex-col gap-2 text-2xl justify-center font-bold dark:text-white">
        <h1 className="text-6xl">Error: 404</h1>
        <h2>This page never existed...</h2>
      </div>
      <div className="mt-8">
        <NavLink to={"/"} className={"text-lg text-blue-500 font-bold"}>
          Go back to the homepage
        </NavLink>
      </div>
    </main>
  )
}

export default NotFound
