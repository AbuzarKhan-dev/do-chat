import { addDoc, collection, doc, query, Timestamp } from "@firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../Firebase/config";
import moment from "moment";

function Chat({ user, msgs }) {
  const [value, setValue] = useState("");

  const currUser = auth.currentUser;
  console.log(user)
  async function createMessage(user, value) {
    const user1 = currUser.uid;
    const user2 = user.userUid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const messageColRef = collection(db, "message");
    const messageDocRef = doc(messageColRef, id);
    setValue("");
    try {
      await addDoc(collection(messageDocRef, "messages"), {
        sentBy: currUser.uid,
        text: value,
        createAt: Timestamp.fromDate(new Date()),
      });
    } catch (e) {
      console.log("error:", e);
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
            <ul className={currUser.uid === msg.sentBy ? "user1" : "user2"}>
              <li
                key={msg.id}
                className={currUser.uid === msg.sentBy ? "sender" : "receiver"}
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
