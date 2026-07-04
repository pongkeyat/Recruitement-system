import React from 'react';

export default function EqualOpportunityDeclaration({ data, onChange }) {
  const fields = [
    { id: 'is_pwd', label: 'Are you a Person with Disability (PWD)?' },
    { id: 'is_solo_parent', label: 'Are you a Solo Parent?' },
    { id: 'is_indigenous_person', label: 'Do you identify as an Indigenous Person?' }
  ];

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    // Map string values back into native boolean values or null
    const mappedValue = value === 'null' ? null : value === 'true';
    onChange(name, mappedValue);
  };

  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Equal Opportunity Declaration</h3>
        <p className="text-sm text-gray-500 mt-1">
          This declaration is completely voluntary and assists us in tracking our diversity and inclusion performance.
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {fields.map((field) => (
          <div key={field.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <span className="text-sm font-medium text-gray-700">{field.label}</span>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="radio" 
                  name={field.id} 
                  value="true" 
                  checked={data[field.id] === true} 
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">Yes</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="radio" 
                  name={field.id} 
                  value="false" 
                  checked={data[field.id] === false} 
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">No</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="radio" 
                  name={field.id} 
                  value="null" 
                  checked={data[field.id] === null} 
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-400 italic">Prefer not to say</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}