import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  PlusCircle, 
  FolderDown, 
  FileText, 
  ClipboardCheck, 
  UserCheck, 
  UserX,
  LogOut,
  UserRoundCheck,
  UserRoundX,

} from 'lucide-react';

export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const menuSections = [
    {
      title: "VACANCY MANAGEMENT",
      items: [
        { label: "Vacancy Postings", to: "/vacancyPosting", icon: Briefcase },
        { label: "Post New Vacancy", to: "/postVacancy", icon: PlusCircle },
      ]
    },
        {
      title: "APPLICATIONS",
      items: [
        { label: "Receive Application", to: "/receiveApplicant", icon: FolderDown },
        { label: "All Applications", to: "/allApplications", icon: FileText },
      ]
    },
     {
      title: "SCREENING",
      items: [
        { label: "Initial Screening", to: "/initialScreening", icon: ClipboardCheck },
        { label: "Qualified", to: "/Qualified", icon: UserRoundCheck },
        { label: "Disqualified", to: "/Disqualified", icon: UserRoundX },
      ]
    },


  ];

  return (
    /* 1. MAIN CONTAINER: Controlled height, NO overflow-y-auto here to prevent double scrollbars */
    <nav className="flex flex-col  h-screen bg-[#112244] text-slate-300 border-r border-white/5 font-sans select-none">
      
      {/* BRAND HEADER */}
      <div className="flex items-center gap-3 p-4 border-b border-white/5 flex-shrink-0">
  
        <div className="flex flex-col min-w-0">
          <span className="text-[14px] font-bold text-white tracking-wide truncate">Region 1</span>
          <span className="text-[11px] text-slate-400 font-medium">Ranking System v1.0.0</span>
        </div>
      </div>

      {/* USER PROFILE CARD */}
      <div className="p-3 mx-3 mt-4 mb-2 rounded-xl bg-white/[0.04] border border-white/[0.03] flex items-center gap-3 flex-shrink-0">
        <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 font-bold text-sm shadow-md flex-shrink-0">
          S
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-semibold text-white truncate">System Administrator</span>
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-[8px] text-emerald-400 text-center leading-3">✓</span> 
            Super Administrator
          </span>
        </div>
      </div>

      {/* 2. INNER SCROLL AREA: Only this middle section will scroll if the menu gets too tall */}
      <div className="flex-1 px-3 py-3 space-y-5 overflow-y-auto custom-scrollbar">
        
        {/* Dashboard Link */}
        <div>
          <Link
            to="/dashboard"
            className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
              isActive('/dashboard') 
                ? 'bg-white/[0.08] text-white font-semibold border-l-[3px] border-amber-500' 
                : 'hover:bg-white/[0.03] hover:text-white'
            }`}
          >
            <LayoutDashboard size={17} className={`transition-colors ${isActive('/dashboard') ? 'text-amber-400' : 'text-slate-400 group-hover:text-amber-400'}`} />
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Dynamic Sections */}
        {menuSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <div className="px-3 text-[10px] font-bold tracking-wider text-slate-500 mb-1">
              {section.title}
            </div>
            {section.items.map((item, itemIdx) => {
              const IconComponent = item.icon;
              const active = isActive(item.to);
              return (
                <Link
                  key={itemIdx}
                  to={item.to}
                  className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                    active 
                      ? 'bg-white/[0.08] text-white font-semibold border-l-[3px] border-amber-500' 
                      : 'hover:bg-white/[0.03] hover:text-white'
                  }`}
                >
                  <IconComponent size={17} className={`transition-colors ${active ? 'text-amber-400' : 'text-slate-400 group-hover:text-amber-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>



    </nav>
  );
}