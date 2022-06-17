import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Content from "../../components/Content";
import StudentProfile from "../../components/StudentProfile";
import PaginatedTable from "../../components/PaginatedTable";
import Attendance from "../../components/Attendance";
import useAPI from "../../hooks/useAPI";
import studentsAPI from "../../api/students";

const Page = () => {
    const { studentId } = useParams();
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

    const studentActions = (data) => {
        const actions = [];
        if (data && data.internship && data.internship.documentOfIntent)
            actions.push({ name: "View Document of Intent", handler: () => { if (data && data.internship) window.open(data.internship.documentOfIntent, '_blank').focus(); } });
        if (data && data.internship && !data.internship.company) {
            actions.push({ name: "Assign to Company", link: `/app/advisor/assign/${studentId}` })
        }
        return actions;
    }
    return <Content error={error} isLoading={loading} title="Student Profile" actions={studentActions(data)}>
        {data && <> <StudentProfile profilePicture={data.user.profilePicture} name={data.user.fullname} id={data.studentId} department={data.department} />
            <PaginatedTable height="200px" hidePagination isLoading={loading} title="Internship Request" columns={["Date Applied", "Advisor", "Company"]} data={toInternshipRow(data.internship)} />
            {data.internship && !data.internship.company && <PaginatedTable error={error} isLoading={loading} title="Companies Applied for Internship" columns={["Company Name", "Description"]} data={toCompanyRow(data.internship)} />}
            <Attendance data={data.attendance} />
        </>}
    </Content>

}
export default Page;