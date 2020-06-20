import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./private-route";
import HomeView from "./home-view";
import ProfileView from "./profile.view";

function App() {
  const { isLoading } = useAuth0();

  return (
    <>
      {isLoading ? (
        <div className="spinnerContainer">
          <div className="spinner spinner-lg is-auth0">
            <div className="circle" />
          </div>
        </div>
      ) : (
        <Switch>
          <Route exact path="/" component={HomeView} />
          <PrivateRoute path="/profile" component={ProfileView} />
        </Switch>
      )}
    </>
  );
}

export default App;
