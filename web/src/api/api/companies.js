import client from "./client";

export default {
    all: () => client.get("companies"),
    getByName: (name) => client.get(`companies/${name}`),
}