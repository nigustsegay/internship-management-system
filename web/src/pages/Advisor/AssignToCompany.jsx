import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Content from "../../components/Content"
import AssignCompany from "../../components/AssignCompany";
import StudentProfile from "../../components/StudentProfile";
import useAPI from "../../hooks/useAPI";
import studentsAPI from '../../api/students';
import internshipAPI from "../../api/internships";
import internRequestsAPI from "../../api/internRequests";

const Page = () => {
    const navigate = useNavigate();
    const { studentId } = useParams();
    const [companies, setCompanies] = useState([]);
    useEffect(() => {
        studentRequest(studentId)
    }, [])

    
    const { request: studentRequest, loading: studentLoading, data: studentData } = useAPI(studentsAPI.getByStudentId, { errorMessage: "Could not load student information", onComplete: ({ department }) => { companyRequest(department) } });
    const { request: companyRequest, loading: companyLoading } = useAPI(internRequestsAPI.allByDepartment, { errorMessage: "Could not load companies", onComplete: (list) => { setCompanies(list.map(({ company: { name } }) => { return { label: name, id: name } })) } });
    const { request: assignCompany, loading: assignLoading } = useAPI(internshipAPI.assignCompany, { errorMessage: "Could not assign Company", successMessage: "Company assigned", onComplete: () => { navigate(-1) } });
    return <Content title="Assign to Company" isLoading={studentLoading} >
        {studentData && <StudentProfile profilePicture={studentData.user.profilePicture} name={studentData.user.fullname} id={studentData.studentId} department={studentData.department} />}
        <AssignCompany isLoading={companyLoading || assignLoading} companies={companies} onSubmit={({ company: companyName }) => { assignCompany({ companyName, studentId: studentData.studentId }) }} />
    </Content >
}
export default Page;