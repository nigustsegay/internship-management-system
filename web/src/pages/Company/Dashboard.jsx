import React, { useState, useEffect } from "react";
import Content from "../../components/Content";
import PaginatedTable from "../../components/PaginatedTable";
import useAPI from "../../hooks/useAPI";
import useAuth from "../../hooks/useAuth";
import internRequestAPI from "../../api/internRequests";

const Page = () => {
    const auth = useAuth();
    const companyName = btoa(auth.metadata.companyName);
    const { request, loading, data, error } = useAPI(internRequestAPI.allByCompany);
    useEffect(() => { request(companyName) }, [])
   
    const toRow = (data) => {
        const rows = [];
        if (data && data.length) {
            data.forEach(({ createdAt, department, accepted, quantity }) => {
                rows.push([new Date(createdAt).toDateString(), department, quantity, accepted ? "ACCEPTED" : "PENDING"]);
            })
        }
        return rows;
    }
    return <Content isLoading={loading} title="Dashboard" actions={[{ link: "/app/company/apply", name: "Request new Interns" }]}  >
        <PaginatedTable sub error={error} isLoading={loading} title="Intern Requests" columns={["Requested At", "Department", "Number of Interns", "Status"]} data={toRow(data)} />
    </Content>
}
export default Page;