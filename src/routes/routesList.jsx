import { createBrowserRouter } from "react-router-dom"
import {
  Edit,
  List,
  Form,
  Dashboard,
  NotFound,
  Profile,
  Auth,
  Home,
} from "../pages"
import ProtectedRoute from "./ProtectedRoute"
import Layout from "../template/Layout.jsx"

export const routesList = createBrowserRouter([
  {
    path: "/UserProfile/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "dashboard",
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
        element: <Profile />,
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
