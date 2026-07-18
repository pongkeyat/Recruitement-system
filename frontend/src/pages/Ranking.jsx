import { useState } from "react";
import {
  Trophy,
  ArrowLeft,
  Briefcase,
  Search,
  Medal,
} from "lucide-react";

function FinalRankings() {
  const [selectedVacancy, setSelectedVacancy] = useState("");

  const vacancies = [
    "[SG-23] Attorney II - Legal Section",
    "[SG-18] Administrative Officer V - Schools Division Office"
    
  ];

  const rankingData = {
    "[SG-23] Attorney II - Legal Section": [

     {
  name: "Jejomar Leprozo",

  education: 18,
  training: 8,
  experience: 15,
  performance: 20,
  accomplishments: 10,
  applicationEducation: 10,
  applicationLearning: 7,
  potential: 10,
},
{
  name: "James Bryan Salting",

  education: 18,
  training: 10,
  experience: 15,
  performance: 20,
  accomplishments: 10,
  applicationEducation: 10,
  applicationLearning: 7,
  potential: 9,
}
    ],
  };
  

    const computeTotal = (applicant) => {
  return (
    applicant.education +
    applicant.training +
    applicant.experience +
    applicant.performance +
    applicant.accomplishments +
    applicant.applicationEducation +
    applicant.applicationLearning +
    applicant.potential
  );
};



 const rankings = (rankingData[selectedVacancy] || [])
  .map((applicant) => ({
    ...applicant,
    total: computeTotal(applicant),
  }))
  .sort((a, b) => b.total - a.total)
  .map((applicant, index) => ({
    ...applicant,
    rank: index + 1,
    
  }));


  return (
    <div className="min-h-screen bg-[#edf2f8] flex flex-col">

      {/* ================= HEADER ================= */}

      <div className="px-6 pt-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#17386a] to-[#25477c] shadow-lg">

          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-white/5"></div>

          <div className="flex items-center justify-between px-6 py-6">

            <div>
              <div className="flex items-center gap-3">

                <Trophy
                  size={28}
                  className="text-yellow-400"
                  fill="currentColor"
                />

                <div>
                  <h1 className="text-4xl font-bold text-white">
                    Final Rankings
                  </h1>

                  <p className="mt-1 text-white/80">
                    Comparative Assessment Results — Official Ranked List
                  </p>
                </div>

              </div>
            </div>

            <button
              className="flex items-center gap-2 rounded-xl border-2 border-white
              px-6 py-3 text-lg font-semibold text-white transition
              hover:bg-white hover:text-[#17386a]"
            >
              <ArrowLeft size={22} />
              Back
            </button>

          </div>
        </div>

        {/* ================= VACANCY CARD ================= */}

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">

          <div className="flex items-center gap-5">

            <div
              className="flex h-14 w-14 items-center justify-center rounded-full
              bg-blue-100"
            >
              <Briefcase
                size={28}
                className="text-blue-500"
              />
            </div>

            <div className="w-full">

              <label className="mb-2 block font-semibold text-slate-600">
                Select Vacancy
              </label>

              <select
                value={selectedVacancy}
                onChange={(e) =>
                  setSelectedVacancy(e.target.value)
                }
                className="w-full rounded-xl border border-slate-300
                bg-white px-5 py-3 outline-none transition
                focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              >
                <option value="">
                  Select Vacancy
                </option>

                {vacancies.map((vacancy) => (
                  <option
                    key={vacancy}
                    value={vacancy}
                  >
                    {vacancy}
                  </option>
                ))}

              </select>

            </div>

          </div>

        </div>

        {/* ================= CONTENT CARD ================= */}

        <div className="mt-6 rounded-3xl bg-white shadow">

          {!selectedVacancy ? (

            <div className="flex h-[420px] flex-col items-center justify-center">

              <div
                className="flex h-24 w-24 items-center justify-center
                rounded-full bg-blue-100"
              >
                <Search
                  size={50}
                  className="text-blue-600"
                />
              </div>

              <h2 className="mt-8 text-4xl font-bold text-slate-800">
                Select a Vacancy
              </h2>

              <p className="mt-3 text-lg text-slate-500">
                Use the selector above to view the final ranked list of applicants.
              </p>

            </div>

          ) : rankings.length === 0 ? (

            <div className="flex h-[420px] flex-col items-center justify-center">

              <div
                className="flex h-24 w-24 items-center justify-center
                rounded-full bg-yellow-100"
              >
                <Medal
                  size={50}
                  className="text-yellow-500"
                />
              </div>

              <h2 className="mt-8 text-4xl font-bold">
                No Rankings Available
              </h2>

              <p className="mt-3 text-slate-500">
                There are no applicants ranked for this vacancy.
              </p>

            </div>

          ) : (

            <>
            {/* ================= RANKING TABLE ================= */}
          
<div className="overflow-x-auto">

  <table className="min-w-full">

   <thead className="bg-[#17386a] text-white">
  <tr>
    <th className="px-4 py-4 text-left">Rank</th>
    <th className="px-4 py-4 text-left">Applicant</th>
    <th className="px-4 py-4 text-center">Education</th>
    <th className="px-4 py-4 text-center">Training</th>
    <th className="px-4 py-4 text-center">Experience</th>
    <th className="px-4 py-4 text-center">Performance</th>
    <th className="px-4 py-4 text-center">
      Outstanding Accomplishments
    </th>
    <th className="px-4 py-4 text-center">
      Application of Education
    </th>
    <th className="px-4 py-4 text-center">
      Application of Learning
    </th>
    <th className="px-4 py-4 text-center">Potential</th>
    <th className="px-4 py-4 text-center">Total Score</th>
  </tr>
</thead>

    <tbody>

      {rankings.map((applicant, index) => (

        <tr
          key={index}
          className="border-b hover:bg-slate-50 transition"
        >

          {/* Rank */}
          <td className="px-4 py-4">

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-white
              ${
                applicant.rank === 1
                  ? "bg-yellow-500"
                  : applicant.rank === 2
                  ? "bg-gray-500"
                  : applicant.rank === 3
                  ? "bg-amber-700"
                  : "bg-blue-600"
              }`}
            >
              {applicant.rank}
            </div>

          </td>

          {/* Applicant */}
{/* Applicant */}
<td className="px-4 py-4 font-semibold text-slate-700">
  {applicant.name}
</td>

{/* Education */}
<td className="px-4 py-4 text-center">
  {applicant.education}
</td>

{/* Training */}
<td className="px-4 py-4 text-center">
  {applicant.training}
</td>

{/* Experience */}
<td className="px-4 py-4 text-center">
  {applicant.experience}
</td>

{/* Performance */}
<td className="px-4 py-4 text-center">
  {applicant.performance}
</td>

{/* Outstanding Accomplishments */}
<td className="px-4 py-4 text-center">
  {applicant.accomplishments}
</td>

{/* Application of Education */}
<td className="px-4 py-4 text-center">
  {applicant.applicationEducation}
</td>

{/* Application of Learning */}
<td className="px-4 py-4 text-center">
  {applicant.applicationLearning}
</td>

{/* Potential */}
<td className="px-4 py-4 text-center">
  {applicant.potential}
</td>

{/* Total Score */}
<td className="px-4 py-4">
  <div className="flex justify-center">
    <span className="rounded-full bg-green-100 px-4 py-2 font-bold text-green-700">
      {applicant.total}
    </span>
  </div>
</td>
        </tr>

      ))}

    </tbody>

  </table>

</div>
   
  </>
)}


</div>

</div>

{/* ================= FOOTER ================= */}

<footer className="mt-auto bg-white border-t px-6 py-4">

  <div className="flex flex-col gap-2 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">

    <div>
      © 2026 <span className="font-semibold">La Union Schools Division Office</span> —
      Personnel Ranking and Selection System
    </div>

    <div className="flex items-center gap-3">

      <span>
        Based on <strong>DepEd Order No. 007, s. 2023</strong>
      </span>

      <span>|</span>

      <span>Version 1.0.0</span>

    </div>

  </div>

</footer>

</div>
);
}

export default FinalRankings;