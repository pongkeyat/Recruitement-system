import { useEffect, useState } from "react";
import {
  ClipboardCheck,
  Calendar,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { getVacancies } from "../../Api/Vacancies";

export default function ScreeningProgress() {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVacancies();
  }, []);

  const loadVacancies = async () => {
    try {
      setLoading(true);

      const data = await getVacancies();

      const formatted = data.map((item) => {
        const totalApplicants = Number(item.applicants_count || 0);

        const qualified = item.application_status === "Qualified" ? 1 : 0;
        const disqualified = item.application_status === "Disqualified" ? 1 : 0;
        const initialScreening = Math.max(totalApplicants - qualified - disqualified, 0);
        const screened = qualified + disqualified;

        return {
          ...item,
          initialScreening,
          qualified,
          disqualified,
          screened,
          progress:
            totalApplicants > 0
              ? Math.round((screened / totalApplicants) * 100)
              : 0,
        };
      });

      setVacancies(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading vacancies...
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm">

      {/* Header */}

      <div className="bg-[#173B73] text-white rounded-t-xl px-6 py-4 flex items-center gap-2">
        <ClipboardCheck size={20} />
        <h2 className="font-semibold text-lg">
          Screening Progress by Vacancy
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 p-5">

        {vacancies.map((vacancy) => {

          const finished = vacancy.initialScreening === 0 && vacancy.qualified === 0 && vacancy.disqualified === 0;

          return (

            <div
              key={vacancy.vacancy_id}
              className="border rounded-xl p-4 hover:shadow-lg transition"
            >

              {/* Header */}

              <div className="flex justify-between">

                <div>

                  <h3 className="font-bold text-gray-800 text-lg">
                    {vacancy.position_title}
                  </h3>

                  <div className="text-sm mt-1">

                    <span className="bg-blue-100 text-blue-700 rounded px-2 py-1 text-xs font-semibold">
                      {vacancy.vacancy_id}
                    </span>

                    <span className="text-gray-500 ml-2">
                      • SG-{vacancy.salary_grade}
                    </span>

                    <span className="text-gray-500 ml-2">
                      • {vacancy.office_unit}
                    </span>

                  </div>

                </div>

                {finished ? (
                  <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full h-fit">
                    ✓ Done
                  </span>
                ) : (
                  <span className="bg-yellow-400 text-black text-xs px-3 py-1 rounded-full h-fit">
                    {vacancy.initialScreening} initial screening
                  </span>
                )}

              </div>

              {/* Progress */}

              <div className="mt-5 flex justify-between text-sm font-semibold">

                <span>
                  {vacancy.screened}/{vacancy.no_of_slots} screened
                </span>

                <span>{vacancy.progress}%</span>

              </div>

              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className="bg-blue-600 h-full"
                  style={{
                    width: `${vacancy.progress}%`,
                  }}
                />

              </div>

              {/* Stats */}

              <div className="grid grid-cols-3 gap-3 mt-5">

                <div className="bg-yellow-100 rounded-lg text-center py-3">

                  <div className="font-bold text-yellow-600">
                    {vacancy.initialScreening}
                  </div>

                  <div className="text-sm text-gray-600">
                    Initial Screening
                  </div>

                </div>

                <div className="bg-green-100 rounded-lg text-center py-3">

                  <div className="font-bold text-green-600">
                    {vacancy.qualified}
                  </div>

                  <div className="text-sm text-gray-600">
                    Qualified
                  </div>

                </div>

                <div className="bg-red-100 rounded-lg text-center py-3">

                  <div className="font-bold text-red-600">
                    {vacancy.disqualified}
                  </div>

                  <div className="text-sm text-gray-600">
                    Disqualified
                  </div>

                </div>

              </div>

 

            </div>

          );
        })}

      </div>

    </div>
  );
}