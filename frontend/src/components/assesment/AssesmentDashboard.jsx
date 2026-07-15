import React from 'react';
import { MapPin } from 'lucide-react';

export default function AssessmentTable({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400 font-bold text-xs bg-slate-50 border border-dashed rounded-lg">
        No active scheduled assessment records found.
      </div>
    );
  }

  // Helper function to handle arrays, objects, or stringified versions like {"kath","jake"}
  const formatConductedBy = (value) => {
    if (!value) return '--';

    // 1. If it's a real JavaScript Array
    if (Array.isArray(value)) {
      return value.join(', ');
    }

    // 2. If it's a string, clean up brackets, curly braces, and quotes
    if (typeof value === 'string') {
      // Strips out {, }, [, ], ", and ' characters
      const cleaned = value.replace(/[{}[\]"']/g, '').trim();
      
      // Split by commas, clean up whitespace around names, and join back with space
      return cleaned
        .split(',')
        .map(name => name.trim())
        .filter(Boolean)
        .join(', ');
    }

    // 3. Fallback for any other type
    return String(value);
  };

  return (
    <div className="overflow-x-auto border border-slate-100 rounded-lg">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold tracking-wider">
            <th className="py-3 px-4 w-12">#</th>
            <th className="py-3 px-4">SESSION DATE</th>
            <th className="py-3 px-4">VACANCY ID</th>
            <th className="py-3 px-4">VENUE</th>
            <th className="py-3 px-4">CONDUCTED BY</th>
            <th className="py-3 px-4">REMARKS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          {data.map((session, index) => (
            <tr key={session.job_applications_id || index} className="hover:bg-slate-50/50">
              <td className="py-4 px-4 font-medium text-slate-400">{index + 1}</td>
              <td className="py-4 px-4 font-bold text-blue-600">{session.session_date}</td>
              <td className="py-4 px-4">
                <div className="font-bold text-slate-800">Vacancy ID: {session.vacancy_id}</div>
                {session.job_applications_id && (
                  <div className="mt-1 flex items-center gap-1">
                    <span className="text-[9px] bg-slate-100 border text-slate-600 px-1.5 py-0.5 rounded font-medium">
                      App ID: {session.job_applications_id}
                    </span>
                  </div>
                )}
              </td>
              <td className="py-4 px-4 text-slate-500 font-medium">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  {session.venue}
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="text-[11px] font-medium text-slate-700">
                  {formatConductedBy(session.conducted_by)}
                </div>
              </td>
              <td className="py-4 px-4 text-slate-400 italic text-[11px]">
                {session.remarks || '--'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}