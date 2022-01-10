import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../AuthContext";
import { auth } from "../Firebase/config";
import { db } from "../Firebase/config";
import { setDoc, doc } from "firebase/firestore";
import Input from "../components/Input";

const SignInForm = () => {
  const [signInVal, setSignInVal] = useState("");
  const [signInPass, setSignInPass] = useState("");
  
  const [error, setError] = useState("");
  const { createUser } = useAuth();
  const history = useHistory();
  const USER = auth.currentUser;

  async function signUp(e) {
    e.preventDefault();

    if (signInVal === "") {
      return setError("Enter user name");
    } else if (signInPass === "") {
      return setError("Enter Password");
    }
    setSignInVal("");
    setSignInPass("");

    try {
      await createUser(signInVal, signInPass);
      history.push("/updateprofile");
    } catch (error) {
      return setError("Failed to create account");
    }
  }

  useEffect(() => {
    if (USER) {
      const unsub = setDoc(doc(db, "users", USER.uid), {
        name: USER.displayName,
        photoURL: USER.photoURL,
        userUid: USER.uid,
        email: USER.email,
      });
      return unsub;
    }
  }, [USER]);

  return (
    <div className="auth_container">
      <div className="form_container">
        <div className="form_wrapper">
          <form className="form" onSubmit={signUp}>
            <h1 style={{ color: "black", fontSize: "3rem" }}>do-CHAT</h1>
            <h5 style={{ fontSize: "16px", color: "red", marginTop: "10px" }}>
              {error}
            </h5>
            <Input
              styleclass="form_input"
              value={signInVal}
              type="username"
              placeholder="User name"
              onchange={(e) => setSignInVal(e.target.value)}
            />
            <Input
              styleclass="form_input"
              value={signInPass}
              type="password"
              placeholder="Password"
              onchange={(e) => setSignInPass(e.target.value)}
            />
            <Input styleclass="submit" value="Sign Up" type="submit" />
            <Input
              styleclass="move_to_login"
              value="Move to Login"
              type="button"
              onclick={() => history.push("/login")}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
