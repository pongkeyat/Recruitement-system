import React, { useState } from "react";
import ApplicationHeader from "../components/applications/ApplicationsHeader";
import StepProgress from "../components/applications/StepProgress";
import ApplicantForm from "../components/applications/ApplicantForm";
import Applications from "../components/applications/Applications";
import DocumentChecklist from "../components/applications/DocumentChecklist";
import CivilServiceEligibilityForm from "../components/applications/CivilServiceEligibilityForm";
import ApplicantEducationForm from "../components/applications/ApplicantEducationForm";
import EqualOpportunityDeclaration from "../components/applications/EqualOpportunityDeclaration";
import WorkExperienceForm from "../components/applications/WorkExperienceForm"; 
import ApplicantTrainingForm from "../components/applications/ApplicantTrainingForm";
import HRRemarksForm from "../components/applications/HRRemarksForm";
import { postApplications } from "../api/ApplicationApi";

export default function ReceiveApplications() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    applicantData: {
      lastName: "", firstName: "", middleName: "", suffix: "",
      sex: "", dob: "", civilStatus: "", contactNumber: "", email: "", address: ""
    },
    applicationData: {
      vacancy_id: "",
      dateReceived: new Date().toISOString().split("T")[0],
      timeReceived: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' }),
      receivedBy: "System Administrator",
      submissionType: "Walk-In",
    },
    documentData: {
      has_application_letter: false, has_birth_certificate: false, has_certificate_of_employment: false,
      has_civil_service_eligibility_cert: false, has_diploma: false, has_medical_certificate: false, has_nbi_clearance: false,
      has_performance_rating: false, has_personal_data_sheet: false, has_tin_id_or_verification: false, has_training_certificates: false,
      has_transcript_of_records: false, has_voter_id_or_comelec_cert: false, has_cert_of_outstanding_accomplishments: false,
      has_marriage_certificate_psa: false, has_oath_of_office: false, has_service_record: false
    },
    equalOpportunityData: {
      is_pwd: null,
      is_solo_parent: null,
      is_indigenous_person: null
    },
    // CHANGED: eligibilityData is now an ARRAY (can hold 0, 1, or many entries)
    eligibilityData: [],
    educationData: {
      education_level: "",
      school_name: "",
      degree_course: "",
      honors_awards: ""
    },
    workExperienceData: {
      position_title: "",
      company_office: "",
      date_from: "",
      date_to: "",
      monthly_salary: "",
      appointment_status: "",
      is_govt_service: null 
    },
    trainingData: {
      training_title: "",
      date_from: "",
      date_to: "",
      hours_attended: "",
      training_type: "",
      conducted_by: ""
    },
    hrRemarksData: {
      hr_remarks_notes: "",
      application_status: ""
    }
  });

  const handleApplicantChange = (name, value) => {
    setFormData((prev) => ({ ...prev, applicantData: { ...prev.applicantData, [name]: value } }));
  };

  const handleApplicationChange = (name, value) => {
    setFormData((prev) => ({ ...prev, applicationData: { ...prev.applicationData, [name]: value } }));
  };

  const handleDocumentChange = (name, value) => {
    setFormData((prev) => ({ ...prev, documentData: { ...prev.documentData, [name]: value } }));
  };

  const handleEqualOpportunityChange = (name, value) => {
    setFormData((prev) => ({ ...prev, equalOpportunityData: { ...prev.equalOpportunityData, [name]: value } }));
  };

  // CHANGED: this now just replaces the whole eligibilityData array,
  // since CivilServiceEligibilityForm calls onChange(newArray) directly.
  const handleEligibilityChange = (newEligibilityArray) => {
    setFormData((prev) => ({ ...prev, eligibilityData: newEligibilityArray }));
  };

  const handleEducationChange = (name, value) => {
    setFormData((prev) => ({ ...prev, educationData: { ...prev.educationData, [name]: value } }));
  };

  const handleWorkExperienceChange = (name, value) => {
    setFormData((prev) => ({ ...prev, workExperienceData: { ...prev.workExperienceData, [name]: value } }));
  };

  const handleTrainingChange = (name, value) => {
    setFormData((prev) => ({ ...prev, trainingData: { ...prev.trainingData, [name]: value } }));
  };

  const handleHRRemarksChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      hrRemarksData: { ...prev.hrRemarksData, [name]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const eligibilityEntry = Array.isArray(formData.eligibilityData) && formData.eligibilityData.length > 0
      ? formData.eligibilityData[0]
      : {};

    const educationEntry = Array.isArray(formData.educationData?.educationList) && formData.educationData.educationList.length > 0
      ? formData.educationData.educationList[0]
      : {};

    const payload = {
      vacancy_id: formData.applicationData.vacancy_id || null,
      date_received: formData.applicationData.dateReceived,
      time_received: formData.applicationData.timeReceived,
      received_by: formData.applicationData.receivedBy,
      submission_type: formData.applicationData.submissionType,

      first_name: formData.applicantData.firstName,
      middle_name: formData.applicantData.middleName || null,
      last_name: formData.applicantData.lastName,
      suffix: formData.applicantData.suffix || null,
      sex: formData.applicantData.sex,
      date_of_birth: formData.applicantData.dob,
      civil_status: formData.applicantData.civilStatus,
      email_address: formData.applicantData.email,
      residential_address: formData.applicantData.address,
      contact_number: formData.applicantData.contactNumber || null,

      ...formData.documentData,
      ...formData.equalOpportunityData,

      // Send the first eligibility row using the exact backend field names
      eligibility_type: eligibilityEntry.eligibility_type || null,
      rating: eligibilityEntry.rating || null,
      date_of_exam: eligibilityEntry.date_of_exam || null,
      place_of_exam: eligibilityEntry.place_of_exam || null,
      license_number: eligibilityEntry.license_number || null,

      // Preserve all entries for possible future use
      eligibilities: formData.eligibilityData,

      education_level: educationEntry.level || formData.educationData?.education_level || "",
      school_name: educationEntry.school_name || formData.educationData?.school_name || "",
      degree_course: educationEntry.degree_course || formData.educationData?.degree_course || "",
      honors_awards: educationEntry.honors_awards || formData.educationData?.honors_awards || "",
      ...formData.workExperienceData,
      ...formData.trainingData,
      ...formData.hrRemarksData,
    };

    console.log("🚀 Submitting Full Payload:", payload);

    try {
      const response = await postApplications(payload);
      alert("Application submitted successfully!");
      console.log("Server Response:", response);
    } catch (err) {
      console.group("❌ Submission Failed");
      console.error("Error Message:", err.message);
      console.groupEnd();
      setError(err.response?.data?.message || "An error occurred during submission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 min-h-screen space-y-6 bg-gray-50">
      <ApplicationHeader />
      <StepProgress />
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">{error}</div>
        )}

        <Applications formData={formData.applicationData} onChange={handleApplicationChange} />
        <ApplicantForm formData={formData.applicantData} onChange={handleApplicantChange} />

        {/* CHANGED: passes the array + the array-setter handler */}
        <CivilServiceEligibilityForm data={formData.eligibilityData} onChange={handleEligibilityChange} />

        <EqualOpportunityDeclaration data={formData.equalOpportunityData} onChange={handleEqualOpportunityChange} />
        <DocumentChecklist documents={formData.documentData} onChange={handleDocumentChange} />
        
        <ApplicantEducationForm data={formData.educationData} onChange={handleEducationChange} />
        
        <WorkExperienceForm 
          data={formData.workExperienceData} 
          onChange={handleWorkExperienceChange} 
        />

        <ApplicantTrainingForm 
          data={formData.trainingData} 
          onChange={handleTrainingChange} 
        />

        <HRRemarksForm 
          data={formData.hrRemarksData} 
          onChange={handleHRRemarksChange} 
        />

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 rounded-xl font-semibold text-white transition-all ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? "Submitting Application..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}