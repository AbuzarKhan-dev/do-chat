import React, { useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "./Firebase/config";

//Create_Context
const AuthContext = React.createContext();

// Use_Context
export function useAuth() {
  return useContext(AuthContext);
}

// Provider
export function AuthProvider({ children }) {
  const [userStatus, setUserStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  //Create_User
  function createUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  //Login_User
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  //Signout_User
  function userLogOut() {
    auth.signOut();
  }

  //Update_User
  async function updateUser(username, url) {
    updateProfile(auth.currentUser, {
      displayName: username,
      photoURL: url,
    });
  }

  //User_StateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserStatus(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  // console.log(userStatus)
  //Provider_Value

  const value = {
    userStatus,
    createUser,
    logIn,
    userLogOut,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
