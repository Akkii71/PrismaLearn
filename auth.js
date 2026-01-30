import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (with error handling for environments that don't support it)
try {
    const analytics = getAnalytics(app);
} catch (error) {
    console.log("Analytics not available:", error.message);
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Sign Up
export const signUpWithEmail = async (email, password, name) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Update profile with name
        await updateProfile(userCredential.user, {
            displayName: name
        });
        return userCredential.user;
    } catch (error) {
        console.error("Error signing up:", error);
        throw error;
    }
};

// Sign In
export const signInWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error signing in:", error);
        throw error;
    }
};

// Google Sign In
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error) {
        console.error("Error with Google Sign In:", error);
        throw error;
    }
};

// Log Out
export const logOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error signing out:", error);
        throw error;
    }
};

// Auth State Observer
export const subscribeToAuthChanges = (callback) => {
    return onAuthStateChanged(auth, callback);
};
