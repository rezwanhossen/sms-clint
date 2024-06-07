import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "./firbase.config";
import axios from "axios";
import useAxiosCommon from "../../Hooks/useAxiosCommon";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googlepro = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loding, setloding] = useState(true);
  const axiosCommon = useAxiosCommon();

  //user create
  const creatuser = (email, password) => {
    setloding(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //updat profil
  const updatprofil = (name, img) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: img,
    });
  };
  //login user
  const login = (email, password) => {
    setloding(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //google login
  const googlelogin = () => {
    setloding(true);
    return signInWithPopup(auth, googlepro);
  };
  // logout
  const logout = async () => {
    setuser(null);
    return signOut(auth);
  };

  //save user

  const saveUser = async (user) => {
    const cuser = {
      name: user?.displayName,
      email: user?.email,
      badge: "bronze",
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/user`,
      cuser
    );
    return data;
  };

  // onAuth States cxhange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setuser(user);
      console.log(user);

      if (user) {
        const userinfo = { email: user.email };
        axiosCommon.post("/jwt", userinfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        });

        saveUser(user);
      } else {
        localStorage.removeItem("access-token");
      }
      setloding(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosCommon]);

  const allvalue = {
    user,
    creatuser,
    updatprofil,
    login,
    googlelogin,
    logout,
    setuser,
    loding,
    setloding,
  };
  return (
    <AuthContext.Provider value={allvalue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
