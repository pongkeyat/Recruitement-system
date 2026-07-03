import { useEffect, useState } from "react";
import { Briefcase, CalendarDays, Clock3, Check } from "lucide-react";
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
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

            {/* Header */}
            <div className="bg-[#183B74] text-white px-6 py-4 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                    1
                </div>
                <Briefcase size={18} />
                <h2 className="text-lg font-semibold">
                    Vacancy / Position Applied For
                </h2>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">

                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    {/* Vacancy Dropdown */}
                    <div className="md:col-span-2">
                        <label className="block mb-2 font-medium text-gray-700">
                            Select Vacancy Posting
                            <span className="text-red-500"> *</span>
                        </label>

                        <select
                            value={form.vacancy_id}
                            onChange={(e) => handleLocalChange('vacancy_id', e.target.value)}
                            className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                                !form.vacancy_id ? "border-red-400 focus:ring-red-300" : "border-gray-300"
                            }`}
                        >
                            {/* 1. Base placeholder option */}
                            <option value="">-- Select Position / Vacancy --</option>

                            {/* 2. Wrapped in a fragment container to explicitly group dynamic children */}
                            <>
                                {loading && (
                                    <option value="" disabled>Loading...</option>
                                )}

                                {!loading && vacancies.length > 0 && (
                                    vacancies.map((vacancy) => (
                                        <option key={vacancy.vacancy_id ?? vacancy.id} value={vacancy.vacancy_id}>
                                            {vacancy.position_title}
                                        </option>
                                    ))
                                )}

                                {!loading && vacancies.length === 0 && (
                                    <option value="" disabled>No vacancies available</option>
                                )}
                            </>
                        </select>

                        {!form.vacancy_id && (
                            <p className="text-red-500 text-sm mt-1">
                                Please select a vacancy.
                            </p>
                        )}
                    </div>

                    {/* Date Input */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Date Received
                            <span className="text-red-500"> *</span>
                        </label>

                        <div className="relative">
                            <input
                                type="date"
                                value={form.dateReceived}
                                onChange={(e) => handleLocalChange('dateReceived', e.target.value)}
                                className="w-full rounded-xl border border-emerald-500 px-4 py-3 pr-20 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                            />
                        </div>
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    {/* Time Input */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Time Received
                            <span className="text-red-500"> *</span>
                        </label>

                        <div className="relative">
                            <input
                                type="time" // Switched to time input type
                                value={form.timeReceived}
                                readOnly
                                className="w-full rounded-xl border border-emerald-500 px-4 py-3 pr-20 bg-gray-50 focus:outline-none"
                            />
    
                        </div>
                    </div>

                    {/* Received By */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Received By
                        </label>
                        <input
                            type="text"
                            value={form.receivedBy}
                            readOnly
                            className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-600"
                        />
                    </div>

                    {/* Submission Type */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Submission Type
                        </label>
                        <input
                            type="text"
                            value={form.submissionType}
                            readOnly
                            className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-600"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Applications;