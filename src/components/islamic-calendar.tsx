import React, { useState, useEffect } from 'react';
import { DateObject } from 'react-date-object';
import islamic from 'react-date-object/calendars/islamic';
import islamic_ar from 'react-date-object/locales/islamic_ar';

const IslamicCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new DateObject({ calendar: islamic, locale: islamic_ar }));
  const [calendarDays, setCalendarDays] = useState<DateObject[]>([]);

  useEffect(() => {
    generateCalendarDays(currentDate);
  }, [currentDate]);

  const generateCalendarDays = (date: DateObject) => {
    const year = date.year;
    const month = date.month.number;
    const daysInMonth = date.daysInMonth;

    const firstDayOfMonth = new DateObject({ year, month, day: 1, calendar: islamic, locale: islamic_ar });
    const dayOfWeek = firstDayOfMonth.weekDay.number;

    const days = [];
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < dayOfWeek; i++) {
      days.push(new DateObject({})); // Empty DateObject for spacing
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new DateObject({ year, month, day: i, calendar: islamic, locale: islamic_ar }));
    }

    setCalendarDays(days);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new DateObject(currentDate).add(-1, 'month'));
  };

  const goToNextMonth = () => {
    setCurrentDate(new DateObject(currentDate).add(1, 'month'));
  };

  const isWhiteDay = (day: DateObject) => {
    if (!day.isValid) return false;
    const dayOfMonth = day.day;
    return dayOfMonth === 13 || dayOfMonth === 14 || dayOfMonth === 15;
  };

  const daysOfWeek = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  return (
    <div className="islamic-calendar">
      <div className="calendar-header">
        <button onClick={goToPreviousMonth}>&lt;</button>
        <h2>{currentDate.month.name} {currentDate.year}</h2>
        <button onClick={goToNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map(day => (
          <div key={day} className="day-of-week">{day}</div>
        ))}
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${day.isValid ? 'valid-day' : 'empty-day'} ${isWhiteDay(day) ? 'white-day' : ''}`}
          >
            {day.isValid ? day.day : ''}
          </div>
        ))}
      </div>
      <style jsx>{`
        .islamic-calendar {
          font-family: sans-serif;
          border: 1px solid #ccc;
          padding: 10px;
          max-width: 400px;
          margin: 0 auto;
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .calendar-header button {
          background: none;
          border: none;
          font-size: 1.2em;
          cursor: pointer;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
          text-align: center;
        }

        .day-of-week {
          font-weight: bold;
        }

        .calendar-day {
          padding: 5px;
          border: 1px solid #eee;
        }

        .empty-day {
          border: none;
        }

        .white-day {
          background-color: #ffeeba; /* Highlight color for white days */
        }
      `}</style>
all 4    </div>
  );
};

export default IslamicCalendar;