import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Users, FileText, CheckCircle2, Plus } from 'lucide-react';
import { getVacancies } from '../../api/Vacancies'; 
import { getApplicationsByVacancyId } from '../../api/ApplicationApi';

export default function CreateSessionModal({ showModal, onClose, onSave }) {
  const [vacancies, setVacancies] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPanelist, setCurrentPanelist] = useState('');

  // Tracking database fields 1:1 with time removed from session_date
  const [formData, setFormData] = useState({
    vacancy_id: '',
    job_applications_id: '', // Will hold a string ID (single) or an array of IDs (all)
    session_date: '', // Holds standard YYYY-MM-DD string
    venue: '',
    conducted_by: [], // Array for multiple dynamic panel members
    remarks: ''       
  });

  const [errors, setErrors] = useState({});

  // Fetch vacancies when the modal opens
  useEffect(() => {
    let mounted = true;
    if (!showModal) return;

    (async () => {
      try {
        const data = await getVacancies();
        if (!mounted) return;
        setVacancies(Array.isArray(data) ? data : (data ? [data] : []));
      } catch (err) {
        console.error('Could not load vacancies dropdown', err);
        if (mounted) setVacancies([]);
      }
    })();

    return () => { mounted = false; };
  }, [showModal]);

  // Fetch applicants dynamically when vacancy selection changes
  useEffect(() => {
    let mounted = true;
    const vacancyId = formData.vacancy_id;

    if (!vacancyId) {
      setApplicants([]);
      setSelectAll(false);
      setFormData(prev => prev.job_applications_id ? { ...prev, job_applications_id: '' } : prev);
      return;
    }

    setLoadingApplicants(true);
    (async () => {
      try {
        const data = await getApplicationsByVacancyId(vacancyId);
        if (!mounted) return;
        
        const rawApplicants = Array.isArray(data) ? data : [];
        
        // 🎯 FIX: Filter only qualified applicants
        const qualifiedApplicants = rawApplicants.filter((app) => {
          const status = (app.application_status || app.status || '').toLowerCase();
          return status === 'qualified' || status === 'initial_screening_qualified';
        });

        setApplicants(qualifiedApplicants);
      } catch (err) {
        console.error('Could not load applicants for vacancy', vacancyId, err);
        if (mounted) setApplicants([]);
      } finally {
        if (mounted) setLoadingApplicants(false);
      }
    })();

    // Clear out candidate selection safely if vacancy shifts
    setSelectAll(false);
    setFormData(prev => prev.job_applications_id ? { ...prev, job_applications_id: '' } : prev);

    return () => { mounted = false; };
  }, [formData.vacancy_id]);

  // Handle the "Select All Applicants" Toggle Logic
  const handleToggleAll = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    
    if (checked && applicants.length > 0) {
      const allIds = applicants.map(app => app.job_application_id || app.job_applications_id);
      setFormData(prev => ({ ...prev, job_applications_id: allIds }));
      if (errors.job_applications_id) setErrors(prev => ({ ...prev, job_applications_id: '' }));
    } else {
      setFormData(prev => ({ ...prev, job_applications_id: '' }));
    }
  };

  // Add panelist to list
  const addPanelist = () => {
    if (!currentPanelist.trim()) return;
    if (!formData.conducted_by.includes(currentPanelist.trim())) {
      setFormData(prev => ({
        ...prev,
        conducted_by: [...prev.conducted_by, currentPanelist.trim()]
      }));
      if (errors.conducted_by) setErrors(prev => ({ ...prev, conducted_by: '' }));
    }
    setCurrentPanelist('');
  };

  // Remove panelist from list
  const removePanelist = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      conducted_by: prev.conducted_by.filter((_, index) => index !== indexToRemove)
    }));
  };

  if (!showModal) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Field validation checks
    const newErrors = {};
    if (!formData.vacancy_id) newErrors.vacancy_id = 'Please select a vacancy position';
    if (!formData.job_applications_id || (Array.isArray(formData.job_applications_id) && formData.job_applications_id.length === 0)) {
      newErrors.job_applications_id = 'Please select an applicant';
    }
    if (!formData.session_date) newErrors.session_date = 'Session date is required';
    if (!formData.venue) newErrors.venue = 'Venue location is required';
    if (formData.conducted_by.length === 0) newErrors.conducted_by = 'At least one panel member is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert('⚠️ Please fill in all required fields before saving.');
      return;
    }

    try {
      // Await the save operation from the parent component
      await onSave(formData);
      
      // If successful: Show success alert
      alert('✅ Assessment session created successfully!');
      
      // Reset state values
      setFormData({
        vacancy_id: '',
        job_applications_id: '',
        session_date: '',
        venue: '',
        conducted_by: [],
        remarks: ''
      });
      setSelectAll(false);
      setCurrentPanelist('');
      onClose();
      
    } catch (error) {
      console.error('Error saving session:', error);
      alert(`❌ Failed to save the session. ${error.message || 'Please try again.'}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#f3f4f6] rounded-xl shadow-2xl w-full max-w-[620px] overflow-hidden border border-slate-300 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-[#212529] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-slate-200">
            <Calendar className="w-4 h-4 text-slate-300" />
            <span>Create Assessment Session</span>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[550px] overflow-y-auto">
          
          {/* 1. Vacancy Dropdown selection */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Select Job Vacancy</label>
            <select
              name="vacancy_id"
              value={formData.vacancy_id}
              onChange={handleChange}
              className={`w-full bg-white border ${errors.vacancy_id ? 'border-rose-500' : 'border-slate-200'} rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500`}
            >
              <option value="">-- Choose Vacancy Position --</option>
              {vacancies.map((v) => (
                <option key={v.vacancy_id} value={v.vacancy_id}>
                  {v.position_title || v.job_title} {v.department ? `(${v.department})` : ''}
                </option>
              ))}
            </select>
            {errors.vacancy_id && <span className="text-[10px] text-rose-500 font-semibold">{errors.vacancy_id}</span>}
          </div>

          {/* 2. Applicant Dropdown list & Toggle Selection */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Select Candidate</label>
              
              {/* Select All Toggle Feature */}
              {formData.vacancy_id && applicants.length > 0 && (
                <label className="inline-flex items-center gap-1.5 text-xs text-slate-700 font-medium cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={selectAll} 
                    onChange={handleToggleAll}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                  />
                  <span>Select All Applicants ({applicants.length})</span>
                </label>
              )}
            </div>

            <select
              name="job_applications_id"
              value={selectAll ? '' : formData.job_applications_id}
              onChange={(e) => {
                setSelectAll(false);
                handleChange(e);
              }}
              disabled={!formData.vacancy_id || loadingApplicants || selectAll}
              className={`w-full bg-white border ${errors.job_applications_id ? 'border-rose-500' : 'border-slate-200'} rounded-lg px-3 py-2 text-xs outline-none disabled:bg-slate-100 disabled:text-slate-400 focus:border-blue-500`}
            >
              <option value="">
                {loadingApplicants 
                  ? 'Downloading candidate list...' 
                  : selectAll 
                    ? `✓ All ${applicants.length} candidates selected` 
                    : !formData.vacancy_id 
                      ? '-- Select a vacancy first --' 
                      : applicants.length === 0 
                        ? '-- No qualified candidates found --'
                        : '-- Choose Applicant --'}
              </option>
              {!selectAll && applicants.map((app) => (
                <option key={app.job_application_id || app.job_applications_id} value={app.job_application_id || app.job_applications_id}>
                  {app.candidate_name || `Applicant ID: ${app.job_application_id || app.job_applications_id}`}
                </option>
              ))}
            </select>
            {errors.job_applications_id && <span className="text-[10px] text-rose-500 font-semibold">{errors.job_applications_id}</span>}
          </div>

          {/* 3. Session Date Input block */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Session Schedule Date</label>
            <input 
              type="date" 
              name="session_date"
              value={formData.session_date}
              onChange={handleChange}
              className={`w-full bg-white border ${errors.session_date ? 'border-rose-500' : 'border-slate-200'} rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500`}
            />
            {errors.session_date && <span className="text-[10px] text-rose-500 font-semibold">{errors.session_date}</span>}
          </div>

          {/* 4. Venue Location Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> Venue Location
            </label>
            <input 
              type="text" 
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="e.g., HRMPSB Conference Room" 
              className={`w-full bg-white border ${errors.venue ? 'border-rose-500' : 'border-slate-200'} rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500`}
            />
            {errors.venue && <span className="text-[10px] text-rose-500 font-semibold">{errors.venue}</span>}
          </div>

          {/* 5. Dynamic Input Multi-Panel Members Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400" /> Conducted By (Panel Members)
            </label>
            
            <div className="flex gap-2">
              <input 
                type="text"
                value={currentPanelist}
                onChange={(e) => setCurrentPanelist(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); addPanelist(); }}}
                placeholder="Type name and press Enter or Click (+)" 
                className={`flex-1 bg-white border ${errors.conducted_by ? 'border-rose-500' : 'border-slate-200'} rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500`}
              />
              <button
                type="button"
                onClick={addPanelist}
                className="bg-slate-700 hover:bg-slate-800 text-white rounded-lg px-3 flex items-center justify-center transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {errors.conducted_by && <span className="text-[10px] text-rose-500 font-semibold">{errors.conducted_by}</span>}

            {/* Panel Badges Grid */}
            {formData.conducted_by.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1.5 p-2 bg-white rounded-lg border border-slate-200 max-h-24 overflow-y-auto">
                {formData.conducted_by.map((panelist, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center gap-1 bg-slate-100 border border-slate-300 text-slate-800 text-[11px] font-medium px-2 py-0.5 rounded-full"
                  >
                    {panelist}
                    <button 
                      type="button" 
                      onClick={() => removePanelist(index)}
                      className="text-slate-400 hover:text-rose-600 transition-colors ml-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 6. Remarks Context Box */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-slate-400" /> Remarks / Additional Instructions
            </label>
            <textarea 
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              rows={2}
              placeholder="Optional notes or instructions for this testing block..." 
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none resize-none focus:border-blue-500"
            />
          </div>

          {/* Action Buttons Tray */}
          <div className="bg-white pt-3 flex justify-end gap-3 border-t border-slate-200">
            <button type="button" onClick={onClose} className="text-slate-700 font-bold text-xs px-4 py-2 hover:bg-slate-50 rounded-md transition-colors">
              Cancel
            </button>
            <button type="submit" className="bg-[#1e3a6a] hover:bg-[#112d55] text-white text-xs font-bold px-5 py-2.5 rounded-md flex items-center gap-2 transition-colors shadow">
              <CheckCircle2 className="w-4 h-4" /> Save Session
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}