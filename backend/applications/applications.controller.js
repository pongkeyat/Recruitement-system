import pool from "../config/db.js";
import { insertJobApplication } from './services/jobApplications.services.js';
import { insertApplicantInfo } from './services/jobApplicants.services.js';
import { insertApplicantsEqualDeclaration } from "./services/applicantsEqualDeclaration.services.js";
import { insertApplicantsCivilServiceEligibility } from "./services/civilServiceEligibility.services.js";
import { insertApplicantsUploadDocuments } from "./services/applicantsDocuments.services.js";
import { insertApplicantsEducation } from "./services/applicantEducation.services.js";
import { insertApplicantsWorkExperience } from "./services/applicantWorkExpercience.services.js";
// import { insertApplicantsTraining } from "./services/applicantsTraining.services.js";
// import { insertHRRemarks } from "./services/hr_remarks.services.js";
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

        // Step 3: Insert into equal_opportunity_declarations using the brand-new applicant ID
         const equalDeclaration = await insertApplicantsEqualDeclaration(client, generatedApplicantId, req.body);

         const civilServiceEligibility = await insertApplicantsCivilServiceEligibility(client, generatedApplicantId, req.body);

         const uploadDouments = await insertApplicantsUploadDocuments(client, generatedApplicantId, req.body);

         const applicantEducation = await insertApplicantsEducation(client, generatedApplicantId, req.body);

        const applicantWorkExperience = await insertApplicantsWorkExperience(client, generatedApplicantId, req.body);
  
     //   const applicantTraining = await insertApplicantsTraining(client, generatedApplicantId, req.body);

      //  const hr_remarks = await insertHRRemarks(client, generatedApplicantId, req.body);



        await client.query('COMMIT'); 

        return res.status(201).json({ 
            message: 'Application bundle saved successfully!', 
            job_applications_id: generatedJobId,
            applicant: applicantProfile,
            declaration: equalDeclaration,
            eligibility: civilServiceEligibility,
            documents: uploadDouments,
            education: applicantEducation,
            work_experience: applicantWorkExperience,
         //   training: applicantTraining,
         //   hr_remarks: hr_remarks,
        });

    } catch (error) {
        await client.query('ROLLBACK'); 
        console.error('Transaction failure:', error);
        return res.status(500).json({ error: 'Internal server error processing application.' });
    } finally {
        client.release();
    }
};