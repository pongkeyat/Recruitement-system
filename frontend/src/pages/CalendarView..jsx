import React from 'react';
import { ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';

export default function CalendarView({
  currentYear,
  currentMonth,
  selectedDay,
  setSelectedDay,
  setCurrentMonth,
  setCurrentYear,
  filteredSessions,
  monthNames
}) {
  const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const daysArray = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);
  const startOffsetDays = Array.from({ length: firstDayIndex }, (_, i) => i);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const activeDaySchedules = filteredSessions.filter(
    (s) => s.year === currentYear && s.month === currentMonth && s.day === selectedDay
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Calendar Grid Section */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-black text-[#1e3a6a] uppercase">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <div className="flex gap-1 border rounded-lg p-0.5 bg-white text-[10px] font-bold text-slate-600">
            <button onClick={handlePrevMonth} className="p-1 hover:bg-slate-100 rounded">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setCurrentYear(2026);
                setCurrentMonth(3);
                setSelectedDay(6);
              }}
              className="px-2 uppercase hover:bg-slate-100 rounded"
            >
              Current Month
            </button>
            <button onClick={handleNextMonth} className="p-1 hover:bg-slate-100 rounded">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="border rounded-xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-7 bg-slate-50 text-center text-[10px] font-black uppercase text-slate-500 py-2 border-b">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>
          <div className="grid grid-cols-7 bg-slate-200 gap-[1px]">
            {startOffsetDays.map((val) => (
              <div key={`offset-${val}`} className="bg-slate-50/40 min-h-[100px]" />
            ))}
            {daysArray.map((day) => {
              const dayEvents = filteredSessions.filter(
                (e) => e.year === currentYear && e.month === currentMonth && e.day === day
              );
              const isSelected = selectedDay === day;
              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`min-h-[110px] p-2 flex flex-col justify-between cursor-pointer transition-all ${
                    isSelected ? 'bg-blue-50 ring-2 ring-blue-500/50 z-10' : 'bg-white hover:bg-slate-50'
                  }`}
                >
                  <span className={`text-xs font-bold ${isSelected ? 'text-blue-600' : 'text-slate-700'}`}>
                    {day}
                  </span>
                  <div className="space-y-1 mt-1 flex-1 overflow-hidden">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`text-[9px] px-1.5 py-0.5 rounded truncate font-bold text-white ${event.calBg}`}
                      >
                        {event.position}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[8px] text-slate-400 font-bold pl-1">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sidebar Schedule List Section */}
      <div className="w-full lg:w-80 shrink-0 space-y-4">
        <div className="bg-[#f8f9fa] rounded-xl border border-slate-200 p-4">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">
            Schedules for {monthNames[currentMonth]} {selectedDay}
          </h3>
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {activeDaySchedules.length > 0 ? (
              activeDaySchedules.map((session) => (
                <div
                  key={session.id}
                  className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-black ${session.statusBg}`}>
                      {session.status}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">#{session.id}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-xs mt-2 line-clamp-2 leading-tight">
                    {session.position}
                  </h4>
                  <div className="text-[9px] text-blue-500 font-bold font-mono tracking-wide mt-0.5">
                    {session.code}
                  </div>
                  <div className="mt-3 space-y-1.5 pt-2 border-t border-slate-100 text-[10px] font-medium text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{session.venue}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 shrink-0" />
                      <span>{session.timePerApplicant} / Applicant</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 font-bold text-slate-400 text-xs bg-white rounded-lg border border-dashed border-slate-200">
                No assessments today
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}