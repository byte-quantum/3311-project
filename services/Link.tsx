// APP COMPONENT
// Upon rendering of App component, make a request to create and
// obtain a link token to be used in the Link component
import React, { useContext, useEffect, useState } from "react";
import { PlaidLinkOnSuccessMetadata, usePlaidLink } from "react-plaid-link";
import Accounts from "./Accounts";
import Context from "@/Context";
const PlaidLinkButton = () => {
  const [linkToken, setLinkToken] = useState(null);
  const generateToken = async () => {
    const response = await fetch(
      "http://localhost:8000/api/create_link_token",
      {
        method: "POST",
      }
    );
    const data = await response.json();
    setLinkToken(data.link_token);
  };
  useEffect(() => {
    generateToken();
  }, []);
  //console.log(linkToken);
  return linkToken != null ? <Link linkToken={linkToken} /> : <></>;
};
// LINK COMPONENT
// Use Plaid Link and pass link token and onSuccess function
// in configuration to initialize Plaid Link
interface LinkProps {
  linkToken: string | null;
}
const Link: React.FC<LinkProps> = (props: LinkProps) => {
  const [linkSuccess, setLinkSuccess] = useState(false);
  const onSuccess = React.useCallback(
    async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
      // send public_token to server
      const response = await fetch(
        "http://localhost:8000/api/set_access_token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: `public_token=${public_token}`,
        }
      );
      const data = await response.json();
      Context.accessToken = data.access_token;
      Context.linkSuccess = true;
    },
    []
  );

  let isOauth = false;
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: props.linkToken,
    onSuccess,
  };
  //console.log(config);
  //Accounts();

  if (window.location.href.includes("?oauth_state_id=")) {
    // TODO: figure out how to delete this ts-ignore
    // @ts-ignore
    config.receivedRedirectUri = window.location.href;
    isOauth = true;
  }

  const { open, ready } = usePlaidLink(config);
  useEffect(() => {
    if (isOauth && ready) {
      open();
    }
  }, [ready, open, isOauth]);

  return (
    <div>
      <button onClick={() => open()} disabled={!ready}>
        Link account
      </button>
    </div>
  );
};
export default PlaidLinkButton;
