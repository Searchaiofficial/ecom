import axios from "axios";
import Cookies from "js-cookie";

export const checkUser = async (router) => {
    try {
        const token = Cookies.get("jwt");
        console.log(token);
        if (!token) {
            router.push("/login");
            return false;
        }
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/user`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = response.data;

        if (data.isAuthenticated) {
            return true;
        } else {
            router.push("/login");
            return false;
        }
    } catch (error) {
        console.error("Error:", error);
        router.push("/login");
        return false;
    }
};
