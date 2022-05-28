import client from "./client";

export default {
    all: () => client.get("internships"),
    pending: () => client.get("internships/pending"),
    allByAdvisor: (employeeId) => client.get(`internships/advisor/${employeeId}`),
    allByCompany: (companyName) => client.get(`internships/company/${companyName}`),
    apply: (data) => client.post("internships/apply", data),
    assignCompany: (data) => client.post("internships/assign-company", data),
    assignAdvisor: (data) => client.post("internships/assign-advisor", data),
}