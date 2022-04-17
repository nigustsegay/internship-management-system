import client from "./client";

export default {
    all: () => client.get("reports"),
    allByStudentId: (studentId) => client.get(`reports/${studentId}`),
    create: (data) => client.post("reports", data)
}