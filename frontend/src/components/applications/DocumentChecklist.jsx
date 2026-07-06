import React from "react";

export default function DocumentChecklist({ documents, onChange }) {
  // Mapping backend snake_case keys to reader-friendly display labels
  const documentLabels = {
    has_application_letter: "Application Letter",
    has_birth_certificate: "Birth Certificate (PSA)",
    has_marriage_certificate_psa: "Marriage Certificate (PSA)",
    has_personal_data_sheet: "Personal Data Sheet (PDS)",
    has_civil_service_eligibility_cert: "Civil Service Eligibility Certificate",
    has_transcript_of_records: "Transcript of Records (TOR)",
    has_diploma: "Diploma",
    has_certificate_of_employment: "Certificate of Employment (COE)",
    has_service_record: "Service Record",
    has_performance_rating: "Performance Rating",
    has_nbi_clearance: "NBI Clearance",
    has_medical_certificate: "Medical Certificate",
    has_tin_id_or_verification: "TIN ID or Verification Slip",
    has_voter_id_or_comelec_cert: "Voter ID or COMELEC Certification",
    has_training_certificates: "Training Certificates",
    has_cert_of_outstanding_accomplishments: "Certificate of Outstanding Accomplishments",
    has_oath_of_office: "Oath of Office",
  };

  // Categorizing them visually so it's easier for the user to read
  const categories = {
    "Core Requirements": [
      "has_application_letter",
      "has_personal_data_sheet",
      "has_birth_certificate",
      "has_marriage_certificate_psa",
    ],
    "Education & Eligibility": [
      "has_civil_service_eligibility_cert",
      "has_transcript_of_records",
      "has_diploma",
      "has_training_certificates",
    ],
    "Work History & Clearances": [
      "has_certificate_of_employment",
      "has_service_record",
      "has_performance_rating",
      "has_nbi_clearance",
      "has_medical_certificate",
    ],
    "Identifications & Others": [
      "has_tin_id_or_verification",
      "has_voter_id_or_comelec_cert",
      "has_cert_of_outstanding_accomplishments",
      "has_oath_of_office",
    ],
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden font-sans">
      {/* Header Banner Section */}
      <div className="bg-[#1e4a8a] p-5 pb-4 text-white flex flex-col gap-2">
        <div className="flex items-center gap-3">
          {/* Section Number Badge */}
          <span className="flex items-center justify-center bg-white/20 text-white font-semibold text-sm w-6 h-6 rounded-full">
            3
          </span>
          {/* Header Icon */}
          <svg className="w-5 h-5 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-medium tracking-wide">Document Checklist</h2>
        </div>
      </div>
      
      {/* Subheader / Instruction Bar */}
      <div className="bg-[#163664] px-5 py-2 text-white/90 text-sm border-t border-white/10">
        Track and verify all submitted physical or digital documents.
      </div>

      {/* Grid Content Background */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#fcfdfd]">
        {Object.entries(categories).map(([categoryName, keys]) => (
          <div key={categoryName} className="space-y-3 bg-[#f8fafc] p-5 rounded-2xl border border-gray-200/60 shadow-sm">
            <h3 className="font-semibold text-xs text-[#1e4a8a] uppercase tracking-wider">
              {categoryName}
            </h3>
            
            <div className="space-y-1.5">
              {keys.map((key) => (
                <label 
                  key={key} 
                  className="flex items-center p-2.5 rounded-xl hover:bg-white transition-all cursor-pointer select-none border border-transparent hover:border-gray-200 hover:shadow-sm"
                >
                  <input
                    type="checkbox"
                    checked={documents[key] || false}
                    onChange={(e) => onChange(key, e.target.checked)}
                    className="w-4 h-4 text-[#1e4a8a] border-gray-300 rounded focus:ring-[#1e4a8a] cursor-pointer"
                  />
                  <span className="ml-3 text-[14px] font-medium text-gray-700">
                    {documentLabels[key]}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}