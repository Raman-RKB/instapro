import { Routes, Route } from "react-router-dom";
import App from "./App";
import Reg from "./reg";
import Login from "./login";
import AddPost from "./addpost";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/reg" element={<Reg />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-post" element={<AddPost />} />
        </Routes>
    );
};

export default AppRoutes;