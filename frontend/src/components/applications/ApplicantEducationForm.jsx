import React from 'react';

export default function ApplicantEducationForm({ data, onChange }) {
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden font-sans">
      {/* Header Banner Section */}
      <div className="bg-[#1e4a8a] p-5 pb-4 text-white flex flex-col gap-2">
        <div className="flex items-center gap-3">
          {/* Section Number Badge */}
          <span className="flex items-center justify-center bg-white/20 text-white font-semibold text-sm w-6 h-6 rounded-full">
            4
          </span>
          {/* Header Icon */}
          <svg className="w-5 h-5 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
          <h3 className="text-xl font-medium tracking-wide"> Background Information</h3>
        </div>
      </div>
      
      {/* Subheader / Instruction Bar */}
      <div className="bg-[#163664] px-5 py-2 text-white/90 text-sm border-t border-white/10">
        Provide information about your highest level of completed formal education.
      </div>

      {/* Form Grid Fields */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 bg-[#fcfdfd]">
        {/* Education Level Selection */}
        <div className="space-y-1.5">
          <label className="block text-[15px] font-medium text-gray-800">
            Education Level
          </label>
          <div className="relative">
            <select
              name="education_level"
              value={data.education_level}
              onChange={handleInputChange}
              className="w-full h-11 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-700 appearance-none shadow-sm"
            >
              <option value="">-- SELECT LEVEL --</option>
              <option value="ELEMENTARY">ELEMENTARY</option>
              <option value="SECONDARY">SECONDARY</option>
              <option value="VOCATIONAL">VOCATIONAL</option>
              <option value="COLLEGE">COLLEGE</option>
              <option value="GRADUATE STUDIES">GRADUATE STUDIES</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* School Name */}
        <div className="space-y-1.5">
          <label className="block text-[15px] font-medium text-gray-800">
            Name of School
          </label>
          <input
            type="text"
            name="school_name"
            value={data.school_name}
            placeholder="e.g. UNIVERSITY OF THE PHILIPPINES"
            onChange={handleInputChange}
            className="w-full h-11 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-[#fcfcfc] placeholder-gray-400 text-gray-700 shadow-sm"
          />
        </div>

        {/* Degree / Course */}
        <div className="space-y-1.5">
          <label className="block text-[15px] font-medium text-gray-800">
            Degree / Course
          </label>
          <input
            type="text"
            name="degree_course"
            value={data.degree_course}
            placeholder="e.g. BS COMPUTER SCIENCE (Leave blank if High School/Elem)"
            onChange={handleInputChange}
            className="w-full h-11 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-[#fcfcfc] placeholder-gray-400 text-gray-700 shadow-sm"
          />
        </div>

        {/* Honors & Awards */}
        <div className="space-y-1.5">
          <label className="block text-[15px] font-medium text-gray-800">
            Scholarships, Honors, or Awards Received
          </label>
          <input
            type="text"
            name="honors_awards"
            value={data.honors_awards}
            placeholder="e.g. CUM LAUDE, DOST SCHOLAR (If none, leave blank)"
            onChange={handleInputChange}
            className="w-full h-11 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-[#fcfcfc] placeholder-gray-400 text-gray-700 shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}