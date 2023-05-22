import { Routes, Route } from "react-router-dom";
import App from "./App";
import Reg from "./reg";
import Login from "./login";
import AddPost from "./addpost";
// import UserPage from "./userPage";

export const AppRoutes = ({ isLoggedIn }) => {
    return (
        <Routes>
            <Route path="/" element={<App isLoggedIn={isLoggedIn} />} />
            <Route path="/reg" element={<Reg />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-post" element={<AddPost />} />
            {/* <Route path="/user-page" element={<UserPage />} /> */}
        </Routes>
    );
};

export default AppRoutes;