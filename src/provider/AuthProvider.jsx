/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import axios from "axios";
import { auth } from "../firebase/firebase.confog";
import AuthContext from "./AuthContext";
import useAxiosPublic from "../hooks/useAxiosPublic";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    console.log(name, photo);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log(
        "CurrentUser-->",
        currentUser?.email,
        currentUser?.displayName,
        currentUser?.photoURL
      );
      setUser(currentUser);
      // if (currentUser?.email) setUser(currentUser);
      if (currentUser?.email) {
        // Get JWT token
        await axiosPublic
          .post(
            `/jwt`,
            {
              email: currentUser?.email,
            },
            { withCredentials: true }
          )
          .then((res) => {
            if (res.data.token) {
              try {
                console.log(res.data.token);
                localStorage.setItem("access-token", res.data.token);
                console.log("Token saved to localStorage");
                setLoading(false);
              } catch (error) {
                console.error("Error saving token to localStorage:", error);
              }
            }
          });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
      // } else {
      //   setUser(currentUser);
      //   await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
      //     withCredentials: true,
      //   });
      // }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };
  console.log(user);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
