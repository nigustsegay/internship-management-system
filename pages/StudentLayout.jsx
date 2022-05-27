import React from "react";
import { Outlet } from "react-router-dom";
import { FaBuilding, FaChartPie, FaChalkboardTeacher, FaUsers } from 'react-icons/fa';
import Dashboard from "../components/Dashboard";
import RoleRoute from "./RoleRoute";
export const menu = [
    {
        title: 'Dashboard',
        icon: <FaChartPie style={{ marginRight: '0.5rem' }} />,
        to: "/app/student"
    },
    {
        title: 'Chat',
        icon: <FaBuilding style={{ marginRight: '0.5rem' }} />,
        to: "/app/student/chat"
    },
]


const Layout = () => {
    return <Dashboard menu={menu} title="Student">
        <RoleRoute role="STUDENT" />
    </Dashboard>
}
export default Layout;