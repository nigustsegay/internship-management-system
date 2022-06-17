import React from "react";
import { Outlet } from "react-router-dom";
import { FaBuilding, FaChartPie, FaChalkboardTeacher, FaUsers, FaMailBulk, FaVideo } from 'react-icons/fa';
import Dashboard from "../components/Dashboard";
import RoleRoute from "./RoleRoute";
export const menu = [
    {
        title: 'Dashboard',
        icon: <FaChartPie style={{ marginRight: '0.5rem' }} />,
        to: "/app/admin"
    },
    {
        title: 'Students',
        icon: <FaUsers style={{ marginRight: '0.5rem' }} />,
        to: "/app/admin/students"
    },
    {
        title: 'Companies',
        icon: <FaBuilding style={{ marginRight: '0.5rem' }} />,
        to: "/app/admin/companies"
    },
    {
        title: 'Advisors',
        icon: <FaChalkboardTeacher style={{ marginRight: '0.5rem' }} />,
        to: "/app/admin/advisors"
    },
    {
        title: 'Company Intern Requests',
        icon: <FaChalkboardTeacher style={{ marginRight: '0.5rem' }} />,
        to: "/app/admin/company-requests"
    },
    {
        title: 'Student Internship Requests',
        icon: <FaChalkboardTeacher style={{ marginRight: '0.5rem' }} />,
        to: "/app/admin/student-requests"
    }
    , {
        title: 'Create Admin Account',
        icon: <FaUsers style={{ marginRight: '0.5rem' }} />,
        to: "/app/admin/new-admin"
    },
    {
        title: 'Chat',
        icon: <FaChalkboardTeacher style={{ marginRight: '0.5rem' }} />,
        to: "/app/admin/chat"
    },
    {
        title: 'Mail',
        icon: <FaMailBulk style={{ marginRight: '0.5rem' }} />,
        to: "/app/admin/mail"
    },
    {
        title: 'Video',
        icon: <FaVideo style={{ marginRight: '0.5rem' }} />,
        to: "/app/admin/video"
    },
]


const Layout = () => {
    return <Dashboard menu={menu} title="">
        <RoleRoute role="ADMIN" />
    </Dashboard>
}
export default Layout;