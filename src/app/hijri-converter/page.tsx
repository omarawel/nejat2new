import React, { useState } from 'react';
import { DateObject } from 'react-date-object';
import islamic from 'react-date-object/calendars/islamic';
import islamic_ar from 'react-date-object/locales/islamic_ar';

const HijriConverterPage: React.FC = () => {
  const [gregorianDate, setGregorianDate] = useState('');
  const [hijriDate, setHijriDate] = useState('');
  const [convertedDate, setConvertedDate] = useState('');
  const [isGregorianInput, setIsGregorianInput] = useState(true);

  const handleGregorianInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGregorianDate(event.target.value);
    setHijriDate(''); // Clear Hijri input when Gregorian changes
    setConvertedDate('');
    setIsGregorianInput(true);
  };

  const handleHijriInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHijriDate(event.target.value);
    setGregorianDate(''); // Clear Gregorian input when Hijri changes
    setConvertedDate('');
    setIsGregorianInput(false);
  };

  const convertDate = () => {
    if (isGregorianInput && gregorianDate) {
      try {
        const date = new DateObject(gregorianDate);
        const hijri = date.convert(islamic, islamic_ar);
        setConvertedDate(`Hijri: ${hijri.format('YYYY/MM/DD')}`);
      } catch (error) {
        setConvertedDate('Invalid Gregorian date');
      }
    } else if (!isGregorianInput && hijriDate) {
      try {
        const date = new DateObject({ date: hijriDate, calendar: islamic, locale: islamic_ar });
        const gregorian = date.convert();
        setConvertedDate(`Gregorian: ${gregorian.format('YYYY/MM/DD')}`);
      } catch (error) {
        setConvertedDate('Invalid Hijri date');
      }
    } else {
      setConvertedDate('Please enter a date');
    }
  };

  return (
    <div className="hijri-converter-container">
      <h1>Hijri Date Converter</h1>
      <div className="input-group">
        <label>
          Gregorian Date:
          <input type="text" value={gregorianDate} onChange={handleGregorianInputChange} placeholder="YYYY/MM/DD" />
        </label>
      </div>
      <div className="input-group">
        <label>
          Hijri Date:
          <input type="text" value={hijriDate} onChange={handleHijriInputChange} placeholder="YYYY/MM/DD" />
        </label>
      </div>
      <button onClick={convertDate}>Convert</button>
      {convertedDate && (
        <div className="conversion-result">
          <h2>Converted Date:</h2>
          <p>{convertedDate}</p>
        </div>
      )}
      <style jsx>{`
        .hijri-converter-container {
          font-family: sans-serif;
          padding: 20px;
          max-width: 500px;
          margin: 0 auto;
          border: 1px solid #ccc;
          border-radius: 8px;
        }
        
        h1 {
          text-align: center;
          margin-bottom: 20px;
        }

        .input-group {
          margin-bottom: 15px;
        }

        .input-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        .input-group input[type="text"] {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button {
          display: block;
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1.1em;
        }

        button:hover {
          background-color: #0056b3;
        }

        .conversion-result {
          margin-top: 20px;
          padding: 15px;
          border: 1px solid #eee;
          border-radius: 4px;
          background-color: #f9f9f9;
        }

        .conversion-result h2 {
          margin-top: 0;
          font-size: 1.2em;
        }
      `}</style>
    </div>
  );
};

export default HijriConverterPage;