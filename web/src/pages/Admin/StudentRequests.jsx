import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaginatedTable from "../../components/PaginatedTable";
import useAPI from "../../hooks/useAPI";
import internshipsAPI from "../../api/internships";
import internRequestsAPI from "../../api/internRequests";

const Page = () => {
    const { request: getInternships, loading: internshipLoading, data: internshipData, error: internshipError } = useAPI(internshipsAPI.all);
    const { request: getRequests, loading: requestLoading, data: requestData, error: requestError } = useAPI(internRequestsAPI.all);
    const navigate = useNavigate()
    useEffect(() => { getInternships(); getRequests(); }, [])

    const toInternshipRow = (data) => {
        const rows = [];
        if (data && data.length) {

            data.forEach(({ student: { studentId, department, user: { fullname } }, createdAt, advisor: a, company: c }) => {
                let advisor = "NOT_ASSIGNED"
                let company = "NOT_ASSIGNED"
                if (a !== null) {
                    advisor = a.user.fullname;
                }
                if (c !== null) {
                    company = c.name;
                }
                const actions = [];
                if (advisor === "NOT_ASSIGNED") {
                    actions.push({ action: "view", handler: () => { navigate(`/app/admin/student/${btoa(studentId)}`) } })
                }
                rows.push([new Date(createdAt).toDateString(), studentId, fullname, department, advisor, company, actions]);
            })
        }
        return rows;
    }

    const count = (data) => {
        if (data && data.length) {
            return data.filter(({ accepted }) => accepted).reduce((prev, current) => { return prev + current.quantity }, 0);;
        }
        return 0;
    }


    return <PaginatedTable error={internshipError} isLoading={internshipLoading} title=" Student Internship Requests" columns={["Requested At", "Student ID", "Full Name", "Department", "Advisor", "Company", "Action"]} data={toInternshipRow(internshipData)} actions={[{ name: `Total avaliable spots : ${count(requestData)}`, kind: "teriatry", handler: () => { } }]} />
}
export default Page;