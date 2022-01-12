import React from "react";
import Chat from "../components/Chat";
import { useAuth } from "../AuthContext";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import { auth } from "../Firebase/config";
import { db } from "../Firebase/config";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
  doc,
  updateDoc,
} from "@firebase/firestore";
import User from "../components/User";
import signout from "../images/right-from-bracket-solid.svg";
import dp from "../images/dp1.jpg";

const DoChat = () => {
  const { userLogOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState({});
  const [users, setUsers] = useState([]);
  const [Msg, setMsg] = useState([]);
  const currUser = auth.currentUser;
  let user = [];
  const user1 = currUser.uid;
  const history = useHistory();
  function logOut() {
    userLogOut();
    history.push("/login");
  }

  function userInfo(user) {
    setChat(user);
    const user2 = user.userUid;
    const Id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const collRef = collection(db, "message", Id, "messages");
    const q = query(collRef, orderBy("createAt", "asc"));
    onSnapshot(q, (snapshot) => {
      let msg = [];
      snapshot.docs.map((doc) => msg.push(doc.data()));
      setMsg(msg);
    });
  }

  async function update() {
    const colRef = collection(db, "users");
    const docRef = doc(colRef, currUser.uid);
    await updateDoc(docRef, {
      name: currUser.displayName,
      photoURL: currUser.photoURL,
    });
  }  

  useEffect(() => {
    update();
    const colRef = collection(db, "users");
    const q = query(colRef, where("userUid", "not-in", [currUser.uid]));
    onSnapshot(q, (snapshot) => {
      snapshot.docs.map((doc) => user.push(doc.data()));
      setLoading(false);
    });
    setUsers(user);
  }, []);

  return (
    !loading && (
      <div className="do-chat_page">
        <header>
          <div className="header_container_wrapper">
            <div className="header_container_content">
              <div className="logo_conatainer">
                <h1>do-Chat</h1>
              </div>
              <div className="current_user">
                <div className="current_user_info">
                  <User
                    photo={currUser.photoURL}
                    name={currUser.displayName}
                    clasname="user"
                    wrapperclass="user_wrapper"
                    insidewrapclass="user_inside_wrapper"
                  />
                </div>
                <div className="logout_container">
                  <img src={signout} onClick={logOut} title="Sign Out" />
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="chat_section">
          <div className="chat_users_section">
            <div className="chat_users_wrapper">
              <div className="chat_users_list">
                {users.map((user) => (
                  <User
                    id={user.uid}
                    photo={user.photoURL}
                    name={user.name}
                    classname="users"
                    wrapperclass="users_wrapper"
                    insidewrapclass="users_inside_wrapper"
                    onclick={() => userInfo(user)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="chat_messages_section">
            <Chat user={chat} msgs={Msg} />
          </div>
          <div className="selected_user">
            <img src={chat.photoURL ? chat.photoURL : dp} />
            <h1>{chat.name}</h1>
          </div>
        </div>
      </div>
    )
  );
};

export default DoChat;
