import { RouterProvider } from "react-router-dom"
import { routesList } from "./routesList"
export const AppRouter = () => {
  return <RouterProvider router={routesList} />
}
