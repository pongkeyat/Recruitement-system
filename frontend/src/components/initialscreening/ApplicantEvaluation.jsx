import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  BookOpen,
  Briefcase,
  Award,
  ClipboardCheck,
} from "lucide-react";
import EducationCard from "../evaluation/EducationCard";
import TrainingCard from "../evaluation/TrainingCard";
import ExperienceCard from "../evaluation/ExperienceCard";
import EligibilityCard from "../evaluation/EligibilityCard";
import { postApplicantQualifications } from "../../api/ApplicationApi";
import { postScreening } from "../../api/ScreeningApi";
import { useAuth } from "../../context/AuthContext";

// Reusable section header — matches the blue header style used across
// the rest of the system (numbered badge + icon + title).
const SectionHeader = ({ number, title, icon: Icon }) => (
  <div className="flex items-center gap-2 rounded-t-lg bg-[#1e3a8a] px-4 py-3 text-white">
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-[#1e3a8a]">
      {number}
    </span>

    {Icon && <Icon className="h-4 w-4 shrink-0" />}

    <h2 className="text-sm font-semibold">{title}</h2>
  </div>
);

// Reusable card wrapper so every section (including the ones rendered by
// the child *Card components) shares the same border/shadow/radius.
const SectionCard = ({ number, title, icon, children }) => (
  <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
    <SectionHeader number={number} title={title} icon={icon} />

    <div className="p-4">
      {children}
    </div>
  </div>
);

export default function ApplicantEvaluation({ applicant }) {
  const { user, loading: authLoading } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  // States
  const [educationNote, setEducationNote] = useState("");
  const [trainingNote, setTrainingNote] = useState("");
  const [experienceNote, setExperienceNote] = useState("");
  const [eligibilityNote, setEligibilityNote] = useState("");

  const [educationStatus, setEducationStatus] = useState("PENDING");
  const [trainingStatus, setTrainingStatus] = useState("PENDING");
  const [experienceStatus, setExperienceStatus] = useState("PENDING");
  const [eligibilityStatus, setEligibilityStatus] = useState("PENDING");

  const [education, setEducation] = useState({
    education_level: "",
    school_name: "",
    degree_course: "",
    honors_awards: "",
  });
  const [training, setTraining] = useState({
    training_title: "",
    date_from: "",
    date_to: "",
    hours_attended: "",
    training_type: "",
    conducted_by: "",
  });
  const [experience, setExperience] = useState({
    company_office: "",
    position_title: "",
    date_from: "",
    date_to: "",
    monthly_salary: "",
    appointment_status: "",
    is_govt_service: false,
  });
  const [eligibility, setEligibility] = useState({
    eligibility_type: "",
    rating: "",
    date_of_exam: "",
    place_of_exam: "",
    license_number: "",
  });

  const [generalRemarks, setGeneralRemarks] = useState("");
  const [overallResult, setOverallResult] = useState("Pending");

  useEffect(() => {
    // 1. If any single sub-card status is still PENDING, the overall status is "Pending"
    if (
      educationStatus === "PENDING" ||
      trainingStatus === "PENDING" ||
      experienceStatus === "PENDING" ||
      eligibilityStatus === "PENDING"
    ) {
      setOverallResult("Pending");
    } 
    // 2. If all sub-cards are explicitly PASS, the overall status is "Qualified"
    else if (
      educationStatus === "PASS" &&
      trainingStatus === "PASS" &&
      experienceStatus === "PASS" &&
      eligibilityStatus === "PASS"
    ) {
      setOverallResult("Qualified");
    } 
    // 3. Otherwise, if there are no PENDING values but at least one FAILED value, it is "Disqualified"
    else {
      setOverallResult("Disqualified");
    }
  }, [educationStatus, trainingStatus, experienceStatus, eligibilityStatus]);

  if (!applicant) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-white p-10 text-sm text-gray-500 shadow-sm">
        Loading...
      </div>
    );
  }

  // Extracted applicant identifier matching database specifications
  const applicantId = applicant.applicant_id || applicant.id;
  const screenedBy = user?.email || user?.user?.email;

  const handleSubmitEvaluation = async (e) => {
    e.preventDefault();

    // Check for essential identifier
    if (!applicantId) {
      console.warn("⚠️ Evaluation Submission Denied: Missing vital structural identifier.", {
        applicantPayloadReceived: applicant,
        calculatedApplicantId: applicantId,
      });
      return alert("Applicant ID is missing.");
    }
    
    // Check for unresolved status values
    if (overallResult === "Pending") {
      console.warn("⚠️ Evaluation Submission Denied: Status tracking metrics still unresolved.", {
        educationStatus,
        trainingStatus,
        experienceStatus,
        eligibilityStatus,
        overallResult,
      });
      return alert("Cannot submit screening while sections are still pending.");
    }

    try {
      setSubmitting(true);
      
      // Flattened payload design matching backend expectations for req.body directly
      await postApplicantQualifications({
        applicant_id: applicantId,
        ...education,
        ...training,
        ...experience,
        ...eligibility,
      });

      // Updated tracking request payload containing only applicant_id context variables
      await postScreening({
        applicant_id: applicantId,
        education_passed: educationStatus === "PASS",
        education_remarks: educationNote,
        training_passed: trainingStatus === "PASS",
        training_remarks: trainingNote,
        experience_passed: experienceStatus === "PASS",
        experience_remarks: experienceNote,
        eligibility_passed: eligibilityStatus === "PASS",
        eligibility_remarks: eligibilityNote,
        overall_result: overallResult.toUpperCase(),
        general_remarks: generalRemarks,
        screened_by: screenedBy,
      });

      alert("Screening completed successfully.");
    } catch (err) {
      console.error("Submission error details:", err);
      alert(err.response?.data?.error || "Unable to submit evaluation.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmitEvaluation} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {/* Education */}
        <SectionCard number="1" title="Education" icon={GraduationCap}>
          <EducationCard
            applicant={applicant}
            education={education}
            setEducation={setEducation}
            status={educationStatus}
            setStatus={setEducationStatus}
            note={educationNote}
            setNote={setEducationNote}
          />
        </SectionCard>

        {/* Training */}
        <SectionCard number="2" title="Training" icon={BookOpen}>
          <TrainingCard
            applicant={applicant}
            training={training}
            setTraining={setTraining}
            status={trainingStatus}
            setStatus={setTrainingStatus}
            note={trainingNote}
            setNote={setTrainingNote}
          />
        </SectionCard>

        {/* Experience */}
        <SectionCard number="3" title="Experience" icon={Briefcase}>
          <ExperienceCard
            applicant={applicant}
            experience={experience}
            setExperience={setExperience}
            status={experienceStatus}
            setStatus={setExperienceStatus}
            note={experienceNote}
            setNote={setExperienceNote}
          />
        </SectionCard>

        {/* Eligibility */}
        <SectionCard number="4" title="Eligibility" icon={Award}>
          <EligibilityCard
            applicant={applicant}
            eligibility={eligibility}
            setEligibility={setEligibility}
            status={eligibilityStatus}
            setStatus={setEligibilityStatus}
            note={eligibilityNote}
            setNote={setEligibilityNote}
          />
        </SectionCard>
      </div>

      {/* Final Evaluation */}
      <SectionCard
        number="5"
        title="Final Screening Evaluation"
        icon={ClipboardCheck}
      >
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              General Remarks
            </label>
            <textarea
              rows={4}
              value={generalRemarks}
              onChange={(e) => setGeneralRemarks(e.target.value)}
              placeholder="Enter remarks..."
              className="w-full rounded-lg border border-gray-300 p-3 text-sm text-gray-800 placeholder-gray-400 transition focus:border-[#1e3a8a] focus:outline-none focus:ring-1 focus:ring-[#1e3a8a]"
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
            <span className="text-sm font-semibold text-gray-700">
              Overall Result
            </span>
            <span
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                overallResult === "Qualified"
                  ? "bg-emerald-100 text-emerald-700"
                  : overallResult === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {overallResult}
            </span>
          </div>
        </div>
      </SectionCard>

      <div className="flex justify-end border-t border-gray-200 pt-6">
        <button
          type="submit"
          disabled={submitting || authLoading || overallResult === "Pending"}
          className={`rounded-lg px-8 py-3 text-sm font-medium text-white shadow-sm transition ${
            submitting || authLoading || overallResult === "Pending"
              ? "cursor-not-allowed bg-gray-400"
              : "bg-[#1e3a8a] hover:bg-[#1b3475]"
          }`}
        >
          {submitting ? "Submitting..." : "Submit Screening"}
        </button>
      </div>
    </form>
  );
}