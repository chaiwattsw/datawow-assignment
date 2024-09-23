"use client";

import React, { useState } from "react";
import {
  IconAward,
  IconTrash,
  IconUser,
  IconXCircle,
} from "./_components/Icons";
import CreateConcertForm from "./_components/CreateConcertForm";
import Sidebar from "./_components/Sidebar";
import { useConcerts } from "@/hooks/useConcerts";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { data: concerts, isLoading } = useConcerts();
  console.log("🚀 ~ AdminPage ~ concerts:", concerts);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#0070A4] text-white p-4 rounded-lg shadow flex justify-center items-center flex-col gap-4">
            <IconUser />
            <h2 className="text-lg font-semibold mb-2">Total of seats</h2>
            <p className="text-4xl font-bold">500</p>
          </div>
          <div className="bg-[#00A58B] text-white p-4 rounded-lg shadow flex justify-center items-center flex-col gap-4">
            <IconAward />
            <h2 className="text-lg font-semibold mb-2">Reserve</h2>
            <p className="text-4xl font-bold">120</p>
          </div>
          <div className="bg-[#E84E4E] text-white p-4 rounded-lg shadow flex justify-center items-center flex-col gap-4">
            <IconXCircle />
            <h2 className="text-lg font-semibold mb-2">Cancel</h2>
            <p className="text-4xl font-bold">12</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <a
                href="#"
                className={`border-b-2 py-2 px-4 text-sm font-medium transition-all duration-300 ${
                  activeTab === "overview"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </a>
              <a
                href="#"
                onClick={() => setActiveTab("create")}
                className={`border-b-2 py-2 px-4 text-sm font-medium transition-all duration-300 ${
                  activeTab === "create"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Create
              </a>
            </nav>
          </div>
        </div>

        {activeTab === "overview" ? (
          <div className="space-y-4">
            {concerts?.map((concert, index) => (
              <div key={index} className="bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-500 mb-2">
                  {concert.name}
                </h3>
                <p className="text-gray-600 mb-4">{concert.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <IconUser
                      style={{
                        fill: "black",
                      }}
                    />
                    <span className="text-gray-600">{concert.totalSeats}</span>
                  </div>
                  <button className="bg-[#E84E4E] gap-2 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-200 flex items-center">
                    <IconTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <CreateConcertForm onSuccess={() => setActiveTab("overview")} />
        )}
      </main>
    </div>
  );
};

export default AdminPage;
