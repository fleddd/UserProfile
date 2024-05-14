import { createBrowserRouter } from "react-router-dom"
import { Edit, List, Form, Dashboard, NotFound } from "../pages"
import Layout from "../template/Layout.jsx"

export const routesList = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "form",
        element: <Form />,
      },
      {
        path: "list",
        element: <List />,
      },
      {
        path: "list/:id",
        element: <Edit />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
])
