import React, { useState, useMemo } from 'react';
import { Search, MoreVertical, Plus } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Objective, Status } from '../types';
import { format } from 'date-fns';
import { Menu } from '@headlessui/react';

export const Objectives: React.FC = () => {
  const { successPlan, isExternalView } = useStore();
  const [search, setSearch] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('Any owner');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);

  const filteredObjectives = useMemo(() => {
    if (!successPlan) return [];
    
    return successPlan.objectives.filter(obj => {
      const matchesSearch = obj.title.toLowerCase().includes(search.toLowerCase());
      const matchesOwner = ownerFilter === 'Any owner' || obj.owner.name === ownerFilter;
      const matchesStatus = statusFilter === 'All' || obj.status === statusFilter.toLowerCase().replace(' ', '_');
      
      return matchesSearch && matchesOwner && matchesStatus;
    });
  }, [successPlan, search, ownerFilter, statusFilter]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedObjectives(filteredObjectives.map(obj => obj.id));
    } else {
      setSelectedObjectives([]);
    }
  };

  const handleSelectObjective = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedObjectives([...selectedObjectives, id]);
    } else {
      setSelectedObjectives(selectedObjectives.filter(objId => objId !== id));
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white">
      <div className="flex items-center justify-between px-6 pt-5">
        <h2 className="text-lg">Objectives</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-neutral-400" />
            <input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-40 rounded-md border border-neutral-200 bg-white pl-8 pr-3 py-2 text-sm"
            />
          </div>
          <select
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value)}
            className="w-36 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm"
          >
            <option>Any owner</option>
            <option>Jordan Lee</option>
            <option>Kai Sun</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-36 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm"
          >
            <option>All</option>
            <option>On track</option>
            <option>Needs attention</option>
            <option>At risk</option>
          </select>
          <button className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm hover:bg-neutral-50 transition-colors">
            Filters
          </button>
          {!isExternalView && (
            <button className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add objective
            </button>
          )}
        </div>
      </div>
      <div className="px-6 pb-5 pt-3">
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-neutral-600">
              <tr>
                <th className="w-[36px] p-3">
                  <input
                    type="checkbox"
                    checked={selectedObjectives.length === filteredObjectives.length && filteredObjectives.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
                <th className="p-3">Objective</th>
                <th className="w-[120px] p-3">Owner</th>
                <th className="w-[120px] p-3">Due</th>
                <th className="w-[160px] p-3">Status</th>
                <th className="w-[140px] p-3">Progress</th>
                <th className="w-[40px] p-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredObjectives.map((objective) => (
                <ObjectiveRow
                  key={objective.id}
                  objective={objective}
                  isSelected={selectedObjectives.includes(objective.id)}
                  onSelect={handleSelectObjective}
                  isExternalView={isExternalView}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface ObjectiveRowProps {
  objective: Objective;
  isSelected: boolean;
  onSelect: (id: string, checked: boolean) => void;
  isExternalView: boolean;
}

const ObjectiveRow: React.FC<ObjectiveRowProps> = ({ objective, isSelected, onSelect, isExternalView }) => {
  const { updateObjective, deleteObjective, completeObjective } = useStore();

  const getStatusStyle = (status: Status) => {
    switch (status) {
      case 'on_track':
        return 'border-emerald-200 bg-emerald-50 text-emerald-700';
      case 'needs_attention':
        return 'border-amber-200 bg-amber-50 text-amber-700';
      case 'at_risk':
        return 'border-red-200 bg-red-50 text-red-700';
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

  return (
    <tr className="border-t hover:bg-neutral-50">
      <td className="p-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(objective.id, e.target.checked)}
        />
      </td>
      <td className="p-3">
        {objective.title}
        {objective.kpis.length > 0 && (
          <div className="mt-1 text-xs text-neutral-500">
            KPIs: {objective.kpis.map((kpi, i) => (
              <span key={kpi.id}>
                {i > 0 && ' • '}
                {kpi.name} <span className="font-medium text-neutral-700">{kpi.value}</span>
              </span>
            ))}
          </div>
        )}
      </td>
      <td className="p-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 text-xs">
            {objective.owner.initials}
          </div>
          <span>{objective.owner.name.split(' ')[0]}</span>
        </div>
      </td>
      <td className="p-3">{format(new Date(objective.dueDate), 'MMM dd')}</td>
      <td className="p-3">
        <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs ${getStatusStyle(objective.status)}`}>
          {getStatusLabel(objective.status)}
        </span>
      </td>
      <td className="p-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-24 overflow-hidden rounded-full bg-neutral-200">
            <div className="h-2 bg-neutral-900" style={{ width: `${objective.progress}%` }}></div>
          </div>
          <span className="text-xs text-neutral-600">{objective.progress}%</span>
        </div>
      </td>
      <td className="p-3 text-right">
        {!isExternalView && (
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="rounded p-1 hover:bg-neutral-100">
              <MoreVertical className="h-4 w-4" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div className="p-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => {
                        const newProgress = Math.min(100, objective.progress + 10);
                        updateObjective(objective.id, { progress: newProgress });
                      }}
                      className={`${
                        active ? 'bg-neutral-100' : ''
                      } group flex w-full items-center rounded-md px-3 py-2 text-sm`}
                    >
                      Update Progress
                    </button>
                  )}
                </Menu.Item>
                {objective.progress === 100 && (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => completeObjective(objective.id)}
                        className={`${
                          active ? 'bg-neutral-100' : ''
                        } group flex w-full items-center rounded-md px-3 py-2 text-sm`}
                      >
                        Mark as Complete
                      </button>
                    )}
                  </Menu.Item>
                )}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => deleteObjective(objective.id)}
                      className={`${
                        active ? 'bg-neutral-100' : ''
                      } group flex w-full items-center rounded-md px-3 py-2 text-sm text-red-600`}
                    >
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        )}
      </td>
    </tr>
  );
};