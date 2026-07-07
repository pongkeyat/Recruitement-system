export const insertApplicantsEducation = async (client, applicantId, data) => {
    const {education_level, school_name, degree_course, honors_awards} = data;

    const cleanedEducationLevel = education_level && education_level.trim() !== "" ? education_level.trim().toUpperCase() : "";
    const cleanedSchoolName = school_name && school_name.trim() !== "" ? school_name.trim().toUpperCase() : "";
    const cleanedDegreeCourse = degree_course && degree_course.trim() !== "" ? degree_course.trim().toUpperCase() : "";
    const cleanedHonorsAwards = honors_awards && honors_awards.trim() !== "" ? honors_awards.trim().toUpperCase() : "";
    
    const result = await client.query (
        `INSERT into education (applicant_id, education_level, school_name, degree_course, honors_awards)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [applicantId, cleanedEducationLevel, cleanedSchoolName, cleanedDegreeCourse, cleanedHonorsAwards]

    )

    return result.rows[0];

}