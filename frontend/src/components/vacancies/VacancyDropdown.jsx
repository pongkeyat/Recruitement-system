import { useEffect, useState } from "react";
import { getVacancies } from "../../api/Vacancies";

function VacancyDropdown({ value, onChange, className = "" }) {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full h-11 rounded-lg border border-gray-300 bg-gray-50 px-4 text-gray-700 text-sm outline-none focus:ring-2 focus:ring-blue-100 ${className}`}
      disabled={loading}
    >
      <option value="">
        {loading ? "Loading vacancies..." : "-- Select Position / Vacancy --"}
      </option>
      {!loading &&
        vacancies.map((v) => (
          <option key={v.vacancy_id} value={v.vacancy_id}>
            {v.position_title}
          </option>
        ))}
    </select>
  );
}

export default VacancyDropdown;