import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heading, HeadingLevel } from 'baseui/heading';
import { Button } from "baseui/button";
import { ParagraphSmall } from 'baseui/typography';
import Content from "../../components/Content";
import useAPI from "../../hooks/useAPI";
import internRequestsAPI from "../../api/internRequests";
const Page = () => {
    const navigate = useNavigate();
    const { requestId } = useParams();
    const { loading, request, error, data } = useAPI(internRequestsAPI.getById);
    const { loading: acceptLoading, request: accept } = useAPI(internRequestsAPI.accept, { successMessage: "completed", errorMessage: "something went wrong", onComplete: () => { navigate(-1) } });
    const { loading: rejectLoading, request: reject } = useAPI(internRequestsAPI.reject, { successMessage: "completed", errorMessage: "something went wrong", onComplete: () => { navigate(-1) } });
    useEffect(() => {
        request(requestId);
    }, [])
    return <Content isLoading={loading} title="Company Intern Request">
        {data && <>
            <HeadingLevel>
                <Heading styleLevel={4}>{data.company.name}</Heading>
                <ParagraphSmall>
                    Department: {data.department}
                </ParagraphSmall>
                <ParagraphSmall>
                    Number of Interns:  {data.quantity}
                </ParagraphSmall>
            </HeadingLevel>
            <Button onClick={() => { accept({ requestId: atob(requestId) }) }} disabled={acceptLoading || rejectLoading} isLoading={acceptLoading}>Accept</Button> <Button onClick={() => { reject({ requestId: atob(requestId) }) }} disabled={acceptLoading || rejectLoading} isLoading={rejectLoading}>Reject</Button>
        </>}
    </Content>
}
export default Page;