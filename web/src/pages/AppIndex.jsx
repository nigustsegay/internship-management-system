import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Layout = () => {
    const { metadata: { role } } = useAuth();
    switch (role) {
        case "STUDENT":
            return <Navigate to="/app/student" replace />;
        case "ADVISOR":
            return <Navigate to="/app/advisor" replace />;
        case "COMPANY":
            return <Navigate to="/app/company" replace />;
        case "ADMIN":
            return <Navigate to="/app/admin" replace />;
        default:
            return <Outlet />
    }

}
export default Layout;