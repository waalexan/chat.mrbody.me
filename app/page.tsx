import LeandPage from "./_leandpage/leandpage";
import Dashboard from "./u/page";

const useToken = () => {  // Removed async since there's no await
    try {
        const response = false;

        if (response)
            return { status: 200, token: "7w7950nnxkchhiy78ry2" };
        else
            return { status: 404, token: null };  // Added token: null for consistency
    } catch (error) {
        console.error(error);
        return { status: 500, token: null };  // Return a default error state
    }
}

export default function Main() {
    const {status, token} = useToken();  // This is synchronous now

    if(token && status === 200)  // Using strict equality ===
        return <Dashboard />;
    else
        return <LeandPage />;
}