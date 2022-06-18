import React from "react";
import { FaChartPie, FaChalkboardTeacher, FaUsers, FaMailBulk, FaVideo } from 'react-icons/fa';
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
    {
        title: 'Mail',
        icon: <FaMailBulk style={{ marginRight: '0.5rem' }} />,
        to: "/app/advisor/mail"
    },
    {
        title: 'Video',
        icon: <FaVideo style={{ marginRight: '0.5rem' }} />,
        to: "/app/advisor/video"
    },
]

const Layout = () => {
    return <Dashboard menu={menu} title="">
        <RoleRoute role="ADVISOR" />
    </Dashboard>
}
export default Layout;