import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaginatedTable from "../../components/PaginatedTable";
import useAPI from "../../hooks/useAPI";
import studentsAPI from "../../api/students";

const Page = () => {
    const { request, loading, data, error } = useAPI(studentsAPI.all);
    const navigate = useNavigate();
    const toRow = (data) => {
        const rows = [];
        if (data && data.length) {
            data.forEach(({ studentId, department, user: { fullname } }) => {
                rows.push([studentId, fullname, department, [{ action: "view", handler: () => { navigate(`/app/admin/student/${btoa(studentId)}`) } }]]);
            })
        }
        return rows;
    }
    useEffect(() => { request() }, [])
    return <>
        <PaginatedTable error={error} isLoading={loading} title=" Students" columns={["Student ID", "Name", "Department", "Actions"]} data={toRow(data)} />
    </>
}
export default Page;