import React, { useState, useEffect } from "react";
import Content from "../components/Content"
import CreateMail from "../components/CreateMail";
import useAPI from "../hooks/useAPI";
import useAuth from "../hooks/useAuth";
import chatAPI from "../api/chat"
import internshipsAPI from "../api/internships";
import { useNavigate } from "react-router-dom";
const Page = () => {
    const navigate = useNavigate()
    const auth = useAuth();
    const email = auth.metadata.email;
    const advisorId = auth.metadata.advisorId;
    const studentId = auth.metadata.studentId;
    const companyName = auth.metadata.companyName;
    const role = auth.metadata.role;
    const [users, setUsers] = useState([]);
    const INTERNSHIP_API_REQUEST = role === "ADVISOR" ? internshipsAPI.allByAdvisor : role === "STUDENT" ? internshipsAPI.byStudent : internshipsAPI.allByCompany;
    const INTERNSHIP_REQUEST_PARAM = role === "ADVISOR" ? advisorId : role === "STUDENT" ? studentId : companyName;
    const { request: chatRequest, loading: chatLoading } = useAPI(chatAPI.findAllMailInbox, { onComplete: (data) => { if (data && data.length) setUsers((old) => [...old, ...data.map(({ from }) => ({ label: `${from.fullname} (${from.email}) [${from.role}]`, id: from.email }))]); } })
    const { loading, request } = useAPI(chatAPI.send, { successMessage: "Message Sent", errorMessage: "Could not send message", onComplete: () => { navigate(-1) } });
    const { request: internshipRequest, loading: internshipLoading } = useAPI(INTERNSHIP_API_REQUEST, {
        onComplete: (data) => {
            if (data && data.length) {
                setUsers(data.map(({ student }) => { { return { label: `${student.user.fullname} (${student.user.email}) [${student.user.role}]`, id: student.user.email } } }));
            }
            else {
                const { company, advisor } = data;
                setUsers([

                    { label: `${company.user.fullname} (${company.user.email}) [${company.user.role}]`, id: company.user.email },
                    { label: `${advisor.user.fullname} (${advisor.user.email}) [${advisor.user.role}]`, id: advisor.user.email }
                ]
                )
            }
            chatRequest(btoa(email));

        }
    });
    const { request: usersRequest, loading: usersLoading } = useAPI(internshipsAPI.allUsers, {
        onComplete: (data) => {
            if (data && data.length) {
                setUsers(data.filter(({ email: userEmail }) => userEmail !== email).map(({ fullname, role, email }) => { { return { label: `${fullname} (${email}) [${role}]`, id: email } } }));
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
    const filteredUsers = () => {
        const newArray = [];
        const lookup = {};
        users.forEach((val) => {
            const { id } = val;
            if (!lookup[id]) {
                lookup[id] = true;
                newArray.push(val)

            }
        })
        return newArray;
    }
    return <Content title="Compose Message" >
        <CreateMail contacts={filteredUsers()} isLoading={loading || internshipLoading || usersLoading || chatLoading} onSubmit={(payload) => {
            request({ ...payload, fromEmail: email, type: "MAIL" });
        }} />
    </Content >
}
export default Page;