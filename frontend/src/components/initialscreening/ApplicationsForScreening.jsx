import { useState, useEffect } from "react";
import { getApplications } from "../../api/ApplicationApi";
import {useNavigate} from "react-router-dom";

export default function ApplicationsForScreening() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

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

  const navigate = useNavigate();

  const handleViewApplication = (applicationId) => {
    navigate(`/applicants/${applicationId}`);
  }

  const filtered = applicants.filter((app) => {
    const fullName = `${app.first_name} ${app.last_name}`.toLowerCase();
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
        <h2 className="text-2xl font-bold">Applications</h2>
        <p className="text-gray-500">Review and screen submitted applications.</p>
      </div>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by name or position..."
          className="border p-2 rounded-lg w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="border p-2 rounded-lg" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Initial Screening">Initial Screening</option>
          <option value="Qualified">Qualified</option>
          <option value="Disqualified">Disqualified</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3">Vacancy ID</th>
              <th className="text-left px-4 py-3">Applicant Name</th>
              <th className="text-left px-4 py-3">Position</th>
              <th className="text-left px-4 py-3">Date Received</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="text-center py-10">Loading...</td></tr>
            ) : filtered.length > 0 ? (
              filtered.map((app) => (
                <tr key={app.applicant_id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-4 font-mono text-sm">{app.vacancy_id}</td>
                  <td className="px-4 py-4">
                    <p className="font-semibold">{`${app.last_name}, ${app.first_name} ${app.middle_name || ""}`}</p>
                    <p className="text-sm text-gray-500">{app.email_address}</p>
                  </td>
                  <td className="px-4 py-4">{app.position_title}</td>
                  <td className="px-4 py-4">{app.date_received}</td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold uppercase">
                      {app.application_status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button onClick={() => handleViewApplication(app.applicant_id)} className="text-blue-600 hover:underline font-medium">View</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="text-center py-10 text-gray-500">No applications found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}