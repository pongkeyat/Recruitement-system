import { useEffect } from "react";

const fieldClass =
    "mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-800 transition focus:border-[#1e3a8a] focus:outline-none focus:ring-1 focus:ring-[#1e3a8a]";
const labelClass = "text-sm font-medium text-gray-700";

export default function ExperienceCard({
    applicant,
    experience,
    setExperience,
    status,
    setStatus,
    note,
    setNote,
}) {

    const handleChange = (field, value) => {
        setExperience(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    useEffect(() => {
        const requirement = (applicant?.experience_requirement || "").trim().toLowerCase();

        // 1. FIRST check: If there is no requirement, it is an automatic immediate PASS
        const hasNoRequirement = 
            !requirement || 
            ["none", "not required", "n/a", "no requirement"].some(k => requirement.includes(k));

        if (hasNoRequirement) {
            setStatus("PASS");
            return;
        }

        // 2. SECOND check: Only enforce PENDING if a real requirement exists but dates are empty
        if (!experience.date_from || !experience.date_to) {
            setStatus("PENDING");
            return;
        }

        // Calculate months of experience
        const from = new Date(experience.date_from);
        const to = new Date(experience.date_to);

        let months =
            (to.getFullYear() - from.getFullYear()) * 12 +
            (to.getMonth() - from.getMonth());

        if (to.getDate() >= from.getDate()) {
            months++;
        }

        let passed = false;

        // Match "1 year", "2 years", etc.
        const yearMatch = requirement.match(/(\d+)\s*year/i);

        if (yearMatch) {
            const requiredMonths = parseInt(yearMatch[1], 10) * 12;
            passed = months >= requiredMonths;
        } else {
            // If no numeric requirement exists but there is text, require at least 1 month
            passed = months > 0;
        }

        setStatus(passed ? "PASS" : "FAILED");

    }, [
        experience.date_from,
        experience.date_to,
        applicant?.experience_requirement,
        setStatus,
    ]);

    // UI Month Display Calculation Block
    let months = 0;
    if (experience.date_from && experience.date_to) {
        const from = new Date(experience.date_from);
        const to = new Date(experience.date_to);

        months =
            (to.getFullYear() - from.getFullYear()) * 12 +
            (to.getMonth() - from.getMonth());

        if (to.getDate() >= from.getDate()) {
            months++;
        }
    }

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    return (
        <div className="space-y-4">

            <div>
                <label className={labelClass}>
                    Vacancy Requirement
                </label>
                <div className="mt-1 rounded-lg bg-gray-100 p-3 text-sm text-gray-700">
                    {applicant?.experience_requirement || "No requirement"}
                </div>
            </div>

            <div>
                <label className={labelClass}>
                    Company / Office
                </label>
                <input
                    className={fieldClass}
                    value={experience.company_office || ""}
                    onChange={(e) =>
                        handleChange("company_office", e.target.value)
                    }
                />
            </div>

            <div>
                <label className={labelClass}>
                    Position Title
                </label>
                <input
                    className={fieldClass}
                    value={experience.position_title || ""}
                    onChange={(e) =>
                        handleChange("position_title", e.target.value)
                    }
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>
                        Date From
                    </label>
                    <input
                        type="date"
                        className={fieldClass}
                        value={experience.date_from || ""}
                        onChange={(e) =>
                            handleChange("date_from", e.target.value)
                        }
                    />
                </div>

                <div>
                    <label className={labelClass}>
                        Date To
                    </label>
                    <input
                        type="date"
                        className={fieldClass}
                        value={experience.date_to || ""}
                        onChange={(e) =>
                            handleChange("date_to", e.target.value)
                        }
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>
                        Monthly Salary
                    </label>
                    <input
                        type="number"
                        className={fieldClass}
                        value={experience.monthly_salary || ""}
                        onChange={(e) =>
                            handleChange("monthly_salary", e.target.value)
                        }
                    />
                </div>

                <div>
                    <label className={labelClass}>
                        Appointment Status
                    </label>
                    <input
                        className={fieldClass}
                        value={experience.appointment_status || ""}
                        onChange={(e) =>
                            handleChange("appointment_status", e.target.value)
                        }
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-[#1e3a8a] focus:ring-[#1e3a8a]"
                    checked={!!experience.is_govt_service}
                    onChange={(e) =>
                        handleChange("is_govt_service", e.target.checked)
                    }
                />
                <label className={labelClass}>
                    Government Service
                </label>
            </div>

            <div className="rounded-lg bg-gray-100 p-3 text-sm text-gray-700">
                <strong>Total Experience:</strong>{" "}
                {years} year(s) {remainingMonths} month(s)
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