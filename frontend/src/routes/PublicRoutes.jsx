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
import AllApplication from '../pages/AllApplication';
import ViewApplicants from '../pages/ViewApplicants';
import InitialScreening from '../pages/InitialScreening';
import ApplicantsInitialScreening from '../pages/ApplicantsInitialScreening';
import UserManagement from '../pages/Usermanagent';
import ChangePassword from '../pages/ChangePassword';
import Qualified from '../pages/Qualified';
import Disqualified from '../pages/Disqualified';
import ProtectedRoute from './ProtectedRoutes';
import { useAuth } from '../context/AuthContext';
import AssesmentSession from '../pages/AssesmentSession';
import CalendarView from '../pages/CalendarView.';
import CalendarParent from '../components/assesment/CalendarParent';
import Scoring from '../pages/Scoring';
import FinalRankings from '../pages/Ranking';


function AppLayout() {
  const { token } = useAuth();

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="grid h-full grid-cols-13 grid-rows-[auto_1fr]">

        {/* Header */}
        <div className="col-span-13">
          <Header isLoggedIn={!!token} />
        </div>

        {/* Sidebar */}
        <div className="col-span-2 overflow-hidden">
          <SideBar />
        </div>

        {/* Main Content */}
        <main className="col-span-11 overflow-y-auto p-4">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
// 2. The Single Master Routing Engine
export default function PublicRoutes() {
  return (
    <Router>
      <Routes>
        {/* ------------------------------------------------------------------
            PUBLIC ROUTES (No Layout, No Sidebars)
           ------------------------------------------------------------------ */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword/>} />
        

        {/* ------------------------------------------------------------------
            PROTECTED/APP ROUTES (Automatically wrapped in your design layout)
           ------------------------------------------------------------------ */}
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/postVacancy" element={<PostVacancy />} />
        <Route path="/VacancyPosting" element={<VacancyPosting />} />
        <Route path="/receiveApplicant" element={<ReceiveApplications />} />
        <Route path="/allApplications" element ={<AllApplication />} />
        <Route path="/applicants/:id" element={<ViewApplicants />} />
        <Route path="/initialScreening" element={<InitialScreening />} />
        <Route path="/initialScreening/:id" element={<ApplicantsInitialScreening />} />
        <Route path="/usermanagement" element={<UserManagement />} />
        <Route path='/Qualified' element={<Qualified />} />
        <Route path='/Disqualified' element={<Disqualified />} />
        <Route path='/Assesment' element={<AssesmentSession/>} />
        <Route path='/Interview-date' element={<CalendarParent />} />
        <Route path='/Scoring' element={<Scoring />} />
        <Route path='/comparative-assessment-result' element={<FinalRankings />} />
        

        </Route>

        {/* Fallback Catch-All Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
