import React, { useState, useEffect } from 'react';
import { DateObject } from 'react-date-object';
import islamic from 'react-date-object/calendars/islamic';
import islamic_ar from 'react-date-object/locales/islamic_ar';

const IslamicCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new DateObject({ calendar: islamic, locale: islamic_ar }));
  const [calendarDays, setCalendarDays] = useState<DateObject[]>([]);
  const [selectedDate, setSelectedDate] = useState<DateObject | null>(null);

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

  const handleDayClick = (day: DateObject) => {
    if (day.isValid) {
      setSelectedDate(day);
      // You can add more logic here, e.g., open a modal to add/view events for this day
      console.log('Selected day:', day.format('YYYY/MM/DD'));
    }
  };

  const isWhiteDay = (day: DateObject) => {
    if (!day.isValid) return false;
    const dayOfMonth = day.day;
    return dayOfMonth === 13 || dayOfMonth === 14 || dayOfMonth === 15;
  };

  const daysOfWeek = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  // Placeholder for event data (you would fetch this from your backend)
  const events = [
    { date: '1445/09/15', title: 'Start of Ramadan' },
    { date: '1445/10/01', title: 'Eid al-Fitr' },
  ];

  const getEventsForDay = (day: DateObject) => {
    if (!day.isValid) return [];
    const dayString = day.format('YYYY/MM/DD');
    return events.filter(event => event.date === dayString);
  };

  const handleMonthYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [month, year] = event.target.value.split('-').map(Number);
    setCurrentDate(new DateObject({ year, month, day: 1, calendar: islamic, locale: islamic_ar }));
  };

  const renderMonthYearSelect = () => {
    const years = Array.from({ length: 10 }, (_, i) => currentDate.year - 5 + i);
    const months = currentDate.calendar.months.map((month: any, index: number) => ({ value: index + 1, name: month.name }));

    return (
      <select value={`${currentDate.month.number}-${currentDate.year}`} onChange={handleMonthYearChange}>
        {years.map(year => (
          months.map(month => (
            <option key={`${month.value}-${year}`} value={`${month.value}-${year}`}>
              {month.name} {year}
            </option>
          ))
        ))}
      </select>
    );
  };

  return (
    <div className="islamic-calendar">
      <div className="calendar-header">
        <button onClick={goToPreviousMonth}>&lt;</button>
        {renderMonthYearSelect()}
        <button onClick={goToNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map(day => (
          <div key={day} className="day-of-week">{day}</div>
        ))}
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${day.isValid ? 'valid-day' : 'empty-day'} ${isWhiteDay(day) ? 'white-day' : ''} ${selectedDate && day.format() === selectedDate.format() ? 'selected-day' : ''}`}
            onClick={() => handleDayClick(day)}
          >
            {day.isValid ? (
              <>
                <div className="day-number">{day.day}</div>
                {/* Display Gregorian date */}
                <div className="gregorian-date">{day.convert(undefined, undefined, true).format('MM/DD')}</div>
                {/* Display events */}
                {getEventsForDay(day).map(event => (
                  <div key={event.title} className="event">{event.title}</div>
                ))}
              </>
            ) : (
              ''
            )}
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
          cursor: pointer;
        }

        .empty-day {
          border: none;
        }

        .white-day {
          background-color: #ffeeba; /* Highlight color for white days */
        }

        .selected-day {
          background-color: #a0c4ff; /* Highlight color for selected day */
        }

        .day-number {
          font-size: 1.2em;
          font-weight: bold;
        }

        .gregorian-date {
          font-size: 0.8em;
          color: #555;
        }

        .event {
          font-size: 0.7em;
          color: #007bff;
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
};

export default IslamicCalendar;