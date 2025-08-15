import React from 'react';
import { Calendar, Clock, User, FolderOpen, Activity } from 'lucide-react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';
import { Status } from '../types';

export const MetaHeader: React.FC = () => {
  const { successPlan } = useStore();

  if (!successPlan) return null;

  const getStatusStyle = (status: Status) => {
    switch (status) {
      case 'on_track':
        return 'border-emerald-300 bg-emerald-50';
      case 'needs_attention':
        return 'border-amber-300 bg-amber-50';
      case 'at_risk':
        return 'border-red-300 bg-red-50';
    }
  };

  const getStatusLabel = (status: Status) => {
    switch (status) {
      case 'on_track':
        return 'On track';
      case 'needs_attention':
        return 'Needs attention';
      case 'at_risk':
        return 'At risk';
    }
  };

  // Calculate change summary
  const completedObjectivesCount = successPlan.completedObjectives.filter(
    obj => new Date(obj.completedAt!) > new Date(successPlan.lastExported || '2025-08-10')
  ).length;
  const risksAddedCount = successPlan.risks.filter(
    risk => new Date(risk.createdAt) > new Date(successPlan.lastExported || '2025-08-10')
  ).length;

  return (
    <section className="mx-auto max-w-[1200px] px-6 pt-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-8">
          <div className="rounded-2xl border border-neutral-200 bg-white">
            <div className="flex items-center justify-between px-6 pt-5">
              <h1 className="text-2xl">{successPlan.customerName} — {successPlan.fiscalYear} Success Plan</h1>
              <div className="flex items-center gap-3 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Next review: {format(new Date(successPlan.nextReview), 'MMM dd, yyyy')}
                </div>
                <span className="h-4 w-px bg-neutral-200"></span>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Last updated: {format(new Date(successPlan.lastUpdated), 'MMM dd, yyyy')}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 px-6 pb-6 pt-3 md:grid-cols-3">
              <div className="rounded-xl border border-neutral-200 p-4">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <User className="h-4 w-4" />
                  Owner
                </div>
                <div className="mt-1 font-medium">{successPlan.owner.name}</div>
              </div>
              <div className="rounded-xl border border-neutral-200 p-4">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <FolderOpen className="h-4 w-4" />
                  Segment
                </div>
                <div className="mt-1 font-medium">{successPlan.segment} • {successPlan.industry}</div>
              </div>
              <div className="rounded-xl border border-neutral-200 p-4">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Activity className="h-4 w-4" />
                  Health
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                  {(['on_track', 'needs_attention', 'at_risk'] as Status[]).map((status) => (
                    <button
                      key={status}
                      onClick={() => useStore.getState().updateSuccessPlan({ health: status })}
                      className={`rounded-lg border px-2 py-1 transition-colors ${
                        successPlan.health === status ? getStatusStyle(status) : 'hover:bg-neutral-50'
                      }`}
                    >
                      {getStatusLabel(status)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="col-span-12 xl:col-span-4">
          <div className="rounded-2xl border border-neutral-200 bg-white">
            <div className="px-6 pt-5">
              <h2 className="text-lg">Change summary</h2>
            </div>
            <div className="flex flex-wrap gap-2 px-6 pb-5 pt-2 text-sm">
              {completedObjectivesCount > 0 && (
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700">
                  +{completedObjectivesCount} objectives completed
                </span>
              )}
              {risksAddedCount > 0 && (
                <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-amber-700">
                  {risksAddedCount} risk{risksAddedCount > 1 ? 's' : ''} added
                </span>
              )}
              <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-blue-700">
                2 KPIs updated
              </span>
              <div className="mt-2 w-full text-xs text-neutral-500">
                Since last export • Last exported {successPlan.lastExported ? format(new Date(successPlan.lastExported), 'MMM dd, yyyy') : 'Aug 10, 2025'}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};