import client from "./client";

export default {
    all: () => client.get("intern-requests"),
    allByDepartment: (department) => client.get(`intern-requests/department/${department}`),
    allByCompany: (company) => client.get(`intern-requests/company/${company}`),
    pending: () => client.get("intern-requests/pending"),
    create: (data) => client.post("intern-requests", data),
    getById: (id) => client.get(`intern-requests/${id}`),
    accept: (data) => client.post("intern-requests/accept", data),
    reject: (data) => client.post("intern-requests/reject", data),
}