import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import Input from "../components/Input";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { auth } from "../Firebase/config";
import { db } from "../Firebase/config";
import {updateDoc, collection, doc} from "@firebase/firestore";


const UserInfo = () => {
  const [userName, setUserName] = useState();
  const [url, setUrl] = useState();
  const [error, setError] = useState();
  const { updateUser } = useAuth();

  const history = useHistory();


  async function updateUserInfo() {
    if (userName === "") {
      return setError("Enter your Name");
    }

    setUserName("");
    setUrl("");
    try {
      await updateUser(userName, url);
      history.push("/do_chat");
    } catch (e) {
      console.log("failed to Update:", e);
    }
  }

  return (
    <div className="auth_container">
      <div className="form_container">
        <div className="form_wrapper">
          <form className="form" onSubmit={updateUserInfo}>
            <h1 style={{ color: "black", fontSize: "3rem" }}>do-CHAT</h1>
            <h5 style={{ fontSize: "16px", color: "red", marginTop: "10px" }}>
              {error}
            </h5>
            <Input
              styleclass="form_input"
              value={userName}
              type="username"
              placeholder="Enter Your Name"
              onchange={(e) => setUserName(e.target.value)}
            />
            <Input
              styleclass="form_input"
              value={url}
              type="profile Picture"
              placeholder="Enter photo Url"
              onchange={(e) => setUrl(e.target.value)}
            />
            <Input styleclass="submit" value="Done" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
