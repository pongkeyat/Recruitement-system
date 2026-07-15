import React from "react";

export default function AssessmentRow({
  criterion,
  options = [],
  value,
  onChange,
}) {
  const currentScore = Number(value ?? 0);

  return (
    <div className="grid grid-cols-3 border-b hover:bg-slate-50 transition">

      {/* Criterion */}

      <div className="p-4 font-medium text-slate-700">
        <div>{criterion.name}</div>

        <div className="text-xs text-slate-400 mt-1">
          Maximum: {criterion.max_points} pts
        </div>
      </div>

      {/* Input */}

      <div className="p-4">

        {criterion.is_manual ? (

          <input
            type="number"
            min={0}
            max={criterion.max_points}
            value={value ?? ""}
            onChange={(e) =>
              onChange(
                criterion.assessment_criteria_id,
                Number(e.target.value)
              )
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-[#23427C] outline-none"
          />

        ) : (

          <select
            value={value ?? ""}
            onChange={(e) =>
              onChange(
                criterion.assessment_criteria_id,
                Number(e.target.value)
              )
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white focus:ring-2 focus:ring-[#23427C] outline-none"
          >
            <option value="">
              Select Score
            </option>

            {options.map((option) => (

              <option
                key={option.assessment_option_id}
                value={option.score}
              >
                {option.qualification}
              </option>

            ))}

          </select>

        )}

      </div>

      {/* Current */}

      <div className="flex items-center justify-center font-semibold text-[#23427C]">

        {currentScore} / {criterion.max_points}

      </div>

    </div>
  );
}