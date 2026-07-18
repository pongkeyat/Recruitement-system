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
  <div className="flex items-center gap-3 rounded-t-xl bg-[#1e3a8a] px-5 py-4 text-white">
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-[#1e3a8a]">
      {number}
    </span>
    {Icon && <Icon className="h-5 w-5 shrink-0" />}
    <h2 className="text-base font-semibold tracking-wide">{title}</h2>
  </div>
);

// Reusable card wrapper so every section (including the ones rendered by
// the child *Card components) shares the same border/shadow/radius.
const SectionCard = ({ number, title, icon, children }) => (
  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
    <SectionHeader number={number} title={title} icon={icon} />
    <div className="p-6">{children}</div>
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
  const [overallResult, setOverallResult] = useState("Disqualified");

  useEffect(() => {
    const passed =
      educationStatus === "PASS" &&
      trainingStatus === "PASS" &&
      experienceStatus === "PASS" &&
      eligibilityStatus === "PASS";
    setOverallResult(passed ? "Qualified" : "Disqualified");
  }, [educationStatus, trainingStatus, experienceStatus, eligibilityStatus]);

  if (!applicant) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-white p-10 text-sm text-gray-500 shadow-sm">
        Loading...
      </div>
    );
  }

  const applicantId = applicant.applicant_id || applicant.id;
  const jobApplicationId =
    applicant.job_applications_id || applicant.job_application_id;
  const screenedBy = user?.email || user?.user?.email;

  const handleSubmitEvaluation = async (e) => {
    e.preventDefault();
    if (!applicantId || !jobApplicationId) {
      return alert("Applicant information is incomplete.");
    }
    try {
      setSubmitting(true);
      await postApplicantQualifications({
        applicant_id: applicantId,
        education: [education],
        training: [training],
        experience: [experience],
        eligibility: [eligibility],
      });
      await postScreening({
        applicant_id: applicantId,
        job_applications_id: jobApplicationId,
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
      console.error(err);
      alert(err.response?.data?.error || "Unable to submit evaluation.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmitEvaluation} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
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
          disabled={submitting || authLoading}
          className={`rounded-lg px-8 py-3 text-sm font-medium text-white shadow-sm transition ${
            submitting || authLoading
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
