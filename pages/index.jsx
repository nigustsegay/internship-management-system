import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
    SnackbarProvider,
    PLACEMENT,
} from 'baseui/snackbar';

import MainLayout from "./MainLayout";
import AppLayout from "./AppLayout";
import AdminLayout from "./AdminLayout";
import StudentLayout from "./StudentLayout";
import AdvisorLayout from "./AdvisorLayout";
import CompanyLayout from "./CompanyLayout";
import AppIndex from "./AppIndex";
import ResetPassword from "./ResetPassword";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import NotFound from "./NotFound";
import UnAuthorized from "./UnAuthorized";
import AdminDashboard from "./Admin/Dashboard";
import AdminAdvisors from "./Admin/Advisors";
import AdminAdvisor from "./Admin/Advisor";
import AdminStudents from "./Admin/Students";
import AdminStudent from "./Admin/Student";
import AdminCompanies from "./Admin/Companies";
import AdminCompany from "./Admin/Company";
import AdminCompanyRequest from "./Admin/CompanyRequest";
import AdminAssignAdvisor from "./Admin/AssignAdvisor";
import AdminAssignCompany from "./Admin/AssignCompany";
import AdminCompanyRequests from "./Admin/CompanyRequests";
import AdminStudentRequests from "./Admin/StudentRequests";
import CompanyDashboard from "./Company/Dashboard";
import CompanyApply from "./Company/Apply";
import CompanyStudents from "./Company/Students";
import CompanyStudent from "./Company/Student";
import CompanySubmitAttendance from "./Company/SubmitAttendance";
import CompanyAddTask from "./Company/AddTask";
import StudentDashboard from "./Student/Dashboard";
import StudentApply from "./Student/Apply";
import StudentChat from "./Student/Chat";
import StudentSubmitReport from "./Student/SubmitReport";
import StudentTask from "./Student/Task";
import AdvisorDashboard from "./Advisor/Dashboard";
import AdvisorStudent from "./Advisor/Student";
import AdvisorChat from "./Advisor/Chat";
import AdvisorAssignToCompany from "./Advisor/AssignToCompany"
import { UserAuthContext } from "../hooks/useAuth";
const App = () => {
    const [metadata, setMetadata] = useState(JSON.parse(localStorage.getItem("auth")) || {});
    return (
        <UserAuthContext.Provider value={{ metadata, setMetadata }}>
            <SnackbarProvider placement={PLACEMENT.topRight}>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                        <Route path="unauthorized" element={<UnAuthorized />} />
                    </Route>
                    <Route path="/app" element={<AppLayout />}>
                        <Route index element={<AppIndex />} />
                        <Route path="reset-password" element={<ResetPassword />} />
                        <Route path="admin" element={<AdminLayout />}>
                            <Route index element={<AdminDashboard />} />
                            <Route path="advisors" element={<AdminAdvisors />} />
                            <Route path="advisor/:advisorId" element={<AdminAdvisor />} />
                            <Route path="students" element={<AdminStudents />} />
                            <Route path="student/:studentId" element={<AdminStudent />} />
                            <Route path="companies" element={<AdminCompanies />} />
                            <Route path="company/:name" element={<AdminCompany />} />
                            <Route path="company-request/:requestId" element={<AdminCompanyRequest />} />
                            <Route path="assign-advisor/:studentId" element={<AdminAssignAdvisor />} />
                            <Route path="assign-company/:studentId" element={<AdminAssignCompany />} />
                            <Route path="company-requests" element={<AdminCompanyRequests />} />
                            <Route path="student-requests" element={<AdminStudentRequests />} />
                        </Route>
                        <Route path="company" element={<CompanyLayout />}>
                            <Route index element={<CompanyDashboard />} />
                            <Route path="apply" element={<CompanyApply />} />
                            <Route path="add-task/:studentId" element={<CompanyAddTask />} />
                            <Route path="students" element={<CompanyStudents />} />
                            <Route path="student/:studentId" element={<CompanyStudent />} />
                            <Route path="submit-attendance/:studentId" element={<CompanySubmitAttendance />} />
                        </Route>
                        <Route path="student" element={<StudentLayout />}>
                            <Route index element={<StudentDashboard />} />
                            <Route path="apply" element={<StudentApply />} />
                            <Route path="task/:taskId" element={<StudentTask />} />
                            <Route path="submit-report" element={<StudentSubmitReport />} />
                            <Route path="chat" element={<StudentChat />} />
                        </Route>
                        <Route path="advisor" element={<AdvisorLayout />}>
                            <Route index element={<AdvisorDashboard />} />
                            <Route path="student/:studentId" element={<AdvisorStudent />} />
                            <Route path="assign/:studentId" element={<AdvisorAssignToCompany />} />
                            <Route path="chat" element={<AdvisorChat />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </SnackbarProvider>
        </UserAuthContext.Provider>
    );
};

export default App;
