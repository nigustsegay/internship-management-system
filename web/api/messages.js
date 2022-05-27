import client from "./client";

export default {
    send: (data) => client.post("messages", data),
    allByAdvisor: (id) => client.get(`messages/advisor/${id}`),
    allByStudent: (id) => client.get(`messages/student/${id}`),
    readAllByAdvisor: (id) => client.get(`messages/read/advisor/${id}`),
    readAllByStudent: (studentId, advisorId) => client.get(`messages/read?studentId=${studentId}&employeeId=${advisorId}`),
}