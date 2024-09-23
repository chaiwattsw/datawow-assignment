import React, { useState } from "react";
import {
  IconClose,
  IconHome,
  IconInbox,
  IconLogout,
  IconRefresh,
} from "./Icons";
import { signOut, useSession } from "next-auth/react";

const Sidebar: React.FC = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-200"
        onClick={toggleSidebar}
      >
        <IconHome />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-20 w-64 bg-white shadow-md flex flex-col h-screen transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-2xl text-black font-bold">
            {session?.user.role}
          </h1>
          <button className="md:hidden" onClick={toggleSidebar}>
            <IconClose />
          </button>
        </div>
        <nav className="flex-grow flex flex-col">
          <div>
            <a
              href="#"
              className="inline-flex gap-2 w-full py-2 px-4 text-gray-600 hover:bg-gray-100"
            >
              <IconHome />
              Home
            </a>
            <a
              href="#"
              className="inline-flex gap-2 w-full py-2 px-4 text-gray-600 hover:bg-gray-100"
            >
              <IconInbox />
              History
            </a>
            <a
              href="#"
              className="inline-flex gap-2 w-full py-2 px-4 text-gray-600 hover:bg-gray-100"
            >
              <IconRefresh />
              Switch to user
            </a>
          </div>
          <div className="mt-auto">
            <a
              href="#"
              className="inline-flex gap-2 w-full py-2 px-4 text-gray-600 hover:bg-gray-100"
              onClick={() => signOut()}
            >
              <IconLogout />
              Logout
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
