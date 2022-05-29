import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Content from "../../components/Content";
import StudentProfile from "../../components/StudentProfile";
import PaginatedTable from "../../components/PaginatedTable";
import useAPI from "../../hooks/useAPI";
import useAuth from "../../hooks/useAuth";
import studentsAPI from "../../api/students";
const Page = () => {
    const auth = useAuth();
    const studentId = btoa(auth.metadata.studentId);
    const navigate = useNavigate();
    const { loading, request, error, data } = useAPI(studentsAPI.getByStudentId);
    useEffect(() => {
        request(studentId);
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
        if (internship) {
            let advisor = "NOT_ASSIGNED"
            let company = "NOT_ASSIGNED"
            if (internship.advisor !== null) {
                advisor = internship.advisor.user.fullname;
            }
            if (internship.company !== null) {
                company = internship.company.name;
            }
            rows.push([new Date(internship.createdAt).toDateString(), advisor, company]);

        }
        return rows;
    }
    return <Content error={error} isLoading={loading} title="Dashboard">
        {data && data.user && <> <StudentProfile profilePicture={data.user.profilePicture} name={data.user.fullname} id={data.studentId} department={data.department} />
            <PaginatedTable height="200px" hidePagination isLoading={loading} title="Internship Request" columns={["Date Applied", "Advisor", "Company"]} data={toInternshipRow(data.internship)} actions={!data.internship ? [{ name: "Apply for Internship", link: "/app/student/apply" }] : undefined} />
            <PaginatedTable height="300px" title="Tasks" columns={["Date", "Task", "Description", "Status", "Action"]} data={toTaskRow(data.tasks)} />
            <PaginatedTable height="300px" isLoading={loading} title="Reports" columns={["Date", "Name", "Action"]} data={toReportRow(data.reports)} actions={data.internship && data.internship.advisor && data.internship.company ? [{ name: "New Report", link: "/app/student/submit-report" }] : undefined} />
            <PaginatedTable height="300px" title="Attendance" columns={["Date", "Absent"]} data={toAttendanceRow(data.attendance)} />
        </>}
    </Content>


}
export default Page;