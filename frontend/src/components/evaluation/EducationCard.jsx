import EvaluationCard from "./EvaluationCard";

// Destructure note and setNote passed from ApplicantEvaluation
export default function EducationCard({ applicant, status, setStatus, note, setNote }) {

    return (
        <EvaluationCard
                    color="bg-blue-500"
                    title="EDUCATION STANDARD"
                    requirement={applicant.education_requirement}
                    actual={applicant.degree_course || "No records found"}
            status={status}
            setStatus={setStatus}
                    note={note}
                    setNote={setNote}
        />
    );
}
