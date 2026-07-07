import { Check, X } from "lucide-react";

export default function EvaluationCard({

    color,
    title,
    requirement,
    actual,
    status,
    note,
    setNote

}){

    return(

<div className="rounded-xl overflow-hidden bg-white shadow">

    <div
        className={`${color} text-white px-5 py-4 flex justify-between`}
    >

        <h2 className="font-bold">

            {title}

        </h2>

        <span className="bg-white text-black rounded-full text-xs px-3 py-1">

            {status}

        </span>

    </div>

    <div className="p-5">

        <p className="text-xs font-bold text-gray-500">

            REQUIREMENT

        </p>

        <div className="bg-gray-100 rounded-lg p-3 mt-2">

            {requirement}

        </div>

        <p className="text-xs font-bold mt-5 text-gray-500">

            ACTUAL DATA

        </p>

        <div className="mt-2">

            {actual}

        </div>

    </div>

    <div className="p-5 border-t">

        <div className="flex gap-4">

            <button className="text-green-600 flex items-center gap-2">

                <Check size={18}/>

                PASS

            </button>

            <button className="text-red-500 flex items-center gap-2">

                <X size={18}/>

                FAIL

            </button>

        </div>

        <input

            className="mt-4 w-full border rounded-full px-4 py-2"

            placeholder="Add note..."

            value={note}

            onChange={(e)=>setNote(e.target.value)}

        />

    </div>

</div>

    )

}