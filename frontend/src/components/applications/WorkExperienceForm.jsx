import React, { useState } from 'react';
import { Trash2, Plus, Briefcase } from 'lucide-react';

// ==========================================
// 1. MAIN PARENT COMPONENT
// ==========================================
export default function WorkExperienceList() {
  const [experiences, setExperiences] = useState([]);

  // Add a new empty form instance
  const addExperience = () => {
    const newExperience = {
      id: crypto.randomUUID(), // Unique identifier for key mapping
      position_title: '',
      company_office: '',
      date_from: '',
      date_to: '',
      monthly_salary: '',
      appointment_status: '',
      is_govt_service: null,
    };
    setExperiences([...experiences, newExperience]);
  };

  // Remove a specific form instance by index
  const removeExperience = (indexToRemove) => {
    setExperiences(experiences.filter((_, index) => index !== indexToRemove));
  };

  // Update a single input value within a specific experience card
  const handleExperienceChange = (indexToUpdate, fieldName, value) => {
    setExperiences(
      experiences.map((exp, index) =>
        index === indexToUpdate ? { ...exp, [fieldName]: value } : exp
      )
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 p-4">
      {/* Header Bar with Add Experience Button */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-amber-500 fill-amber-500" />
          <h2 className="text-md font-semibold text-gray-700">
            Work Experience <span className="text-xs font-normal text-gray-400">(Most recent first)</span>
          </h2>
        </div>
        <button
          type="button"
          onClick={addExperience}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-amber-500 border border-amber-500 rounded hover:bg-amber-50 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {/* Conditional Empty State rendering (Image 2) */}
      {experiences.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed border-gray-200 rounded-xl bg-white text-gray-400 space-y-2">
          <Briefcase className="w-10 h-10 stroke-1 text-gray-300" />
          <p className="text-sm">No work experience added yet</p>
        </div>
      ) : (
        /* Rendered List of Form Blocks (Image 1 style with delete button) */
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <WorkExperienceForm
              key={exp.id}
              data={exp}
              onChange={(name, value) => handleExperienceChange(index, name, value)}
              onRemove={() => removeExperience(index)}
              showRemove={true} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. CHILD COMPONENT (Individual Form Card)
// ==========================================
function WorkExperienceForm({ data, onChange, onRemove, showRemove = false }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    const mappedValue = value === 'null' ? null : value === 'true';
    onChange('is_govt_service', mappedValue);
  };

  return (

     <div className="w-full max-w-5xl mx-auto rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Most Recent Work Experience</h3>
          <p className="text-sm text-gray-500 mt-1">
            Provide information about your current or most recent employment history (Leave empty if none).
          </p>
        </div>

        {/* Action Button: Matches Image 1 layout logic but contains the remove feature from Image 2 */}
        {showRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1 shrink-0 px-3 py-1.5 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </button>
        )}
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
                name={`is_govt_service_${data.id}`}
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
                name={`is_govt_service_${data.id}`}
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
                name={`is_govt_service_${data.id}`}
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