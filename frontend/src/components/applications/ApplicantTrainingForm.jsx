import React from "react";

export default function ApplicantTrainingForm({ data, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
      <h3 className="text-xl font-bold text-gray-800">Relevant Training / Seminars Attended</h3>
      <p className="text-sm text-gray-500">Please provide details regarding your most recent or relevant training program.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Training Title */}
        <div className="md:col-span-2 flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Training Title</label>
          <input
            type="text"
            name="training_title"
            value={data.training_title}
            onChange={handleChange}
            placeholder="e.g., ADVANCED REACT AND WEB ARCHITECTURE"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date From */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Date From</label>
          <input
            type="date"
            name="date_from"
            value={data.date_from}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date To */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Date To</label>
          <input
            type="date"
            name="date_to"
            value={data.date_to}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Hours Attended */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Hours Attended</label>
          <input
            type="number"
            name="hours_attended"
            value={data.hours_attended}
            onChange={handleChange}
            placeholder="e.g., 40"
            min="0"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Training Type */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Training Type / Category</label>
          <input
            type="text"
            name="training_type"
            value={data.training_type}
            onChange={handleChange}
            placeholder="e.g., TECHNICAL / MANAGERIAL"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Conducted By */}
        <div className="md:col-span-2 flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Conducted By</label>
          <input
            type="text"
            name="conduct_by" // maps to data.conducted_by via state hook keys
            name="conducted_by"
            value={data.conducted_by}
            onChange={handleChange}
            placeholder="e.g., DEPARTMENT OF INFORMATION AND COMMUNICATIONS TECHNOLOGY"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}