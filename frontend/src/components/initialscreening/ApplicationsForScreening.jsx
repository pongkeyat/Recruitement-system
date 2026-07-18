import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { getApplications } from "../../api/ApplicationApi";

const getStatusStyles = (status) => {
  switch (status) {
    case "Initial Screening":
      return "bg-orange-100 text-orange-700";
    case "Qualified":
      return "bg-emerald-100 text-emerald-700";
    case "Disqualified":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
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
        const data = response?.data || response;

        if (Array.isArray(data)) {
          const screeningRecords = data.filter((app) => {
            const status = (
              app.application_status || "Initial Screening"
            ).toLowerCase();

            return (
              status === "initial screening" ||
              status === "initial_screening_qualified" ||
              status === "initial_screening_disqualified"
            );
          });

          setApplications(screeningRecords);
        } else {
          console.error("Unexpected response:", response);
          setApplications([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = applications.filter((app) => {
      const fullName = `${app.first_name || ""} ${app.last_name || ""}`.toLowerCase();

      const matchesSearch =
        fullName.includes(search.toLowerCase()) ||
        (app.position_title || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const status = app.application_status || "Initial Screening";

      let matchesStatus = true;

      if (statusFilter === "Initial Screening") {
        matchesStatus = status === "Initial Screening";
      } else if (statusFilter === "Qualified") {
        matchesStatus =
          status === "Qualified" ||
          status === "initial_screening_qualified";
      } else if (statusFilter === "Disqualified") {
        matchesStatus =
          status === "Disqualified" ||
          status === "initial_screening_disqualified";
      }

      return matchesSearch && matchesStatus;
    });

    setFilteredApplications(filtered);
  }, [applications, search, statusFilter]);

  const handleViewApplication = (application) => {
    const routeId = application?.job_applications_id || application?.applicant_id || application?.id;

    if (!routeId) {
      console.warn("Application ID is missing.");
      return;
    }

    console.log("Opening Applicant:", routeId);
    navigate(`/initialScreening/${routeId}`);
  };

  return (
    <div className="min-h-screen p-6">
      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row items-center">
        <input
          type="text"
          placeholder="Search by applicant or position..."
          className="w-full md:w-80 rounded-xl border bg-white p-3 shadow-sm focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="rounded-xl border bg-white p-3 shadow-sm focus:ring-2 focus:ring-blue-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Screening Records</option>
          <option value="Initial Screening">Pending Review</option>
          <option value="Qualified">Screening Passed</option>
          <option value="Disqualified">Screening Failed</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-[#1E3E74] text-white">
            <tr>
              <th className="px-5 py-4 text-left">Application ID</th>
              <th className="px-5 py-4 text-left">Applicant ID</th>
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
                <td colSpan="7" className="py-10 text-center">
                  Loading...
                </td>
              </tr>
            ) : filteredApplications.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-10 text-center">
                  No applicants found.
                </td>
              </tr>
            ) : (
              filteredApplications.map((app) => (
                <tr
                  key={app.applicant_id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    {app.job_applications_id}
                  </td>

                  <td className="px-5 py-4 font-semibold text-blue-700">
                    {app.applicant_id}
                  </td>

                  <td className="px-5 py-4">
                    <div className="font-semibold">
                      {app.last_name}, {app.first_name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {app.email_address}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    {app.position_title}
                  </td>

                  <td className="px-5 py-4">
                    {app.date_received}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusStyles(
                        app.application_status
                      )}`}
                    >
                      {app.application_status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <button
                      onClick={() =>
                        handleViewApplication(app)
                      }
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      <Eye size={16} />
                      Evaluate
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}