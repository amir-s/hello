import React, { useState, useEffect } from 'react';
import TimeDisplay from './TimeDisplay';
import DateDisplay from './DateDisplay';

import './Header.scss';

export default function Header() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [date]);

  return (
    <header className="d-flex justify-content-between align-items-center">
      <div>
        <DateDisplay date={date} />
        <TimeDisplay date={date} />
      </div>
    </header>
  );
}
