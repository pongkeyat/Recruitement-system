import { useEffect, useState } from "react";
import { Briefcase, Clock3 } from "lucide-react";
import { getVacancies } from "../../api/Vacancies";

function Applications({ formData, onChange }) {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackForm = {
    vacancy_id: "",
    dateReceived: new Date().toISOString().split("T")[0],
    timeReceived: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' }),
    receivedBy: "System Administrator",
    submissionType: "Walk-In",
  };

  const form = formData ?? fallbackForm;

  const handleLocalChange = (name, value) => {
    if (onChange) {
      onChange(name, value);
    }
  };

  useEffect(() => {
    const loadVacancies = async () => {
      try {
        const data = await getVacancies();
        setVacancies(data || []);
      } catch (err) {
        console.error("Failed to load vacancies:", err);
      } finally {
        setLoading(false);
      }
    };
    loadVacancies();
  }, []);

  return (
    <div className="rounded-[20px] bg-white shadow-sm border border-gray-200 overflow-hidden">
            
            {/* --- Header for Card 1 (Vacancy / Position Applied For) --- */}
        <div className="bg-[#1e407a] px-6 py-4 rounded-t-[20px] text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
            {/* Uniform Badge */}
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 text-white font-bold text-sm">
            1
            </div>
            <Briefcase size={20} />
            <h2 className="text-lg font-semibold">Vacancy / Position Applied For</h2>
        </div>
        </div>
      {/* Body */}
      <div className="p-6">
        {/* First Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Select Vacancy Posting <span className="text-red-500">*</span>
            </label>
            <select
              value={form.vacancy_id}
              onChange={(e) => handleLocalChange("vacancy_id", e.target.value)}
              className="w-full h-11 rounded-lg border border-gray-300 bg-gray-50 px-4 text-gray-700 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="">-- Select Position / Vacancy --</option>
              {!loading && vacancies.map((v) => (
                <option key={v.vacancy_id} value={v.vacancy_id}>{v.position_title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Date Received <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={form.dateReceived}
              onChange={(e) => handleLocalChange("dateReceived", e.target.value)}
              className="w-full h-11 rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Time Received <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={form.timeReceived}
                className="w-full h-11 rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm"
              />
              <Clock3 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Received By
            </label>
            <input
              type="text"
              readOnly
              value={form.receivedBy}
              className="w-full h-11 rounded-lg border border-gray-200 bg-gray-100 px-4 text-sm text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Submission Type
            </label>
            <input
              type="text"
              readOnly
              value={form.submissionType}
              className="w-full h-11 rounded-lg border border-gray-200 bg-gray-100 px-4 text-sm text-gray-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Applications;