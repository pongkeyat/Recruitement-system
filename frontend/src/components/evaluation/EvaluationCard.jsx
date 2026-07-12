import { Check, X } from "lucide-react";

export default function EvaluationCard({
    color,
    title,
    requirement,
    actual,
    status,
    setStatus, // <-- New prop passed down from parent to update state
    note,
    setNote
}){
    return (
        <div className="rounded-xl overflow-hidden bg-white shadow border border-gray-100">
            {/* CARD HEADER */}
            <div className={`${color} text-white px-5 py-4 flex justify-between items-center`}>
                <h2 className="font-bold tracking-wide">{title}</h2>
                <span className={`rounded-full text-xs px-3 py-1 font-bold tracking-wider ${
                    status === "PASS" 
                        ? "bg-emerald-100 text-emerald-800" 
                        : status === "FAIL"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-amber-100 text-amber-800"
                }`}>
                    {status}
                </span>
            </div>

            {/* CARD BODY */}
            <div className="p-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    REQUIREMENT
                </p>
                <div className="bg-gray-50 text-gray-700 font-medium rounded-lg p-3 mt-2 text-sm border border-gray-100">
                    {requirement}
                </div>

                <p className="text-xs font-bold mt-5 text-gray-400 uppercase tracking-wider">
                    ACTUAL DATA
                </p>
                <div className="mt-2 text-gray-800">
                    {actual}
                </div>
            </div>

            {/* CARD ACTIONS & NOTES */}
            <div className="p-5 border-t border-gray-100 bg-gray-50/50">
                <div className="flex gap-4">
                    {/* PASS BUTTON */}
                    <button 
                        type="button"
                        onClick={() => setStatus("PASS")}
                        className={`flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-lg border transition ${
                            status === "PASS"
                                ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm"
                                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                        <Check size={16} className={status === "PASS" ? "stroke-[3px]" : ""} />
                        PASS
                    </button>

                    {/* FAIL BUTTON */}
                    <button 
                        type="button"
                        onClick={() => setStatus("FAIL")}
                        className={`flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-lg border transition ${
                            status === "FAIL"
                                ? "bg-rose-50 border-rose-500 text-rose-700 shadow-sm"
                                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                        <X size={16} className={status === "FAIL" ? "stroke-[3px]" : ""} />
                        FAIL
                    </button>
                </div>

                <input
                    className="mt-4 w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white transition shadow-inner"
                    placeholder="Add operational notes or remarks..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </div>
        </div>
    )
}