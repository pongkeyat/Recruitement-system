import React, { useState } from "react";
import { Plus } from 'lucide-react';
import CreateSessionModal from './CreateAssesmentModal';

export default function AssessmentHeader({ onSaveSession }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <header className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0f2c59]" />
          <div className="pl-3">
            <h1 className="text-xl font-bold text-[#0f2c59] tracking-tight">Assessment Sessions</h1>
            <p className="text-xs text-slate-400 mt-0.5">Schedule and manage HRMPSB assessment sessions for qualified applicants</p>
          </div>
          <button 
            type="button"
            onClick={handleOpenModal}
            className="bg-[#0f2c59] hover:bg-[#0a1f3f] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Create Session
          </button>
        </div>
      </header>

      {/* Rendered Modal Container */}
      <CreateSessionModal 
        showModal={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={onSaveSession} 
      />
    </div>
  );
}
