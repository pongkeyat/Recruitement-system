import React from 'react';
import { Calendar as CalendarIcon, CalendarPlus } from 'lucide-react';

export default function AssessmentStats({ count, loading }) {
  const statCards = [
    { 
      id: 'total', 
      count: count, 
      label: 'Total Tracked Sessions', 
      topBorderColor: 'border-[#112d55]', 
      iconBg: 'bg-[#e9ecf0]', 
      iconColor: 'text-[#112d55]', 
      icon: CalendarIcon 
    },
    { 
      id: 'scheduled', 
      count: count, 
      label: 'Active Schedules', 
      topBorderColor: 'border-[#3b82f6]', 
      iconBg: 'bg-[#eff6ff]', 
      iconColor: 'text-[#3b82f6]', 
      icon: CalendarPlus 
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {statCards.map((card) => {
        const IconComp = card.icon;
        return (
          <div key={card.id} className={`bg-white rounded-2xl shadow-md border-t-[5px] ${card.topBorderColor} px-5 py-6 flex items-center gap-4`}>
            <div className={`p-3 rounded-xl ${card.iconBg} ${card.iconColor}`}>
              <IconComp className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-3xl font-black text-[#1e293b] leading-none tracking-tight">
                {loading ? '...' : card.count}
              </span>
              <span className="text-xs font-semibold text-[#64748b] block mt-1">{card.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}