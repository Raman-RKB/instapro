import { Routes, Route } from "react-router-dom";
import App from "./App";
import Reg from "./reg";
import Login from "./login";
import AddPost from "./addpost";
import { useState } from "react";
import UserPage from "./userPage";

export const AppRoutes = () => {
    const [auth, setAuth] = useState(false);
    const [userId, setUserId] = useState();
    const [userToken, setUserToken] = useState();

    return (

        <Routes>
            <Route path="/" element={<App userToken={userToken} setUserId={setUserId} />} />
            <Route path="/reg" element={<Reg setUserToken={setUserToken} />} />
            <Route path="/login" element={<Login setAuth={setAuth} setUserToken={setUserToken} />} />
            <Route path="/add-post" element={<AddPost userToken={userToken} />} />
            <Route path="/user-page" element={<UserPage userToken={userToken} userId={userId} />} />
        </Routes>
    );
};

export default AppRoutes;