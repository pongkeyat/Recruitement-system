import { Info } from "lucide-react";

const salaryGrades = Array.from({ length: 20 }, (_, i) => `SG-${i + 1}`);

export default function PostVacancyForm({ formData, onChange }) {
    return (
        <div className="overflow-hidden rounded-xl bg-white shadow lg:col-span-2">
            <div className="flex items-center gap-2 bg-[#1b4584] p-3 text-white">
                <Info size={16} />
                Vacancy Information
            </div>

            <div className="space-y-4 p-5">
                {/* Position Title */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Position Title
                    </label>
                    <input
                        type="text"
                        name="position_title"
                        placeholder="e.g. Administrative Assistant I"
                        value={formData.position_title}
                        onChange={onChange}
                        className="w-full rounded-lg border p-3 outline-none focus:border-[#1b4584] focus:ring-1 focus:ring-[#1b4584]"
                    />
                </div>

                {/* Grid layout */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    {/* Salary Grade Dropdown */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Salary Grade
                        </label>

                        <select
                            name="salary_grade"
                            value={formData.salary_grade}
                            onChange={onChange}
                            className="w-full rounded-lg border p-3 outline-none focus:border-[#1b4584] focus:ring-1 focus:ring-[#1b4584]"
                        >
                            <option value="">Select Salary Grade</option>

                            {salaryGrades.map((grade) => (
                                <option key={grade} value={grade}>
                                    {grade}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Number of Slots */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Number of Slots
                        </label>
                        <input
                            type="number"
                            name="no_of_slots"
                            placeholder="e.g. 2"
                            value={formData.no_of_slots}
                            onChange={onChange}
                            className="w-full rounded-lg border p-3 outline-none focus:border-[#1b4584] focus:ring-1 focus:ring-[#1b4584]"
                        />
                    </div>
                </div>

                {/* Office Unit */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Office / Unit Assignment
                    </label>
                    <input
                        type="text"
                        name="office_unit"
                        placeholder="e.g. Human Resource Management Office"
                        value={formData.office_unit}
                        onChange={onChange}
                        className="w-full rounded-lg border p-3 outline-none focus:border-[#1b4584] focus:ring-1 focus:ring-[#1b4584]"
                    />
                </div>

                {/* Dates */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Application Posted Date
                        </label>
                        <input
                            type="date"
                            name="application_posted"
                            value={formData.application_posted}
                            onChange={onChange}
                            className="w-full rounded-lg border p-3 outline-none focus:border-[#1b4584] focus:ring-1 focus:ring-[#1b4584]"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Application Deadline
                        </label>
                        <input
                            type="date"
                            name="application_deadline"
                            value={formData.application_deadline}
                            onChange={onChange}
                            min={
                                formData.application_posted
                                    ? new Date(
                                          new Date(formData.application_posted).getTime() +
                                              10 * 24 * 60 * 60 * 1000
                                      )
                                          .toISOString()
                                          .split("T")[0]
                                    : undefined
                            }
                            className="w-full rounded-lg border p-3 outline-none focus:border-[#1b4584] focus:ring-1 focus:ring-[#1b4584]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}