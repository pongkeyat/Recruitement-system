import React from 'react';

export default function ApplicantEducationForm({ data, onChange }) {
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Highest Educational Background</h3>
        <p className="text-sm text-gray-500 mt-1">Provide information about your highest level of completed formal education.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Education Level Selection */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Education Level</label>
          <select
            name="education_level"
            value={data.education_level}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-700"
          >
            <option value="">-- SELECT LEVEL --</option>
            <option value="ELEMENTARY">ELEMENTARY</option>
            <option value="SECONDARY">SECONDARY</option>
            <option value="VOCATIONAL">VOCATIONAL</option>
            <option value="COLLEGE">COLLEGE</option>
            <option value="GRADUATE STUDIES">GRADUATE STUDIES</option>
          </select>
        </div>

        {/* School Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Name of School</label>
          <input
            type="text"
            name="school_name"
            value={data.school_name}
            placeholder="e.g. UNIVERSITY OF THE PHILIPPINES"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          />
        </div>

        {/* Degree / Course */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Degree / Course</label>
          <input
            type="text"
            name="degree_course"
            value={data.degree_course}
            placeholder="e.g. BS COMPUTER SCIENCE (Leave blank if High School/Elem)"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          />
        </div>

        {/* Honors & Awards */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Scholarships, Honors, or Awards Received</label>
          <input
            type="text"
            name="honors_awards"
            value={data.honors_awards}
            placeholder="e.g. CUM LAUDE, DOST SCHOLAR (If none, leave blank)"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          />
        </div>
      </div>
    </div>
  );
}