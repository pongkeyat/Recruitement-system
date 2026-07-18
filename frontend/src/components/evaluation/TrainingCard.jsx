import { useEffect } from "react";

const fieldClass =
    "mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-800 transition focus:border-[#1e3a8a] focus:outline-none focus:ring-1 focus:ring-[#1e3a8a]";
const labelClass = "text-sm font-medium text-gray-700";

export default function TrainingCard({
    applicant,
    training,
    setTraining,
    status,
    setStatus,
    note,
    setNote,
}) {

    const handleChange = (field, value) => {
        setTraining(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    useEffect(() => {
        const requirement =
            (applicant?.training_requirement || "").toLowerCase();

        const title =
            (training.training_title || "").toLowerCase();

        const hours =
            Number(training.hours_attended || 0);

        // No input yet
        if (!title && hours === 0) {
            setStatus("PENDING");
            return;
        }

        let passed = false;

        // Match requirement by title
        if (requirement && title.includes(requirement)) {
            passed = true;
        }

        // If requirement is numeric hours (e.g. 8 Hours)
        const requiredHours = parseInt(requirement);

        if (!isNaN(requiredHours)) {
            passed = hours >= requiredHours;
        }

        setStatus(passed ? "PASS" : "FAILED");

    }, [
        training,
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
                    {applicant.training_requirement || "No requirement"}
                </div>
            </div>

            <div>
                <label className={labelClass}>
                    Training Title
                </label>

                <input
                    className={fieldClass}
                    value={training.training_title}
                    onChange={(e) =>
                        handleChange(
                            "training_title",
                            e.target.value
                        )
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
                        value={training.date_from}
                        onChange={(e) =>
                            handleChange(
                                "date_from",
                                e.target.value
                            )
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
                        value={training.date_to}
                        onChange={(e) =>
                            handleChange(
                                "date_to",
                                e.target.value
                            )
                        }
                    />
                </div>

            </div>

            <div className="grid grid-cols-2 gap-4">

                <div>
                    <label className={labelClass}>
                        Hours Attended
                    </label>

                    <input
                        type="number"
                        className={fieldClass}
                        value={training.hours_attended}
                        onChange={(e) =>
                            handleChange(
                                "hours_attended",
                                e.target.value
                            )
                        }
                    />
                </div>

                <div>
                    <label className={labelClass}>
                        Training Type
                    </label>

                    <input
                        className={fieldClass}
                        value={training.training_type}
                        onChange={(e) =>
                            handleChange(
                                "training_type",
                                e.target.value
                            )
                        }
                    />
                </div>

            </div>

            <div>
                <label className={labelClass}>
                    Conducted By
                </label>

                <input
                    className={fieldClass}
                    value={training.conducted_by}
                    onChange={(e) =>
                        handleChange(
                            "conducted_by",
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
