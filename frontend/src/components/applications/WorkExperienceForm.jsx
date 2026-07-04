import React from 'react';

export default function WorkExperienceForm({ data, onChange }) {
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    // Map string input back to actual native boolean values or null
    const mappedValue = value === 'null' ? null : value === 'true';
    onChange('is_govt_service', mappedValue);
  };

  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Most Recent Work Experience</h3>
        <p className="text-sm text-gray-500 mt-1">Provide information about your current or most recent employment history (Leave empty if none).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Position Title */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Position Title</label>
          <input
            type="text"
            name="position_title"
            value={data.position_title}
            placeholder="e.g. ADMINISTRATIVE OFFICER V"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          />
        </div>

        {/* Company / Office Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Company / Office Name</label>
          <input
            type="text"
            name="company_office"
            value={data.company_office}
            placeholder="e.g. DEPARTMENT OF HEALTH"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          />
        </div>

        {/* Date From */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Date From</label>
          <input
            type="date"
            name="date_from"
            value={data.date_from}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          />
        </div>

        {/* Date To */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Date To</label>
          <input
            type="date"
            name="date_to"
            value={data.date_to}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          />
        </div>

        {/* Monthly Salary */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Monthly Salary (₱)</label>
          <input
            type="number"
            name="monthly_salary"
            value={data.monthly_salary}
            placeholder="e.g. 35000"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          />
        </div>

        {/* Appointment Status */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Status of Appointment</label>
          <input
            type="text"
            name="appointment_status"
            value={data.appointment_status}
            placeholder="e.g. PERMANENT, CASUAL, CONTRACTUAL"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          />
        </div>

        {/* Is Government Service Radio Selection */}
        <div className="md:col-span-2 p-3 bg-gray-50 border border-gray-200 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
          <span className="text-sm font-medium text-gray-700">Is this item part of Government Service?</span>
          
          <div className="flex gap-4 text-sm">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="is_govt_service" 
                value="true" 
                checked={data.is_govt_service === true} 
                onChange={handleRadioChange}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700 font-medium">Yes</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="is_govt_service" 
                value="false" 
                checked={data.is_govt_service === false} 
                onChange={handleRadioChange}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700 font-medium">No</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="is_govt_service" 
                value="null" 
                checked={data.is_govt_service === null} 
                onChange={handleRadioChange}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-400 italic">Not Specified</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}