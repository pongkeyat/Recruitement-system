import { useParams } from "react-router-dom";
import ApplicantsByIdHeader from "../components/initialscreening/ApplicantsByIdHeader";
import ApplicantSummaryCard from "../components/initialscreening/ApplicantSummaryCard";

export default function ApplicantsInitialScreening() {
    const { id } = useParams();

    return (
        <div className="w-full h-full flex flex-col gap-6">
            <ApplicantsByIdHeader applicationId={id} />
            <ApplicantSummaryCard applicationId={id} />
        </div>
    );
}