import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

// Verify SMTP connection when the server starts
transporter.verify((error, success) => {
    if (error) {
        console.error("❌ Nodemailer Error:", error);
    } else {
        console.log("✅ Mail server is ready.");
    }
});

/**
 * Sends an initial screening result email.
 * @param {string} email - The applicant's email address.
 * @param {string} name - The applicant's name (optional, falls back to email if not provided).
 * @param {'qualified' | 'disqualified'} status - The screening status.
 */
export const ScreeningResultEmail = async (email, name, status) => {
    const isQualified = status.toLowerCase() === "qualified";
    
    const subject = isQualified 
        ? "DEPED Recruitment - Initial Screening Update: Qualified" 
        : "DEPED Recruitment - Initial Screening Update";

    const heading = isQualified ? "Application Update: Qualified" : "Application Update";

    const messageBody = isQualified
        ? `<p>Congratulations! We are pleased to inform you that you have passed our initial screening process.</p>
           <p>Our recruitment team will contact you shortly regarding the next steps of your application.</p>`
        : `<p>Thank you for your interest in joining the Department of Education. After careful review of your application, we regret to inform you that you did not meet the criteria for the next stage of our recruitment process at this time.</p>
           <p>We appreciate the time and effort you invested in your application and wish you the best in your future professional endeavors.</p>`;

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        html: `
            <h2>${heading}</h2>

            <p>Dear ${name || email},</p>

            ${messageBody}

            <br>
            <p>Best regards,</p>
            <strong>DEPED Recruitment Team</strong>
        `,
    };

    return transporter.sendMail(mailOptions);
};