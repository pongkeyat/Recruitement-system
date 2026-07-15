import React, { useState, useEffect } from 'react';
import CalendarView from '../../pages/CalendarView.';
import { getInterviewDate } from '../../api/AssesmentApi';

export default function CalendarParent() {
  const [sessions, setSessions] = useState([]); // Base state initialized safely as empty array
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(6); // July (0-indexed)
  const [selectedDay, setSelectedDay] = useState(14);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  useEffect(() => {
    const loadData = async () => {
      try {
        const processedData = await getInterviewDate();
        setSessions(processedData);
      } catch (err) {
        console.error("Failed loading backend interview data:", err);
      }
    };
    loadData();
  }, []);

  return (
    <div className="p-6">
      <CalendarView
        currentYear={currentYear}
        currentMonth={currentMonth}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        setCurrentMonth={setCurrentMonth}
        setCurrentYear={setCurrentYear}
        filteredSessions={sessions} // Pass processed array here
        monthNames={monthNames}
      />
    </div>
  );
}