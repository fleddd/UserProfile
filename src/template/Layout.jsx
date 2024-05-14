import { Outlet } from "react-router-dom"
import Header from "./header/header"

const Layout = () => {
  return (
    <div className="min-h-dvh flex flex-col w-full gap-3">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
