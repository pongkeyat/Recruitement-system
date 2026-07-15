import React from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function PositionInformationCard({ currentSession }) {
  // Graceful safety fallback in case the shared state hasn't loaded yet
  if (!currentSession) {
    return (
      <div className="bg-white rounded-xl border p-6 text-center text-slate-400 text-sm font-medium">
        Loading position details...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden transition-all duration-300">
      
      {/* Header - Dynamic Status Badge colors update instantly based on parent state */}
      <div className="bg-[#203D73] px-6 py-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-white">
            Position Information
          </h2>
          <p className="text-blue-100/80 text-xs mt-0.5">
            Assessment Session Details
          </p>
        </div>

        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-1.5 ${
          currentSession.status === "Completed" ? "bg-green-500" : "bg-amber-500"
        }`}>
          {currentSession.status === "Completed" ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
          {currentSession.status} Session
        </span>
      </div>

      <div className="p-5">
        {/* Position Details Matrix Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-slate-50/60 rounded-xl p-4 border border-slate-100">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Position Title</p>
            <h3 className="mt-1 font-bold text-base text-[#203D73]">{currentSession.title}</h3>
          </div>

          <div className="bg-slate-50/60 rounded-xl p-4 border border-slate-100">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Vacancy Number</p>
            <h3 className="mt-1 font-mono font-bold text-base text-[#203D73]">{currentSession.id}</h3>
          </div>

          <div className="bg-slate-50/60 rounded-xl p-4 border border-slate-100">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Salary Grade</p>
            <div className="mt-1.5">
              <span className="bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-md font-bold text-xs">
                {currentSession.sg}
              </span>
            </div>
          </div>

          <div className="bg-slate-50/60 rounded-xl p-4 border border-slate-100">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Session Venue</p>
            <h3 className="mt-1 font-bold text-slate-700 text-xs">{currentSession.venue}</h3>
          </div>

        </div>

        <hr className="my-5 border-slate-100" />

        {/* Qualification Standards (QS) Grid Block */}
        <div>
          <h3 className="text-sm font-bold text-[#203D73] mb-3">
            Qualification Standards
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-100 p-4 bg-white hover:shadow-xs transition">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Education</h4>
              <p className="mt-1 text-slate-700 text-xs font-medium leading-relaxed">{currentSession.qsBaseline?.education || "None"}</p>
            </div>

            <div className="rounded-xl border border-slate-100 p-4 bg-white hover:shadow-xs transition">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Training</h4>
              <p className="mt-1 text-slate-700 text-xs font-medium leading-relaxed">{currentSession.qsBaseline?.training || "None"}</p>
            </div>

            <div className="rounded-xl border border-slate-100 p-4 bg-white hover:shadow-xs transition">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Experience</h4>
              <p className="mt-1 text-slate-700 text-xs font-medium leading-relaxed">{currentSession.qsBaseline?.experience || "None"}</p>
            </div>

            <div className="rounded-xl border border-slate-100 p-4 bg-white hover:shadow-xs transition">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Eligibility</h4>
              <p className="mt-1 text-slate-700 text-xs font-medium leading-relaxed">{currentSession.qsBaseline?.eligibility || "None"}</p>
            </div>
          </div>
        </div>

        <hr className="my-5 border-slate-100" />

        {/* Dynamic Total Metrics Footer */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50/40 rounded-xl border border-blue-100 p-4 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Criteria Metrics</p>
            <h2 className="text-xl font-black text-[#203D73] mt-1">
              {currentSession.criteriaCount}
            </h2>
          </div>

          <div className="bg-green-50/40 rounded-xl border border-green-100 p-4 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Maximum Possible Points</p>
            <h2 className="text-xl font-black text-green-700 mt-1">
              {currentSession.maxPoints}
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
}