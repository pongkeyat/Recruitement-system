import EvaluationCard from "./EvaluationCard";

// Destructure note and setNote passed from the parent component
export default function TrainingCard({ applicant, status, setStatus, note, setNote }) {

    return (
        <EvaluationCard
                    color="bg-blue-500"
            title="TRAINING STANDARD"
            requirement={applicant.training_requirement}
            actual={applicant.training_title
                ? `${applicant.training_title} (${applicant.hours_attended || 0} hour(s))`
                : `${applicant.hours_attended || 0} hour(s) attended`}
            status={status}
            setStatus={setStatus}
            note={note}
            setNote={setNote}
        />
    );
}
