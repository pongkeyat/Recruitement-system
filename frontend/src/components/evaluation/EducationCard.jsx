import { useEffect, useState } from "react";

const fieldClass =
    "mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-800 transition focus:border-[#1e3a8a] focus:outline-none focus:ring-1 focus:ring-[#1e3a8a]";
const labelClass = "text-sm font-medium text-gray-700";

export default function EducationCard({
    applicant,
    status,
    setStatus,
    note,
    setNote,
    education,
    setEducation,
}) {

    const handleChange = (field, value) => {
        setEducation(prev => ({
            ...prev,
            [field]: value
        }));
    };

    useEffect(() => {
        const requirement =
            applicant?.education_requirement?.toLowerCase() || "";

        const degree =
            education.degree_course?.toLowerCase() || "";

        if (!degree) {
            setStatus("PENDING");
            return;
        }

        if (degree.includes(requirement)) {
            setStatus("PASS");
        } else {
            setStatus("FAILED");
        }

    }, [
        education.degree_course,
        applicant,
        setStatus
    ]);

    return (
        <div className="space-y-4">

            <div>
                <label className={labelClass}>
                    Vacancy Requirement
                </label>

                <div className="mt-1 rounded-lg bg-gray-100 p-3 text-sm text-gray-700">
                    {applicant.education_requirement || "No requirement"}
                </div>
            </div>

            <div>
                <label className={labelClass}>
                    Education Level
                </label>

                <select
                    className={fieldClass}
                    value={education.education_level}
                    onChange={(e) =>
                        handleChange(
                            "education_level",
                            e.target.value
                        )
                    }
                >
                    <option value="">Select</option>
                    <option>Bachelor's Degree</option>
                    <option>Master's Degree</option>
                    <option>Doctorate Degree</option>
                </select>
            </div>

            <div>
                <label className={labelClass}>
                    School
                </label>

                <input
                    className={fieldClass}
                    value={education.school_name}
                    onChange={(e) =>
                        handleChange(
                            "school_name",
                            e.target.value
                        )
                    }
                />
            </div>

            <div>
                <label className={labelClass}>
                    Degree / Course
                </label>

                <input
                    className={fieldClass}
                    value={education.degree_course}
                    onChange={(e) =>
                        handleChange(
                            "degree_course",
                            e.target.value
                        )
                    }
                />
            </div>

            <div>
                <label className={labelClass}>
                    Honors
                </label>

                <input
                    className={fieldClass}
                    value={education.honors_awards}
                    onChange={(e) =>
                        handleChange(
                            "honors_awards",
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
