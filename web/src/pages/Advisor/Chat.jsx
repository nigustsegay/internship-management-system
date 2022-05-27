import React, { useEffect, useState } from "react";
import useAPI from "../../hooks/useAPI";
import messagesAPI from "../../api/messages";
import useAuth from "../../hooks/useAuth";
import internshipsAPI from "../../api/internships";
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
    const [students, setStudents] = useState([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [chatStudent, setChatStudent] = useState(null);
    const [chatStudentProfile, setChatStudentProfile] = useState(null);
    const { loading: messageLoading, request: messageRequest, error: messageError } = useAPI(messagesAPI.readAllByStudent, { onComplete: (data) => { setMessages(data); } })
    const { loading: sendLoading, request: sendRequest } = useAPI(messagesAPI.send, { errorMessage: "Could not send message" })
    const { request: internshipRequest, loading: studentLoading, error: internshipError } = useAPI(internshipsAPI.allByAdvisor, {
        onComplete: (data) => {
            setStudents(data.map(({ student, company }) => { return { title: student.user.fullname, subtitle: student.studentId, body: company.name, imgUrl: student.user.profilePicture || 'https://via.placeholder.com/60x60' } }));
        }
    });
    const auth = useAuth();
    const advisorId = auth.metadata.advisorId;
    useEffect(() => {
        internshipRequest(btoa(advisorId));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => { if (chatStudent) messageRequest(btoa(chatStudent), btoa(advisorId)); }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, [chatStudent]);

    const loadMessages = (studentId) => {
        setChatStudent(studentId);
    };
    return <>
        {studentLoading && "loading students"}
        <FlexGrid
            flexGridColumnCount={3}
            flexGridColumnGap="scale800"
            flexGridRowGap="scale800"
            marginBottom="scale800"
        >
            <FlexGridItem {...itemProps}>
                <Block width="100%">
                    <ListHeading
                        heading="Students"
                        maxLines={1}
                    />
                    <StatefulMenu
                        items={students}
                        onItemSelect={({ item }) => { loadMessages(item.subtitle); setChatStudentProfile({ id: item.subtitle, name: item.title, profilePicture: item.imgUrl, department: item.body }) }}
                        overrides={{
                            List: {
                                style: {

                                    width: '100%',
                                },
                            },
                            Option: {
                                component: OptionProfile,
                                props: {
                                    getProfileItemLabels: ({ title, subtitle, body }) => ({
                                        title,
                                        subtitle,
                                        body,
                                    }),
                                    getProfileItemImg: item => item.imgUrl,
                                    getProfileItemImgText: item => item.title,
                                },
                            },
                        }}
                    />
                </Block>
            </FlexGridItem>

            <FlexGridItem display="none">
                This invisible one is needed so the margins line up
            </FlexGridItem>
            <FlexGridItem {...wideItemProps}>
                {chatStudent && <Block width="100%">
                    <StudentProfile {...chatStudentProfile} />
                    <Block padding="10px">

                        {messages.map(({ message, sentByAdvisor, createdAt }) => {
                            const date = new Date(createdAt).toDateString();

                            if (sentByAdvisor) {
                                return <ChatBubble message={message} me date={date} />
                            }
                            else {
                                return <ChatBubble message={message} date={date} />
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
                            sendRequest({ studentId: chatStudent, message, advisorId, sentByAdvisor: true });
                        }}
                        isLoading={sendLoading}
                    >
                        Send
                    </Button>
                </Block>}
            </FlexGridItem>
        </FlexGrid>
    </>
}
export default Page;