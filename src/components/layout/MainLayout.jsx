import React, { useState } from "react";
import Header from "./Header";
import MobileView from "./MobileView";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function MainLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <Header onMenu={() => setOpen(true)} />
      <MobileView open={open} onClose={() => setOpen(false)} />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
