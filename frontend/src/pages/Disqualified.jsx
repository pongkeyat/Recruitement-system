import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { getApplications } from "../api/ApplicationApi";
import DisqualifiedApplicantsHeader from "../components/disqualified/DisqualifiedApplicantsHeader";

const getStatusStyles = (status) => {
  switch (status) {
    case "Disqualified":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

export default function Disqualified() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApplications();
        const data = response?.data || response;

        if (Array.isArray(data)) {
          setApplications(
            data.filter(
              (app) =>
                app.application_status?.toLowerCase() === "disqualified"
            )
          );
        } else {
          setApplications([]);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewApplication = (id) => {
    navigate(`/applicants/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#edf2f8] p-6">
      <DisqualifiedApplicantsHeader
        onBack={() => navigate("/applications-screening")}
      />

      <div className="mt-6 rounded-3xl bg-white shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-[#1E3E74] text-white">
            <tr>
              <th className="px-5 py-4 text-left">Vacancy ID</th>
              <th className="px-5 py-4 text-left">Applicant Name</th>
              <th className="px-5 py-4 text-left">Position</th>
              <th className="px-5 py-4 text-left">Date Applied</th>
              <th className="px-5 py-4 text-center">Status</th>
              <th className="px-5 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="6"
                  className="py-10 text-center text-slate-500 font-medium"
                >
                  Loading disqualified applicants...
                </td>
              </tr>
            ) : applications.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="py-10 text-center text-slate-500 font-medium"
                >
                  No disqualified applicants found.
                </td>
              </tr>
            ) : (
              applications.map((app, index) => {
                const targetId =
                  app.applicant_id ||
                  app.application_id ||
                  app.job_applications_id ||
                  app.id;

                return (
                  <tr
                    key={targetId || index}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 font-medium text-[#1E3E74]">
                      {app.vacancy_id}
                    </td>

                    <td className="px-5 py-4 font-semibold text-slate-700">
                      {app.last_name && app.first_name
                        ? `${app.last_name}, ${app.first_name}`
                        : "Unknown"}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {app.position_title || "N/A"}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {app.date_received || "N/A"}
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span
                        className={`rounded-full px-4 py-1 text-sm font-semibold ${getStatusStyles(
                          app.application_status
                        )}`}
                      >
                        {app.application_status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleViewApplication(targetId)}
                          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                        >
                          <Eye size={18} />
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}