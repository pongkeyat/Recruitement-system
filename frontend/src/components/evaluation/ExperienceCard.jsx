import EvaluationCard from "./EvaluationCard";

// Destructure note and setNote passed from the parent component
export default function ExperienceCard({ applicant, status, setStatus, note, setNote }) {

    let months = 0;

    if (
        applicant.experience_date_from &&
        applicant.experience_date_to
    ) {
        const from = new Date(applicant.experience_date_from);
        const to = new Date(applicant.experience_date_to);

        months =
            (to.getFullYear() - from.getFullYear()) * 12 +
            (to.getMonth() - from.getMonth());

        if (to.getDate() >= from.getDate()) {
            months += 1;
        }
    }

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    const actual =
        applicant.company_office
            ? (
                <>
                    <p className="font-semibold">
                        {applicant.company_office}
                    </p>

                    <p className="text-sm text-gray-600">
                        {years} year(s) {remainingMonths} month(s)
                    </p>

                    <p className="text-sm text-gray-500">
                        {applicant.experience_date_from} - {applicant.experience_date_to}
                    </p>
                </>
            )
            : "No records found";

    return (
        <EvaluationCard
                    color="bg-blue-500"
            title="EXPERIENCE STANDARD"
            requirement={applicant.experience_requirement}
            actual={actual}
            status={status}
            setStatus={setStatus}
            note={note}
            setNote={setNote}
        />
    );
}
