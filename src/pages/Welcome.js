import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="welcome_page">
      <div className="welcome_page_main_container">
      <div className="welcome_page_wrapper">
        <div className="welcome_page_content">
          <div className="heading_container">
            <h1>do-Chat</h1>
          </div>
          <div className="button_container">
            <Link className="go_to_signin" to="/signin">
              Create new account
            </Link>
            <Link className="go_to_login" to="/login">
              Log In
            </Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
