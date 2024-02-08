import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://ifixapi.onrender.com"
})

// process.env.NEXT_PUBLIC_BASE_URL