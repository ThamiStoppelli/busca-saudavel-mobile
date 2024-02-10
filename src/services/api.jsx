import axios from "axios";

const api = axios.create({
    baseURL: "http://xxxx:8080", //ip do computador onde está rodando o back
});

export default api;