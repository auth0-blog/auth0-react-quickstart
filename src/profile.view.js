import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import CodeBox from "./code-box";
import Step from "./step";
import InputBox from "./input-box";

const ProfileView = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const [metadataUpdate, setMetadataUpdate] = useState("");
  const [updateError, setUpdateError] = useState(null);
  const [getRequestError, setGetRequestError] = useState(null);
  const [updateRequestError, setUpdateRequestError] = useState(null);
  const [updateRequestSuccess, setUpdateRequestSuccess] = useState(null);

  const domain = process.env.REACT_APP_AUTH0_DOMAIN;

  const getUserMetadata = async () => {
    setGetRequestError(null);
    setUpdateRequestSuccess(null);

    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope: "read:current_user",
      });

      const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

      const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { user_metadata } = await metadataResponse.json();

      setUserMetadata(user_metadata);
    } catch (e) {
      setGetRequestError(e.message);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;

    setMetadataUpdate(value);
    setUpdateError(null);
    setUpdateRequestSuccess(null);
  };

  const updateUserMetadata = async (metadata) => {
    setUpdateRequestError(null);

    let updateData = null;
    try {
      updateData = JSON.parse(metadata);
    } catch (e) {
      setUpdateError("Invalid JSON");
      return;
    }

    const accessToken = await getAccessTokenSilently({
      audience: `https://${domain}/api/v2/`,
      scope: "update:current_user_metadata",
    });

    const updateUserMetadataByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

    try {
      await fetch(updateUserMetadataByIdUrl, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_metadata: {
            ...updateData,
          },
        }),
      });

      setUpdateRequestSuccess("You've successfully updated the user_metadata");
    } catch (e) {
      setUpdateRequestError(e.message);
    }
  };

  return (
    <>
      <section className="jumbotron">
        <h2>
          <img className="avatar" src={user.picture} alt="Profile avatar" />
        </h2>
        <h1>{user.name}</h1>
        <p>Well done!</p>
        <Link className="btn btn-success btn-lg" to="/">
          Back to Homepage
        </Link>
      </section>
      <article className="card-docs">
        <h4>
          <code>user_metadata</code>
        </h4>
        <CodeBox>
          {userMetadata ? JSON.stringify(userMetadata, null, 2) : `{}`}
        </CodeBox>
      </article>
      <Step number="7">
        {getRequestError && (
          <div className="alert alert-danger">
            <strong>{getRequestError}</strong>
          </div>
        )}
        <p className="card-docs-description">
          <button onClick={getUserMetadata} className="btn btn-primary">
            Get User Metadata
          </button>
        </p>
      </Step>
      <Step number="8">
        {updateRequestError && (
          <div className="alert alert-danger">
            <strong>{updateRequestError}</strong>
          </div>
        )}
        {updateRequestSuccess && (
          <div className="alert alert-success">
            <strong>{updateRequestSuccess}</strong>
          </div>
        )}
        <p className="card-docs-description">
          <button
            onClick={() => updateUserMetadata(metadataUpdate)}
            className="btn btn-primary"
          >
            Update User Metadata
          </button>
        </p>
        {updateError && (
          <div className="alert alert-danger">
            <strong>{updateError}</strong>
          </div>
        )}
        <InputBox onInputChange={handleInputChange} />
      </Step>
    </>
  );
};

export default ProfileView;
