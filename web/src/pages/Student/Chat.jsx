import React, { useEffect, useState } from "react";
import useAPI from "../../hooks/useAPI";
import messagesAPI from "../../api/messages";
import useAuth from "../../hooks/useAuth";
import studentsAPI from "../../api/students";
import { useStyletron } from "baseui";
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { Textarea } from "baseui/textarea";
import { Block } from "baseui/block";
import { Button } from "baseui/button";
import { StatefulMenu, OptionProfile } from 'baseui/menu';
import {
    ListHeading
} from 'baseui/list';
import ChatBubble from "../../components/ChatBubble";
import StudentProfile from "../../components/StudentProfile";

const itemProps = {
    backgroundColor: 'mono200',
    minHeight: '80vh',
    display: 'flex',
};
const wideItemProps = {
    ...itemProps,
    overrides: {
        Block: {
            style: ({ $theme }) => ({
                width: `calc((200% - ${$theme.sizing.scale800}) / 3)`,
            }),
        },
    },
};

const Page = () => {
    const [css, theme] = useStyletron();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [advisorId, setAdvisorId] = useState(null);
    const [advisorProfile, setAdvisorProfile] = useState(null);
    const { request: messageRequest } = useAPI(messagesAPI.readAllByStudent, { onComplete: (data) => { setMessages(data); } })
    const { loading: sendLoading, request: sendRequest } = useAPI(messagesAPI.send, { errorMessage: "Could not send message" })
    const { request: studentRequest, loading: studentLoading } = useAPI(studentsAPI.getByStudentId, {
        onComplete: (data) => {
            if (data.internship) {
                setAdvisorId(data.internship.advisor.employeeId);
                setAdvisorProfile({ id: "University Advisor", name: data.internship.advisor.user.fullname, profilePicture: data.internship.advisor.user.profilePicture, department: data.internship.advisor.department });
            }

        }
    });
    const auth = useAuth();
    const studentId = auth.metadata.studentId;
    useEffect(() => {
        studentRequest(btoa(studentId));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => { if (advisorId && studentId) messageRequest(btoa(studentId), btoa(advisorId)); }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    return <>

        <Block width="100%" backgroundColor="mono200">
            <StudentProfile {...advisorProfile} />
            <Block padding="10px">

                {messages.map(({ message, sentByAdvisor, createdAt }) => {
                    const date = new Date(createdAt).toDateString();

                    if (sentByAdvisor) {
                        return <ChatBubble message={message} date={date} />
                    }
                    else {
                        return <ChatBubble message={message} date={date} me />
                    }

                })}

            </Block>
            <Textarea
                disabled={sendLoading}
                onChange={(e) => { setMessage(e.target.value) }}
                value={message}
            />
            <Button
                disabled={!message}
                kind="secondary"
                shape="pill"
                onClick={() => {
                    sendRequest({ studentId, message, advisorId, });
                }}
                isLoading={sendLoading}
            >
                Send
            </Button>
        </Block>
    </>
}
export default Page;