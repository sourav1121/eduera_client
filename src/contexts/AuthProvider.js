import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import {
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import firebaseService from "../services/firebase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const providerLogin = (provider) => {
    return signInWithPopup(firebaseService.auth, provider);
  };

  const createUser = async (email, password, role) => {
    setLoading(true);

    try {
      const req = await axios.post("http://localhost:5000/api/user", {
        email,
        password,
        role,
      });

      const message = req.data.success;
      return message;
    } catch (err) {
      const errMessage = err.response.data.error;
      return errMessage;
    }
  };

  const storeProviderUser = async (email, fuid, role) => {
    setLoading(true);

    try {
      const req = await axios.post(
        "http://localhost:5000/api/user/storeProviderUser",
        {
          email,
          fuid,
          role,
        }
      );

      const message = req.data.success;
      if (message) {
        setLoading(false);
      }
      return message;
    } catch (err) {
      const errMessage = err.response.data.error;
      return errMessage;
    }
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(firebaseService.auth, email, password);
  };

  const updateUserProfile = (profile) => {
    return updateProfile(firebaseService.auth.currentUser, profile);
  };

  const verifyEmail = () => {
    return sendEmailVerification(firebaseService.auth.currentUser);
  };
  const passwordReset = (email) => {
    return sendPasswordResetEmail(firebaseService.auth, email);
  };

  const logOut = () => {
    setLoading(true);
    setUser(null);
    setToken(null);
    return signOut(firebaseService.auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseService.auth,
      (currentUser) => {
        if (currentUser && currentUser.emailVerified) {
          currentUser.getIdToken().then((token) => {
            setToken(token);

            setUser(currentUser.uid);
          });
        }
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    setToken,
    loading,
    setLoading,
    providerLogin,
    logOut,
    updateUserProfile,
    verifyEmail,
    createUser,
    signIn,
    passwordReset,
    storeProviderUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
