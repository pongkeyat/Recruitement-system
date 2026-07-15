import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, Info } from "lucide-react";

const criteria = [
  {
    criterion: "Education",
    description:
      "Based on highest educational attainment relevant to the position",
    points: 5,
    rubric: "View DO 007 Increment Rubric",
    link: "#",
  },
  {
    criterion: "Training",
    description: "Based on relevant trainings and seminars attended",
    points: 10,
    rubric: "View DO 007 Increment Rubric",
    link: "#",
  },
  {
    criterion: "Experience",
    description: "Based on relevant work experience",
    points: 15,
    rubric: "View DO 007 Increment Rubric",
    link: "#",
  },
  {
    criterion: "Outstanding Accomplishments",
    description: "Awards, recognitions, and special achievements",
    points: 10,
    rubric:
      "Awards (4), Research (4), SME (3), Speakership (2), NEAP (2)",
  },
  {
    criterion: "Performance Rating",
    description: "Based on the last two performance ratings",
    points: 20,
    rubric:
      "Rating / 5.0 (RPMS) or Honor Grad / Board % equivalent",
  },
  {
    criterion: "Potential",
    description: "Based on demonstrated potential",
    points: 20,
    rubric: "Written Exam + Skills Test + BEI Interview",
  },
  {
    criterion: "Application of Education",
    description: "",
    points: 10,
    rubric: "Relevance (100%) and complete MOVs (100%)",
  },
  {
    criterion: "Application of Learning and Development",
    description: "",
    points: 10,
    rubric: "Relevance (100%) and complete MOVs (100%)",
  },
];

export default function AssessmentCriteriaReference() {
  const [open, setOpen] = useState(true);

  const total = criteria.reduce((sum, item) => sum + item.points, 0);

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between bg-[#234B87] px-6 py-4 text-white transition hover:bg-[#1d3f73]"
      >
        <div className="flex items-center gap-2">
          <BookOpen size={18} />
          <span className="font-semibold text-sm md:text-base">
            Assessment Criteria Reference
          </span>
        </div>

        {open ? (
          <ChevronUp size={20} />
        ) : (
          <ChevronDown size={20} />
        )}
      </button>

      {/* Content */}
      {open && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr className="border-b">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#234B87]">
                  Criterion
                </th>

                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-[#234B87] w-40">
                  Max Pts
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#234B87]">
                  Scoring Guidelines / Rubric
                </th>
              </tr>
            </thead>

            <tbody>
              {criteria.map((item, index) => (
                <tr
                  key={index}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5">
                    <h3 className="font-semibold text-gray-900">
                      {item.criterion}
                    </h3>

                    {item.description && (
                      <p className="mt-1 text-sm text-gray-500">
                        {item.description}
                      </p>
                    )}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span className="inline-flex rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                      {item.points.toFixed(2)}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-sm">
                    {item.link ? (
                      <a
                        href={item.link}
                        className="inline-flex items-center gap-2 font-medium text-blue-600 hover:underline"
                      >
                        <Info size={14} />
                        {item.rubric}
                      </a>
                    ) : (
                      <span className="text-gray-600">{item.rubric}</span>
                    )}
                  </td>
                </tr>
              ))}

              {/* Total */}
              <tr className="bg-gray-50 font-semibold">
                <td className="px-6 py-4">TOTAL</td>

                <td className="px-6 py-4 text-center">
                  <span className="inline-flex rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">
                    {total}
                  </span>
                </td>

                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}