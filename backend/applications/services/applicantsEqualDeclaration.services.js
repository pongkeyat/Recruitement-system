export const insertApplicantsEqualDeclaration = async (client, applicantId, data) => {
    const { is_pwd, is_solo_parent, is_indigenous_person } = data;

    // Preserve explicit nulls/undefined values instead of forcing false
    const cleanIsPWD = is_pwd !== undefined ? is_pwd : null;
    const cleanIsSoloParent = is_solo_parent !== undefined ? is_solo_parent : null;
    const cleanIsIndigenous = is_indigenous_person !== undefined ? is_indigenous_person : null;

    const result = await client.query(
        `INSERT INTO equal_opportunity_declarations (applicant_id, is_pwd, is_solo_parent, is_indigenous_person)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [applicantId, cleanIsPWD, cleanIsSoloParent, cleanIsIndigenous]
    );
    return result.rows[0];
};