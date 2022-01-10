import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useHistory } from "react-router";
import Input from "./Input";
import { auth } from "../Firebase/config";

const LoginForm = () => {
  const [userVal, setUserVal] = useState("");
  const [userPass, setUserPass] = useState("");
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [forgot, setForgot] = useState("");
  const { logIn } = useAuth();

  const history = useHistory();

  async function signIn(e) {
    e.preventDefault();

    try {
      await logIn(userVal, userPass);
      history.push("/do_chat");
    } catch (error) {
      if (error) {
        if (error) {
          setCount(count + 1);
          if (count >= 3) {
            setError("Seems you forgot your account credentials");
          }
        }
      }
    }
  }
  return (
    <div className="auth_container">
      <div className="form_container">
        <div className="form_wrapper">
          <form className="form" onSubmit={signIn}>
            <h1 style={{ color: "black", fontSize: "3rem" }}>do-CHAT</h1>
            <h2 style={{ color: "red", fontSize: "16px", marginTop: "10px" }}>
              {count > 0 && count <= 3 ? "Wrong Attempt: " + count : error}
            </h2>
            <Input
              styleclass="form_input"
              value={userVal}
              type="username"
              placeholder="User name"
              onchange={(e) => setUserVal(e.target.value)}
            />
            <Input
              styleclass="form_input"
              value={userPass}
              type="password"
              placeholder="Password"
              onchange={(e) => setUserPass(e.target.value)}
            />
            <Input styleclass="submit" value="Login" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
