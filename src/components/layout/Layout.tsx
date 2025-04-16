import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useKeyboardShortcut } from "../../hooks/useKeyboardShortcut";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  useKeyboardShortcut();

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar key={location.pathname} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default React.memo(Layout);
