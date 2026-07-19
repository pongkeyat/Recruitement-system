import { useEffect } from "react";

const fieldClass =
    "mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-800 transition focus:border-[#1e3a8a] focus:outline-none focus:ring-1 focus:ring-[#1e3a8a]";
const labelClass = "text-sm font-medium text-gray-700";

// 1. Dynamic Requirement Rules Configuration Engine
const EVALUATION_RULES = [
    {
        // 1. Rule for No Requirement
        matches: (req) => !req || ["none", "not required", "n/a", "no requirement"].some(k => req.includes(k)),
        evaluate: () => true
    },
    {
        // 2. Rule for General College Graduation
        matches: (req) => req.includes("college graduate") || req.includes("degree holder"),
        evaluate: (edu) => {
            const level = edu.education_level?.toUpperCase() || "";
            // These levels mean they have graduated college/higher education
            const graduatedLevels = ["VOCATIONAL", "POSTGRADUATE", "DOCTORAL"];
            
            return graduatedLevels.includes(level);
        }
    },
    {
        // 3. Fallback: Specific string matching
        matches: () => true, 
        evaluate: (edu, req) => {
            const course = edu.degree_course?.toLowerCase() || "";
            const level = edu.education_level?.toLowerCase() || "";
            return course.includes(req) || level.includes(req);
        }
    }
];

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

    // 2. Dynamic Evaluator Hook
    useEffect(() => {
        const requirement = applicant?.education_requirement?.trim().toLowerCase() || "";
        const degreeText = education.degree_course?.trim() || "";

        // 1. FIRST check: If there is no requirement, it is an automatic immediate PASS
        const hasNoRequirement = 
            !requirement || 
            ["none", "not required", "n/a", "no requirement"].some(k => requirement.includes(k));

        if (hasNoRequirement) {
            setStatus("PASS");
            return;
        }

        // 2. SECOND check: Only enforce PENDING if a real requirement exists but the user hasn't typed anything
        if (!degreeText) {
            setStatus("PENDING");
            return;
        }

        // Find the first rule that matches the current requirement text
        const activeRule = EVALUATION_RULES.find(rule => rule.matches(requirement));

        if (activeRule) {
            const isPassed = activeRule.evaluate(education, requirement);
            setStatus(isPassed ? "PASS" : "FAILED");
        } else {
            setStatus("FAILED");
        }

    }, [
        education.degree_course, 
        education.education_level, 
        applicant?.education_requirement, 
        setStatus
    ]);

    return (
        <div className="space-y-4">
            <div>
                <label className={labelClass}>Vacancy Requirement</label>
                <div className="mt-1 rounded-lg bg-gray-100 p-3 text-sm text-gray-700">
                    {applicant?.education_requirement || "No requirement"}
                </div>
            </div>

            <div>
                <label className={labelClass}>Education Level</label>
                <select
                    className={fieldClass}
                    value={education.education_level || ""}
                    onChange={(e) => handleChange("education_level", e.target.value)}
                >
                    <option value="">-- Select --</option>
                    <option value="HIGH SCHOOL">HIGH SCHOOL</option>
                    <option value="UNDERGRADUATE">UNDERGRADUATE</option>
                    <option value="VOCATIONAL">VOCATIONAL</option>
                    <option value="POSTGRADUATE">POSTGRADUATE</option>
                    <option value="DOCTORAL">DOCTORAL</option>
                </select>
            </div>

            <div>
                <label className={labelClass}>School</label>
                <input
                    className={fieldClass}
                    value={education.school_name || ""}
                    onChange={(e) => handleChange("school_name", e.target.value)}
                />
            </div>

            <div>
                <label className={labelClass}>Degree / Course</label>
                <input
                    className={fieldClass}
                    value={education.degree_course || ""}
                    onChange={(e) => handleChange("degree_course", e.target.value)}
                />
            </div>

            <div>
                <label className={labelClass}>Honors</label>
                <input
                    className={fieldClass}
                    value={education.honors_awards || ""}
                    onChange={(e) => handleChange("honors_awards", e.target.value)}
                />
            </div>

            <div>
                <label className={labelClass}>Remarks</label>
                <textarea
                    rows={3}
                    className={fieldClass}
                    value={note}
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