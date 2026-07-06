export const insertNotification = async (

    client,

    jobApplicationId,

    email,

    subject,

    message,

    status,

    type

) => {

    const query = `

        INSERT INTO notifications
        (
            job_applications_id,
            notification_type,
            recipient_email,
            subject,
            message,
            status,
            sent_at
        )

        VALUES

        ($1,$2,$3,$4,$5,$6,NOW())

    `;

    await client.query(query, [

        jobApplicationId,

        type,

        email,

        subject,

        message,

        status

    ]);

};