import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu } from "@headlessui/react"; // Example for dropdown
import { Avatar } from "@mui/material"; // Material-UI Avatar
import { useAuth } from "@/providers/user.context";

function MainLayout() {
  const { loggedInUser, logout } = useAuth();

  return (
    <>
      <nav className="bg-gray-800 text-white flex justify-between items-center p-4 px-32">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold">
            <Link to="/">
              <img
                src="src/images/2098402.png"
                alt="logo"
                style={{ width: "50px", height: "50px" }}
              />
            </Link>
          </div>
          <a href="/" className="hover:text-gray-400">
            Home
          </a>
          <a href="/contact" className="hover:text-gray-400">
            Contact Us
          </a>
          <a href="/tasks" className="hover:text-gray-400">
            My Tasks
          </a>
        </div>

        <div className="relative">
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-2">
              <Avatar
                src="/path/to/avatar.jpg"
                alt={`${loggedInUser?.firstName?.toUpperCase() || ""}`}
                className="w-8 h-8 rounded-full"
              />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/profile"
                    className={`block px-4 py-2 ${active ? "bg-gray-100" : ""}`}
                  >
                    Profile
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={logout}
                    href="#"
                    className={`block px-4 py-2 ${active ? "bg-gray-100" : ""}`}
                  >
                    Logout
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </nav>
      <div className="px-32">
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;
