import { createBrowserRouter } from "react-router-dom"
import { Edit, List, Form, Dashboard, NotFound, Profile, Auth } from "../pages"
import ProtectedRoute from "./ProtectedRoute"
import Layout from "../template/Layout.jsx"

export const routesList = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "form",
        element: (
          <ProtectedRoute>
            <Form />
          </ProtectedRoute>
        ),
      },
      {
        path: "list",
        element: (
          <ProtectedRoute>
            <List />
          </ProtectedRoute>
        ),
      },
      {
        path: "list/:id",
        element: (
          <ProtectedRoute>
            <Edit />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "auth",
        element: <Auth />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
])
