import React from "react";
import "./App.css";
import LoginPage from "./pages/4-Chat_Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DoChat from "./pages/do_Chat";
import SignInForm from "./pages/SignIn_From";
import WelcomePage from "./pages/Welcome";
import PrivateRoute from "./components/Private";
import UserInfo from "./pages/UserInfo";
import { auth } from "./Firebase/config";

function App() {
  console.log(auth.currentUser)
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route exact path="/signin" component={SignInForm} />
          <Route exact path="/updateprofile" component={UserInfo} />
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute exact path="/do_chat" component={DoChat} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
