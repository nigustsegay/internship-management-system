import React, { useState } from 'react';
import InternRequest from "../../components/InternRequest";
import Content from "../../components/Content";
import internRequestsAPI from "../../api/internRequests";
import useAPI from "../../hooks/useAPI";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
function Page() {
    const navigate = useNavigate();
    const { metadata: { companyName } } = useAuth();
    const { request, loading } = useAPI(internRequestsAPI.create, { errorMessage: "Could not apply for new interns", successMessage: "applied for new interns", onComplete: () => { navigate(-1) } });
    return (
        <Content title="Request new Interns" >
            <InternRequest isLoading={loading} onSubmit={({ department, quantity }) => { request({ companyName, quantity, department }); }} />
        </Content>
    );
}
export default Page;