import { addDoc, collection, doc, query, Timestamp } from "@firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../Firebase/config";
import moment from "moment";

function Chat({ user, msgs }) {
  const [value, setValue] = useState("");

  const USER = auth.currentUser;

  async function createMessage(user, value) {
    const USER1 = USER.uid;
    const USER2 = user.userUid;
    const Id = USER1 > USER2 ? `${USER1 + USER2}` : `${USER2 + USER1}`;
    const MessageColRef = query(collection(db, "message"));
    const MessageDocRef = query(doc(MessageColRef, Id));
    setValue("");
    try {
      await addDoc(collection(MessageDocRef, "messages"), {
        sentBy: USER.uid,
        text: value,
        createAt: Timestamp.fromDate(new Date()),
      });
    } catch (e) {
      console.log("errror:", e);
    }
  }

  return (
    <div className="chat_container">
      <div className="chat_container_wrapper">
        <div className="Messages">
          <div className="chatting_user">
            <h2>{user.name}</h2>
          </div>

          {msgs?.map((msg) => (
            <ul className={USER.uid === msg.sentBy ? "user1" : "user2"}>
              <li
                key={msg.id}
                className={USER.uid === msg.sentBy ? "sender" : "receiver"}
              >
                <p1>{msg.text}</p1>
                <p2>{moment(msg.createdAt).calendar()}</p2>
              </li>
            </ul>
          ))}
        </div>
        <div className="chat_here">
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <button onClick={() => createMessage(user, value)}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
