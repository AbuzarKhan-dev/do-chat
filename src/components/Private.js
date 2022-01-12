import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../AuthContext";

const PrivateRoute = ({ user: user, component: Component, ...rest }) => {
  const { userStatus } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (userStatus !== null) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
