import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaginatedTable from "../../components/PaginatedTable";
import useAPI from "../../hooks/useAPI";
import internRequestsAPI from "../../api/internRequests";
const Page = () => {
    const { request: getRequests, loading: requestLoading, data: requestData, error: requestError } = useAPI(internRequestsAPI.all);

    const navigate = useNavigate()
    useEffect(() => { getRequests(); }, [])
    const toRequestRow = (data) => {
        const rows = [];
        if (data && data.length) {
            data.forEach(({ id, createdAt, department, accepted, quantity, company: { name } }) => {
                rows.push([new Date(createdAt).toDateString(), name, department, quantity, accepted ? "ACCEPTED" : "PENDING", [{ action: "view", handler: () => { navigate(`/app/admin/company-request/${btoa(id)}`) } }]]);
            })
        }
        return rows;
    }



    return <PaginatedTable error={requestError} isLoading={requestLoading} title=" Company Intern Requests" columns={["Request At", "Company Name", "Department", "Number of Interns", "Status", "Action"]} data={toRequestRow(requestData)} />

}
export default Page;