import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Content from "../../components/Content"
import CreateTask from "../../components/CreateTask";
import useAPI from "../../hooks/useAPI";
import tasksAPI from "../../api/tasks"
const Page = () => {
    const navigate = useNavigate();
    const { studentId } = useParams();
    const { request, loading } = useAPI(tasksAPI.create, { errorMessage: "Could not add task", successMessage: "Task added", onComplete: () => { navigate(-1) } });
    return <Content title="Add Task" >
        <CreateTask isLoading={loading} onSubmit={(payload) => { request({ ...payload, studentId: atob(studentId) }) }} />
    </Content >
}
export default Page;