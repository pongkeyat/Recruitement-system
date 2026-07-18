import React from "react";
import { Briefcase } from "lucide-react";

export default function WorkExperienceForm({ data, onChange }) {

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    console.log("WORK CHANGE:", name, value);

    onChange(name, value);
  };


  const handleRadioChange = (e) => {
    const value = e.target.value;

    const finalValue =
      value === "true" ? true :
      value === "false" ? false :
      null;

    console.log("GOVT SERVICE:", finalValue);

    onChange("is_govt_service", finalValue);
  };


  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl border border-gray-200 bg-white shadow-sm p-5">

      <div className="flex items-center gap-2 mb-5">
        <Briefcase className="w-5 h-5 text-amber-500" />

        <h2 className="text-lg font-semibold text-gray-700">
          Work Experience
        </h2>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Position Title
          </label>

          <input
            type="text"
            name="position_title"
            value={data.position_title || ""}
            onChange={handleInputChange}
            placeholder="ADMINISTRATIVE OFFICER"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>



        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Company / Office Name
          </label>

          <input
            type="text"
            name="company_office"
            value={data.company_office || ""}
            onChange={handleInputChange}
            placeholder="DEPARTMENT OF HEALTH"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>



        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Date From
          </label>

          <input
            type="date"
            name="date_from"
            value={data.date_from || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>



        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Date To
          </label>

          <input
            type="date"
            name="date_to"
            value={data.date_to || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>



        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Monthly Salary
          </label>

          <input
            type="number"
            name="monthly_salary"
            value={data.monthly_salary || ""}
            onChange={handleInputChange}
            placeholder="30000"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>



        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Appointment Status
          </label>

          <input
            type="text"
            name="appointment_status"
            value={data.appointment_status || ""}
            onChange={handleInputChange}
            placeholder="PERMANENT"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>



        <div className="md:col-span-2 bg-gray-50 border rounded-xl p-4">

          <p className="text-sm font-medium text-gray-700 mb-3">
            Is this item part of Government Service?
          </p>


          <div className="flex gap-6">

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="is_govt_service"
                value="true"
                checked={data.is_govt_service === true}
                onChange={handleRadioChange}
              />
              Yes
            </label>


            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="is_govt_service"
                value="false"
                checked={data.is_govt_service === false}
                onChange={handleRadioChange}
              />
              No
            </label>


            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="is_govt_service"
                value="null"
                checked={data.is_govt_service === null}
                onChange={handleRadioChange}
              />
              Not Specified
            </label>

          </div>

        </div>

      </div>

    </div>
  );
}