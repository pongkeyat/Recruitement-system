import React, { useState, useEffect } from "react";
import { getVacancies } from "../../api/Vacancies";

export default function OpenVacancies({ searchTerm = "", setSearchTerm }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedOffice, setSelectedOffice] = useState("All Offices");

  useEffect(() => {
    const fetchVacanciesData = async () => {
      try {
        setLoading(true);
        // Calls your API function that queries the database
        const data = await getVacancies();
        
        // Map the database columns cleanly to your component's keys
        const mappedJobs = data.map((job) => ({
          id: job.vacancy_id,
          vacancyCode: `VCY-${job.vacancy_id}`, 
          title: job.position_title,
          office: job.office_unit,
          salaryGrade: job.salary_grade,
          education: job.education_requirement || "None Required",
          training: job.training_requirement || "None Required",
          experience: job.experience_requirement || "None Required",
          eligibility: job.eligibility_requirement || "None Required",
          slots: job.no_of_slots || 1,
          applicants: parseInt(job.applicants_count) || 0, 
          postingDate: job.application_posted,
          deadline: job.application_deadline,
        }));

        setJobs(mappedJobs);
        setError(null);
      } catch (err) {
        console.error("Error loading vacancies:", err);
        setError("Failed to load open job vacancies.");
      } finally {
        setLoading(false);
      }
    };

    fetchVacanciesData();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesOffice = selectedOffice === "All Offices" || job.office === selectedOffice;
    const matchesSearch = 
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.vacancyCode?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesOffice && matchesSearch;
  });

  const ViewIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 inline-block mr-1.5 align-text-bottom">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );

  if (loading) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
        <p className="text-gray-500 font-medium">Loading open vacancies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-xl border border-red-200">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      
      {/* Vacancy Title Block */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-[#1e3a67]">Open Vacancies</h2>
          <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
            {filteredJobs.length}
          </span>
        </div>
        <p className="text-gray-500 text-sm mt-1">Non-Teaching Positions • Region I RO1</p>
      </div>

      {/* Filter Buttons Tab Row */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {["All Offices", "General Services Section", "Schools Division Office"].map((office) => (
          <button
            key={office}
            onClick={() => setSelectedOffice(office)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedOffice === office
                ? "bg-[#1e3a67] text-white"
                : "bg-white border text-gray-600 hover:bg-gray-50"
            }`}
          >
            {office}
          </button>
        ))}
      </div>

      {/* Grid/Flex List */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 font-medium">No vacancies found matching your search query.</p>
          <button 
            onClick={() => { if(setSearchTerm) setSearchTerm(""); setSelectedOffice("All Offices"); }}
            className="mt-3 text-[#1e3a67] text-sm font-semibold underline"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="flex flex-row flex-wrap md:flex-nowrap gap-5 w-full overflow-x-auto pb-4">
          {filteredJobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col justify-between w-full md:w-[350px] shrink-0"
            >
              <div>
                <div className="bg-[#1e3a67] text-white p-4">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-semibold text-base leading-tight">{job.title}</h3>
                    <span className="bg-amber-500 text-xs px-2 py-0.5 rounded font-bold text-slate-900 whitespace-nowrap">
                      {job.salaryGrade}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2">{job.office}</p>
                  <p className="text-xs text-slate-300 mt-1">{job.vacancyCode}</p>
                </div>

                <div className="p-4">
                  <h4 className="text-xs font-bold text-gray-400 mb-3 tracking-wider">QUALIFICATION STANDARDS</h4>
                  <ul className="space-y-2 text-sm text-gray-600 mb-4">
                    <li className="border-b pb-1.5">🎓 {job.education}</li>
                    <li className="border-b pb-1.5">📚 {job.training}</li>
                    <li className="border-b pb-1.5">💼 {job.experience}</li>
                    <li>🛡️ {job.eligibility}</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 pt-0">
                <div className="flex justify-between items-center text-xs mb-3 border-t pt-3">
                  <span className="bg-red-50 text-red-600 px-2.5 py-1 rounded-full font-medium">Deadline Passed</span>
                  <span className="text-gray-400 text-right">{job.slots} Slot(s)<br className="sm:hidden"/> • {job.applicants} Applicant(s)</span>
                </div>

                <button
                  onClick={() => setSelectedJob(job)}
                  className="w-full bg-[#1e3a67] hover:bg-[#15294a] text-white py-2 rounded-md text-sm font-medium transition flex items-center justify-center"
                >
                  <ViewIcon /> View Full Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
          
      {/* Modal Profile Block */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-[2px]">
          <div className="bg-white rounded-lg w-full max-w-4xl shadow-2xl overflow-hidden border border-gray-200">
            
            <div className="bg-[#1a4480] text-white px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold tracking-wide">{selectedJob.title}</h2>
                <p className="text-slate-200 text-sm font-light mt-0.5">Vacancy Code: {selectedJob.vacancyCode}</p>
              </div>
              <button 
                onClick={() => setSelectedJob(null)} 
                className="text-white hover:text-gray-300 text-2xl font-light p-1 transition"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 bg-white max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-5">
                  <h3 className="font-bold text-gray-500 text-xs tracking-wider uppercase border-b border-sky-100/70 pb-2 mb-3">
                    POSITION INFORMATION
                  </h3>
                  <div className="space-y-3.5 text-sm text-gray-700">
                    <div className="grid grid-cols-3"><span className="text-gray-400">Position Title:</span><span className="col-span-2 font-bold text-gray-900">{selectedJob.title}</span></div>
                    <div className="grid grid-cols-3"><span className="text-gray-400">Salary Grade:</span><span className="col-span-2 font-bold text-gray-900">{selectedJob.salaryGrade}</span></div>
                    <div className="grid grid-cols-3"><span className="text-gray-400">Office Unit:</span><span className="col-span-2 font-bold text-gray-900">{selectedJob.office}</span></div>
                    <div className="grid grid-cols-3"><span className="text-gray-400">No. of Slots:</span><span className="col-span-2 font-medium text-gray-900">{selectedJob.slots}</span></div>
                    <div className="grid grid-cols-3"><span className="text-gray-400">Posting Date:</span><span className="col-span-2 font-medium text-gray-600">{selectedJob.postingDate}</span></div>
                    <div className="grid grid-cols-3"><span className="text-gray-400">Deadline:</span><span className="col-span-2 text-red-500 font-semibold">{selectedJob.deadline} <span className="text-xs font-normal text-red-400">(Expired)</span></span></div>
                  </div>
                </div>

                <div className="bg-emerald-50/30 border border-emerald-100 rounded-xl p-5">
                  <h3 className="font-bold text-gray-500 text-xs tracking-wider uppercase border-b border-emerald-100/70 pb-2 mb-3">
                    QUALIFICATION STANDARDS
                  </h3>
                  <div className="space-y-4 text-sm text-gray-700">
                    <div>
                      <p className="text-gray-400 text-xs mb-0.5">Education:</p>
                      <p className="font-medium text-gray-900">{selectedJob.education}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-0.5">Training:</p>
                      <p className="font-medium text-emerald-700">{selectedJob.training}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-0.5">Experience:</p>
                      <p className="font-medium text-emerald-700">{selectedJob.experience}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-0.5">Eligibility:</p>
                      <p className="font-medium text-emerald-700">{selectedJob.eligibility}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-2.5 text-sm text-amber-900">
                <span className="bg-amber-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">i</span>
                <p>
                  <strong className="text-amber-900 font-bold">How to Apply:</strong> Submit your application documents <strong className="font-bold">personally (walk-in)</strong> at the <strong className="font-bold">HR Office, DEPARTMENT OF EDUCATION REGION 1</strong> on or before <strong className="font-bold">{selectedJob.deadline}</strong>.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="border border-gray-300 text-gray-400 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">i</span>
                <span>Submit application at the HR Office, La Union SDO</span>
              </div>
              <button 
                onClick={() => setSelectedJob(null)} 
                className="bg-slate-600 hover:bg-slate-700 text-white px-5 py-2 rounded text-sm font-medium transition"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

