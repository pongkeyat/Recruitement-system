import React from "react";
import { useNavigate } from "react-router-dom";

// Destructure isLoggedIn from props so the component can read the login state
export default function Header({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/login');
  };

  const handleLogout = () => {
  navigate('/')
  }


  return (
    <div className="w-full bg-gradient-to-b from-[#1e3c72] via-[#112244] to-[#0d1b2a] text-white font-sans relative overflow-hidden flex flex-col">
      <header className="w-full flex justify-between items-center px-16 py-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-slate-900 text-sm">
            LU
          </div>

          <div>
            <h1 className="text-sm font-bold tracking-wide leading-tight">
              Region 1
            </h1>
            <p className="text-[10px] text-gray-400">
              Department of Education • Region I
            </p>
          </div>
        </div>

        {/* Only render navigation and login button if user is NOT logged in */}
        {!isLoggedIn && (
          <div className="flex items-center gap-8 text-sm text-gray-300">
            <a
              href="#vacancies"
              className="flex items-center gap-1 hover:text-white transition"
            >
              <span>⌂</span>
              Vacancies
            </a>

            <button
              onClick={handleNavigate}
              className="border border-white/40 hover:border-white px-4 py-2 rounded-md flex items-center gap-2 text-xs transition"
            >
              <span>➜</span>
              Staff Login
            </button>
          </div>
        )}

        {isLoggedIn && (
          <button onClick={handleLogout}
            className="mt-auto bg-red-600 text-white py-2 rounded-2xl mx-2 mb-2 hover:bg-red-700 transition-colors text-[13px] font-semibold"
          >
            Logout
          </button>
        )}
      </header>
    </div>
  );
}