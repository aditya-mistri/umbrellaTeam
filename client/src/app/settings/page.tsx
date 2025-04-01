'use client';
import React from "react";
import Header from "../../components/Header/index";
import { useGetAuthUserQuery } from "../../app/state/api";

const Settings = () => {
  // Fetch current user data using the same query as in Navbar
  const { data: currentUser } = useGetAuthUserQuery({});
  
  const labelStyles = "block text-sm font-medium dark:text-white";
  const textStyles =
    "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-gray-700 dark:text-white";
  const buttonStyles =
    "mt-6 px-4 py-2 bg-blue-400 text-white font-bold rounded hover:bg-blue-500";
  
  // Handle case where user data isn't available
  if (!currentUser || !currentUser.userDetails) {
    return (
      <div className="p-8">
        <Header name="Settings" />
        <div className="text-center py-4 dark:text-white">User information not available. Please sign in again.</div>
      </div>
    );
  }
  
  const userDetails = currentUser.userDetails;
  
  return (
    <div className="p-8">
      <Header name="Settings" />
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-6">
          {userDetails.profilePictureUrl ? (
            <div className="h-20 w-20 rounded-full overflow-hidden">
              <img 
                src={`https://ut-s3-images.s3.ap-south-1.amazonaws.com/${userDetails.profilePictureUrl}`} 
                alt={userDetails.username || "User Profile"} 
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="h-20 w-20 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-2xl text-gray-500 dark:text-gray-300">
                {userDetails.username ? userDetails.username.charAt(0).toUpperCase() : "U"}
              </span>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <div>
            <label className={labelStyles}>Username</label>
            <div className={textStyles}>{userDetails.username || "Not set"}</div>
          </div>
          <div>
            <label className={labelStyles}>Email</label>
            <div className={textStyles}>{userDetails.email || "Not set"}</div>
          </div>
          <div>
            <label className={labelStyles}>Team</label>
            <div className={textStyles}>{userDetails.teamName || "Not assigned"}</div>
          </div>
          <div>
            <label className={labelStyles}>Role</label>
            <div className={textStyles}>{userDetails.roleName || "Not assigned"}</div>
          </div>
          
          <button className={buttonStyles}>Update Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;