import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ClipboardList, Hourglass, UserCheck, Trophy, Eye, UserPlus
} from "lucide-react";
import { getApplications } from "../api/ApplicationApi";

const getStatusStyles = (status) => {
  switch (status) {
    case "Initial Screening": return "bg-orange-100 text-orange-700";
    case "For Assessment": return "bg-violet-100 text-violet-700";
    case "Ranked": return "bg-teal-100 text-teal-700";
    default: return "bg-slate-100 text-slate-700";
  }
};

export default function AllApplication() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Filter out Qualified and Disqualified
  const activeApplications = applications.filter(
    (app) => app.application_status !== "Qualified" && app.application_status !== "Disqualified"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApplications();
        const data = response && response.data ? response.data : response;
        setApplications(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { title: "Active Total", value: activeApplications.length, icon: ClipboardList, color: "border-[#1E3E74]", bg: "bg-slate-100", iconColor: "text-[#1E3E74]" },
    { title: "Initial Screening", value: activeApplications.filter(a => a.application_status === 'Initial Screening').length, icon: Hourglass, color: "border-orange-400", bg: "bg-orange-50", iconColor: "text-orange-500" },
    { title: "For Assessment", value: activeApplications.filter(a => a.application_status === 'For Assessment').length, icon: UserCheck, color: "border-violet-500", bg: "bg-violet-50", iconColor: "text-violet-500" },
    { title: "Ranked", value: activeApplications.filter(a => a.application_status === 'Ranked').length, icon: Trophy, color: "border-teal-500", bg: "bg-teal-50", iconColor: "text-teal-500" },
  ];

  const handleViewApplication = (id) => {
    if (!id) return;
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
            <h1 className="text-4xl font-bold text-[#1E3E74]">Active Applications</h1>
            <p className="text-slate-500">Monitoring pending and in-progress applications</p>
          </div>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-[#1E3E74] px-6 py-3 font-semibold text-white hover:bg-[#17325e]">
          <UserPlus size={20} /> Receive Walk-In Application
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 mb-8">
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
                <td colSpan="6" className="text-center py-10 text-slate-500 font-medium">Loading applications...</td>
              </tr>
            ) : activeApplications.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-slate-500 font-medium">No active applications found.</td>
              </tr>
            ) : (
              activeApplications.map((app, idx) => {
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
                          <Eye size={18} /> View
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