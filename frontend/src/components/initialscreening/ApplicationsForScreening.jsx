import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, Eye, UserPlus } from "lucide-react";
import { getApplications } from "../../api/ApplicationApi";

const getStatusStyles = (status) => {
  switch (status) {
    case "Initial Screening": return "bg-orange-100 text-orange-700";
    case "Qualified": return "bg-emerald-100 text-emerald-700";
    case "Disqualified": return "bg-red-100 text-red-700";
    default: return "bg-slate-100 text-slate-700";
  }
};

export default function ApplicationsForScreening() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getApplications();
        const data = response && response.data ? response.data : response;
        
        if (Array.isArray(data)) {
          // Keep records belonging to the "Initial Screening" stage
          const screeningRecords = data.filter((app) => {
            const status = (app.application_status || "Initial Screening").toLowerCase();
            return (
              status === "initial screening" || 
              status === "initial_screening_qualified" || 
              status === "initial_screening_disqualified"
            );
          });
          
          setApplications(screeningRecords);
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

  // Handle Search and Sub-status filters
  useEffect(() => {
    const records = applications.filter((app) => {
      const firstName = app.first_name || "";
      const lastName = app.last_name || "";
      const fullName = `${firstName} ${lastName}`.toLowerCase();
      const matchSearch = 
        fullName.includes(search.toLowerCase()) || 
        (app.position_title || "").toLowerCase().includes(search.toLowerCase());

      const appStatus = app.application_status || "Initial Screening";
      let matchStatus = true;
      if (statusFilter === "Initial Screening") {
        matchStatus = appStatus === "Initial Screening";
      } else if (statusFilter === "Qualified") {
        matchStatus = appStatus === "Qualified" || appStatus === "initial_screening_qualified";
      } else if (statusFilter === "Disqualified") {
        matchStatus = appStatus === "Disqualified" || appStatus === "initial_screening_disqualified";
      }

      return matchSearch && matchStatus;
    });

    setFilteredApplications(records);
  }, [search, statusFilter, applications]);

  const handleViewApplication = (id) => {
    if (!id) {
      console.warn("Warning: Attempted to navigate with an undefined/null ID!");
      return;
    }
    navigate(`/initialScreening/${id}`);
  };

  return (
    <div className="min-h-screen p-6">


      {/* Filters Toolbar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Search screening pool by name or position..."
          className="border p-3 rounded-xl w-full md:w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          className="border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium text-slate-700" 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Screening Records</option>
          <option value="Initial Screening">Pending Review</option>
          <option value="Qualified">Screening Passed</option>
          <option value="Disqualified">Screening Failed</option>
        </select>
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
              <th className="px-5 py-4 text-center">Screening Status</th>
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
            ) : filteredApplications.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-slate-500 font-medium">
                  No applications matched your criteria in this pool.
                </td>
              </tr>
            ) : (
              filteredApplications.map((app, idx) => {
                const targetId = app.applicant_id || app.application_id || app.job_applications_id || app.id;

                return (
                  <tr key={targetId || idx} className="border-b hover:bg-slate-50">
                    <td className="px-5 py-4 font-medium text-[#1E3E74]">{app.vacancy_id}</td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-700">
                        {app.last_name && app.first_name ? `${app.last_name}, ${app.first_name}` : "Unknown"}
                      </p>
                      <p className="text-xs text-gray-400">{app.email_address}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-600 font-medium">{app.position_title || "N/A"}</td>
                    <td className="px-5 py-4 text-slate-600">{app.date_received || "N/A"}</td>
                    <td className="px-5 py-4 text-center">
                      <span className={`rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider ${getStatusStyles(app.application_status || "Initial Screening")}`}>
                        {app.application_status || "Initial Screening"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleViewApplication(targetId)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
                        >
                          <Eye size={16} />
                          Evaluate
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