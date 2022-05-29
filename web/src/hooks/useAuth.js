import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from './useAPI';
import authAPI from "../api/auth";

export const UserAuthContext = React.createContext({});

const useAuth = () => {
    const navigate = useNavigate();
    const { metadata, setMetadata } = useContext(UserAuthContext)
    const onComplete = (data) => {
        localStorage.setItem("auth", JSON.stringify(data));
        setMetadata(data);
        navigate("/app");
    }
    const requestConfig = { errorMessage: "Something went wrong", onComplete }
    const login = useAPI(authAPI.login, requestConfig);
    const { request: advisor, loading: advisorLoading } = useAPI(authAPI.registerAdvisor, requestConfig);
    const { request: student, loading: studentLoading } = useAPI(authAPI.registerStudent, requestConfig);
    const { request: company, loading: companyLoading } = useAPI(authAPI.registerCompany, requestConfig);
    const signupLoading = advisorLoading || studentLoading || companyLoading;
    const signupRequest = (payload) => {
        switch (payload.role) {
            case "ADVISOR":
                advisor(payload);
                break;
            case "STUDENT":
                student(payload);
                break;
            case "COMPANY":
                company(payload);
                break;
            default:
                alert("Something went wrong!")
        }
    }
    const logout = () => { localStorage.removeItem("auth"); setMetadata({}); navigate("/") };
    return {
        metadata,
        login,
        signup: { request: signupRequest, loading: signupLoading },
        logout
    };
}

export default useAuth;