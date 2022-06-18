import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaginatedTable from "../../components/PaginatedTable";
import useAPI from "../../hooks/useAPI";
import advisorsAPI from "../../api/advisors";

const Page = () => {
    const { request, loading, data, error } = useAPI(advisorsAPI.all);
    const navigate = useNavigate();
    const toRow = (data) => {
        const rows = [];
        if (data && data.length) {
            data.forEach(({ employeeId, department, user: { fullname } }) => {
                rows.push([employeeId, fullname, department, [{ action: "view", handler: () => { navigate(`/app/admin/advisor/${btoa(employeeId)}`) } }]]);
            })
        }
        return rows;
    }
    useEffect(() => { request() }, [])
    return <>
        <PaginatedTable error={error} isLoading={loading} title=" Advisors" columns={["Employee ID", "Name", "Department", "Actions"]} data={toRow(data)} />
    </>
}
export default Page;