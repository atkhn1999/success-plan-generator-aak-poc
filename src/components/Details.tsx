import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Tab } from '@headlessui/react';

export const Details: React.FC = () => {
  const { successPlan, isExternalView } = useStore();

  if (!successPlan) return null;

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white">
      <div className="px-6 pt-5">
        <h2 className="text-lg">Details</h2>
      </div>
      <div className="px-6 pb-5 pt-2">
        <Tab.Group>
          <Tab.List className="grid w-full grid-cols-5 rounded-xl border border-neutral-200 p-1 text-sm">
            {['Overview', 'KPIs', 'Timeline', 'Risks', 'History'].map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  `rounded-lg px-3 py-1.5 text-center transition-colors ${
                    selected
                      ? 'bg-neutral-100 text-neutral-900'
                      : 'text-neutral-500 hover:text-neutral-700'
                  }`
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-4">
            <Tab.Panel>
              <OverviewPanel />
            </Tab.Panel>
            <Tab.Panel>
              <KPIsPanel />
            </Tab.Panel>
            <Tab.Panel>
              <TimelinePanel />
            </Tab.Panel>
            <Tab.Panel>
              <RisksPanel />
            </Tab.Panel>
            <Tab.Panel>
              <HistoryPanel />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

const OverviewPanel: React.FC = () => {
  const { successPlan } = useStore();

  if (!successPlan) return null;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-neutral-200 p-4">
        <div className="text-sm text-neutral-600">Stakeholders</div>
        <div className="mt-2 space-y-3">
          {successPlan.stakeholders.map((stakeholder) => (
            <div key={stakeholder.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-xs">
                  {stakeholder.initials}
                </div>
                <div>
                  <div className="text-sm font-medium">{stakeholder.name}</div>
                  <div className="text-xs text-neutral-500">{stakeholder.role}</div>
                </div>
              </div>
              <span className="rounded-full bg-neutral-100 px-2 py-1 text-neutral-700">
                RACI: {stakeholder.raci}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 p-4">
        <div className="text-sm text-neutral-600">Products in scope</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {successPlan.productsInScope.map((product) => (
            <span key={product} className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700">
              {product}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 p-4">
        <div className="text-sm text-neutral-600">Next steps</div>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
          {successPlan.nextSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

const KPIsPanel: React.FC = () => {
  return (
    <div className="rounded-xl border border-neutral-200 p-4">
      <p className="text-sm text-neutral-600">KPI tracking and metrics will be shown here.</p>
    </div>
  );
};

const TimelinePanel: React.FC = () => {
  return (
    <div className="rounded-xl border border-neutral-200 p-4">
      <p className="text-sm text-neutral-600">Timeline and milestones will be shown here.</p>
    </div>
  );
};

const RisksPanel: React.FC = () => {
  const { successPlan } = useStore();

  if (!successPlan) return null;

  return (
    <div className="space-y-4">
      {successPlan.risks.length === 0 ? (
        <div className="rounded-xl border border-neutral-200 p-4">
          <p className="text-sm text-neutral-600">No risks identified yet.</p>
        </div>
      ) : (
        successPlan.risks.map((risk) => (
          <div key={risk.id} className="rounded-xl border border-neutral-200 p-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{risk.title}</h4>
                <p className="mt-1 text-sm text-neutral-600">{risk.description}</p>
                {risk.mitigation && (
                  <p className="mt-2 text-sm">
                    <span className="font-medium">Mitigation:</span> {risk.mitigation}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <span className={`rounded px-2 py-1 text-xs ${
                  risk.impact === 'high' ? 'bg-red-100 text-red-700' :
                  risk.impact === 'medium' ? 'bg-amber-100 text-amber-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {risk.impact} impact
                </span>
                <span className={`rounded px-2 py-1 text-xs ${
                  risk.likelihood === 'high' ? 'bg-red-100 text-red-700' :
                  risk.likelihood === 'medium' ? 'bg-amber-100 text-amber-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {risk.likelihood} likelihood
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const HistoryPanel: React.FC = () => {
  return (
    <div className="rounded-xl border border-neutral-200 p-4">
      <p className="text-sm text-neutral-600">Change history and audit log will be shown here.</p>
    </div>
  );
};