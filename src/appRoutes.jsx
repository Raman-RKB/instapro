import { Routes, Route } from "react-router-dom";
import App from "./components/main/App";
import Reg from "./components/registration/Reg";
import Login from "./components/login/Login";
import AddPost from "./components/addpost/AddPost";
import { useEffect, useState } from "react";
import UserPage from "./components/userpage/UserPage";

export const AppRoutes = () => {
    const [userId, setUserId] = useState();
    const [userToken, setUserToken] = useState();

    useEffect(() => {
        if (!userToken) {
            setUserToken(localStorage.getItem('token'));
        }
    }, []);

    return (

        <Routes>
            <Route path="/" element={<App userToken={userToken} setUserId={setUserId} />} />
            <Route path="/reg" element={<Reg setUserToken={setUserToken} />} />
            <Route path="/login" element={<Login setUserToken={setUserToken} />} />
            <Route path="/add-post" element={<AddPost userToken={userToken} />} />
            <Route path="/user-page" element={<UserPage userToken={userToken} userId={userId} />} />
        </Routes>
    );
};

export default AppRoutes;