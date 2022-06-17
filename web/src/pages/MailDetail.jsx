import React, { useEffect } from "react";
import {
    Card,
    StyledBody,
    StyledAction,
    StyledThumbnail,
} from 'baseui/card';
import { Avatar } from "baseui/avatar";
import { ListItem, ListItemLabel } from 'baseui/list';

import { Button } from 'baseui/button';
import { useParams } from "react-router-dom";
import Content from "../components/Content";
import useAPI from "../hooks/useAPI";
import chatAPI from "../api/chat";
import { useStyletron } from 'baseui';

const Page = () => {
    const { id } = useParams();
    const [css] = useStyletron();
    const { loading, request, error, data } = useAPI(chatAPI.getById);
    useEffect(() => {
        request(id);
    }, [])
    return <Content error={error} isLoading={loading} title="Message">
        {data && <>



            <Card
                title={`Subject: ${data.subject}`}
            >
                <StyledBody>
                    <ListItem>
                        <ListItemLabel description="Recipient">{data.to.fullname} ({data.to.email})</ListItemLabel>
                    </ListItem>
                    <ListItem>
                        <ListItemLabel description="Sender">{data.from.fullname} ({data.from.email})</ListItemLabel>
                    </ListItem>
                    <div className={css({ padding: "10px", margin: "10px", fontSize: "25px" })}>
                        {data.message}
                    </div>
                    {data.attachment && <ListItem>
                        <Button kind="secondary" onClick={() => { window.open(data.attachment, '_blank').focus(); }}>Open Attachment</Button>
                    </ListItem>}
                </StyledBody>
                <StyledAction>

                </StyledAction>
            </Card>

        </>
        }
    </Content>



}
export default Page;