import React from 'react';
import { FileCheck } from 'lucide-react';

export default function DocumentChecklist({ documents, onChange }) {
  const requirements = [
    { field: "has_application_letter", label: "Letter of intent addressed to the Head of Office or highest human resource officer" },
    { field: "has_personal_data_sheet", label: "Duly accomplished Personal Data Sheet (PDS) (CS Form No. 212, Revised 2017) and Work Experience Sheet, if applicable" },
    { field: "has_tin_id_or_verification", label: "Photocopy of valid and updated PRC License/ID, if applicable" },
    { field: "has_civil_service_eligibility_cert", label: "Photocopy of Certificate of Eligibility/Report of Rating, if applicable" },
    { field: "has_transcript_of_records", label: "Photocopy of scholastic/academic record such as Transcript of Records (TOR) and Diploma, including completion of graduate and post-graduate units/degrees, if available" },
    { field: "has_training_certificates", label: "Photocopy of Certificate/s of Training, if applicable" },
    { field: "has_service_record", label: "Photocopy of Certificate of Employment, Contract of Service, or duly signed Service Record, whichever is applicable" },
    { field: "has_oath_of_office", label: "Photocopy of latest appointment, if applicable" },
    { field: "has_performance_rating", label: "Photocopy of the Performance Ratings in the last rating period(s) covering one (1) year prior to the deadline of submission, if applicable" },
    { field: "has_birth_certificate", label: "Checklist of Requirements and Omnibus Sworn Statement on the Certification on the Authenticity and Veracity (CAV) and Data Privacy Consent Form" },
    { field: "has_cert_of_outstanding_accomplishments", label: "Other documents as may be required for comparative assessment such as Outstanding Accomplishments and MOVs" },
  ];

  const allChecked = requirements.every((item) => documents[item.field]);

  const toggleAll = (checked) => {
    requirements.forEach((item) => onChange(item.field, checked));
  };

  return (
    <div className="rounded-[20px] bg-white shadow-sm border border-gray-200 overflow-hidden">
      {/* Header with Number 4 Badge */}
      <div className="bg-[#204a87] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 text-white font-bold text-sm">
            4
          </div>
          <FileCheck size={20} className="text-white" />
          <h2 className="text-white font-semibold text-lg">
            Basic Documentary Requirement
          </h2>
        </div>

        <label className="flex items-center gap-2 text-sm text-white cursor-pointer font-medium hover:text-gray-200">
          <input
            type="checkbox"
            checked={allChecked}
            onChange={(e) => toggleAll(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300"
          />
          Check All
        </label>
      </div>

      {/* Main Table Structure Preserved */}
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 w-12 py-3 text-gray-700">#</th>
            <th className="border border-gray-300 text-left px-4 py-3 text-gray-700">Basic Documentary Requirement</th>
            <th className="border border-gray-300 w-24 text-gray-700">Submitted</th>
          </tr>
        </thead>
        <tbody>
          {requirements.map((item, index) => (
            <tr key={item.field} className="hover:bg-gray-50">
              <td className="border border-gray-300 text-center py-3 text-gray-600">
                {String.fromCharCode(97 + index)}.
              </td>
              <td className="border border-gray-300 px-4 py-3 text-gray-800 leading-6">
                {item.label}
              </td>
              <td className="border border-gray-300 text-center">
                <input
                  type="checkbox"
                  checked={documents[item.field] || false}
                  onChange={(e) => onChange(item.field, e.target.checked)}
                  className="w-5 h-5 accent-[#204a87] cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}