import { auth, googleProvider } from "@/config/firebase";

export const GoogleLogin = async () => {
    try {
        // Sign in with Google popup
        const googleResponse = await auth.signInWithPopup(googleProvider);

        if (googleResponse.user) {
            // Log the user's email after successful login
            console.log(googleResponse.user.email);
        }
    } catch (error) {
        // Log any errors
        console.log(error);
    }
};