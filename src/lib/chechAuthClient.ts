import axios from "axios";

export async function checkAuthClient(): Promise<boolean> {
    try {
        const res = await axios.get("/api/users/profile", {
            withCredentials: true, // send HttpOnly cookies
        });
        return !!res.data.user;
    } catch {
        return false;
    }
}