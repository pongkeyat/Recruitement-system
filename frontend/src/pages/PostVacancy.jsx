import React, { useState } from "react";
import VacancyHeader from "../components/vacancies/PostVacancyHeader";
import PostVacancyForm from "../components/vacancies/PostVacancyForm";
import PostQualificationsForm from "../components/vacancies/PostQualificationsForm";
import PostRemarksForm from "../components/vacancies/PostRemarksForm";

// API Imports
import { postVacancies } from "../api/Vacancies";
import { postQualifications } from "../api/QualificationsApi";
import { postRemarks } from "../api/RemarksApi";

export default function NewVacancyPage({ onBack }) {
    const isBelowMinimum = false; 

    // Master Form State
    const [masterForm, setMasterForm] = useState({
        vacancy: {
            position_title: "",
            salary_grade: "",
            office_unit: "",
            no_of_slots: "",
            application_posted: "",
            application_deadline: "",
            status: "Open",
        },
        qualifications: {
            education_requirement: "",
            training_requirement: "",
            experience_requirement: "",
            eligibility_requirement: "",
        },
        remarks: {
            remarks: ""
        }
    });

    // Unified handler to update sub-states dynamically
    const handleSectionChange = (section, e) => {
        const { name, value } = e.target;
        setMasterForm((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [name]: value
            }
        }));
    };

    // Consolidated Submit Handler (Sequential Execution to capture Vacancy ID)
    const handleMasterSubmit = async (e) => {
        e.preventDefault();

        // 1. Vacancy Validations
        const { position_title, salary_grade, office_unit, no_of_slots, application_posted, application_deadline } = masterForm.vacancy;
        if (!position_title || !salary_grade || !office_unit || !no_of_slots || !application_posted || !application_deadline) {
            alert("Please fill out all mandatory fields in the Vacancy Information section.");
            return;
        }

        // 2. Qualifications Client-Side Validation
        const { education_requirement, training_requirement, experience_requirement, eligibility_requirement } = masterForm.qualifications;
        if (!education_requirement.trim() || !training_requirement.trim() || !experience_requirement.trim() || !eligibility_requirement.trim()) {
            alert("Qualifications cannot be empty. Please type 'None required' or 'Must be college graduate' explicitly.");
            return;
        }

        // 3. Remarks Validation
        if (!masterForm.remarks.remarks.trim()) {
            alert("Please add vacancy remarks before posting.");
            return;
        }

        // 4. Sequential Network Dispatch
        try {
            console.log("Submitting Vacancy information first...");
            
            // Step A: Create the vacancy and wait for its database record response
            const vacancyRes = await postVacancies(masterForm.vacancy);
            console.log("Vacancy created successfully:", vacancyRes);

            // Extract the vacancy ID robustly from common response shapes
            const vacancyObj = vacancyRes?.vacancy ?? vacancyRes;
            const generatedVacancyId = vacancyObj?.id ?? vacancyObj?.vacancy_id ?? vacancyObj?.vacancyId ?? vacancyObj?.insertId;

            if (!generatedVacancyId) {
                console.error('Unexpected vacancy create response shape:', vacancyRes);
                throw new Error("Vacancy was created, but no ID was returned by the server.");
            }

            console.log(`Linking structural dependencies to Vacancy ID: ${generatedVacancyId}...`);

            // Step B: Submit qualifications and remarks concurrently, explicitly passing the new vacancy_id
            const [qualRes, remarksRes] = await Promise.all([
                postQualifications({
                    ...masterForm.qualifications,
                    vacancy_id: generatedVacancyId 
                }),
                postRemarks({
                    remark_text: masterForm.remarks.remarks,
                    vacancy_id: generatedVacancyId 
                })
            ]);

            console.log("All parts of the package successfully linked:", { qualRes, remarksRes });
            alert("Vacancy package posted successfully!");
            
            if (onBack) onBack(); 

        } catch (error) {
            console.error("Submission pipeline failed:", error);
            alert("An error occurred while saving your details. Please inspect your server logs.");
        }
    };

    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto">
           <VacancyHeader isPosting={true} onBack={onBack} />

            {/* Main Layout Grid */}
            <div className="grid gap-6 lg:grid-cols-3 mt-6">
                
                {/* Left Side: Main Form */}
                <div className="lg:col-span-2">
                    <PostVacancyForm 
                        formData={masterForm.vacancy} 
                        onChange={(e) => handleSectionChange("vacancy", e)} 
                    />
                </div>

                {/* Right Side: Sidebar Components */}
                <div className="lg:col-span-1 space-y-6">
                    <PostQualificationsForm 
                        formData={masterForm.qualifications} 
                        onChange={(e) => handleSectionChange("qualifications", e)} 
                    />
                    <PostRemarksForm 
                        formData={masterForm.remarks} 
                        onChange={(e) => handleSectionChange("remarks", e)} 
                    />
                </div>
            </div>

            {/* Bottom Form Actions */}
            <div className="mt-8 flex justify-end gap-3 pt-5">
                <button 
                    type="button"
                    onClick={onBack}
                    className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    onClick={handleMasterSubmit}
                    disabled={isBelowMinimum}
                    className={`rounded-lg px-6 py-2 text-sm font-medium text-white transition ${
                        isBelowMinimum
                            ? "cursor-not-allowed bg-gray-400"
                            : "bg-[#1b4584] hover:bg-[#16386b]"
                    }`}
                >
                    Post Vacancy
                </button>
            </div>
        </div>
    );
}