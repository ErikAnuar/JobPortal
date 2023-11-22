/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (email, password) => {
    setLoading(true);

    try {
      const authResult = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const createdUser = authResult.user;

      // Make a request to your server to add the user to MongoDB
      await fetch("http://localhost:5000/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: createdUser.email }),
      });

      setLoading(false);
      return authResult;
    } catch (error) {
      console.error("Error creating user:", error);
      setLoading(false);
      throw error;
    }
  };

  const signUpWithGmail = async () => {
    setLoading(true);

    try {
      const authResult = await signInWithPopup(auth, googleProvider);
      const signedInUser = authResult.user;

      // Make a request to your server to add the user to MongoDB
      await fetch("http://localhost:5000/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: signedInUser.email }),
      });

      setLoading(false);
      return authResult;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setLoading(false);
      throw error;
    }
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    localStorage.removeItem("genius-token");
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    login,
    logOut,
    signUpWithGmail,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
