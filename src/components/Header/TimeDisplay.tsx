import React from 'react';

export interface Props {
  date: Date;
}

export default function TimeDisplay({ date }: Props) {
  return (
    <div className="heading--1" id="time-display">
      {date
        .toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })
        .replace(/\s/, '')
        .toLowerCase()}
    </div>
  );
}
