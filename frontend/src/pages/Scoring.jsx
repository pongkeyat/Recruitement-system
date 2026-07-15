import React, { useState } from "react";
import {
  UserCheck,
  ArrowLeft,
  Users,
} from "lucide-react";

import ScoreEntryHeader from "../components/scoring/ScoreEntryHeader";
import AssessmentCriteriaReference from "../components/scoring/AssessmentCriteriaReference";
import AssessmentScoreTable from "../components/scoring/AssessmentScoreTable";

export default function Scoring() {
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const handleOpenAttendance = () => {
    console.log("Opening attendance manager...");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-4 min-h-screen relative">

      {/* SCORE ENTRY HEADER BAR */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200 p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4 shadow-xs">

        <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#203D73]" />

        <div className="flex items-center gap-4 pl-2">
          <div className="w-12 h-12 rounded-xl bg-[#203D73] flex items-center justify-center text-white shrink-0">
            <UserCheck size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-[#203D73]">
              Score Entry Dashboard
            </h1>

            <p className="text-slate-500 text-xs mt-0.5">
              DO 007 s. 2023 Competency-Based Selection System Matrix.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">

          <button
            className="flex items-center gap-1.5 border border-slate-300 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-slate-50 text-slate-700 transition"
          >
            <ArrowLeft size={16} />
            Sessions List
          </button>

          <button
            onClick={handleOpenAttendance}
            className="flex items-center gap-1.5 bg-[#203D73] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#162B4F] transition shadow-xs"
          >
            <Users size={16} />
            Manage Attendance
          </button>

        </div>

      </div>

      {/* Assessment Criteria Reference */}
      <AssessmentCriteriaReference />

      {/* Session Selector + Applicant Navigator */}
      <ScoreEntryHeader
          selectedApplicant={selectedApplicant}
          setSelectedApplicant={setSelectedApplicant}
      />

      {/* Applicant Assessment */}
      {selectedApplicant ? (
        <AssessmentScoreTable
          selectedApplicant={selectedApplicant}
        />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12">

          <div className="flex flex-col items-center justify-center text-center">

            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <UserCheck
                className="text-slate-400"
                size={30}
              />
            </div>

            <h2 className="text-lg font-semibold text-slate-700">
              No Applicant Selected
            </h2>

            <p className="mt-2 text-sm text-slate-500 max-w-md">
              Select an assessment session and choose an applicant
              from the Applicant Navigator to begin scoring.
            </p>

          </div>

        </div>
      )}

    </div>
  );
}