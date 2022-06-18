import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Content from "../../components/Content";
import StudentProfile from "../../components/StudentProfile";
import PaginatedTable from "../../components/PaginatedTable";
import Attendance from "../../components/Attendance";
import useAPI from "../../hooks/useAPI";
import studentsAPI from "../../api/students";

const Page = () => {
    const { studentId } = useParams();
    const navigate = useNavigate();
    const { loading, request, error, data } = useAPI(studentsAPI.getByStudentId);
    useEffect(() => {
        request(studentId);
    }, [])
    const toTaskRow = (data) => {
        const rows = [];
        if (data && data.length) {
            data.forEach(({ name, description, completed, createdAt }) => {
                rows.push([new Date(createdAt).toDateString(), name, description, completed ? "COMPLETED" : "PENDING"]);
            })
        }
        return rows;
    }

    return <Content error={error} isLoading={loading} title="Student Profile" actions={[{ name: "Add Task", link: `/app/company/add-task/${studentId}` }, { name: "Take Attendance", link: `/app/company/submit-attendance/${studentId}` }]} >
        {data && <> <StudentProfile profilePicture={data.user.profilePicture} name={data.user.fullname} id={data.studentId} department={data.department} />
            <PaginatedTable height="300px" title="Tasks" columns={["Date", "Task", "Description", "Status"]} data={toTaskRow(data.tasks)} />
            <Attendance data={data.attendance} />
        </>}
    </Content>


}
export default Page;