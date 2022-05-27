import client from "./client";

export default {
    all: () => client.get("advisors"),
    allByDepartment: (department) => client.get(`advisors/department/${department}`),
    getByEmployeeId: (employeeId) => client.get(`advisors/${employeeId}`),
}