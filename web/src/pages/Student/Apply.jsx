import React, { useState } from 'react';

import Content from "../../components/Content";
import InternApplication from '../../components/InternApplication';
import useAPI from "../../hooks/useAPI";
import useAuth from "../../hooks/useAuth";
import internshipsAPI from "../../api/internships";
import { useNavigate } from 'react-router-dom';

function Page() {
    const navigate = useNavigate();
    const { metadata: { studentId } } = useAuth();
    const { loading, request: apply } = useAPI(internshipsAPI.apply, { successMessage: "Applied!", errorMessage: "Could not apply for internship", onComplete: () => { navigate(-1) } })
    return (
        <Content title="Apply for Internship">
            <InternApplication isLoading={loading} onSubmit={(payload) => { console.log(payload); apply({ ...payload, studentId }); }} />

        </Content>

    );
}
export default Page;