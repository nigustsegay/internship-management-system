// This is student dashboard
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Content from "../../components/Content";
import StudentProfile from "../../components/StudentProfile";
import PaginatedTable from "../../components/PaginatedTable";
import Attendance from "../../components/Attendance";
import useAPI from "../../hooks/useAPI";
import useAuth from "../../hooks/useAuth";
import studentsAPI from "../../api/students";
import internRequestsAPI from "../../api/internRequests";

const Page = () => {
    const auth = useAuth();
    const studentId = btoa(auth.metadata.studentId);
    const navigate = useNavigate();
    const { loading, request, error, data } = useAPI(studentsAPI.getByStudentId);
    const { request: getRequests, loading: requestLoading, data: requestData, error: requestError } = useAPI(internRequestsAPI.all);
    useEffect(() => {
        request(studentId);
        getRequests();
    }, [])
    const toReportRow = (data) => {
        const rows = [];
        if (data && data.length) {
            data.forEach(({ id, name, document, createdAt }) => {
                rows.push([new Date(createdAt).toDateString(), name, [{ action: "view", handler: () => { window.open(document, '_blank').focus(); } }]]);
            })
        }
        return rows;
    }
    const toAttendanceRow = (data) => {
        const rows = [];
        if (data && data.length) {
            data.forEach(({ absent, date }) => {
                rows.push([new Date(date).toDateString(), absent ? "Absent" : "Present"]);
            })
        }
        return rows;
    }
    const toTaskRow = (data) => {
        const rows = [];
        if (data && data.length) {
            data.forEach(({ id, name, description, completed, createdAt }) => {
                const actions = [];
                if (!completed) {
                    actions.push({ action: "view", handler: () => { navigate(`/app/student/task/${btoa(id)}`) } })
                }
                rows.push([new Date(createdAt).toDateString(), name, description, completed ? "COMPLETED" : "PENDING", actions]);
            })
        }
        return rows;
    }
    const toInternshipRow = (internship) => {
        const rows = [];
        try {
            if (internship) {
                let advisor = "NOT_ASSIGNED"
                let company = "NOT_ASSIGNED"
                if (internship.advisor !== null) {
                    advisor = internship.advisor.user.fullname;
                }
                if (internship.company !== null) {
                    company = internship.company.name;
                }
                const companyRequests = JSON.parse(internship.companyRequests).requests.reduce((prev, current) => { return prev + " " + current.name }, " ");
                rows.push([new Date(internship.createdAt).toDateString(), advisor, company]);

            }
        }
        catch (e) {
            alert(e);
        }
        return rows;
    }
    const toCompanyRow = (internship) => {
        const rows = [];
        try {
            if (internship) {
                const data = JSON.parse(internship.companyRequests).requests;
                if (data && data.length) {
                    data.forEach(({ name, description }) => {
                        rows.push([name, description]);
                    })
                }
            }
        }
        catch (e) {
            alert(e);
        }
        return rows;
    }
    const toRequestRow = (d) => {
        const rows = [];

        if (d && d.length) {
            d.forEach(({ id, createdAt, department, accepted, quantity, company: { name } }) => {
                if (department === auth.metadata.department && accepted)
                    rows.push([name, quantity]);

            })
        }
        return rows;
    }
    return <Content error={error} isLoading={loading} title="Dashboard">
        {data && data.user && <> <StudentProfile profilePicture={data.user.profilePicture} name={data.user.fullname} id={data.studentId} department={data.department} />
            <PaginatedTable height="200px" hidePagination isLoading={loading} title="Internship Request" columns={["Date Applied", "Assigned Advisor", "Assigned Company"]} data={toInternshipRow(data.internship)} actions={!data.internship ? [{ name: "Apply for Internship", link: "/app/student/apply" }] : undefined} />
            {data.internship && !data.internship.company && <PaginatedTable error={error} isLoading={loading} title="Companies Applied for Internship" columns={["Company Name", "Description"]} data={toCompanyRow(data.internship)} />}
            <PaginatedTable height="300px" title="Tasks" columns={["Date", "Task", "Description", "Status", "Action"]} data={toTaskRow(data.tasks)} />
            <Attendance data={data.attendance} />
        </>}
    </Content>


}
export default Page;