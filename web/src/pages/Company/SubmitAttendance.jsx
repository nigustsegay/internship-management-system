import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Content from "../../components/Content";
import SubmitAttendance from "../../components/SubmitAttendance";
import useAPI from "../../hooks/useAPI";
import attendanceAPI from "../../api/attendance"
const Page = () => {
    const navigate = useNavigate();
    const { studentId } = useParams();
    const { request, loading } = useAPI(attendanceAPI.create, { errorMessage: "Could not add attendance", successMessage: "Attendance added", onComplete: () => { navigate(-1) } });
    return <Content title="Attendance">
        <SubmitAttendance isLoading={loading} onSubmit={(payload) => { request({ ...payload, studentId: atob(studentId) }) }} />
    </Content>
}
export default Page;