import React from 'react';
import { useStore } from '../store/useStore';

export const InfoCards: React.FC = () => {
  const { successPlan } = useStore();

  if (!successPlan) return null;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-neutral-200 bg-white">
        <div className="px-6 pt-5">
          <h2 className="text-lg">Mission summary</h2>
        </div>
        <div className="px-6 pb-5 pt-2 text-sm text-neutral-700">
          {successPlan.missionSummary}
        </div>
      </div>
      <div className="rounded-2xl border border-neutral-200 bg-white">
        <div className="px-6 pt-5">
          <h2 className="text-lg">Value realized</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 px-6 pb-5 pt-2 text-sm">
          <div className="rounded-xl border border-neutral-200 p-3">
            <div className="text-neutral-500">Activation rate</div>
            <div className="mt-1 text-xl font-semibold">{successPlan.valueRealized.activationRate.value}</div>
            <svg viewBox="0 0 100 30" className="h-6 w-full text-neutral-700">
              <polyline 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                points={successPlan.valueRealized.activationRate.trend.map((val, i) => 
                  `${(i / (successPlan.valueRealized.activationRate.trend.length - 1)) * 100},${30 - val}`
                ).join(' ')}
                className="opacity-70"
              />
            </svg>
          </div>
          <div className="rounded-xl border border-neutral-200 p-3">
            <div className="text-neutral-500">Time-to-value</div>
            <div className="mt-1 text-xl font-semibold">{successPlan.valueRealized.timeToValue.value}</div>
            <svg viewBox="0 0 100 30" className="h-6 w-full text-neutral-700">
              <polyline 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                points={successPlan.valueRealized.timeToValue.trend.map((val, i) => 
                  `${(i / (successPlan.valueRealized.timeToValue.trend.length - 1)) * 100},${val}`
                ).join(' ')}
                className="opacity-70"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};