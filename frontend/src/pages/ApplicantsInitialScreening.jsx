import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { getApplicationById } from "../api/ApplicationApi";
//import ApplicantsByIdHeader from "../components/initialscreening/ApplicantsByIdHeader";
import ApplicantSummaryCard from "../components/initialscreening/ApplicantSummaryCard";
import ApplicantEvaluation from "../components/initialscreening/ApplicantEvaluation";

export default function ApplicantsInitialScreening() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadApplication = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await getApplicationById(id);
      const loadedApplication = data?.data || data;

      if (loadedApplication?.job_applications_id && !loadedApplication.applicant_id) {
        loadedApplication.applicant_id = loadedApplication.applicant_id || null;
      }

      setApplication(loadedApplication);
    } catch (err) {
      console.error("Failed to load application data:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadApplication();
  }, [loadApplication]);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 flex justify-center items-center text-gray-500">
        Loading applicant details...
      </div>
    );
  }

  if (!application) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 text-center text-red-500 font-semibold">
        Application not found.
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-6 p-6  min-h-screen">
      {/*
      <ApplicantsByIdHeader 
        application={application} 
        onBack={() => navigate(-1)} 
        onViewApplication={() => navigate(`/applicants/${id}/full-view`)} 
      />
      */}

      <ApplicantSummaryCard application={application} />

       <ApplicantEvaluation applicant={application} />
    </div>
  );
}