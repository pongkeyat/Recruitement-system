import EvaluationCard from "./EvaluationCard";

// Destructure note and setNote passed from the parent component
export default function EligibilityCard({ applicant, status, setStatus, note, setNote }) {

    const requirement =
        applicant.eligibility_requirement || "";

    const applicantEligibility =
        applicant.eligibility_type || "";

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
            color="bg-blue-500"
            title="ELIGIBILITY STANDARD"
            requirement={requirement}
            actual={actual}
            status={status}
            setStatus={setStatus}
            note={note}
            setNote={setNote}
        />
    );
}
