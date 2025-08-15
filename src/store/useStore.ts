import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SuccessPlan, Objective, Stakeholder, Risk } from '../types';

interface Store {
  // Success Plan State
  successPlan: SuccessPlan | null;
  setSuccessPlan: (plan: SuccessPlan) => void;
  updateSuccessPlan: (updates: Partial<SuccessPlan>) => void;
  
  // External View State
  isExternalView: boolean;
  toggleExternalView: () => void;
  
  // Objectives Management
  addObjective: (objective: Objective) => void;
  updateObjective: (id: string, updates: Partial<Objective>) => void;
  deleteObjective: (id: string) => void;
  completeObjective: (id: string) => void;
  
  // Stakeholders Management
  addStakeholder: (stakeholder: Stakeholder) => void;
  updateStakeholder: (id: string, updates: Partial<Stakeholder>) => void;
  deleteStakeholder: (id: string) => void;
  
  // Risks Management
  addRisk: (risk: Risk) => void;
  updateRisk: (id: string, updates: Partial<Risk>) => void;
  deleteRisk: (id: string) => void;
  
  // Import/Export
  exportData: () => string;
  importData: (data: string) => void;
  
  // Reset
  resetStore: () => void;
}

const initialSuccessPlan: SuccessPlan = {
  id: '1',
  customerName: 'Acme Corp',
  fiscalYear: 'FY25',
  owner: {
    id: '1',
    name: 'Jordan Lee',
    initials: 'JL'
  },
  segment: 'Enterprise',
  industry: 'Retail',
  health: 'on_track',
  nextReview: '2025-09-30',
  lastUpdated: '2025-08-15',
  missionSummary: 'Drive activation and value realization for the Acme Retail division to support FY25 revenue targets and reduce onboarding time.',
  objectives: [
    {
      id: '1',
      title: 'Launch self-serve onboarding flow',
      owner: { id: '1', name: 'Jordan Lee', initials: 'JL' },
      dueDate: '2025-10-15',
      status: 'on_track',
      progress: 62,
      kpis: [
        { id: '1', name: 'Activation', value: '+12%' },
        { id: '2', name: 'Time-to-value', value: '-20%' }
      ],
      createdAt: '2025-07-01',
      updatedAt: '2025-08-15'
    },
    {
      id: '2',
      title: 'Improve activation email journey',
      owner: { id: '2', name: 'Kai Sun', initials: 'KS' },
      dueDate: '2025-11-01',
      status: 'on_track',
      progress: 35,
      kpis: [
        { id: '3', name: 'Weekly active', value: '+9%' }
      ],
      createdAt: '2025-07-01',
      updatedAt: '2025-08-15'
    },
    {
      id: '3',
      title: 'Expand analytics dashboards to EMEA',
      owner: { id: '1', name: 'Jordan Lee', initials: 'JL' },
      dueDate: '2025-10-28',
      status: 'needs_attention',
      progress: 78,
      kpis: [
        { id: '4', name: 'Time-to-value', value: '-8%' }
      ],
      createdAt: '2025-07-01',
      updatedAt: '2025-08-15'
    }
  ],
  completedObjectives: [
    {
      id: '4',
      title: 'Migrate analytics to v2 pipelines',
      owner: { id: '2', name: 'Kai Sun', initials: 'KS' },
      dueDate: '2025-08-12',
      status: 'on_track',
      progress: 100,
      kpis: [],
      createdAt: '2025-06-01',
      updatedAt: '2025-08-12',
      completedAt: '2025-08-12'
    },
    {
      id: '5',
      title: 'Roll out SSO to all workspaces',
      owner: { id: '1', name: 'Jordan Lee', initials: 'JL' },
      dueDate: '2025-08-02',
      status: 'on_track',
      progress: 100,
      kpis: [],
      createdAt: '2025-06-01',
      updatedAt: '2025-08-02',
      completedAt: '2025-08-02'
    }
  ],
  stakeholders: [
    { id: '1', name: 'Evelyn Chen', initials: 'EC', role: 'VP Product', raci: 'R' },
    { id: '2', name: 'Mark Patel', initials: 'MP', role: 'Head of Data', raci: 'A' },
    { id: '3', name: 'Sofia Gomez', initials: 'SG', role: 'Program Manager', raci: 'C' }
  ],
  productsInScope: ['Core Platform', 'Automation', 'Analytics', 'Integrations'],
  nextSteps: [
    'Finalize onboarding KPI targets',
    'Confirm GTM launch timeline with Product',
    'Schedule QBR week of Oct 7'
  ],
  risks: [],
  valueRealized: {
    activationRate: {
      value: '+14%',
      trend: [20, 15, 18, 10, 12, 8, 12, 9]
    },
    timeToValue: {
      value: '-19%',
      trend: [12, 10, 14, 18, 16, 20, 18, 21]
    }
  }
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      successPlan: initialSuccessPlan,
      isExternalView: false,
      
      setSuccessPlan: (plan) => set({ successPlan: plan }),
      
      updateSuccessPlan: (updates) => set((state) => ({
        successPlan: state.successPlan ? { ...state.successPlan, ...updates, lastUpdated: new Date().toISOString() } : null
      })),
      
      toggleExternalView: () => set((state) => ({ isExternalView: !state.isExternalView })),
      
      addObjective: (objective) => set((state) => ({
        successPlan: state.successPlan ? {
          ...state.successPlan,
          objectives: [...state.successPlan.objectives, objective],
          lastUpdated: new Date().toISOString()
        } : null
      })),
      
      updateObjective: (id, updates) => set((state) => ({
        successPlan: state.successPlan ? {
          ...state.successPlan,
          objectives: state.successPlan.objectives.map(obj =>
            obj.id === id ? { ...obj, ...updates, updatedAt: new Date().toISOString() } : obj
          ),
          lastUpdated: new Date().toISOString()
        } : null
      })),
      
      deleteObjective: (id) => set((state) => ({
        successPlan: state.successPlan ? {
          ...state.successPlan,
          objectives: state.successPlan.objectives.filter(obj => obj.id !== id),
          lastUpdated: new Date().toISOString()
        } : null
      })),
      
      completeObjective: (id) => set((state) => {
        if (!state.successPlan) return state;
        
        const objective = state.successPlan.objectives.find(obj => obj.id === id);
        if (!objective) return state;
        
        const completedObjective = {
          ...objective,
          progress: 100,
          completedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        return {
          successPlan: {
            ...state.successPlan,
            objectives: state.successPlan.objectives.filter(obj => obj.id !== id),
            completedObjectives: [...state.successPlan.completedObjectives, completedObjective],
            lastUpdated: new Date().toISOString()
          }
        };
      }),
      
      addStakeholder: (stakeholder) => set((state) => ({
        successPlan: state.successPlan ? {
          ...state.successPlan,
          stakeholders: [...state.successPlan.stakeholders, stakeholder],
          lastUpdated: new Date().toISOString()
        } : null
      })),
      
      updateStakeholder: (id, updates) => set((state) => ({
        successPlan: state.successPlan ? {
          ...state.successPlan,
          stakeholders: state.successPlan.stakeholders.map(s =>
            s.id === id ? { ...s, ...updates } : s
          ),
          lastUpdated: new Date().toISOString()
        } : null
      })),
      
      deleteStakeholder: (id) => set((state) => ({
        successPlan: state.successPlan ? {
          ...state.successPlan,
          stakeholders: state.successPlan.stakeholders.filter(s => s.id !== id),
          lastUpdated: new Date().toISOString()
        } : null
      })),
      
      addRisk: (risk) => set((state) => ({
        successPlan: state.successPlan ? {
          ...state.successPlan,
          risks: [...state.successPlan.risks, risk],
          lastUpdated: new Date().toISOString()
        } : null
      })),
      
      updateRisk: (id, updates) => set((state) => ({
        successPlan: state.successPlan ? {
          ...state.successPlan,
          risks: state.successPlan.risks.map(r =>
            r.id === id ? { ...r, ...updates } : r
          ),
          lastUpdated: new Date().toISOString()
        } : null
      })),
      
      deleteRisk: (id) => set((state) => ({
        successPlan: state.successPlan ? {
          ...state.successPlan,
          risks: state.successPlan.risks.filter(r => r.id !== id),
          lastUpdated: new Date().toISOString()
        } : null
      })),
      
      exportData: () => {
        const state = get();
        const exportData = {
          successPlan: state.successPlan,
          exportedAt: new Date().toISOString(),
          version: '1.0'
        };
        return JSON.stringify(exportData, null, 2);
      },
      
      importData: (data) => {
        try {
          const parsedData = JSON.parse(data);
          if (parsedData.successPlan) {
            set({
              successPlan: {
                ...parsedData.successPlan,
                lastUpdated: new Date().toISOString()
              }
            });
          }
        } catch (error) {
          console.error('Failed to import data:', error);
          throw new Error('Invalid data format');
        }
      },
      
      resetStore: () => set({ successPlan: initialSuccessPlan, isExternalView: false })
    }),
    {
      name: 'success-plan-storage'
    }
  )
);