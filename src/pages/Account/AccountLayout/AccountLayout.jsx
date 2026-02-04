import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import "./AccountLayout.css";

const AccountLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="account-layout">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <section className="account-content">
          {/* MOBILE TOGGLE */}
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          <Outlet />
        </section>
      </main>
    </>
  );
};

export default AccountLayout;
