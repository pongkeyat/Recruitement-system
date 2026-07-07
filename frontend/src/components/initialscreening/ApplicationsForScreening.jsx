import { useState, useEffect } from "react";
import { getApplications } from "../../api/ApplicationApi";
import { useNavigate } from "react-router-dom";

export default function ApplicationsForScreening() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getApplications();
        setApplicants(Array.isArray(data) ? data : (data.data || []));
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const handleViewApplication = (id) => {
    if (!id) {
      console.warn("Warning: Attempted to navigate with an undefined/null ID!");
      return;
    }
    navigate(`/initialScreening/${id}`);
  };

  const filtered = applicants.filter((app) => {
    const firstName = app.first_name || "";
    const lastName = app.last_name || "";
    const fullName = `${firstName} ${lastName}`.toLowerCase();
    
    const nameMatch = fullName.includes(search.toLowerCase());
    const positionMatch = app.position_title?.toLowerCase().includes(search.toLowerCase());
    const matchSearch = nameMatch || positionMatch;
    
    const appStatus = (app.application_status || "Initial Screening").toString();
    const matchStatus = filter === "All" || appStatus === filter;
    
    return matchSearch && matchStatus;
  });

  return (
    <div className="bg-white rounded-2xl shadow mt-8 p-6">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-800">Applications</h2>
        <p className="text-gray-500">Review and screen submitted applications.</p>
      </div>

      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name or position..."
          className="border p-2 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Initial Screening">Initial Screening</option>
          <option value="Qualified">Qualified</option>
          <option value="Disqualified">Disqualified</option>
        </select>
      </div>

      <div className="overflow-x-auto border rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Vacancy ID</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Applicant Name</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Position</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Received</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">Loading applications...</td>
              </tr>
            ) : filtered.length > 0 ? (
              filtered.map((app) => (
                <tr key={app.applicant_id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-mono text-sm text-gray-600">{app.vacancy_id}</td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-800">
                      {`${app.last_name || ""}, ${app.first_name || ""} ${app.middle_name || ""}`.trim()}
                    </p>
                    <p className="text-sm text-gray-500">{app.email_address}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{app.position_title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{app.date_received}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold uppercase tracking-wider">
                      {app.application_status || "Initial Screening"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button 
                      onClick={() => handleViewApplication(app.applicant_id)} 
                      className="text-blue-600 hover:text-blue-800 hover:underline font-semibold transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">No applications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}