import pool from "../config/db.js";
import { insertJobApplication } from './services/jobApplications.services.js';
import { insertApplicantInfo } from './services/jobApplicants.services.js';
import { insertApplicantsEqualDeclaration } from "./services/applicantsEqualDeclaration.services.js";
import { insertApplicantsCivilServiceEligibility } from "./services/civilServiceEligibility.services.js";
import { insertApplicantsUploadDocuments } from "./services/applicantsDocuments.services.js";
import { insertApplicantsEducation } from "./services/applicantEducation.services.js";
import { insertApplicantsWorkExperience } from "./services/applicantWorkExpercience.services.js";
import { insertApplicantsTraining } from "./services/applicantsTraining.services.js";
import { insertHRRemarks } from "./services/hr_remarks.services.js";
import { sendApplicationReceivedEmail } from "./services/email.services.js";
import { insertNotification } from "./services/notification.services.js";
// ==========================================
// GET ALL FULL APPLICANTS DATA
// ==========================================
export const getFullApplicants = async (req, res) => {
    // Your exact tested database query, with the WHERE clause removed to show all applicants
    const query = `
        SELECT 
            -- 1. Job Applications
            job_applications.job_applications_id,
            job_applications.vacancy_id,
            vacancies.position_title, -- Added position_title from vacancies table
            vacancies.office_unit,
            date_received,
            time_received,
            received_by,
            submission_type,
            COALESCE(hr_remarks_final_notes.application_status, 'Initial Screening') AS application_status,

            -- 2. Applicant Information
            applicant_information.applicant_id,
            first_name,
            middle_name,
            last_name,
            suffix,
            sex,
            date_of_birth,
            civil_status,
            contact_number,
            email_address,
            residential_address,

            -- 3. Equal Opportunity Declarations
            is_pwd,
            is_solo_parent,
            is_indigenous_person,

            -- 4. Civil Service Eligibility
            eligibility_type,
            rating,
            date_of_exam,
            place_of_exam,
            license_number,

            -- 5. Upload Documents
            has_application_letter,
            has_birth_certificate,
            has_certificate_of_employment,
            has_civil_service_eligibility_cert,
            has_diploma,
            has_medical_certificate,
            has_nbi_clearance,
            has_performance_rating,
            has_personal_data_sheet,
            has_tin_id_or_verification,
            has_training_certificates,
            has_transcript_of_records,
            has_voter_id_or_comelec_cert,
            has_cert_of_outstanding_accomplishments,
            has_marriage_certificate_psa,
            has_oath_of_office,
            has_service_record,

            -- 6. Applicant Education
            education_level,
            school_name,
            degree_course,
            honors_awards,

            -- 7. Applicant Work Experience
            company_office,
            work_experience.date_from AS experience_date_from,
            work_experience.date_to AS experience_date_to,
            monthly_salary,
            appointment_status,
            is_govt_service,

            -- 8. Applicants Training
            training_title,
            relevant_trainings.date_from AS training_date_from,
            relevant_trainings.date_to AS training_date_to,
            hours_attended,
            training_type,
            conducted_by,

            -- 9. HR Remarks
            hr_remarks_notes

        FROM job_applications
        LEFT JOIN vacancies ON job_applications.vacancy_id = vacancies.vacancy_id
        LEFT JOIN applicant_information ON job_applications.job_applications_id = applicant_information.job_applications_id
        LEFT JOIN equal_opportunity_declarations ON applicant_information.applicant_id = equal_opportunity_declarations.applicant_id
        LEFT JOIN civil_service_eligibility ON applicant_information.applicant_id = civil_service_eligibility.applicant_id
        LEFT JOIN applicant_documents ON applicant_information.applicant_id = applicant_documents.applicant_id
        LEFT JOIN education ON applicant_information.applicant_id = education.applicant_id
        LEFT JOIN work_experience ON applicant_information.applicant_id = work_experience.applicant_id
        LEFT JOIN relevant_trainings ON applicant_information.applicant_id = relevant_trainings.applicant_id
        LEFT JOIN hr_remarks_final_notes ON applicant_information.applicant_id = hr_remarks_final_notes.applicant_id;
    `;

    try {
        const result = await pool.query(query);
        return res.status(200).json({
            success: true,
            count: result.rows.length,
            data: result.rows
        });
    } catch (error) {
        console.error('Fetch all applicants failure:', error);
        return res.status(500).json({ error: 'Internal server error fetching application profiles.' });
    }
};

// ==========================================
// POST FULL APPLICATION (YOUR EXISTING LOGIC)
// ==========================================
export const postFullApplication = async (req, res) => {
    const { 
        vacancy_id, date_received, time_received,
        last_name, first_name, sex, date_of_birth, civil_status, 
        contact_number, email_address, residential_address, 
        eligibility_type, rating, date_of_exam, place_of_exam, license_number,
        education_level, school_name, degree_course, honors_awards,
        position_title,  company_office,  date_from,  date_to,  monthly_salary,  appointment_status,  is_govt_service
    } = req.body;
    
    if (
        !vacancy_id || !date_received || !time_received ||
        !last_name || !first_name || !sex || !date_of_birth || !civil_status || 
        !contact_number || !email_address || !residential_address
    ) {
        return res.status(400).json({ error: 'All mandatory fields for application and applicant profile are required.' });
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN'); 

        // Step 1: Insert into job_applications table
        const generatedJobId = await insertJobApplication(client, req.body);

        // Step 2: Insert into applicant_information table using the generated Job ID
        const applicantProfile = await insertApplicantInfo(client, generatedJobId, req.body);

        // Get the applicant ID from the returned profile
        const generatedApplicantId = applicantProfile.applicant_id; 

        // Step 3: Insert into secondary tables using the brand-new applicant ID
        const equalDeclaration = await insertApplicantsEqualDeclaration(client, generatedApplicantId, req.body);
        const civilServiceEligibility = await insertApplicantsCivilServiceEligibility(client, generatedApplicantId, req.body);
        const uploadDouments = await insertApplicantsUploadDocuments(client, generatedApplicantId, req.body);
        const applicantEducation = await insertApplicantsEducation(client, generatedApplicantId, req.body);
        const applicantWorkExperience = await insertApplicantsWorkExperience(client, generatedApplicantId, req.body);
        const applicantTraining = await insertApplicantsTraining(client, generatedApplicantId, req.body);
        const hr_remarks = await insertHRRemarks(client, generatedApplicantId, req.body);

        await client.query('COMMIT'); 

        await sendApplicationReceivedEmail(

            email_address,

            first_name,

            last_name

        );

        await insertNotification(

            client,

            generatedJobId,

            email_address,

            "Application Received",

            "Your application has been successfully received.",

            "Sent",

            "APPLICATION_RECEIVED"

        );

        return res.status(201).json({ 
            message: 'Application bundle saved successfully!', 
            job_applications_id: generatedJobId,
            applicant: applicantProfile,
            declaration: equalDeclaration,
            eligibility: civilServiceEligibility,
            documents: uploadDouments,
            education: applicantEducation,
            work_experience: applicantWorkExperience,
            training: applicantTraining,
            hr_remarks: hr_remarks,
        });

    } catch (error) {
        await client.query('ROLLBACK'); 
        console.error('Transaction failure:', error);
        return res.status(500).json({ error: 'Internal server error processing application.' });
    } finally {
        client.release();
    }
};


export const getApplicantById = async (req, res) => {
    // Extract the ID from the request parameters
    const { id } = req.params;

    const query = `
        SELECT 
            -- 1. Job Applications
            job_applications.vacancy_id,
            vacancies.position_title,
            vacancies.office_unit,
            date_received,
            time_received,
            received_by,
            submission_type,
            COALESCE(hr_remarks_final_notes.application_status, 'Initial Screening') AS application_status,

            -- 2. Applicant Information
            applicant_information.applicant_id,
            first_name,
            middle_name,
            last_name,
            suffix,
            sex,
            date_of_birth,
            civil_status,
            contact_number,
            email_address,
            residential_address,

            -- 3. Equal Opportunity Declarations
            is_pwd,
            is_solo_parent,
            is_indigenous_person,

            -- 4. Civil Service Eligibility
            eligibility_type,
            rating,
            date_of_exam,
            place_of_exam,
            license_number,

            -- 5. Upload Documents
            has_application_letter,
            has_birth_certificate,
            has_certificate_of_employment,
            has_civil_service_eligibility_cert,
            has_diploma,
            has_medical_certificate,
            has_nbi_clearance,
            has_performance_rating,
            has_personal_data_sheet,
            has_tin_id_or_verification,
            has_training_certificates,
            has_transcript_of_records,
            has_voter_id_or_comelec_cert,
            has_cert_of_outstanding_accomplishments,
            has_marriage_certificate_psa,
            has_oath_of_office,
            has_service_record,

            -- 6. Applicant Education
            education_level,
            school_name,
            degree_course,
            honors_awards,

            -- 7. Applicant Work Experience
            company_office,
            work_experience.date_from AS experience_date_from,
            work_experience.date_to AS experience_date_to,
            monthly_salary,
            appointment_status,
            is_govt_service,

            -- 8. Applicants Training
            training_title,
            relevant_trainings.date_from AS training_date_from,
            relevant_trainings.date_to AS training_date_to,
            hours_attended,
            training_type,
            conducted_by,

            -- 9. HR Remarks
            hr_remarks_notes,

            vacancy_specific_qualifications.education_requirement,
            vacancy_specific_qualifications.training_requirement,
            vacancy_specific_qualifications.experience_requirement,
            vacancy_specific_qualifications.eligibility_requirement

        FROM job_applications
        LEFT JOIN vacancies ON job_applications.vacancy_id = vacancies.vacancy_id
        LEFT JOIN vacancy_specific_qualifications ON vacancies.vacancy_id = vacancy_specific_qualifications.vacancy_id
        LEFT JOIN applicant_information ON job_applications.job_applications_id = applicant_information.job_applications_id
        LEFT JOIN equal_opportunity_declarations ON applicant_information.applicant_id = equal_opportunity_declarations.applicant_id
        LEFT JOIN civil_service_eligibility ON applicant_information.applicant_id = civil_service_eligibility.applicant_id
        LEFT JOIN applicant_documents ON applicant_information.applicant_id = applicant_documents.applicant_id
        LEFT JOIN education ON applicant_information.applicant_id = education.applicant_id
        LEFT JOIN work_experience ON applicant_information.applicant_id = work_experience.applicant_id
        LEFT JOIN relevant_trainings ON applicant_information.applicant_id = relevant_trainings.applicant_id
        LEFT JOIN hr_remarks_final_notes ON applicant_information.applicant_id = hr_remarks_final_notes.applicant_id
        WHERE applicant_information.applicant_id = $1
           OR job_applications.job_applications_id = $1;
    `;

    try {
        // Use parameterized query to prevent SQL Injection
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Applicant not found.' });
        }

    return res.status(200).json({
    success: true,
    data: result.rows[0]
    });
    } catch (error) {
        console.error('Fetch applicant failure:', error);
        return res.status(500).json({ error: 'Internal server error fetching applicant profile.' });
    }
};
