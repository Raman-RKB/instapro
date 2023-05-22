import { Routes, Route } from "react-router-dom";
import App from "./App";
import Reg from "./reg";
import Login from "./login";
import AddPost from "./addpost";
import { useState } from "react";
import UserPage from "./userPage";

export const AppRoutes = () => {
    const [auth, setAuth] = useState(false);
    const [userId, setUserId] = useState(false);

    return (

        <Routes>
            <Route path="/" element={<App auth={auth} setUserId={setUserId} />} />
            <Route path="/reg" element={<Reg />} />
            <Route path="/login" element={<Login setAuth={setAuth} />} />
            <Route path="/add-post" element={<AddPost />} />
            <Route path="/user-page" element={<UserPage auth={auth} userId={userId} />} />
        </Routes>
    );
};

export default AppRoutes;