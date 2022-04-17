import React from "react";
import { FaChartPie, FaChalkboardTeacher, FaUsers } from 'react-icons/fa';
import Dashboard from "../components/Dashboard";
import RoleRoute from "./RoleRoute";
export const menu = [
    {
        title: 'Dashboard',
        icon: <FaChartPie style={{ marginRight: '0.5rem' }} />,
        to: "/app/advisor"
    },
    {
        title: 'Chat',
        icon: <FaChalkboardTeacher style={{ marginRight: '0.5rem' }} />,
        to: "/app/advisor/chat"
    },
]


const Layout = () => {
    return <Dashboard menu={menu} title="Advisor">
        <RoleRoute role="ADVISOR" />
    </Dashboard>
}
export default Layout;