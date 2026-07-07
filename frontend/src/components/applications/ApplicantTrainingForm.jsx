import React, { useState } from "react";

// ==========================================
// 1. MAIN APPLICANT FORM (PARENT COMPONENT)
// ==========================================
export default function MainApplicantForm() {
  // Initialize 'trainings' as an empty array in your state object
  const [formData, setFormData] = useState({
    trainings: [] 
  });

  // State handler that updates the array and triggers a re-render
  const handleFormChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full space-y-4">
  {/* Passing down the trainings array and the onChange handler */}
  <ApplicantTrainingForm 
    trainings={formData.trainings} 
    onChange={handleFormChange} 
  />
</div>
  );
}


// ==========================================
// 2. TRAINING FORM (CHILD COMPONENT)
// ==========================================
export function ApplicantTrainingForm({ trainings = [], onChange }) {
  
  // Handles field changes within a specific row index
  const handleItemChange = (index, field, value) => {
    const updatedTrainings = [...trainings];
    updatedTrainings[index] = { ...updatedTrainings[index], [field]: value };
    onChange("trainings", updatedTrainings);
  };

  // Triggers when "+ Add Training" is clicked
  const addTraining = () => {
    const newTraining = {
      training_title: "",
      date_from: "",
      date_to: "",
      hours_attended: 0,
      training_type: "",
      conducted_by: "",
    };
    onChange("trainings", [...trainings, newTraining]);
  };

  // Triggers when "Remove" is clicked
  const removeTraining = (index) => {
    const updatedTrainings = trainings.filter((_, i) => i !== index);
    onChange("trainings", updatedTrainings);
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm font-sans">
      {/* Header Panel */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center space-x-2 text-emerald-800 font-semibold">
          {/* Custom Book Icon matching screenshot */}
          <svg className="w-5 h-5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className="text-sm md:text-base tracking-wide">Relevant Trainings / Seminars</span>
        </div>
        
        <button
          type="button"
          onClick={addTraining}
          className="flex items-center space-x-1 border border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-xs md:text-sm px-3 py-1.5 rounded-md transition-all font-medium"
        >
          <span>+</span>
          <span>Add Training</span>
        </button>
      </div>

      {/* Dynamic Content Panel */}
      <div className="p-4">
        {trainings.length === 0 ? (
          /* Empty State Screen (Image 1 Layout) */
          <div className="flex flex-col items-center justify-center py-12 text-gray-400 space-y-2 border border-dashed border-gray-200 rounded-lg bg-gray-50/40">
            <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="text-xs md:text-sm text-gray-500">No trainings added yet</p>
          </div>
        ) : (
          /* List of Form Rows (Image 2 Layout) */
          <div className="space-y-6">
            {trainings.map((item, index) => (
              <div 
                key={index} 
                className="p-4 border border-gray-200 rounded-xl bg-white space-y-4 shadow-sm"
              >
                {/* Row 1: Title, Dates, Hours, and Type */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  
                  {/* Training / Seminar Title */}
                  <div className="md:col-span-4 flex flex-col space-y-1">
                    <label className="text-xs font-semibold text-gray-700">
                      Training / Seminar Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={item.training_title || ""}
                      onChange={(e) => handleItemChange(index, "training_title", e.target.value)}
                      placeholder="Title of training or seminar"
                      className="w-full p-2 text-xs md:text-sm border border-gray-200 rounded-md bg-gray-50/50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white"
                      required
                    />
                  </div>

                  {/* Date From */}
                  <div className="md:col-span-2 flex flex-col space-y-1">
                    <label className="text-xs font-semibold text-gray-700">Date From</label>
                    <input
                      type="date"
                      value={item.date_from || ""}
                      onChange={(e) => handleItemChange(index, "date_from", e.target.value)}
                      className="w-full p-2 text-xs md:text-sm border border-gray-200 rounded-md bg-gray-50/50 text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>

                  {/* Date To */}
                  <div className="md:col-span-2 flex flex-col space-y-1">
                    <label className="text-xs font-semibold text-gray-700">Date To</label>
                    <input
                      type="date"
                      value={item.date_to || ""}
                      onChange={(e) => handleItemChange(index, "date_to", e.target.value)}
                      className="w-full p-2 text-xs md:text-sm border border-gray-200 rounded-md bg-gray-50/50 text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>

                  {/* Hours */}
                  <div className="md:col-span-1 flex flex-col space-y-1">
                    <label className="text-xs font-semibold text-gray-700">Hours</label>
                    <input
                      type="number"
                      value={item.hours_attended || 0}
                      onChange={(e) => handleItemChange(index, "hours_attended", parseInt(e.target.value) || 0)}
                      min="0"
                      className="w-full p-2 text-xs md:text-sm border border-gray-200 rounded-md bg-gray-50/50 text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>

                  {/* Type Dropdown */}
                  <div className="md:col-span-3 flex flex-col space-y-1">
                    <label className="text-xs font-semibold text-gray-700">Type</label>
                    <select
                      value={item.training_type || ""}
                      onChange={(e) => handleItemChange(index, "training_type", e.target.value)}
                      className="w-full p-2 text-xs md:text-sm border border-gray-200 rounded-md bg-gray-50/50 text-gray-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white"
                    >
                      <option value="">-- Type --</option>
                      <option value="TECHNICAL">Technical</option>
                      <option value="MANAGERIAL">Managerial</option>
                    </select>
                  </div>
                </div>

                {/* Row 2: Conducted By & Remove Button */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  <div className="md:col-span-8 flex flex-col space-y-1">
                    <label className="text-xs font-semibold text-gray-700">Conducted By</label>
                    <input
                      type="text"
                      value={item.conducted_by || ""}
                      onChange={(e) => handleItemChange(index, "conducted_by", e.target.value)}
                      placeholder="Organizer / Institution"
                      className="w-full p-2 text-xs md:text-sm border border-gray-200 rounded-md bg-gray-50/50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>

                  <div className="md:col-span-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeTraining(index)}
                      className="flex items-center space-x-1 border border-rose-200 text-rose-500 hover:bg-rose-50 hover:border-rose-300 text-xs px-4 py-2 rounded-md transition-colors font-medium"
                    >
                      {/* Trash bin icon */}
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}