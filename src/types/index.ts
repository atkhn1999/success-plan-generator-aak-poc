export type Status = 'on_track' | 'needs_attention' | 'at_risk';
export type ObjectiveStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type RACI = 'R' | 'A' | 'C' | 'I';

export interface KPI {
  id: string;
  name: string;
  value: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface Objective {
  id: string;
  title: string;
  description?: string;
  owner: {
    id: string;
    name: string;
    initials: string;
  };
  dueDate: string;
  status: Status;
  progress: number;
  kpis: KPI[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface Stakeholder {
  id: string;
  name: string;
  initials: string;
  role: string;
  raci: RACI;
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  likelihood: 'low' | 'medium' | 'high';
  mitigation?: string;
  owner: string;
  createdAt: string;
}

export interface SuccessPlan {
  id: string;
  customerName: string;
  fiscalYear: string;
  owner: {
    id: string;
    name: string;
    initials: string;
  };
  segment: string;
  industry: string;
  health: Status;
  nextReview: string;
  lastUpdated: string;
  lastExported?: string;
  missionSummary: string;
  objectives: Objective[];
  completedObjectives: Objective[];
  stakeholders: Stakeholder[];
  productsInScope: string[];
  nextSteps: string[];
  risks: Risk[];
  valueRealized: {
    activationRate: {
      value: string;
      trend: number[];
    };
    timeToValue: {
      value: string;
      trend: number[];
    };
  };
}

export interface ReportConfig {
  preset: 'QBR' | 'EBR' | 'Implementation';
  sections: {
    coverPage: boolean;
    executiveSummary: boolean;
    objectives: boolean;
    kpiSnapshot: boolean;
    timeline: boolean;
    risks: boolean;
    nextSteps: boolean;
    appendix: boolean;
  };
  redactInternalNotes: boolean;
}