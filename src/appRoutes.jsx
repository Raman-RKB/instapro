import { Routes, Route } from "react-router-dom";
import App from "./App";
import Reg from "./reg";
import Login from "./login";
import AddPost from "./addpost";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route exact path="/reg" element={<Reg />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/add-post" element={<AddPost />} />
            {/* <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings/:id" element={<Settings />} />
        <Route path="/product/:myadvt/:id" element={<Product />} />
        <Route path="/addnewat" element={<Addnewat />} />
      </Route> */}
        </Routes>
    );
};

export default AppRoutes;