import React, { useEffect, useMemo, useState } from "react";
import AssessmentRow from "./AssessmentRow";
import { postRanking } from "../../api/RankingApi";

import {
  getAssessmentCriteria,
  getAssessmentOptionsByAssessmentCriteria,
} from "../../api/AssesmentApi";

export default function AssessmentScoreTable({
  selectedApplicant,
}) {
  const [criteria, setCriteria] = useState([]);
  const [options, setOptions] = useState({});
  const [scores, setScores] = useState({});
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssessmentData();
  }, []);

const loadAssessmentData = async () => {
  try {
    setLoading(true);

    const criteriaResponse = await getAssessmentCriteria();
    const criteriaData = Array.isArray(criteriaResponse)
      ? criteriaResponse
      : criteriaResponse?.criteria || [];

    setCriteria(criteriaData);

    const optionMap = {};

    await Promise.all(
      criteriaData.map(async (criterion) => {
        if (!criterion.is_manual) {
          const optionResponse =
            await getAssessmentOptionsByAssessmentCriteria(
              criterion.assessment_criteria_id
            );
          const optionsData = Array.isArray(optionResponse)
            ? optionResponse
            : optionResponse?.options || optionResponse?.data || [];

          optionMap[criterion.assessment_criteria_id] = optionsData;
        }
      })
    );

    setOptions(optionMap);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  const handleScoreChange = (criterionId, value) => {
    setScores((prev) => ({
      ...prev,
      [criterionId]: Number(value),
    }));
  };

  const totalScore = useMemo(() => {
    return Object.values(scores).reduce(
      (sum, score) => sum + Number(score),
      0
    );
  }, [scores]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border p-8 text-center">
        Loading assessment criteria...
      </div>
    );
  }


  const handleSubmit = async () => {
    // Check if every criterion has a score
    const unanswered = criteria.filter(
      (criterion) =>
        scores[criterion.assessment_criteria_id] === undefined ||
        scores[criterion.assessment_criteria_id] === ""
    );

    if (unanswered.length > 0) {
      alert(
        `Please complete all assessment criteria.\nMissing: ${unanswered
          .map((c) => c.name)
          .join(", ")}`
      );
      return;
    }

    // Build the details array expected by the backend
    const details = criteria.map((criterion) => ({
      assessment_criteria_id: criterion.assessment_criteria_id,
      assessment_option_id: null, // We'll replace this with the selected option later
      score: Number(scores[criterion.assessment_criteria_id]),
    }));

    const assessmentData = {
      applicant_id: selectedApplicant.applicant_id,

      // Make sure this property exists in selectedApplicant
      session_id: selectedApplicant.session_id,

      // Replace with the logged-in user's ID later
      evaluator_id: 1,

      total_score: totalScore,

      remarks,

      details,
    };

    try {
      console.log("Submitting:", assessmentData);

      const response = await postRanking(assessmentData);

      console.log(response);

      alert(response.message || "Assessment submitted successfully!");
    } catch (error) {
      console.error(error);

      alert(
        error?.message ||
        error?.response?.data?.message ||
        "Failed to submit assessment."
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow border border-slate-200 overflow-hidden">

      {/* Header */}

      <div className="flex items-center justify-between bg-[#23427C] px-6 py-4">

        <div>

          <h2 className="text-xl font-bold text-white">
            Applicant Assessment
          </h2>

          <p className="text-blue-100 text-sm mt-1">
            {selectedApplicant.last_name},{" "}
            {selectedApplicant.first_name}
          </p>

        </div>

        <div className="bg-blue-500 text-white px-5 py-2 rounded-full font-semibold">
          Total: {totalScore}/100
        </div>

      </div>

      {/* Table Header */}

      <div className="grid grid-cols-3 bg-slate-100 border-b font-semibold">

        <div className="p-4">
          Assessment Criterion
        </div>

        <div className="p-4">
          Assigned Score
        </div>

        <div className="p-4 text-center">
          Current Score
        </div>

      </div>

      {/* Rows */}

      {criteria.map((criterion) => (

        <AssessmentRow
          key={criterion.assessment_criteria_id}
          criterion={criterion}
          options={
            options[
              criterion.assessment_criteria_id
            ] || []
          }
          value={
            scores[
              criterion.assessment_criteria_id
            ]
          }
          onChange={handleScoreChange}
        />

      ))}

      {/* Remarks */}

      <div className="p-6">

        <label className="block font-semibold mb-2">
          Overall Remarks
        </label>

        <textarea
          rows={4}
          value={remarks}
          onChange={(e) =>
            setRemarks(e.target.value)
          }
          placeholder="Enter remarks..."
          className="w-full rounded-xl border border-slate-300 p-3 resize-none focus:ring-2 focus:ring-[#23427C]"
        />

      </div>

      {/* Footer */}

      <div className="flex justify-end gap-3 px-6 pb-6">

        <button
          className="px-6 py-2 rounded-lg border border-slate-300 hover:bg-slate-50"
        >
          Save Draft
        </button>

        <button
        onClick={handleSubmit}
          className="px-6 py-2 rounded-lg bg-[#23427C] text-white hover:bg-[#18305d]"
        >
          Submit Assessment
        </button>

      </div>

    </div>
  );
}