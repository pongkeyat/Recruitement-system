import { useState } from "react";
import EvaluationCard from "./EvaluationCard";

export default function TrainingCard({ applicant }) {

    const [note, setNote] = useState("");

    const pass = applicant.hours_attended >= 4;

    return (

        <EvaluationCard

            color="bg-green-500"

            title="TRAINING STANDARD"

            requirement={applicant.training_requirement}

            actual={
                applicant.training_title
                    ? `${applicant.training_title} (${applicant.hours_attended} hrs)`
                    : "No records found"
            }

            status={pass ? "PASS" : "PENDING"}

            note={note}

            setNote={setNote}

        />

    );

}