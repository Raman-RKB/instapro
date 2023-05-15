import { Routes, Route } from "react-router-dom";
import App from "./App";
import Reg from "./reg";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route exact path="/auth" element={<Reg />} />

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