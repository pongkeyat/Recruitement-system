export const insertApplicantsUploadDocuments = async (client, applicantId, data) => {
    const { 
        has_application_letter, has_birth_certificate, has_certificate_of_employment,
        has_civil_service_eligibility_cert, has_diploma, has_medical_certificate, 
        has_nbi_clearance, has_performance_rating, has_personal_data_sheet, 
        has_tin_id_or_verification, has_training_certificates, has_transcript_of_records, 
        has_voter_id_or_comelec_cert, has_cert_of_outstanding_accomplishments, 
        has_marriage_certificate_psa, has_oath_of_office, has_service_record 
    } = data;

    const result = await client.query(
        `INSERT INTO applicant_documents (
            applicant_id, has_application_letter, has_birth_certificate, has_certificate_of_employment,
            has_civil_service_eligibility_cert, has_diploma, has_medical_certificate, 
            has_nbi_clearance, has_performance_rating, has_personal_data_sheet, 
            has_tin_id_or_verification, has_training_certificates, has_transcript_of_records, 
            has_voter_id_or_comelec_cert, has_cert_of_outstanding_accomplishments, 
            has_marriage_certificate_psa, has_oath_of_office, has_service_record
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) 
         RETURNING *`,
        [
            applicantId, has_application_letter, has_birth_certificate, has_certificate_of_employment,
            has_civil_service_eligibility_cert, has_diploma, has_medical_certificate, 
            has_nbi_clearance, has_performance_rating, has_personal_data_sheet, 
            has_tin_id_or_verification, has_training_certificates, has_transcript_of_records, 
            has_voter_id_or_comelec_cert, 
            has_cert_of_outstanding_accomplishments !== undefined ? has_cert_of_outstanding_accomplishments : null, 
            has_marriage_certificate_psa !== undefined ? has_marriage_certificate_psa : null, 
            has_oath_of_office !== undefined ? has_oath_of_office : null, 
            has_service_record !== undefined ? has_service_record : null
        ]
    );

    return result.rows[0];
};