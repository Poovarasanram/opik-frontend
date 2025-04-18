// // app/login/page.tsx or similar path depending on your folder structure

// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";

// // import Link from "next/link";
// import React from "react";

// const LoginForm: React.FC = () => {
//   return (
//     <Card className="w-[75%] h-[80%] p-4">
//       <CardContent className="h-full flex flex-col justify-between">
//         <div className="pt-20 flex gap-3 flex-col">
//           <h2 className="text-center text-xl font-bold mb-4">Log in</h2>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Email:
//               </label>
//               <Input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="mt-1"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Password:
//               </label>
//               <Input
//                 type="password"
//                 placeholder="Enter your password"
//                 className="mt-1"
//               />
//             </div>
//             <div className="flex items-center space-x-2">
//               <Checkbox />
//               <span className="text-sm">Remember me</span>
//             </div>
//             <Button className="w-full">Sign in</Button>

//             <div className="flex flex-col items-start">
//               <Button variant="link" className="text-sm text-blue-500 p-3.5">
//                 Forgot password?
//               </Button>
//               <Button variant="link" className="text-sm p-3.5 text-blue-500">
//                 {/* <Link href="/login/sso">Sign in with company (SSO)</Link> */}
//               </Button>
//             </div>
//           </div>
//         </div>
//         <div>
//           <p className="mt-4 text-center text-xs text-gray-500">
//             By logging in or signing up using the options above, you agree to
//             <a href="#" className="text-blue-500">
//               {" "}
//               SmartCred’s Terms & Conditions
//             </a>{" "}
//             and
//             <a href="#" className="text-blue-500">
//               {" "}
//               Privacy Policy
//             </a>
//             .
//           </p>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// const LoginPage: React.FC = () => {
//   return <LoginForm />;
// };

// export default LoginPage;
// components/pages/LoginPage/LoginPage.tsx

// import { useState } from "react";
// import { useNavigate } from "@tanstack/react-router";
// import { useSetAppUser } from "@/store/AppStore";

// const LoginPage = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const setUser = useSetAppUser();
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     // Static mock login
//     if (username === "admin" && password === "password") {
//       const apiKey = "mock-api-key";

//       // Set Zustand user state
//       setUser({ apiKey, userName: username });

//       // Optionally set axios default auth header if needed
//       // axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${apiKey}`;

//       // Navigate to home or dashboard
//       navigate({ to: "/" });
//     } else {
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <h2 className="text-xl font-bold mb-4">Login</h2>

//       {error && <p className="text-red-500 mb-2">{error}</p>}

//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         className="border p-2 mb-2 w-full"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="border p-2 mb-4 w-full"
//       />

//       <button
//         onClick={handleLogin}
//         className="bg-blue-500 text-white px-4 py-2 rounded w-full"
//       >
//         Login
//       </button>
//     </div>
//   );
// };

// export default LoginPage;

import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSetAppUser } from "@/store/AppStore";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const setUser = useSetAppUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin" && password === "password") {
      const apiKey = "mock-api-key";
      setUser({ apiKey, userName: email });
      navigate({ to: "/" });
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[50%] h-[80%] p-4">
        <CardContent className="h-full flex flex-col justify-between">
          <div className="pt-20 flex gap-3 flex-col">
            <h2 className="text-center text-xl font-bold mb-4">Log in</h2>
            <div className="space-y-4">
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User Name:
                </label>
                <Input
                  type="text"
                  placeholder="Enter your user name"
                  className="mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password:
                </label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="mt-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(val) => setRemember(!!val)}
                />
                <label htmlFor="remember" className="text-sm">
                  Remember me
                </label>
              </div>

              <Button className="w-full" onClick={handleLogin}>
                Sign in
              </Button>

              <div className="flex flex-col items-start">
                <Button variant="link" className="text-sm text-blue-500 p-3.5">
                  Forgot password?
                </Button>
                <Button variant="link" className="text-sm p-3.5 text-blue-500">
                  {/* <Link href="/login/sso">Sign in with company (SSO)</Link> */}
                </Button>
              </div>
            </div>
          </div>

          <div>
            <p className="mt-4 text-center text-xs text-gray-500">
              By logging in or signing up using the options above, you agree to
              <a href="#" className="text-blue-500">
                {" "}
                SmartCred’s Terms & Conditions
              </a>{" "}
              and
              <a href="#" className="text-blue-500">
                {" "}
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
