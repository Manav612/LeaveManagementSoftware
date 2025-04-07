import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen bg-[#F2EFE7] text-gray-900">
      <Navbar />
      <main className="pt-16">
        <AppRoutes />
      </main>
    </div>
  );
};

export default App;
