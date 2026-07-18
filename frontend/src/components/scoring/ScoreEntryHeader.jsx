import React, { useEffect, useState } from "react";
import { ChevronDown, Loader2, AlertCircle } from "lucide-react";
import { getInterviewSessions } from "../../api/AssesmentApi";
import ApplicantNavigator from "./ApplicantNavigator";

const groupSessions = (rows) => {
  const grouped = {};

  rows.forEach((row) => {
    const key = `${row.vacancy_id}|${row.session_date}|${row.venue}`;

    if (!grouped[key]) {
      grouped[key] = {
        key,
        vacancy_id: row.vacancy_id,
        position_title: row.position_title,
        session_date: row.session_date,
        venue: row.venue,
        conducted_by: row.conducted_by,
        remarks: row.remarks,
        applicants: [],
      };
    }

    grouped[key].applicants.push(row);
  });

  return Object.values(grouped);
};

export default function ScoreEntryHeader({
  selectedApplicant,
  setSelectedApplicant,
}) {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getInterviewSessions();

        // DEBUG
        console.log("========== API RESPONSE ==========");
        console.log(data);
        console.log("==================================");

        const grouped = groupSessions(data?.sessions || []);

        console.log("========== GROUPED SESSIONS ==========");
        console.log(grouped);
        console.log("======================================");

        setSessions(grouped);
      } catch (err) {
        console.error(err);
        setError("Failed to load assessment sessions.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const currentSession = sessions.find(
    (session) => session.key === selectedSession
  );

  const applicants = currentSession?.applicants || [];

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-500 rounded-xl border border-slate-200 max-w-4xl mx-auto mt-6">
        <Loader2 className="animate-spin text-[#203D73]" size={16} />
        <span>Loading assessment sessions...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-red-600 bg-red-50 rounded-xl border border-red-200 max-w-4xl mx-auto mt-6">
        <AlertCircle size={16} />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-2 py-2">
        <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Select Assessment Session
          </label>

          <div className="relative">
            <select
              value={selectedSession}
              onChange={(e) => {
                setSelectedSession(e.target.value);
                setSelectedApplicant(null);
              }}
              className="appearance-none w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 pr-12 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#203D73]"
            >
              <option value="">Select Assessment Session...</option>

              {sessions.map((session) => (
                <option key={session.key} value={session.key}>
                  {session.position_title} • {session.session_date} • {session.venue}
                </option>
              ))}
            </select>

            <ChevronDown
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {currentSession && (
        <ApplicantNavigator
          applicants={applicants}
          selectedApplicant={selectedApplicant}
          onApplicantChange={(applicant) => {

            console.log("========== SELECTED APPLICANT ==========");
            console.log(applicant);
            console.log("Applicant ID:", applicant.applicant_id);
            console.log("Job Application ID:", applicant.job_applications_id);
            console.log("Session ID:", applicant.session_id);
            console.log("========================================");

            setSelectedApplicant(applicant);
          }}
        />
      )}
    </>
  );
}