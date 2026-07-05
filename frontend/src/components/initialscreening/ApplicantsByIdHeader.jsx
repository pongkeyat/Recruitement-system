import { ClipboardCheck, FileText, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { getApplicationById } from '../../api/ApplicationApi';

export default function ApplicantsByIdHeader({
  applicationId,
  onBack,
  onViewApplication,
}) {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplication();
  }, [applicationId]);

  const loadApplication = async () => {
    try {
      setLoading(true);

      const data = await getApplicationById(applicationId);

      // depending on your API
      setApplication(data.data || data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
        Loading...
      </div>
    );
  }

  if (!application) return null;

  const applicantName = [
    application.last_name,
    application.first_name,
    application.middle_name,
    application.suffix,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex justify-between items-center p-6">
        {/* Left */}
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <ClipboardCheck className="text-blue-700" size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Initial Screening Checklist
            </h1>

            <p className="mt-1 text-gray-600 text-sm">
              <span className="font-semibold text-blue-700">
                LUSDO-APP-{application.applicant_id}
              </span>

              {" — "}

              {application.office_unit}

              {" — "}

              {application.position_title}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="px-5 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <button
            onClick={onViewApplication}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <FileText size={18} />
            View Full Application
          </button>
        </div>
      </div>
    </div>
  );
}