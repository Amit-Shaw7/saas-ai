import axios from "axios";
import { loginUserType, registerUserType, userDetailsType } from "@/types";

export const registerUser = async (parameters: registerUserType) => {
    try {
        const response = await axios.post("/api/auth/register", parameters.data);
        console.log(response);

        if (response.status === 201) {
            parameters.router.push("/login");
        }
    } catch (error) {
        parameters.setError("Something went wrong, please try again");
    }
}
export const registerUserUsingProviders = async (user: userDetailsType) => {
    try {
        const response = await axios.post("/api/auth/register", user);
        console.log(response);
    } catch (error) {
        console.log(error);

    }
}

export const loginUser = async (parameters: loginUserType) => {
    try {
        const response = await axios.post("/api/auth/login", parameters.data);
        console.log(response);

        if (response.status === 200) {
            parameters.router.push("/");
        }
    } catch (error) {
        parameters.setError("Something went wrong, please try again");
    }
}

export const getQueryCount = async () => {
    try {
        const response = await axios.get("/api/query", { withCredentials: true });

        if (response.status === 200) {
            return response.data.count
        }
    } catch (error) {
        console.log(error);

    }
}