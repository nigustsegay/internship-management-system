import client from "./client";

export default {
    all: () => client.get("students"),
    allByAdvisor: () => client.get("students"),
    allByCompany: () => client.get("students"),
    getByStudentId: (studentId) => client.get(`students/${studentId}`),
}