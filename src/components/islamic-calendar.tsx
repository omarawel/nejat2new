import React from 'react';

const IslamicCalendar: React.FC = () => {
  return (
    <div className="islamic-calendar">
      <div className="calendar-header">
        <button>&lt;</button>
        <h2>Month Year</h2>
        <button>&gt;</button>
      </div>
      <div className="calendar-grid">
        {/* Calendar days will go here */}
      </div>
    </div>
  );
};

export default IslamicCalendar;