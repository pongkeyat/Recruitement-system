export const insertApplicantsCivilServiceEligibility = async (client, applicantId, data) => {
    const { eligibility_type, rating, date_of_exam, place_of_exam, license_number} = data;

    const cleanEligibilityType = eligibility_type && eligibility_type.trim() !== "" ? eligibility_type.trim().toUpperCase() : null;
    const cleanRating = rating !== undefined && rating !== null && rating !== "" ? parseFloat(rating) : null;
    const cleanDateOfExam = date_of_exam && date_of_exam.trim() !== "" ? date_of_exam.trim() : null;
    const cleanPlaceOfExam = place_of_exam && place_of_exam.trim() !== "" ? place_of_exam.trim().toUpperCase() : null;
    const cleanLicenseNumber = license_number && license_number.trim() !== "" ? license_number.trim().toUpperCase() : null;


    const result = await client.query (
        `INSERT into civil_service_eligibility (applicant_id,eligibility_type, rating, date_of_exam, place_of_exam, license_number )
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [applicantId, cleanEligibilityType, cleanRating, cleanDateOfExam, cleanPlaceOfExam, cleanLicenseNumber]
    );
    return result.rows[0];
};