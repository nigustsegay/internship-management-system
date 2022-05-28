import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heading, HeadingLevel } from 'baseui/heading';
import { Button } from "baseui/button";
import { ParagraphSmall } from 'baseui/typography';
import {
    Card,
    StyledBody,
    StyledAction,
    StyledThumbnail,
} from 'baseui/card';
import { ListItem, ListItemLabel } from 'baseui/list';
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

            <Card
                title={data.company.name}
            >

                <StyledBody>
                    <ListItem>
                        <ListItemLabel description="Department">{data.department}</ListItemLabel>
                    </ListItem>
                    <ListItem>
                        <ListItemLabel description="Number of Interns">{data.quantity}</ListItemLabel>
                    </ListItem>
                    <ListItem>
                        <ListItemLabel description="Status"> {data.accepted ? "ACCEPTED" : "PENDING"}</ListItemLabel>
                    </ListItem>

                </StyledBody>
                <StyledAction>
                    <Button onClick={() => { accept({ requestId: atob(requestId) }) }} disabled={acceptLoading || rejectLoading || data.accepted} isLoading={acceptLoading}>Accept</Button> <Button onClick={() => { reject({ requestId: atob(requestId) }) }} disabled={acceptLoading || rejectLoading} isLoading={rejectLoading}>{data.accepted ? "Remove" : "Reject"}</Button>
                </StyledAction>
            </Card>
        </>}
    </Content>
}
export default Page;