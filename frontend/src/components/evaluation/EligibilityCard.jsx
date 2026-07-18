import { useEffect } from "react";

const fieldClass =
    "mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-800 transition focus:border-[#1e3a8a] focus:outline-none focus:ring-1 focus:ring-[#1e3a8a]";
const labelClass = "text-sm font-medium text-gray-700";

export default function EligibilityCard({
    applicant,
    eligibility,
    setEligibility,
    status,
    setStatus,
    note,
    setNote,
}) {

    const handleChange = (field, value) => {
        setEligibility(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    useEffect(() => {

        const requirement =
            (applicant?.eligibility_requirement || "").toLowerCase();

        const applicantEligibility =
            (eligibility.eligibility_type || "").toLowerCase();

        if (!applicantEligibility) {
            setStatus("PENDING");
            return;
        }

        setStatus(
            applicantEligibility.includes(requirement)
                ? "PASS"
                : "FAILED"
        );

    }, [
        eligibility.eligibility_type,
        applicant,
        setStatus,
    ]);

    return (
        <div className="space-y-4">

            <div>
                <label className={labelClass}>
                    Vacancy Requirement
                </label>

                <div className="mt-1 rounded-lg bg-gray-100 p-3 text-sm text-gray-700">
                    {applicant.eligibility_requirement || "No requirement"}
                </div>
            </div>

            <div>
                <label className={labelClass}>
                    Eligibility Type
                </label>

                <input
                    className={fieldClass}
                    value={eligibility.eligibility_type}
                    onChange={(e) =>
                        handleChange(
                            "eligibility_type",
                            e.target.value
                        )
                    }
                />
            </div>

            <div className="grid grid-cols-2 gap-4">

                <div>
                    <label className={labelClass}>
                        Rating
                    </label>

                    <input
                        type="number"
                        step="0.01"
                        className={fieldClass}
                        value={eligibility.rating}
                        onChange={(e) =>
                            handleChange(
                                "rating",
                                e.target.value
                            )
                        }
                    />
                </div>

                <div>
                    <label className={labelClass}>
                        Exam Date
                    </label>

                    <input
                        type="date"
                        className={fieldClass}
                        value={eligibility.date_of_exam}
                        onChange={(e) =>
                            handleChange(
                                "date_of_exam",
                                e.target.value
                            )
                        }
                    />
                </div>

            </div>

            <div>
                <label className={labelClass}>
                    Place of Examination
                </label>

                <input
                    className={fieldClass}
                    value={eligibility.place_of_exam}
                    onChange={(e) =>
                        handleChange(
                            "place_of_exam",
                            e.target.value
                        )
                    }
                />
            </div>

            <div>
                <label className={labelClass}>
                    License Number
                </label>

                <input
                    className={fieldClass}
                    value={eligibility.license_number}
                    onChange={(e) =>
                        handleChange(
                            "license_number",
                            e.target.value
                        )
                    }
                />
            </div>

            <div>
                <label className={labelClass}>
                    Remarks
                </label>

                <textarea
                    rows={3}
                    className={fieldClass}
                    value={note}
                    onChange={(e) =>
                        setNote(e.target.value)
                    }
                />
            </div>

            <div
                className={`rounded-lg p-3 text-center text-sm font-semibold ${
                    status === "PASS"
                        ? "bg-emerald-100 text-emerald-700"
                        : status === "FAILED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                }`}
            >
                {status}
            </div>

        </div>
    );
}
