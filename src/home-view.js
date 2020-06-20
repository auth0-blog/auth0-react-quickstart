import { useAuth0 } from "@auth0/auth0-react";
import Step from "./step";
import CodeBox from "./code-box";
import { Link } from "react-router-dom";
import React from "react";

const Steps = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const href = window.location.href;
  const url = href.substring(0, href.length - 1);

  return (
    <>
      <Step number="1">
        <p className="card-docs-description">
          <a href="https://auth0.com/signup">
            Sign up for a <strong>free</strong> Auth0 account.
          </a>
        </p>
      </Step>
      <Step number="2">
        <p className="card-docs-description">Create an Auth0 Application:</p>
        <p className="card-docs-description">
          Open the{" "}
          <a href="https://manage.auth0.com/#/applications">Applications</a>{" "}
          section of the Auth0 dashboard.
        </p>
        <p className="card-docs-description">
          Click <strong>Create Application</strong>.
        </p>
      </Step>
      <Step number="3">
        <p className="card-docs-description">
          In your Auth0 application <strong>Settings</strong>:
        </p>
        <p className="card-docs-description">
          Set <code>{url}</code> as an <strong>Allowed Callback URLs</strong>.
        </p>
        <p className="card-docs-description">
          Set <code>{url}</code> as an <strong>Allowed Logout URLs</strong>.
        </p>
        <p className="card-docs-description">
          Set <code>{url}</code> as an <strong>Allowed Web Origins</strong>.
        </p>
        <p className="card-docs-description">
          Scroll to the bottom and click <strong>Save Changes</strong>.
        </p>
      </Step>
      <Step number="4">
        <p className="card-docs-description">
          Create a <code>.env</code> file under the root project directory with
          the following:
        </p>
        <CodeBox>
          {`REACT_APP_AUTH0_DOMAIN=YOUR-AUTH0-DOMAIN`}
          <br />
          {`REACT_APP_AUTH0_CLIENT_ID=YOUR-AUTH0-CLIENT-ID`}
        </CodeBox>
        <p className="card-docs-description">
          Replace <code>YOUR-AUTH0-DOMAIN</code> with the value of{" "}
          <strong>Domain</strong> from the Auth0 Application Settings.
        </p>
        <p className="card-docs-description">
          Replace <code>YOUR-AUTH0-CLIENT-ID</code> with the value of{" "}
          <strong>Client ID</strong> from the Auth0 Application Settings.
        </p>
      </Step>
      <Step number="5">
        <p className="card-docs-description">
          {isAuthenticated ? (
            <span>You are already logged in. Proceed to next step!</span>
          ) : (
            <button onClick={loginWithRedirect} className="btn btn-success">
              Login
            </button>
          )}
        </p>
      </Step>
      <Step number="6">
        <p className="card-docs-description">
          <span>
            Access <Link to="/profile">guarded route</Link>.
          </span>
          <strong>
            {!isAuthenticated && <span>You must logged in to do this.</span>}
          </strong>
        </p>
      </Step>
      <div className="try-banner">
        <span>Don't have an account yet?</span>
        <a href="https://auth0.com/signup" className="btn btn-success btn-lg">
          Try Auth0 for Free
        </a>
      </div>
    </>
  );
};

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <section className="jumbotron">
      <img
        src="https://cdn.auth0.com/blog/logos/angular-and-auth0.png"
        alt="Auth0 loves React logo"
      />
      <h1>Auth0 React QuickStart</h1>
      <p>
        Start your next React app with authentication out of the box and get to
        building that next great app in five simple steps.
      </p>
      {isAuthenticated ? (
        <button onClick={logout} className="btn btn-success btn-lg">
          Log Out
        </button>
      ) : (
        <button onClick={loginWithRedirect} className="btn btn-success btn-lg">
          Log In
        </button>
      )}
    </section>
  );
};

const HomeView = () => {
  return (
    <>
      <Header />
      <Steps />
    </>
  );
};

export default HomeView;
