import React from 'react';

export interface Props {
  date: Date;
}

export default function DateDisplay({ date }: Props) {
  return (
    <div className="heading--5" id="date-display">
      {date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    </div>
  );
}
