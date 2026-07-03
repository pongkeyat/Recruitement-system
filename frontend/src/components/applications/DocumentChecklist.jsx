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
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Document Checklist</h2>
        <p className="text-sm text-gray-500">Track and verify all submitted physical or digital documents.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(categories).map(([categoryName, keys]) => (
          <div key={categoryName} className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <h3 className="font-semibold text-sm text-blue-600 uppercase tracking-wider">
              {categoryName}
            </h3>
            
            <div className="space-y-2">
              {keys.map((key) => (
                <label 
                  key={key} 
                  className="flex items-start p-2 rounded-lg hover:bg-white transition-colors cursor-pointer select-none border border-transparent hover:border-gray-200"
                >
                  <input
                    type="checkbox"
                    checked={documents[key] || false}
                    onChange={(e) => onChange(key, e.target.checked)}
                    className="w-4 h-4 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">
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