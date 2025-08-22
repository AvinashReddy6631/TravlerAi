"use client";

import NavBar from "@/components/Navbar";
import SearchForm from "@/components/SearchForm";
import Chatbot from "@/components/Chatbot";
import dynamic from "next/dynamic";

// ✅ MapView must be imported dynamically
const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to TravelHub AI</h1>
        <SearchForm />
        <MapView />
        <Chatbot />
      </div>
    </div>
  );
}
