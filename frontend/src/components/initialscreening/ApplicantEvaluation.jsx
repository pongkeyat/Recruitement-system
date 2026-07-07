import EducationCard from "../evaluation/EducationCard";
import TrainingCard from "../evaluation/TrainingCard";
import ExperienceCard from "../evaluation/ExperienceCard";
import EligibilityCard from "../evaluation/EligibilityCard";

export default function ApplicantEvaluation({ applicant }) {

    if (!applicant) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-2 gap-6">

            <EducationCard applicant={applicant} />

            <TrainingCard applicant={applicant} />

            <ExperienceCard applicant={applicant} />

            <EligibilityCard applicant={applicant} />

        </div>
    );
}