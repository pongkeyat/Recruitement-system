import { useState, useEffect } from "react";
import EducationCard from "../evaluation/EducationCard";
import TrainingCard from "../evaluation/TrainingCard";
import ExperienceCard from "../evaluation/ExperienceCard";
import EligibilityCard from "../evaluation/EligibilityCard";
import DocumentChecklist, { getSubmittedDocumentCount } from "../evaluation/DocumentsChecklist";
import { postScreening } from "../../api/ScreeningApi"; 
import { useAuth } from "../../context/AuthContext";

export default function ApplicantEvaluation({ applicant }) {
    const { user, loading: authLoading } = useAuth();
    const [submitting, setSubmitting] = useState(false);
    
    // States to collect notes from individual cards
    const [educationNote, setEducationNote] = useState("");
    const [trainingNote, setTrainingNote] = useState("");
    const [experienceNote, setExperienceNote] = useState("");
    const [eligibilityNote, setEligibilityNote] = useState("");
    const [documentNote, setDocumentNote] = useState(""); // New Document note state

    const [educationStatus, setEducationStatus] = useState(null);
    const [trainingStatus, setTrainingStatus] = useState(null);
    const [experienceStatus, setExperienceStatus] = useState(null);
    const [eligibilityStatus, setEligibilityStatus] = useState(null);
    const [documentStatus, setDocumentStatus] = useState(null); // New Document status state
    
    // Form states for the ending section
    const [generalRemarks, setGeneralRemarks] = useState("");
    const [overallResult, setOverallResult] = useState("DISQUALIFIED");

    // 1. Core evaluations (matching card logic exactly)
    const isEducationPass = applicant?.degree_course?.toLowerCase().includes("information technology");
    
    const isTrainingPass = (applicant?.hours_attended || 0) >= 4;

    let expMonths = 0;
    if (applicant?.experience_date_from && applicant?.experience_date_to) {
        const from = new Date(applicant.experience_date_from);
        const to = new Date(applicant.experience_date_to);
        expMonths = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
        if (to.getDate() >= from.getDate()) expMonths += 1;
    }
    const isExperiencePass = expMonths >= 12;

    const isEligibilityPass = applicant?.eligibility_type
        ?.toLowerCase()
        .includes((applicant?.eligibility_requirement || "").toLowerCase());

    // The applicant API returns each submitted document as a has_* boolean field.
    const isDocumentPass = getSubmittedDocumentCount(applicant) > 0;

    const resolvedEducationStatus = educationStatus ?? (isEducationPass ? "PASS" : "PENDING");
    const resolvedTrainingStatus = trainingStatus ?? (isTrainingPass ? "PASS" : "PENDING");
    const resolvedExperienceStatus = experienceStatus ?? (isExperiencePass ? "PASS" : "PENDING");
    const resolvedEligibilityStatus = eligibilityStatus ?? (isEligibilityPass ? "PASS" : "PENDING");
    const resolvedDocumentStatus = documentStatus ?? (isDocumentPass ? "PASS" : "PENDING"); // Resolved state for documents

    // Automatically suggest a baseline result based on card requirements, 
    // but user retains full power to toggle it manually below.
    useEffect(() => {
        const allPassed = 
            resolvedEducationStatus === "PASS" &&
            resolvedTrainingStatus === "PASS" &&
            resolvedExperienceStatus === "PASS" &&
            resolvedEligibilityStatus === "PASS" &&
            resolvedDocumentStatus === "PASS"; // Included in pass verification
            
        setOverallResult(allPassed ? "QUALIFIED" : "DISQUALIFIED");
    }, [resolvedEducationStatus, resolvedTrainingStatus, resolvedExperienceStatus, resolvedEligibilityStatus, resolvedDocumentStatus]);

    if (!applicant) {
        return <div>Loading...</div>;
    }

    // 2. Submit Logic handler
    const handleSubmitEvaluation = async (e) => {
        e.preventDefault(); 

        const screenedBy = user?.email || user?.user?.email;
        const jobApplicationId = applicant?.job_applications_id || applicant?.application_id;
        const applicantId = applicant?.applicant_id || applicant?.id;

        if (!jobApplicationId && !applicantId) {
            alert("Unable to submit: this applicant record has no identifiable application details.");
            return;
        }

        if (authLoading) {
            alert("Your signed-in user details are still loading. Please try again shortly.");
            return;
        }

        if (!screenedBy) {
            alert("Unable to submit: your session has expired. Please sign in again.");
            return;
        }

        try {
            setSubmitting(true);

            const screeningData = {
                job_applications_id: jobApplicationId,
                applicant_id: applicantId,
                education_passed: resolvedEducationStatus === "PASS",
                education_remarks: educationNote,
                eligibility_passed: resolvedEligibilityStatus === "PASS",
                eligibility_remarks: eligibilityNote,
                training_passed: resolvedTrainingStatus === "PASS",
                training_remarks: trainingNote,
                experience_passed: resolvedExperienceStatus === "PASS",
                experience_remarks: experienceNote,
                
                // New backend key mappings for documents evaluation
                submitted_documents_passed: resolvedDocumentStatus === "PASS",
                documents_note: documentNote,

                overall_result: overallResult, 
                general_remarks: generalRemarks,
                screened_by: screenedBy
            };

            const result = await postScreening(screeningData);
            alert("Evaluation submitted successfully!");
            console.log("Response:", result);
            setGeneralRemarks(""); 
        } catch (error) {
            console.error("Failed to submit screening:", error);
            alert(error.response?.data?.error || "Error submitting screening evaluation.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmitEvaluation} className="space-y-6">
            {/* Grid Layout containing the evaluation cards */}
            <div className="grid grid-cols-2 gap-6">
                <EducationCard 
                    applicant={applicant} 
                    status={resolvedEducationStatus}
                    setStatus={setEducationStatus}
                    note={educationNote} 
                    setNote={setEducationNote} 
                />
                
                <TrainingCard 
                    applicant={applicant} 
                    status={resolvedTrainingStatus}
                    setStatus={setTrainingStatus}
                    note={trainingNote} 
                    setNote={setTrainingNote} 
                />

                <ExperienceCard 
                    applicant={applicant} 
                    status={resolvedExperienceStatus}
                    setStatus={setExperienceStatus}
                    note={experienceNote} 
                    setNote={setExperienceNote} 
                />

                <EligibilityCard 
                    applicant={applicant} 
                    status={resolvedEligibilityStatus}
                    setStatus={setEligibilityStatus}
                    note={eligibilityNote} 
                    setNote={setEligibilityNote} 
                />

                {/* Document checklist placed here spanning full width for structural balance */}
                <div className="col-span-2">
                    <DocumentChecklist 
                        applicant={applicant}
                        status={resolvedDocumentStatus}
                        setStatus={setDocumentStatus}
                        note={documentNote}
                        setNote={setDocumentNote}
                    />
                </div>
            </div>

            {/* Ending Section: Form Remarks & Status Selection Buttons */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div className="space-y-2">
                    <label htmlFor="generalRemarks" className="block text-sm font-semibold text-gray-700">
                        General Remarks / Final Evaluation Notes
                    </label>
                    <textarea
                        id="generalRemarks"
                        rows={3}
                        value={generalRemarks}
                        onChange={(e) => setGeneralRemarks(e.target.value)}
                        placeholder="Enter any overall concluding remarks regarding this applicant's screening process..."
                        className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                    />
                </div>

                {/* Status Toggle Buttons */}
                <div className="space-y-2">
                    <span className="block text-sm font-semibold text-gray-700">
                        Final Screening Status
                    </span>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => setOverallResult("QUALIFIED")}
                            className={`flex-1 py-3 px-4 rounded-lg font-medium border text-center transition tracking-wide ${
                                overallResult === "QUALIFIED"
                                    ? "bg-emerald-50 border-emerald-500 text-emerald-700 ring-2 ring-emerald-500/20"
                                    : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                            }`}
                        >
                            🟢 QUALIFIED
                        </button>
                        <button
                            type="button"
                            onClick={() => setOverallResult("DISQUALIFIED")}
                            className={`flex-1 py-3 px-4 rounded-lg font-medium border text-center transition tracking-wide ${
                                overallResult === "DISQUALIFIED"
                                    ? "bg-rose-50 border-rose-500 text-rose-700 ring-2 ring-rose-500/20"
                                    : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                            }`}
                        >
                            🔴 DISQUALIFIED
                        </button>
                    </div>
                </div>
            </div>

            {/* Unified Submit Action Bar */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
                <button
                    type="submit"
                    disabled={submitting || authLoading}
                    className={`px-6 py-2.5 rounded-lg text-white font-medium shadow transition ${
                        submitting ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700"
                    }`}
                >
                    {submitting ? "Submitting Evaluation..." : authLoading ? "Loading user details..." : "Submit Screening Results"}
                </button>
            </div>
        </form>
    );
}
