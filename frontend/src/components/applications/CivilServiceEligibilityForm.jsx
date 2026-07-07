import React from 'react';
import { PlusCircle, Trash2, CheckCircle2 } from 'lucide-react';

const ELIGIBILITY_OPTIONS = [
  "CAREER SERVICE PROFESSIONAL",
  "CAREER SERVICE SUBPROFESSIONAL",
  "RA 1080 (BOARD/BAR)",
  "PD 907",
  "HONOR GRADUATE",
  "SKILLS TEST/PRACTICAL EXAM",
  "OTHERS",
];

const emptyEntry = () => ({
  id: (typeof crypto !== "undefined" && crypto.randomUUID)
    ? crypto.randomUUID()
    : `entry_${Date.now()}_${Math.random().toString(16).slice(2)}`,
  eligibility_type: "",
  rating: "",
  date_of_exam: "",
  place_of_exam: "",
  license_number: "",
});

export default function CivilServiceEligibilityForm({ data, onChange }) {

  let safeData = data;

  if (!Array.isArray(safeData)) {
    if (safeData && typeof safeData === "object") {
      console.warn(
        "[CivilServiceEligibilityForm] `data` prop is an object, not an array. " +
        "Update the parent to use array-based state (see integration example)."
      );
      const hasContent = Object.values(safeData).some((v) => v !== "" && v != null);
      safeData = hasContent ? [{ ...emptyEntry(), ...safeData }] : [];
    } else {
      safeData = [];
    }
  }

  const safeOnChange = typeof onChange === "function"
    ? onChange
    : (next) => {
        console.error(
          "[CivilServiceEligibilityForm] No `onChange` function was passed. Update dropped:",
          next
        );
      };

  const handleAddEligibility = () => {
    safeOnChange([...safeData, emptyEntry()]);
  };

  const handleRemove = (id) => {
    safeOnChange(safeData.filter((entry) => entry.id !== id));
  };

  const handleFieldChange = (id, field, value) => {
    safeOnChange(
      safeData.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm space-y-4">

      <div className="flex items-start justify-between">
        <h3 className="text-sm font-semibold text-gray-900">
          Civil Service Eligibility <span className="text-red-500">*</span>
        </h3>

        <button
          type="button"
          onClick={handleAddEligibility}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 text-sm font-medium transition"
        >
          <PlusCircle size={16} />
          Add Eligibility
        </button>
      </div>

      {safeData.length === 0 ? (
        <div className="border border-gray-200 rounded-lg py-10 flex flex-col items-center justify-center text-center">
          <CheckCircle2 size={22} className="text-gray-300 mb-2" />
          <p className="text-sm text-blue-500">
            Click "Add Eligibility" to add civil service eligibility
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {safeData.map((entry) => (
            <div
              key={entry.id}
              className="border border-gray-200 rounded-lg p-3 grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto] gap-3 items-end"
            >
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Eligibility Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={entry.eligibility_type || ""}
                  onChange={(e) =>
                    handleFieldChange(entry.id, "eligibility_type", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                >
                  <option value="">-- Select Eligibility --</option>
                  {ELIGIBILITY_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Rating</label>
                <input
                  type="number"
                  step="0.01"
                  value={entry.rating || ""}
                  placeholder="e.g. 81.25"
                  onChange={(e) => handleFieldChange(entry.id, "rating", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Date of Exam</label>
                <input
                  type="date"
                  value={entry.date_of_exam || ""}
                  onChange={(e) => handleFieldChange(entry.id, "date_of_exam", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Place of Exam</label>
                <input
                  type="text"
                  value={entry.place_of_exam || ""}
                  placeholder="City/Province"
                  onChange={(e) => handleFieldChange(entry.id, "place_of_exam", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">License #</label>
                <input
                  type="text"
                  value={entry.license_number || ""}
                  placeholder="—"
                  onChange={(e) => handleFieldChange(entry.id, "license_number", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                />
              </div>

              <div className="flex justify-center md:justify-end">
                <button
                  type="button"
                  onClick={() => handleRemove(entry.id)}
                  className="p-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition"
                  aria-label="Remove eligibility"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}