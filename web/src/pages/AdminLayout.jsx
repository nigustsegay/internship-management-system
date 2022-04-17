import React from "react";
import { Outlet } from "react-router-dom";
import { FaBuilding, FaChartPie, FaChalkboardTeacher, FaUsers } from 'react-icons/fa';
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
]


const Layout = () => {
    return <Dashboard menu={menu} title="University Admin">
        <RoleRoute role="ADMIN" />
    </Dashboard>
}
export default Layout;