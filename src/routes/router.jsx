import { Routes, Route } from "react-router-dom"
import List from "../pages/list"
import Form from "../pages/form"
import Dashboard from "../pages/dashboard"
import EditPage from "../pages/editPage"
import NotFound from "../pages/notFound"

const Router = () => {
  return (
    <>
      <Routes>
        <Route index path="/" element={<Dashboard />} />
        <Route path="/form" element={<Form />} />
        <Route path="/list" element={<List />} />
        <Route path="/list/:id" element={<EditPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default Router
