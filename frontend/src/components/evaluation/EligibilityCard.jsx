import { useEffect } from "react";

const fieldClass =
    "mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-800 transition focus:border-[#1e3a8a] focus:outline-none focus:ring-1 focus:ring-[#1e3a8a]";
const labelClass = "text-sm font-medium text-gray-700";

const ELIGIBILITY_OPTIONS = [
  "CAREER SERVICE PROFESSIONAL",
  "CAREER SERVICE SUBPROFESSIONAL",
  "RA 1080 (BOARD/BAR)",
  "PD 907",
];

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
        const requirement = (applicant?.eligibility_requirement || "").trim().toLowerCase();
        const applicantEligibility = (eligibility.eligibility_type || "").trim().toLowerCase();

        // 1. FIRST check: If there is no requirement, it is an automatic immediate PASS
        const hasNoRequirement = 
            !requirement || 
            ["none", "not required", "n/a", "no requirement"].some(k => requirement.includes(k));

        if (hasNoRequirement) {
            setStatus("PASS");
            return;
        }

        // 2. SECOND check: Only enforce PENDING if a real requirement exists but the selection is empty
        if (!applicantEligibility) {
            setStatus("PENDING");
            return;
        }

        // 3. Evaluation logic
        setStatus(
            applicantEligibility.includes(requirement) || requirement.includes(applicantEligibility)
                ? "PASS"
                : "FAILED"
        );

    }, [
        eligibility.eligibility_type,
        applicant?.eligibility_requirement,
        setStatus,
    ]);

    return (
        <div className="space-y-4">

            <div>
                <label className={labelClass}>
                    Vacancy Requirement
                </label>
                <div className="mt-1 rounded-lg bg-gray-100 p-3 text-sm text-gray-700">
                    {applicant?.eligibility_requirement || "No requirement"}
                </div>
            </div>

            <div>
                <label className={labelClass}>
                    Eligibility Type
                </label>
                <select
                    className={fieldClass}
                    value={eligibility.eligibility_type || ""}
                    onChange={(e) => handleChange("eligibility_type", e.target.value)}
                >
                    <option value="">-- Select Eligibility --</option>
                    {ELIGIBILITY_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
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
                        value={eligibility.rating || ""}
                        onChange={(e) =>
                            handleChange("rating", e.target.value)
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
                        value={eligibility.date_of_exam || ""}
                        onChange={(e) =>
                            handleChange("date_of_exam", e.target.value)
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
                    value={eligibility.place_of_exam || ""}
                    onChange={(e) =>
                        handleChange("place_of_exam", e.target.value)
                    }
                />
            </div>

            <div>
                <label className={labelClass}>
                    License Number
                </label>
                <input
                    className={fieldClass}
                    value={eligibility.license_number || ""}
                    onChange={(e) =>
                        handleChange("license_number", e.target.value)
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
                    value={note || ""}
                    onChange={(e) => setNote(e.target.value)}
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