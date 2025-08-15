import React from 'react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';

export const CompletedObjectives: React.FC = () => {
  const { successPlan } = useStore();

  if (!successPlan || successPlan.completedObjectives.length === 0) return null;

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white">
      <div className="px-6 pt-5">
        <h2 className="text-lg">Completed</h2>
      </div>
      <div className="space-y-3 px-6 pb-5 pt-2 text-sm">
        {successPlan.completedObjectives.map((objective) => (
          <div key={objective.id} className="flex items-center justify-between rounded-xl border border-neutral-200 p-3">
            <div>
              {objective.title}
              <div className="text-xs text-neutral-500">
                Completed {format(new Date(objective.completedAt!), 'MMM dd')} • Owner: {objective.owner.name}
              </div>
            </div>
            {objective.kpis.length > 0 ? (
              <span className="rounded-full bg-neutral-100 px-2 py-1 text-neutral-700">
                {objective.kpis[0].name}
              </span>
            ) : (
              <span className="rounded-full bg-neutral-100 px-2 py-1 text-neutral-700">
                {objective.progress === 100 ? '98% adoption' : 'Security'}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};