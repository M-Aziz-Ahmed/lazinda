'use client';   
import React from 'react';
import { statuses } from '../../lib/data';

export default function SampleProgressBar({ status }) {
  return (
    <div className="flex gap-2 mt-2">
      {statuses.map((stage) => (
        <div
          key={stage}
          className={`px-3 py-1 rounded-full text-xs font-semibold border
            ${stage === status
              ? 'bg-blue-500 text-white border-blue-700'
              : 'bg-gray-100 text-gray-400 border-gray-200'}
          `}
        >
          {stage}
        </div>
      ))}
    </div>
  );
}