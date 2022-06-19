import React, { useEffect, useState } from "react";
import useAPI from "../hooks/useAPI";
import messagesAPI from "../api/chat";
import useAuth from "../hooks/useAuth";
import internshipsAPI from "../api/internships";
import { useStyletron } from "baseui";
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { Textarea } from "baseui/textarea";
import { Block } from "baseui/block";
import { Button } from "baseui/button";
import { StatefulMenu, OptionProfile } from 'baseui/menu';
import {
    ListHeading
} from 'baseui/list';
import ChatBubble from "./ChatBubble";
import UserProfile from "./StudentProfile";

const itemProps = {
    height: '60vh',
    display: 'flex',
const itemProps = {
    height: '60vh',
    display: 'flex',
};
const wideItemProps = {
    ...itemProps,
    overrides: {
        Block: {
            style: ({ $theme }) => ({
                width: `calc((200% - ${$theme.sizing.scale900}) / 3)`,
            }),
        },
    },
};

const Page = () => {
    const auth = useAuth();
    const email = auth.metadata.email;
    const advisorId = auth.metadata.advisorId;
    const studentId = auth.metadata.studentId;
    const companyName = auth.metadata.companyName;
    const role = auth.metadata.role;
    const INTERNSHIP_API_REQUEST = role === "ADVISOR" ? internshipsAPI.allByAdvisor : role === "STUDENT" ? internshipsAPI.byStudent : internshipsAPI.allByCompany;
    const INTERNSHIP_REQUEST_PARAM = role === "ADVISOR" ? advisorId : role === "STUDENT" ? studentId : companyName;
    const [css, theme] = useStyletron();
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [chatUserEmail, setChatUserEmail] = useState(null);
    const [chatUserProfile, setChatUserProfile] = useState(null);
    const { request: messageRequest } = useAPI(messagesAPI.readAllChats, { onComplete: (data) => { setMessages(data); } });
    const { request: chatRequest } = useAPI(messagesAPI.findAllSentChats, { onComplete: (data) => { if (data && data.length) setUsers((old) => [...old, ...data.map(({ from }) => ({ title: from.fullname, subtitle: from.email, body: from.role, imgUrl: from.profilePicture || 'https://via.placeholder.com/60x60' }))]); } })
    const { loading: sendLoading, request: sendRequest } = useAPI(messagesAPI.send, { errorMessage: "Could not send message", onComplete: () => { setMessage("") } })
    const { request: internshipRequest, loading: userLoading } = useAPI(INTERNSHIP_API_REQUEST, {
        onComplete: (data) => {
            if (data && data.length
                if (data && data.length){
                setUsers(data.map(({ student }) => { { return { title: student.user.fullname, subtitle: student.user.email, body: student.user.role, imgUrl: student.user.profilePicture || 'https://via.placeholder.com/60x60' } } }));
            }
            else {
                const { company, advisor } = data;
                setUsers(
                    [

                        { title: company.user.fullname, subtitle: company.user.email, body: company.user.role, imgUrl: company.user.profilePicture || 'https://via.placeholder.com/60x60' },
                        { title: advisor.user.fullname, subtitle: advisor.user.email, body: advisor.user.role, imgUrl: advisor.user.profilePicture || 'https://via.placeholder.com/60x60' }
                    ]
                )
            }
            chatRequest(btoa(email));

        }
    });
    const { request: usersRequest, loading: usersLoading } = useAPI(internshipsAPI.allUsers, {
        onComplete: (data) => {
            if (data && data.length) {
                setUsers(data.filter(({ email: userEmail }) => userEmail !== email).map(({ fullname, role, email, profilePicture }) => { { return { title: fullname, subtitle: email, body: role, imgUrl: profilePicture || 'https://via.placeholder.com/60x60' } } }));
            }

        }
    });
    useEffect(() => {
        if (role === "ADMIN") {
            usersRequest();
        }
        else {
            internshipRequest(btoa(INTERNSHIP_REQUEST_PARAM));

        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => { if (chatUserEmail) messageRequest(btoa(chatUserEmail), btoa(email)); }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, [chatUserEmail]);

    const loadMessages = (userEmail) => {
        setChatUserEmail(userEmail);
    };
    const filteredUsers = () => {
        const newArray = [];
        const lookup = {};
        users.forEach((val) => {
            const { subtitle } = val;
            if (!lookup[subtitle]) {
                lookup[subtitle] = true;
                newArray.push(val)

            }
        })
        return newArray;
    }
    return <>
        {(userLoading || usersLoading) && "loading users"}
        <FlexGrid
            flexGridColumnCount={3}
            flexGridColumnGap="scale800"
            flexGridRowGap="scale800"
            marginBottom="scale800"
        >
            <FlexGridItem {...itemProps}>
                <Block width="100%">
                    <ListHeading
                        heading="Contacts"
                        maxLines={1}
                    />
                    <StatefulMenu
                        items={filteredUsers()}
                        onItemSelect={({ item }) => { loadMessages(item.subtitle); setChatUserProfile({ id: item.subtitle, name: item.title, profilePicture: item.imgUrl, department: item.body }) }}
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
                {chatUserEmail ? <> <Block width="100%">
                    <div className={css({ backgroundColor: "white" })}>
                        <UserProfile {...chatUserProfile} />
                    </div>
                    <div className={css({ padding: "10px", backgroundColor: theme.colors.mono200, height: "100%", overflowY: "scroll" })}>

                        {messages.map(({ message, from, createdAt }) => {
                            const date = new Date(createdAt).toDateString();

                            if (from.email === email) {
                                return <ChatBubble message={message} me date={date} />
                            }
                            else {
                                return <ChatBubble message={message} date={date} />
                            }

                        })}

                    </div>

                </Block>


                    <Block position="fixed" bottom="0" width="48%">
                        <Textarea
                            disabled={sendLoading}
                            positive
                            placeholder="Type your message here..."
                            onChange={(e) => { setMessage(e.target.value) }}
                            value={message}
                        />
                        <Button
                            disabled={!message}
                            overrides={{ BaseButton: { style: () => ({ marginTop: '6px', width: "100%" }) } }}
                            kind="secondary"
                            shape="pill"
                            onClick={() => {
                                sendRequest({ toEmail: chatUserEmail, message, fromEmail: email, type: "CHAT" });
                            }}
                            isLoading={sendLoading}
                        >
                            Send
                        </Button>
                    </Block>
                </> : <h2
                    className={css({
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        color: theme.colors.primary600,
                        fontWeight: 500,
                        textAlign: "center",
                        marginLeft: "25%",
                        marginTop: "20%",
                        fontSize: "24px",
                        lineHeight: "48px"
                    })}
                >
                    Select Contacts from the left to start chatting!
                </h2>}
            </FlexGridItem>
        </FlexGrid>
    </>
}
export default Page;
