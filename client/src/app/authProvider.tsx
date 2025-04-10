import React, { useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import LandingPage from "../components/LandingPage/index";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
      userPoolClientId:
        process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
    },
  },
});

const formFields = {
  signUp: {
    username: {
      order: 1,
      placeholder: "Choose a username",
      label: "Username",
      inputProps: { required: true },
    },
    email: {
      order: 2,
      placeholder: "Enter your email address",
      label: "Email",
      inputProps: { type: "email", required: true },
    },
    password: {
      order: 3,
      placeholder: "Enter your password",
      label: "Password",
      inputProps: { type: "password", required: true },
    },
    confirm_password: {
      order: 4,
      placeholder: "Confirm your password",
      label: "Confirm Password",
      inputProps: { type: "password", required: true },
    },
  },
};

const AuthProvider = ({ children }: any) => {
  const [showLandingPage, setShowLandingPage] = useState(true);

  const handleGetStarted = () => {
    setShowLandingPage(false);
  };

  if (showLandingPage) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return (
    <Authenticator formFields={formFields}>
      {({ user }: any) =>
        user ? (
          <div>{children}</div>
        ) : (
          <div className="min-h-screen bg-slate-900 flex justify-center items-center">
            <div className="w-full max-w-md p-6">
              <div className="mb-8 text-center">
                <div className="flex justify-center mb-4">
                  <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
                    <path
                      d="M12 2L3 9V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V9L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-400"
                    />
                    <path
                      d="M9 22V12H15V22"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-400"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Sign in to Umbrella Team</h2>
                <p className="text-gray-400 mt-2">Manage your projects with ease</p>
              </div>
              <Authenticator formFields={formFields} />
              <div className="mt-6 text-center">
                <button 
                  onClick={() => setShowLandingPage(true)}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Return to home page
                </button>
              </div>
            </div>
          </div>
        )
      }
    </Authenticator>
  );
};

export default AuthProvider;