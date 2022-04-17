import client from "./client";

export default {
    login: (data) => client.post("auth/login", data),
    registerStudent: (data) => client.post("auth/register/student", data),
    registerCompany: (data) => client.post("auth/register/company", data),
    registerAdvisor: (data) => client.post("auth/register/advisor", data),
    registerAdmin: (data) => client.post("auth/register/admin", data),
}