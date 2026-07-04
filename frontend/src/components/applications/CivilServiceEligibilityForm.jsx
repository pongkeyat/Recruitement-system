import React from 'react';

export default function CivilServiceEligibilityForm({ data, onChange }) {
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Civil Service Eligibility</h3>
        <p className="text-sm text-gray-500 mt-1">Provide details regarding your career service or board examination passed (Leave empty if none).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Eligibility Type */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Eligibility Type</label>
          <input
            type="text"
            name="eligibility_type"
            value={data.eligibility_type}
            placeholder="e.g. CAREER SERVICE PROFESSIONAL"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Rating (if applicable)</label>
          <input
            type="number"
            name="rating"
            step="0.01"
            value={data.rating}
            placeholder="e.g. 84.50"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          />
        </div>

        {/* Date of Exam */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Date of Examination</label>
          <input
            type="date"
            name="date_of_exam"
            value={data.date_of_exam}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          />
        </div>

        {/* License Number */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">License Number (if applicable)</label>
          <input
            type="text"
            name="license_number"
            value={data.license_number}
            placeholder="e.g. 0123456"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          />
        </div>

        {/* Place of Exam */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Place of Examination</label>
          <input
            type="text"
            name="place_of_exam"
            value={data.place_of_exam}
            placeholder="e.g. MANILA, PHILIPPINES"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          />
        </div>
      </div>
    </div>
  );
}