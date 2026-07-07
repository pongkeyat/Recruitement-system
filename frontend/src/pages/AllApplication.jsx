import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ClipboardList, Hourglass, UserCheck, UserX, Trophy, Eye, UserPlus
} from "lucide-react";
import { getApplications } from "../api/ApplicationApi";

const getStatusStyles = (status) => {
  switch (status) {
    case "Initial Screening": return "bg-orange-100 text-orange-700";
    case "Qualified": return "bg-emerald-100 text-emerald-700";
    case "Disqualified": return "bg-red-100 text-red-700";
    case "For Assessment": return "bg-violet-100 text-violet-700";
    case "Ranked": return "bg-teal-100 text-teal-700";
    default: return "bg-slate-100 text-slate-700";
  }
};

export default function AllApplication() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApplications();
        const data = response && response.data ? response.data : response;
        
        if (Array.isArray(data)) {
          // 💡 DIAGNOSTIC LOG: See what properties exist on your objects
          if (data.length > 0) {
            console.log("Keys available in your application records:", Object.keys(data[0]));
            console.log("Sample record structure:", data[0]);
          }
          setApplications(data);
        } else {
          console.error("Data is not in expected array format:", response);
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

  const initialScreeningCount = applications.filter((app) => {
  const status = (app.application_status || "").toLowerCase();
  return status === "initial screening" || status === "initial_screening_qualified" || status === "initial_screening_disqualified";
  }).length;

  const stats = [
    { title: "Total", value: applications.length, icon: ClipboardList, color: "border-[#1E3E74]", bg: "bg-slate-100", iconColor: "text-[#1E3E74]" },
    { title: "Initial Screening", value: initialScreeningCount, icon: Hourglass, color: "border-orange-400", bg: "bg-orange-50", iconColor: "text-orange-500" },
    { title: "Qualified", value: applications.filter(a => a.application_status === 'Qualified').length, icon: UserCheck, color: "border-emerald-500", bg: "bg-emerald-50", iconColor: "text-emerald-500" },
    { title: "Disqualified", value: applications.filter(a => a.application_status === 'Disqualified').length, icon: UserX, color: "border-red-500", bg: "bg-red-50", iconColor: "text-red-500" },
    { title: "For Assessment", value: applications.filter(a => a.application_status === 'For Assessment').length, icon: ClipboardList, color: "border-violet-500", bg: "bg-violet-50", iconColor: "text-violet-500" },
    { title: "Ranked", value: applications.filter(a => a.application_status === 'Ranked').length, icon: Trophy, color: "border-emerald-600", bg: "bg-emerald-50", iconColor: "text-emerald-600" },
  ];

  const handleViewApplication = (id) => {
    if (!id) {
      console.warn("Warning: Attempted to navigate with an undefined/null ID!");
      return;
    }
    navigate(`/applicants/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#edf2f8] p-6">
      {/* Header */}
      <div className="rounded-3xl bg-white shadow p-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
            <ClipboardList className="text-[#1E3E74]" size={34} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[#1E3E74]">All Applications</h1>
            <p className="text-slate-500">Manage and monitor all submitted applications</p>
          </div>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-[#1E3E74] px-6 py-3 font-semibold text-white hover:bg-[#17325e]">
          <UserPlus size={20} /> Receive Walk-In Application
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-6 mb-8">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className={`rounded-3xl border-t-4 ${item.color} bg-white p-6 shadow`}>
              <div className="flex items-center gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}>
                  <Icon size={28} className={item.iconColor} />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-slate-800">{item.value}</h2>
                  <p className="font-medium text-slate-500">{item.title}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Section */}
      <div className="rounded-3xl bg-white shadow overflow-hidden">
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
                <td colSpan="6" className="text-center py-10 text-slate-500 font-medium">
                  Loading applications...
                </td>
              </tr>
            ) : applications.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-slate-500 font-medium">
                  No applications found.
                </td>
              </tr>
            ) : (
              applications.map((app, idx) => {
                // 💡 Fallback Strategy: check applicant_id, application_id, or job_applications_id
                const targetId = app.applicant_id || app.application_id || app.job_applications_id || app.id;

                return (
                  <tr key={targetId || idx} className="border-b hover:bg-slate-50">
                    <td className="px-5 py-4 font-medium text-[#1E3E74]">{app.vacancy_id}</td>
                    <td className="px-5 py-4 font-semibold text-slate-700">
                      {app.last_name && app.first_name ? `${app.last_name}, ${app.first_name}` : "Unknown"}
                    </td>
                    <td className="px-5 py-4 text-slate-600">{app.position_title || "N/A"}</td>
                    <td className="px-5 py-4 text-slate-600">{app.date_received || "N/A"}</td>
                    <td className="px-5 py-4 text-center">
                      <span className={`rounded-full px-4 py-1 text-sm font-semibold ${getStatusStyles(app.application_status)}`}>
                        {app.application_status || "Unknown"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleViewApplication(targetId)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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