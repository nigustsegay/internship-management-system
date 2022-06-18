import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaginatedTable from "../../components/PaginatedTable";
import useAPI from "../../hooks/useAPI";
import companiesAPI from "../../api/companies";

const Page = () => {
    const { request, loading, data, error } = useAPI(companiesAPI.all);
    const navigate = useNavigate();
    const toRow = (data) => {
        const rows = [];
        if (data && data.length) {
            data.forEach(({ name, user: { fullname } }) => {
                rows.push([name, fullname, [{ action: "view", handler: () => { navigate(`/app/admin/company/${btoa(name)}`) } }]]);
            })
        }
        return rows;
    }
    useEffect(() => { request() }, [])
    return <>
        <PaginatedTable error={error} isLoading={loading} title=" Companies" columns={["Company Name", "Company Advisor Name", "Actions"]} data={toRow(data)} />
    </>
}
export default Page;