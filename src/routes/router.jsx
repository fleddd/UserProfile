import { Routes, Route } from "react-router-dom";
import List from "../pages/list";
import Form from "../pages/form";
import Dashboard from "../pages/dashboard";

const Router = () => {
    return (
        <>
            <Routes>
                <Route index path="/" element={<Dashboard/>}/>
                <Route path="/form" element={<Form/>}/>
                <Route path="/list" element={<List/>}/>
            </Routes>
        
        </>
    );
}
 
export default Router;