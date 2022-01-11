import React from "react";
import { useContext } from "react";
import { db } from "./Firebase/config";
import { collection, addDoc } from "firebase/firestore";

//Create_Context
const DataProvider = React.createContext();

//Use_Context
export function useData() {
  return useContext(DataProvider);
}

export const DatabaseProvider = ({ children }) => {
  //  const [userID, setUserID] = useState();
  //  const USER = auth.currentUser;
  //Create Chat_room
  function addUser(name, useremail, userID) {
    addDoc(collection(db, "chat_room"), {
      name: name,
      email: useremail,
      id: userID,
    });
  }

  //Create_USER

  //Provider_Value
  const value = {
    addUser,
  };

  return (
    <DataProvider.Provider value={value}>{children}</DataProvider.Provider>
  );
};
