import { AlertCircle, Check, Mail } from "lucide-react";
import { useState } from "react";

export default function ApplicantForm({ formData, onChange }) {
  const [internal, setInternal] = useState({
    lastName: "", firstName: "", middleName: "", suffix: "",
    sex: "", dob: "", civilStatus: "", email: "", address: ""
  });
  
  const form = formData ?? internal;
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (onChange) onChange(name, value);
    else setInternal({ ...internal, [name]: value });
  };

  const input = "w-full rounded-xl border px-4 py-3 focus:outline-none";

  return (
    <div className="bg-white px-6 py-6">
      {/* Row 1 */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-4">
          <label className="font-medium">Last Name <span className="text-red-500">*</span></label>
          <div className="relative mt-2">
            <input name="lastName" value={form.lastName} onChange={handleChange} className={`${input} border-red-400`} />
            <AlertCircle size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" />
          </div>
        </div>
        <div className="col-span-4">
          <label className="font-medium">First Name <span className="text-red-500">*</span></label>
          <div className="relative mt-2">
            <input name="firstName" value={form.firstName} onChange={handleChange} className={`${input} border-red-400`} />
            <AlertCircle size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" />
          </div>
        </div>
        <div className="col-span-3">
          <label className="font-medium">Middle Name</label>
          <div className="relative mt-2">
            <input name="middleName" value={form.middleName} onChange={handleChange} className={`${input} border-green-500`} />
            <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600" />
          </div>
        </div>
        <div className="col-span-1">
          <label className="font-medium">Suffix</label>
          <select name="suffix" value={form.suffix} onChange={handleChange} className={`${input} border-green-500 mt-2`}>
            {["", "Jr.", "Sr.", "III"].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-12 gap-5 mt-6">
        <div className="col-span-3">
          <label className="font-medium">Sex <span className="text-red-500">*</span></label>
          <select name="sex" value={form.sex} onChange={handleChange} className={`${input} border-red-400 mt-2`}>
            <option value="">-- Select --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="col-span-3">
          <label className="font-medium">Date of Birth</label>
          <input type="date" name="dob" value={form.dob} onChange={handleChange} className={`${input} border-red-400 mt-2`} />
        </div>
        <div className="col-span-3">
          <label className="font-medium">Civil Status</label>
          <select name="civilStatus" value={form.civilStatus} onChange={handleChange} className={`${input} border-green-500 mt-2`}>
            <option value="">-- Select --</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>
      </div>

      {/* Email & Address */}
      <div className="mt-6 max-w-xl">
        <label className="font-medium">Email Address</label>
        <div className="flex mt-2">
          <div className="bg-gray-100 border border-r-0 rounded-l-xl px-4 flex items-center"><Mail size={18} /></div>
          <input name="email" value={form.email} onChange={handleChange} className="flex-1 border border-green-500 rounded-r-xl px-4 py-3" />
        </div>
      </div>

      <div className="mt-6 max-w-xl">
        <label className="font-medium">Contact Number <span className="text-red-500">*</span></label>
        <input
          name="contactNumber"
          value={form.contactNumber}
          onChange={handleChange}
          className="w-full rounded-xl border border-red-400 px-4 py-3 mt-2"
          placeholder="09XXXXXXXXX"
        />
      </div>

      <div className="mt-6">
        <label className="font-medium">Residential Address <span className="text-red-500">*</span></label>
        <textarea rows="3" name="address" value={form.address} onChange={handleChange} className="w-full rounded-xl border border-red-400 px-4 py-3 mt-2" placeholder="House/Unit No., Street, Barangay, Municipality, Province" />
      </div>
    </div>
  );
}

