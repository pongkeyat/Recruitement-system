export default function ApplicantSummaryCard({ application }) {
  if (!application) return null;

  const fullName = [
    application.last_name,
    application.first_name,
    application.middle_name,
    application.suffix,
  ]
    .filter(Boolean)
    .join(", ");

  const initials = `${application.first_name?.[0] || ""}${
    application.last_name?.[0] || ""
  }`.toUpperCase();

  const applicationYear = application.created_at
    ? new Date(application.created_at).getFullYear()
    : new Date().getFullYear();

  const applicantNo = `APP-${applicationYear}-${String(
    application.applicant_id
  ).padStart(5, "0")}`;

  const vacancyNo = `VCY-${applicationYear}-${String(
    application.vacancy_id
  ).padStart(4, "0")}`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">

        {/* Left */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#173F7A] text-yellow-400 flex items-center justify-center text-lg font-bold">
            {initials}
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {fullName}
            </h2>

            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-1">
              <span>{applicantNo}</span>
              <span>•</span>
              <span>{application.sex}</span>
              <span>•</span>
              <span>
                {application.date_of_birth
                  ? new Date(application.date_of_birth).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )
                  : "N/A"}
              </span>
              <span>•</span>
              <span className="truncate max-w-[220px]">
                {application.email_address}
              </span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 w-full lg:w-auto lg:min-w-[250px]">
          <p className="text-[10px] uppercase tracking-wider text-gray-500">
            Position Applied
          </p>

          <h3 className="text-lg font-semibold text-slate-800 mt-1">
            {application.position_title}
          </h3>

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="bg-blue-100 text-blue-700 text-[11px] font-semibold px-2 py-1 rounded-full">
              {vacancyNo}
            </span>

            <span className="text-gray-400">•</span>

            <span className="text-xs text-gray-600">
              {application.office_unit}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}