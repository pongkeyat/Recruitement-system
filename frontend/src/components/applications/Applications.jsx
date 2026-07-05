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
        <div className="rounded-[24px] bg-white shadow-md overflow-hidden border border-gray-200">

            {/* Header */}
            <div className="bg-[#234C86] px-6 py-5 flex items-center gap-4">
            <div className="w-9 h-5 rounded-full bg-white/15 flex items-center justify-center text-white font-semibold">
                1
            </div>

            <Briefcase size={18} className="text-white" />

            <h2 className="text-white font-semibold text-[28px] leading-none">
                Vacancy / Position Applied For
            </h2>
            </div>

            {/* Body */}
            <div className="p-6">

            {/* First Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Vacancy */}
                <div className="lg:col-span-2">
                <label className="block text-[17px] font-semibold text-gray-800 mb-2">
                    Select Vacancy Posting
                    <span className="text-red-500"> *</span>
                </label>

                <select
                    value={form.vacancy_id}
                    onChange={(e) =>
                    handleLocalChange("vacancy_id", e.target.value)
                    }
                    className="w-full h-[50px] rounded-xl border border-gray-300 bg-[#F8FAFC] px-5 text-gray-600 text-[16px] outline-none focus:ring-2 focus:ring-blue-300"
                >
                    <option value="">
                    -- Select Position / Vacancy --
                    </option>

                    {loading && (
                    <option disabled>Loading...</option>
                    )}

                    {!loading &&
                    vacancies.map((vacancy) => (
                        <option
                        key={vacancy.vacancy_id}
                        value={vacancy.vacancy_id}
                        >
                        {vacancy.position_title}
                        </option>
                    ))}

                    {!loading &&
                    vacancies.length === 0 && (
                        <option disabled>
                        No vacancies available
                        </option>
                    )}
                </select>
                </div>

                {/* Date */}
                <div>
                <label className="block text-[17px] font-semibold text-gray-800 mb-2">
                    Date Received
                    <span className="text-red-500"> *</span>
                </label>

                <div className="relative">
                    <input
                    type="date"
                    value={form.dateReceived}
                    onChange={(e) =>
                        handleLocalChange(
                        "dateReceived",
                        e.target.value
                        )
                    }
                    className="w-full h-[50px] rounded-xl border border-gray-300 bg-[#F8FAFC] px-5 pr-12 text-[16px] outline-none focus:ring-2 focus:ring-blue-300"
                    />

                    <CalendarDays
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                    />
                </div>
                </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

                {/* Time */}
                <div>
                <label className="block text-[17px] font-semibold text-gray-800 mb-2">
                    Time Received
                    <span className="text-red-500"> *</span>
                </label>

                <div className="relative">
                    <input
                    type="text"
                    readOnly
                    value={form.timeReceived}
                    className="w-full h-[50px] rounded-xl border border-gray-300 bg-[#F8FAFC] px-5 pr-12 text-[16px]"
                    />

                    <Clock3
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                </div>
                </div>

                {/* Received By */}
                <div>
                <label className="block text-[17px] font-semibold text-gray-800 mb-2">
                    Received By
                </label>

                <input
                    type="text"
                    readOnly
                    value={form.receivedBy}
                    className="w-full h-[50px] rounded-xl border border-gray-300 bg-[#F8FAFC] px-5 text-[16px]"
                />
                </div>

                {/* Submission Type */}
                <div>
                <label className="block text-[17px] font-semibold text-gray-800 mb-2">
                    Submission Type
                </label>

                <input
                    type="text"
                    readOnly
                    value={form.submissionType}
                    className="w-full h-[50px] rounded-xl border border-gray-300 bg-[#F8FAFC] px-5 text-[16px]"
                />
                </div>
            </div>
            </div>
        </div>
        );
}

export default Applications;