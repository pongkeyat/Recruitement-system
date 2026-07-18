import { useCallback, useEffect, useState } from "react";
import AssessmentHeader from "../components/assesment/AssesmentHeader";
import AssessmentDashboard from "../components/assesment/AssesmentDashboard";
import AssessmentStats from "../components/assesment/AssesmentStats";
import { getInterviewSessions, postAssessmentSession } from "../api/AssesmentApi";

export default function AssesmentSession() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSessions = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getInterviewSessions();
      setSessions(Array.isArray(response?.sessions) ? response.sessions : []);
    } catch (err) {
      console.error("Could not load assessment sessions", err);
      setSessions([]);
      setError("Unable to load assessment sessions. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const handleSaveSession = async (formData) => {
    await postAssessmentSession(formData);
    await loadSessions();
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#f4f6f9]">
      {/* 1. Header: Fixed height, shadow for depth */}
      <div className="bg-white border-b border-gray-200">
        <AssessmentHeader onSaveSession={handleSaveSession} />
      </div>

      {/* 2. Main Container: Added max-w-7xl to prevent stretching on wide screens */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Stats: Needs to be prominent */}
          <section>
            <AssessmentStats count={sessions.length} loading={loading} />
          </section>

          {/* Dashboard: The main area, should have consistent card styling */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
             <div className="p-1">
                <AssessmentDashboard data={sessions} loading={loading} error={error} />
             </div>
          </section>
        </div>
      </main>
    </div>
  );
}