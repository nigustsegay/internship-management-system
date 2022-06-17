import React from "react";
import Content from "../../components/Content"
import CreateReport from "../../components/CreateReport";
import useAPI from "../../hooks/useAPI";
import useAuth from "../../hooks/useAuth";
import reportsAPI from "../../api/reports"
import { useNavigate } from "react-router-dom";

const Page = () => {
    const navigate = useNavigate()
    const { metadata: { studentId } } = useAuth()
    const { loading, request } = useAPI(reportsAPI.create, { successMessage: "Report Added", errorMessage: "Could not add Report", onComplete: () => { navigate(-1) } });
    return <Content title="Submit Report" >
        <CreateReport isLoading={loading} onSubmit={(payload) => {
            request({ ...payload, studentId });
        }} />
    </Content >
}
export default Page;