import client from "./client";

export default {
    all: () => client.get("attendances"),
    allByStudentId: (studentId) => client.get(`attendances/student/${studentId}`),
    create: (data) => client.post("attendances", data),
}