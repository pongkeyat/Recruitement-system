import { AlertCircle, Check, Mail, User } from "lucide-react";
import { useState } from "react";

export default function ApplicantForm({ formData, onChange }) {
  const [internal, setInternal] = useState({
    lastName: "", firstName: "", middleName: "", suffix: "",
    sex: "", dob: "", civilStatus: "", email: "", address: "", contactNumber: ""
  });
  
  const form = formData ?? internal;
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (onChange) onChange(name, value);
    else setInternal({ ...internal, [name]: value });
  };

  // Base input class adapted to match image heights and styling defaults
  const input = "w-full h-11 px-4 border text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#fcfcfc] text-gray-700 shadow-sm transition-all";

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden font-sans">
      {/* Header Banner Section */}
      <div className="bg-[#1e4a8a] p-5 pb-4 text-white flex flex-col gap-2">
        <div className="flex items-center gap-3">
          {/* Section Number Badge */}
          <span className="flex items-center justify-center bg-white/20 text-white font-semibold text-sm w-6 h-6 rounded-full">
            2
          </span>
          {/* Header Icon */}
          <User className="w-5 h-5 text-white/90" />
          <h3 className="text-xl font-medium tracking-wide">Applicant Information</h3>
        </div>
      </div>
      
      {/* Subheader / Instruction Bar */}
      <div className="bg-[#163664] px-5 py-2 text-white/90 text-sm border-t border-white/10">
        Please complete the mandatory personal identity details below accurately.
      </div>

      {/* Form Content Body */}
      <div className="p-6 bg-[#fcfdfd] space-y-5">
        {/* Row 1: Name Information */}
        <div className="grid grid-cols-12 gap-x-5 gap-y-4">
          <div className="col-span-12 md:col-span-4 space-y-1.5">
            <label className="block text-[15px] font-medium text-gray-800">
              Last Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input 
                name="lastName" 
                value={form.lastName ?? ""} 
                onChange={handleChange} 
                className={`${input} border-red-400 focus:ring-red-400/50 pr-10`} 
              />
              <AlertCircle size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none" />
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 space-y-1.5">
            <label className="block text-[15px] font-medium text-gray-800">
              First Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input 
                name="firstName" 
                value={form.firstName ?? ""} 
                onChange={handleChange} 
                className={`${input} border-red-400 focus:ring-red-400/50 pr-10`} 
              />
              <AlertCircle size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none" />
            </div>
          </div>

          <div className="col-span-12 md:col-span-3 space-y-1.5">
            <label className="block text-[15px] font-medium text-gray-800">
              Middle Name
            </label>
            <div className="relative">
              <input 
                name="middleName" 
                value={form.middleName ?? ""} 
                onChange={handleChange} 
                className={`${input} border-green-500 focus:ring-green-500/50 pr-10`} 
              />
              <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 pointer-events-none" />
            </div>
          </div>

          <div className="col-span-12 md:col-span-1 space-y-1.5">
            <label className="block text-[15px] font-medium text-gray-800">
              Suffix
            </label>
            <select 
              name="suffix" 
              value={form.suffix ?? ""} 
              onChange={handleChange} 
              className={`${input} border-green-500 focus:ring-green-500/50`}
            >
              {["", "Jr.", "Sr.", "III"].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Row 2: Demographics */}
        <div className="grid grid-cols-12 gap-x-5 gap-y-4">
          <div className="col-span-12 md:col-span-4 space-y-1.5">
            <label className="block text-[15px] font-medium text-gray-800">
              Sex <span className="text-red-500">*</span>
            </label>
            <select 
              name="sex" 
              value={form.sex ?? ""} 
              onChange={handleChange} 
              className={`${input} border-red-400 focus:ring-red-400/50`}
            >
              <option value="">-- Select --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="col-span-12 md:col-span-4 space-y-1.5">
            <label className="block text-[15px] font-medium text-gray-800">
              Date of Birth
            </label>
            <input 
              type="date" 
              name="dob" 
              value={form.dob ?? ""} 
              onChange={handleChange} 
              className={`${input} border-red-400 focus:ring-red-400/50`} 
            />
          </div>

          <div className="col-span-12 md:col-span-4 space-y-1.5">
            <label className="block text-[15px] font-medium text-gray-800">
              Civil Status
            </label>
            <select 
              name="civilStatus" 
              value={form.civilStatus ?? ""} 
              onChange={handleChange} 
              className={`${input} border-green-500 focus:ring-green-500/50`}
            >
              <option value="">-- Select --</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
        </div>

        {/* Row 3: Communication Meta fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="block text-[15px] font-medium text-gray-800">
              Email Address
            </label>
            <div className="flex shadow-sm rounded-xl overflow-hidden">
              <div className="bg-gray-100 border border-gray-300 border-r-0 px-4 flex items-center text-gray-500">
                <Mail size={18} />
              </div>
              <input 
                name="email" 
                value={form.email ?? ""} 
                onChange={handleChange} 
                className="flex-1 h-11 px-4 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 rounded-r-xl text-sm bg-[#fcfcfc] text-gray-700 placeholder-gray-400" 
              />
            </div>
          </div>

          {/* Contact Number */}
          <div className="space-y-1.5">
            <label className="block text-[15px] font-medium text-gray-800">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              name="contactNumber"
              value={form.contactNumber ?? ""} 
              onChange={handleChange}
              className={`${input} border-red-400 focus:ring-red-400/50`}
              placeholder="09XXXXXXXXX"
            />
          </div>
        </div>

        {/* Row 4: Full Width Address Area */}
        <div className="space-y-1.5">
          <label className="block text-[15px] font-medium text-gray-800">
            Residential Address <span className="text-red-500">*</span>
          </label>
          <textarea 
            rows="3" 
            name="address" 
            value={form.address ?? ""} 
            onChange={handleChange} 
            className="w-full p-4 border border-red-400 focus:ring-red-400/50 focus:outline-none focus:ring-2 rounded-xl text-sm bg-[#fcfcfc] text-gray-700 placeholder-gray-400 shadow-sm transition-all" 
            placeholder="House/Unit No., Street, Barangay, Municipality, Province" 
          />
        </div>
      </div>
    </div>
  );
}