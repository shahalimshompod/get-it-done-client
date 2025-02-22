/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";
import { auth } from "../../Firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  // states
  const [user, setUser] = useState(null);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // sign in with google
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    setGoogleLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // create user with email and password
  const createUser = (email, password) => {
    setRegisterLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user with email and password
  const loginUser = (email, password) => {
    setLoginLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // update user while signing up
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  // logout user
  const userLogout = () => {
    return signOut(auth);
  };

  const authInfo = {
    user,
    setUser,
    googleLoading,
    setGoogleLoading,
    loginLoading,
    setLoginLoading,
    registerLoading,
    setRegisterLoading,
    signInWithGoogle,
    createUser,
    loginUser,
    updateUser,
    userLogout,
    userLoading,
    setUserLoading,
  };

  // observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const currentUserEmail = {
          email: currentUser?.email,
        };

        // store token
        axiosPublic.post("/jwt", currentUserEmail).then((res) => {
          if (res?.data.token) {
            localStorage.setItem("access-token", res?.data.token);
          }
        });
      } else {
        // remove token
        localStorage.removeItem("access-token");
        // setUser(null);
      }
      // Reset all loading states
      setUser(currentUser);
      setGoogleLoading(false);
      setLoginLoading(false);
      setRegisterLoading(false);
      setUserLoading(false);
    });

    // Cleanup observer on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthContextProvider;
