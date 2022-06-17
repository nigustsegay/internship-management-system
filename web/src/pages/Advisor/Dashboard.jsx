import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaginatedTable from "../../components/PaginatedTable";
import useAPI from "../../hooks/useAPI";
import useAuth from "../../hooks/useAuth";
import internshipsAPI from "../../api/internships";

const Page = () => {
    const auth = useAuth();
    const advisorId = btoa(auth.metadata.advisorId);
    const { request, loading, data, error } = useAPI(internshipsAPI.allByAdvisor);
    const navigate = useNavigate();
    const toRow = (data) => {
        const rows = [];
        if (data && data.length) {
            data.forEach(({ student: { studentId, department, user: { fullname } } }) => {
                rows.push([studentId, fullname, department, [{ action: "view", handler: () => { navigate(`/app/advisor/student/${btoa(studentId)}`) } }]]);
            })
        }
        return rows;
    }
    useEffect(() => { request(advisorId) }, [])
    return <>
        <PaginatedTable error={error} isLoading={loading} title="Assigned Students" columns={["Student ID", "Name", "Department", "Actions"]} data={toRow(data)} />
    </>
}
export default Page;