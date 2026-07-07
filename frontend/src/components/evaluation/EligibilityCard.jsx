import { useState } from "react";
import EvaluationCard from "./EvaluationCard";

export default function EligibilityCard({ applicant }) {

    const [note, setNote] = useState("");

    const requirement =
        applicant.eligibility_requirement || "";

    const applicantEligibility =
        applicant.eligibility_type || "";

    const pass =
        applicantEligibility
            .toLowerCase()
            .includes(requirement.toLowerCase());

    const actual =
        applicantEligibility
            ? (
                <>
                    <p className="font-semibold">
                        {applicantEligibility}
                    </p>

                    <p className="text-sm text-gray-600">
                        Rating: {applicant.rating || "N/A"}
                    </p>

                    <p className="text-sm text-gray-600">
                        Exam Date: {applicant.date_of_exam || "N/A"}
                    </p>

                    <p className="text-sm text-gray-600">
                        Place: {applicant.place_of_exam || "N/A"}
                    </p>
                </>
            )
            : "No records found";

    return (

        <EvaluationCard

            color="bg-cyan-500"

            title="ELIGIBILITY STANDARD"

            requirement={requirement}

            actual={actual}

            status={pass ? "PASS" : "PENDING"}

            note={note}

            setNote={setNote}

        />

    );

}