import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "672c16ab-ce50-4046-8f4a-64d077fbb151",
    authority: "https://login.microsoftonline.com/1c8ea334-d5cc-4eb6-803d-444f7f7a68ee/v2.0",
    redirectUri: "/", // Your frontend URI
    postLogoutRedirectUri: "/login",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const loginRequest = {
  scopes: ["User.Read"],
};
