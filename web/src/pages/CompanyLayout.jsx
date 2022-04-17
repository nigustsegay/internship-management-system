import React from "react";
import { Outlet } from "react-router-dom";
import { FaBuilding, FaChartPie, FaChalkboardTeacher, FaUsers } from 'react-icons/fa';
import Dashboard from "../components/Dashboard";
import RoleRoute from "./RoleRoute";
export const menu = [
    {
        title: 'Dashboard',
        icon: <FaChartPie style={{ marginRight: '0.5rem' }} />,
        to: "/app/company"
    },
    {
        title: 'Students',
        icon: <FaUsers style={{ marginRight: '0.5rem' }} />,
        to: "/app/company/students"
    },
]


const Layout = () => {
    return <Dashboard menu={menu} title="Company Advisor">
        <RoleRoute role="COMPANY" />
    </Dashboard>
}
export default Layout;