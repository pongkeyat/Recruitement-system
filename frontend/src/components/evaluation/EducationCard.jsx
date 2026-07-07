import { useState } from "react";
import EvaluationCard from "./EvaluationCard";

export default function EducationCard({ applicant }) {

    const [note, setNote] = useState("");

    const pass =
        applicant.degree_course
            ?.toLowerCase()
            .includes("information technology");

    return (

        <EvaluationCard

            color="bg-blue-500"

            title="EDUCATION STANDARD"

            requirement={applicant.education_requirement}

            actual={

                applicant.degree_course ||

                "No records found"

            }

            status={pass ? "PASS" : "PENDING"}

            note={note}

            setNote={setNote}

        />

    );

}