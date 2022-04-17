import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Content from "../../components/Content"
import AssignAdvisor from "../../components/AssignAdvisor";
import StudentProfile from "../../components/StudentProfile";
import useAPI from "../../hooks/useAPI";
import advisorsAPI from "../../api/advisors";
import studentsAPI from '../../api/students';
import internshipAPI from "../../api/internships";
const Page = () => {
    const navigate = useNavigate();
    const { studentId } = useParams();
    const [advisors, setAdvisors] = useState([]);
    useEffect(() => {
        studentRequest(studentId)
    }, [])
    const { request: studentRequest, loading: studentLoading, data: studentData } = useAPI(studentsAPI.getByStudentId, { errorMessage: "Could not load student information", onComplete: ({ department }) => { advisorRequest(department) } });
    const { request: advisorRequest, loading: advisorLoading } = useAPI(advisorsAPI.allByDepartment, { errorMessage: "Could not load advisors", onComplete: (list) => { setAdvisors(list.map(({ employeeId, user: { fullname } }) => { return { label: fullname, id: employeeId } })) } });
    const { request: assignAdvisor, loading: assignLoading } = useAPI(internshipAPI.assignAdvisor, { errorMessage: "Could not assign Advisor", successMessage: "Advisor assigned", onComplete: () => { navigate(-1) } });
    return <Content title="Assign to Advisor" isLoading={studentLoading} >
        {studentData && <StudentProfile profilePicture={studentData.user.profilePicture} name={studentData.user.fullname} id={studentData.studentId} department={studentData.department} />}
        <AssignAdvisor isLoading={advisorLoading || assignLoading} advisors={advisors} onSubmit={({ advisor: advisorId }) => { assignAdvisor({ advisorId, studentId: studentData.studentId }) }} />
    </Content >
}
export default Page;