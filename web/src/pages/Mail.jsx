import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Content from "../components/Content";
import StudentProfile from "../components/StudentProfile";
import PaginatedTable from "../components/PaginatedTable";
import useAPI from "../hooks/useAPI";
import useAuth from "../hooks/useAuth";
import chatAPI from "../api/chat";
const Page = () => {
    const auth = useAuth();
    const email = btoa(auth.metadata.email);
    const role = auth.metadata.role;
    const [view, setView] = useState("INBOX");
    const navigate = useNavigate();
    const { inboxLoading, request: inbox, error: inboxError, data: inboxData } = useAPI(chatAPI.findAllMailInbox);
    const { sentLoading, request: sent, error: sentError, data: sentData } = useAPI(chatAPI.findAllMailSent);
    useEffect(() => {
        if (view === "INBOX") {
            inbox(email);
        }
        else {
            sent(email);
        }

    }, [view])
    const toMailRow = (data, isInbox) => {
        const rows = [];
        if (data && data.length) {
            data.forEach(({ id, subject, to, from, createdAt }) => {
                rows.push([new Date(createdAt).toDateString(), isInbox ? from.fullname : to.fullname, subject, [{ action: "view", handler: () => { navigate(`/app/${role.toLowerCase()}/mail-detail/${btoa(id)}`) } }]]);
            })
        }
        return rows.reverse();
    }
    const actions = () => {
        const rows = [];
        if (view === "INBOX") {
            rows.push({ kind: "secondary", name: "Go to Sent", handler: () => { setView("SENT") } })
        }
        else {
            rows.push({ kind: "secondary", name: "Go to Inbox", handler: () => { setView("INBOX") } })
        }
        rows.push({ name: "New Message", link: `/app/${role.toLowerCase()}/send-mail` })
        return rows;
    }

    return <Content title="Mailbox" actions={actions()}>
        {view === "INBOX" && <PaginatedTable error={inboxError} isLoading={inboxLoading} title="Inbox" columns={["Date", "From", "Subject", "Action"]} data={toMailRow(inboxData, true)} />}
        {view === "SENT" && <PaginatedTable error={sentError} isLoading={sentLoading} title="Sent" columns={["Date", "To", "Subject", "Action"]} data={toMailRow(sentData, false)} />}
    </Content>


}
export default Page;