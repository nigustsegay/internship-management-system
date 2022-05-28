import client from "./client";

export default {
    all: () => client.get("tasks"),
    allByStudentId: (studentId) => client.get(`tasks/student/${studentId}`),
    create: (data) => client.post("tasks", data),
    getById: (taskId) => client.get(`tasks/${taskId}`),
    complete: (data) => client.post("tasks/complete", data)
}