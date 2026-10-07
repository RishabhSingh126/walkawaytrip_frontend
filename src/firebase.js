import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./utils/FirebaseConfig";


const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("User Info:", user);
        return user;
    } catch (error) {
        console.error("Google Sign-in Error", error);
    }
};

const logout = async () => {
    await signOut(auth);
    console.log("User signed out");
};

export { auth, signInWithGoogle, logout };