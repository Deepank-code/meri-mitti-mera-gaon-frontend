import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types";

const Login = () => {
  const [gender, setGender] = useState("");

  const [date, setDate] = useState("");
  const [login] = useLoginMutation();
  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      console.log(user);
      const res = await login({
        name: user.displayName!,
        email: user.email!,
        gender,

        photo: user.photoURL!,
        role: "user",

        dob: date,

        _id: user.uid,
      });
      if ("data" in res) {
        toast.success(res.data!.message);
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
      }
    } catch (error) {
      toast.error("Sign in fail " + error);
    }
  };
  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>
        <div>
          <label htmlFor="gender">Gender</label>
          <select
            name=""
            id=""
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="dob">Date of birth</label>
          <input
            id="dob"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <p>Already Signed in Once</p>
          <button onClick={loginHandler}>
            <FcGoogle /> <span>Sign in with google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
