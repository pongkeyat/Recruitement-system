import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  UserCircle2,
} from "lucide-react";

export default function ApplicantNavigator({
  applicants = [],
  selectedApplicant,
  onApplicantChange,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset whenever session changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [applicants]);

  // Notify parent whenever current index changes
  useEffect(() => {
    if (applicants.length > 0) {
      onApplicantChange?.(applicants[currentIndex]);
    }
  }, [currentIndex, applicants, onApplicantChange]);

  // Keep current index synchronized with selectedApplicant
  useEffect(() => {
    if (!selectedApplicant) return;

    const index = applicants.findIndex(
      (a) =>
        a.job_applications_id === selectedApplicant.job_applications_id
    );

    if (index >= 0 && index !== currentIndex) {
      setCurrentIndex(index);
    }
  }, [selectedApplicant, applicants]);

  if (applicants.length === 0) return null;

  const currentApplicant = applicants[currentIndex];

  const fullName = [
    currentApplicant.last_name,
    currentApplicant.first_name,
    currentApplicant.middle_name,
    currentApplicant.suffix,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden text-sm">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#1F4E92] to-[#3B82F6] px-5 py-3 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="bg-white rounded-full p-1.5">
            <UserCircle2
              size={20}
              className="text-[#1F4E92]"
            />
          </div>

          <h2 className="text-sm font-bold text-white tracking-wide">
            APPLICANT NAVIGATOR
          </h2>

        </div>

        <div className="rounded-full bg-white/20 px-3 py-0.5 text-[10px] text-white font-bold uppercase">
          {applicants.length} Total
        </div>

      </div>

      {/* Body */}

      <div className="grid grid-cols-12 gap-2 p-3 items-center">

        {/* Applicant Select */}

        <div className="col-span-8">

          <div className="flex items-center rounded-lg border border-slate-300 px-3 py-1.5 bg-slate-50">

            <Search
              size={14}
              className="text-slate-400 mr-2"
            />

            <select
              value={currentIndex}
              onChange={(e) =>
                setCurrentIndex(Number(e.target.value))
              }
              className="w-full bg-transparent outline-none font-medium text-slate-700"
            >

              {applicants.map((app, index) => (

                <option
                  key={app.job_applications_id}
                  value={index}
                >
                  {app.last_name}, {app.first_name}
                </option>

              ))}

            </select>

          </div>

        </div>

        {/* Previous */}

        <button
          disabled={currentIndex === 0}
          onClick={() =>
            setCurrentIndex((prev) => prev - 1)
          }
          className="col-span-2 h-full rounded-lg border border-[#1F4E92] text-[#1F4E92] flex items-center justify-center hover:bg-blue-50 disabled:opacity-30"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Next */}

        <button
          disabled={currentIndex === applicants.length - 1}
          onClick={() =>
            setCurrentIndex((prev) => prev + 1)
          }
          className="col-span-2 h-full rounded-lg bg-[#1F4E92] text-white flex items-center justify-center hover:bg-[#163d72] disabled:opacity-30"
        >
          <ChevronRight size={18} />
        </button>

      </div>

      {/* Footer */}

      <div className="border-t border-slate-100 bg-slate-50 px-4 py-2 flex items-center gap-2">

        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
          Current:
        </span>

        <span className="font-semibold text-slate-700 truncate">
          {fullName}
        </span>

      </div>

    </div>
  );
}