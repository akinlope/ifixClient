import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://ifixapi.onrender.com"
    // baseURL: "http://localhost:7000"
})

// process.env.NEXT_PUBLIC_BASE_URL