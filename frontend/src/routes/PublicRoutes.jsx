import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import DashBoard from '../pages/DashBoard';
import Header from '../components/Headers';
import SideBar from '../components/Sidebar'; 
import PostVacancy from '../pages/PostVacancy';
import VacancyPosting from '../pages/VacancyPosting';
import ReceiveApplications from '../pages/ReceiveApplications';



function AppLayout({ userToken }) {
  return (
  <div className="h-screen w-screen overflow-hidden">
        <div className="grid grid-cols-13 grid-rows-[auto_1fr] h-full">
          
          {/* ROW 1: Header */}
          <div className="col-span-13">
            <Header isLoggedIn={!!userToken} />
          </div>

          {/* ROW 2, COL 1: Expanded Sidebar (Changed from col-span-1 to col-span-2) */}
          <div className="col-span-2 h-full overflow-y-auto">
            <SideBar />
          </div>

          {/* ROW 2, COLS 2-9: Main Content (Changed from col-span-8 to col-span-7) */}
          <div className="col-span-11 h-full overflow-y-auto p-4">
            <Outlet />
          </div>

        </div>
      </div>
    );
}

// 2. The Single Master Routing Engine
export default function PublicRoutes() {
  const userToken = localStorage.getItem('token') || null; 

  return (
    <Router>
      <Routes>
        {/* ------------------------------------------------------------------
            PUBLIC ROUTES (No Layout, No Sidebars)
           ------------------------------------------------------------------ */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* ------------------------------------------------------------------
            PROTECTED/APP ROUTES (Automatically wrapped in your design layout)
           ------------------------------------------------------------------ */}
        <Route element={<AppLayout userToken={userToken} />}>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/postVacancy" element={<PostVacancy />} />
        <Route path="/VacancyPosting" element={<VacancyPosting />} />
        <Route path="/receiveApplicant" element={<ReceiveApplications />} />

        </Route>

        {/* Fallback Catch-All Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}