import EvaluationCard from "./EvaluationCard";

// Mapping the database boolean fields to clean interface labels
const DOCUMENT_MAPPINGS = {
    has_application_letter: "Application Letter",
    has_birth_certificate: "Birth Certificate",
    has_certificate_of_employment: "Certificate of Employment",
    has_civil_service_eligibility_cert: "Civil Service Eligibility Cert",
    has_diploma: "Diploma",
    has_medical_certificate: "Medical Certificate",
    has_nbi_clearance: "NBI Clearance",
    has_performance_rating: "Performance Rating",
    has_personal_data_sheet: "Personal Data Sheet",
    has_tin_id_or_verification: "TIN ID / Verification",
    has_training_certificates: "Training Certificates",
    has_transcript_of_records: "Transcript of Records",
    has_voter_id_or_comelec_cert: "Voter ID / Comelec Cert",
    has_cert_of_outstanding_accomplishments: "Cert of Outstanding Accomplishments",
    has_marriage_certificate_psa: "PSA Marriage Certificate",
    has_oath_of_office: "Oath of Office",
    has_service_record: "Service Record",
};

const DOCUMENT_FIELDS = Object.keys(DOCUMENT_MAPPINGS);

// Named export to satisfy the import inside ApplicantEvaluation.jsx
export const getSubmittedDocumentCount = (applicant = {}) =>
    DOCUMENT_FIELDS.filter((field) => applicant && (applicant[field] === true || applicant[field] === 1)).length;

export default function DocumentChecklist({ 
    applicant, 
    status,     // This represents submitted_documents_passed (true/false)
    setStatus,  // Setter for the documents passed status
    note,       // This represents documents_note
    setNote     // Setter for the documents note
}) {
    
    // Gather the text labels of all documents that are verified true
    const passedDocuments = DOCUMENT_FIELDS
        .filter((field) => applicant && (applicant[field] === true || applicant[field] === 1))
        .map((field) => DOCUMENT_MAPPINGS[field]);

    const docCount = passedDocuments.length;

    // Build a safe string layout that uses newline characters to display as a list
    const actualDisplay = docCount > 0 
        ? `\n${passedDocuments.map(d => `✅ ${d}`).join("\n")}`
        : "❌ No documents found";

    const requirementDisplay = "All required mandatory submission documents must be attached and valid.";

    return (
        <EvaluationCard
            color="bg-indigo-600" 
            title="DOCUMENT CHECKLIST"
            requirement={requirementDisplay} 
            actual={actualDisplay} // Displays each checked document on a clean new line
            status={status}
            setStatus={setStatus}
            note={note}
            setNote={setNote}
        />
    );
}