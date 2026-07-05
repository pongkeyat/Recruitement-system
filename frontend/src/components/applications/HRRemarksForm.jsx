import React from "react";

export default function HRRemarksForm({ data, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
      <h3 className="text-xl font-bold text-gray-800">HR Remarks & Evaluation</h3>
      <p className="text-sm text-gray-500">Internal evaluation notes and baseline status for this initial application intake.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Application Status Selection */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Initial Application Status</label>
          <select
            name="application_status"
            value={data.application_status}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Status --</option>
            {/* CHANGE THIS VALUE TO "Initial Screening" */}
            <option value="Initial Screening">Initial Screening</option>
            <option value="Qualified">Qualified</option>
            <option value="Disqualified">Disqualified</option>
          </select>
        </div>

        {/* HR Evaluation Remarks Notes */}
        <div className="md:col-span-3 flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Evaluation Notes / Remarks</label>
          <textarea
            name="hr_remarks_notes"
            value={data.hr_remarks_notes}
            onChange={handleChange}
            placeholder="Add internal verification notes, document discrepancies, or screening observations..."
            rows={4}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </div>
      </div>
    </div>
  );
}