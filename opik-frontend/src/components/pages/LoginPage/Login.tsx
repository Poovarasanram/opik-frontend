import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "@/lib/msal/msalConfig";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const { instance, accounts } = useMsal();
  const [email, setEmail] = useState("");
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  // const handleLogin = async () => {
  //   try {
  //     await instance.loginRedirect(loginRequest);
  //   } catch (error) {
  //     console.error("Login failed", error);
  //   }
  // };
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const handleLogin = async () => {
    try {
      const trimmedEmail = email.trim();
  
      await instance.loginRedirect({
        ...loginRequest,
        ...(isValidEmail(trimmedEmail)
          ? { loginHint: trimmedEmail }
          : {}), // Go to Azure's default screen if invalid
      });
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  

  useEffect(() => {
    instance
      .handleRedirectPromise()
      .then(async (response) => {
        if (response) {
          console.log("Login Response:", response);
        }

        if (accounts.length > 0) {
          const tokenResponse = await instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
          });
          console.log("Access Token:", tokenResponse.accessToken);
          console.log("Access name:", tokenResponse.account.name);
        }
      })
      .catch((error) => {
        console.error("Redirect Error", error);
      });
  }, [instance, accounts]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex h-screen">
      {/* Left Side - Branding */}
      <div className="w-[calc(50%-20px)] bg-white flex flex-col items-center justify-center px-10">
        <h1 className="text-4xl font-bold rounded-lg">
          Smart<span className="text-red-500">Assist</span>
        </h1>
        <p className="text-gray-600 mt-4 text-center rounded-lg">
          Empower to integrate AI confidently and drive innovations
        </p>
      </div>
  
      {/* Right Side - Login */}
      <div className="w-[calc(50%+20px)] bg-[#1f3b8c] flex items-center justify-center">
        <Card className="w-full max-w-[620px] h-[530px] p-16 shadow-lg rounded-lg">
          <CardContent className="h-full flex flex-col justify-between rounded-lg">
            <div>
              <h2 className="text-3xl font-bold text-center mb-8 text-black rounded-lg">
                Login using SSO
              </h2>
              <div className="mb-6 flex flex-col gap-2 rounded-lg">
                <p className="text-lg text-black">Email:</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Company email"
                  className="w-full p-4 text-sm border rounded-lg placeholder:text-sm"
                />
              </div>
              <Button
                className="w-full py-2 text-lg bg-black text-white hover:bg-gray-800 h-14 rounded-lg"
                onClick={handleLogin}
              >
                Sign in
              </Button>
              <div className="text-base text-center mt-4 rounded-lg">
                <a href="#" className="text-blue-400">← Go back to sign in</a>
              </div>
            </div>
            <p className="mt-6 text-sm text-center text-gray-500 rounded-lg">
              By logging in or signing up using the options above, you agree to
              <a href="#" className="text-blue-400 mx-1">SmartCred's Terms & Conditions</a> and
              <a href="#" className="text-blue-400 mx-1">Privacy Policy</a>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  
  
};

export default LoginPage;
