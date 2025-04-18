import React, { useState, useEffect, useRef } from "react";
import { UserRoundCheck } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs/Breadcrumbs";
import usePluginsStore from "@/store/PluginsStore";
import { useMsal } from "@azure/msal-react";

const TopBar = () => {
  const UserMenu = usePluginsStore((state) => state.UserMenu);
  const { instance, accounts } = useMsal();
  const userName = accounts[0]?.name || "User";

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleProfileClick = () => {
    setDropdownVisible(false);
    console.log("Navigate to profile");
  };
  
  const handleLogoutClick = async () => {
    const logoutRequest = {
      account: instance.getActiveAccount(),
      postLogoutRedirectUri: "/login",
    };
  
    instance.logoutRedirect(logoutRequest).catch((e) => {
      console.error(`logoutRedirect failed: ${e}`);
    });
  };

  // Hide dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="comet-header-height flex w-full items-center justify-between gap-6 border-b pl-4 pr-6 relative">
      <div className="min-w-1 flex-1">
        <Breadcrumbs />
      </div>

      <div className="flex items-center gap-4" ref={dropdownRef}>
        {/* Username with Icon */}
        <div
          className="cursor-pointer flex items-center gap-1 px-4 py-2 rounded-full"
          onClick={toggleDropdown}
        >
          <UserRoundCheck className="h-5 text-black " />
          <span className="text-black">{userName}</span>
        </div>

        {/* Dropdown Menu */}
        {dropdownVisible && (
          <div className="absolute right-4 top-12 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 text-sm">
            <button
              className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-200"
              onClick={handleProfileClick}
            >
              Profile
            </button>
            <button
              className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-200"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          </div>
        )}

        {UserMenu ? <UserMenu /> : null}
      </div>
    </nav>
  );
};

export default TopBar;
