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
      <AssessmentHeader onSaveSession={handleSaveSession} />

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="w-full space-y-5">
          <AssessmentStats count={sessions.length} loading={loading} />
          <AssessmentDashboard data={sessions} loading={loading} error={error} />
        </div>
      </main>
    </div>
  );
}
