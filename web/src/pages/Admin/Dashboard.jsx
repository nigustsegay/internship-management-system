import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Content from "../../components/Content";
import PaginatedTable from "../../components/PaginatedTable";
import useAPI from "../../hooks/useAPI";
import internRequestsAPI from "../../api/internRequests";
import internshipsAPI from "../../api/internships";
const Page = () => {
    const { request: getRequests, loading: requestLoading, data: requestData, error: requestError } = useAPI(internRequestsAPI.pending);
    const { request: getInternships, loading: internshipLoading, data: internshipData, error: internshipError } = useAPI(internshipsAPI.pending);
    const { request: getRequests1, loading: requestLoading1, data: requestData1, error: requestError1 } = useAPI(internRequestsAPI.all);
    const navigate = useNavigate()
    useEffect(() => { getRequests(); getInternships(); getRequests1(); }, [])
    const toRequestRow = (data) => {
        const rows = [];
        if (data && data.length) {
            data.forEach(({ id, createdAt, department, accepted, quantity, company: { name } }) => {
                rows.push([new Date(createdAt).toDateString(), name, department, quantity, accepted ? "ACCEPTED" : "PENDING", [{ action: "view", handler: () => { navigate(`/app/admin/company-request/${btoa(id)}`) } }]]);
            })
        }
        return rows;
    }

    const toInternshipRow = (data) => {
        const rows = [];
        if (data && data.length) {

            data.forEach(({ student: { studentId, department, user: { fullname } }, createdAt, advisor: a, company: c }) => {
                let advisor = "NOT_ASSIGNED"
                let company = "NOT_ASSIGNED"
                if (a) {
                    advisor = a.user.fullname;
                }
                if (c) {
                    company = c.name;
                }
                rows.push([new Date(createdAt).toDateString(), studentId, fullname, department, advisor, company, [{ action: "view", handler: () => { navigate(`/app/admin/student/${btoa(studentId)}`) } }]]);
            })
        }
        return rows;
    }
    const count = (data) => {
        if (data && data.length) {
            return data.filter(({ accepted }) => accepted).reduce((prev, current) => { return prev + current.quantity }, 0);
        }
        return 0;
    }
    return <Content title="Dashboard" >
        <PaginatedTable height="300px" error={requestError} isLoading={requestLoading} title="Pending Company Intern Requests" columns={["Request At", "Company Name", "Department", "Number of Interns", "Status", "Action"]} data={toRequestRow(requestData)} />
        <PaginatedTable height="300px" error={internshipError} isLoading={internshipLoading} title="Pending Student Internship Requests" columns={["Requested At", "Student ID", "Full Name", "Department", "Advisor", "Company", "Action"]} data={toInternshipRow(internshipData)} actions={[{ name: `Total avaliable spots : ${count(requestData1)}`, kind: "teriatry", handler: () => { } }]} />
    </Content>
}
export default Page;