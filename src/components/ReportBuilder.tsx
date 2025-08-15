import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { ReportConfig } from '../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const ReportBuilder: React.FC = () => {
  const { successPlan, isExternalView } = useStore();
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    preset: 'QBR',
    sections: {
      coverPage: true,
      executiveSummary: true,
      objectives: true,
      kpiSnapshot: true,
      timeline: false,
      risks: false,
      nextSteps: true,
      appendix: false
    },
    redactInternalNotes: true
  });

  const handleSectionToggle = (section: keyof ReportConfig['sections']) => {
    setReportConfig(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: !prev.sections[section]
      }
    }));
  };

  const generatePDF = async () => {
    if (!successPlan) return;

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = margin;

    // Cover Page
    if (reportConfig.sections.coverPage) {
      pdf.setFontSize(24);
      pdf.text(`${successPlan.customerName}`, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;
      pdf.setFontSize(20);
      pdf.text(`${successPlan.fiscalYear} Success Plan`, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 20;
      pdf.setFontSize(12);
      pdf.text(`Prepared by: ${successPlan.owner.name}`, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;
      pdf.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });
      pdf.addPage();
    }

    // Executive Summary
    if (reportConfig.sections.executiveSummary) {
      yPosition = margin;
      pdf.setFontSize(16);
      pdf.text('Executive Summary', margin, yPosition);
      yPosition += 10;
      pdf.setFontSize(12);
      
      const summaryText = `Customer: ${successPlan.customerName}\nSegment: ${successPlan.segment} • ${successPlan.industry}\nHealth Status: ${successPlan.health.replace('_', ' ')}\n\nMission: ${successPlan.missionSummary}`;
      const lines = pdf.splitTextToSize(summaryText, pageWidth - 2 * margin);
      pdf.text(lines, margin, yPosition);
      yPosition += lines.length * 5 + 10;
    }

    // Objectives
    if (reportConfig.sections.objectives) {
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = margin;
      }
      
      pdf.setFontSize(16);
      pdf.text('Objectives', margin, yPosition);
      yPosition += 10;
      pdf.setFontSize(11);
      
      successPlan.objectives.forEach((obj, index) => {
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = margin;
        }
        
        pdf.text(`${index + 1}. ${obj.title}`, margin, yPosition);
        yPosition += 5;
        pdf.setFontSize(10);
        pdf.text(`   Owner: ${obj.owner.name} | Due: ${new Date(obj.dueDate).toLocaleDateString()} | Progress: ${obj.progress}%`, margin, yPosition);
        yPosition += 8;
        pdf.setFontSize(11);
      });
    }

    // KPI Snapshot
    if (reportConfig.sections.kpiSnapshot) {
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = margin;
      }
      
      pdf.setFontSize(16);
      pdf.text('KPI Snapshot', margin, yPosition);
      yPosition += 10;
      pdf.setFontSize(12);
      pdf.text(`Activation Rate: ${successPlan.valueRealized.activationRate.value}`, margin, yPosition);
      yPosition += 7;
      pdf.text(`Time-to-Value: ${successPlan.valueRealized.timeToValue.value}`, margin, yPosition);
      yPosition += 10;
    }

    // Next Steps
    if (reportConfig.sections.nextSteps) {
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = margin;
      }
      
      pdf.setFontSize(16);
      pdf.text('Next Steps', margin, yPosition);
      yPosition += 10;
      pdf.setFontSize(11);
      
      successPlan.nextSteps.forEach((step, index) => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(`${index + 1}. ${step}`, margin, yPosition);
        yPosition += 7;
      });
    }

    // Save the PDF
    pdf.save(`${successPlan.customerName}-${successPlan.fiscalYear}-Success-Plan.pdf`);
    
    // Update last exported date
    useStore.getState().updateSuccessPlan({ lastExported: new Date().toISOString() });
  };

  if (!successPlan) return null;

  return (
    <div className="mt-6 rounded-2xl border border-neutral-200 bg-white">
      <div className="flex items-center justify-between px-6 pt-5">
        <h2 className="text-lg">Report builder</h2>
        <span className="rounded-full bg-neutral-100 px-2 py-1 text-neutral-700 text-sm">Preview</span>
      </div>
      <div className="grid grid-cols-1 gap-4 px-6 pb-6 pt-3 md:grid-cols-2">
        <div className="space-y-3">
          <div className="rounded-xl border border-neutral-200 p-3">
            <label className="text-sm">Preset</label>
            <select
              value={reportConfig.preset}
              onChange={(e) => setReportConfig({ ...reportConfig, preset: e.target.value as ReportConfig['preset'] })}
              className="mt-1 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm"
            >
              <option value="QBR">QBR</option>
              <option value="EBR">EBR</option>
              <option value="Implementation">Implementation</option>
            </select>
          </div>
          <div className="rounded-xl border border-neutral-200 p-3">
            <label className="text-sm">Include sections</label>
            <div className="mt-2 space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={reportConfig.sections.coverPage}
                  onChange={() => handleSectionToggle('coverPage')}
                />
                Cover page
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={reportConfig.sections.executiveSummary}
                  onChange={() => handleSectionToggle('executiveSummary')}
                />
                Executive summary
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={reportConfig.sections.objectives}
                  onChange={() => handleSectionToggle('objectives')}
                />
                Objectives
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={reportConfig.sections.kpiSnapshot}
                  onChange={() => handleSectionToggle('kpiSnapshot')}
                />
                KPI snapshot
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={reportConfig.sections.timeline}
                  onChange={() => handleSectionToggle('timeline')}
                />
                Timeline
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={reportConfig.sections.risks}
                  onChange={() => handleSectionToggle('risks')}
                />
                Risks
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={reportConfig.sections.nextSteps}
                  onChange={() => handleSectionToggle('nextSteps')}
                />
                Next steps
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={reportConfig.sections.appendix}
                  onChange={() => handleSectionToggle('appendix')}
                />
                Appendix
              </label>
            </div>
          </div>
          <div className="rounded-xl border border-neutral-200 p-3">
            <div className="flex items-center justify-between">
              <label className="text-sm">Redact internal notes</label>
              <input
                type="checkbox"
                checked={reportConfig.redactInternalNotes}
                onChange={(e) => setReportConfig({ ...reportConfig, redactInternalNotes: e.target.checked })}
              />
            </div>
          </div>
          <button
            onClick={generatePDF}
            className="w-full rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
          >
            Export PDF
          </button>
        </div>
        <div className="rounded-xl border border-neutral-200 p-4">
          <div className="text-sm text-neutral-600">PDF preview</div>
          <div className="mt-2 space-y-3 rounded-xl border border-neutral-200 bg-white p-4">
            <div className="h-8 w-3/4 rounded bg-neutral-100"></div>
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-neutral-100"></div>
              <div className="h-3 w-full rounded bg-neutral-100"></div>
              <div className="h-3 w-full rounded bg-neutral-100"></div>
              <div className="h-3 w-full rounded bg-neutral-100"></div>
              <div className="h-3 w-full rounded bg-neutral-100"></div>
            </div>
            <div className="my-2 h-px w-full bg-neutral-200"></div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-16 rounded bg-neutral-100"></div>
              <div className="h-16 rounded bg-neutral-100"></div>
              <div className="h-16 rounded bg-neutral-100"></div>
              <div className="h-16 rounded bg-neutral-100"></div>
            </div>
            <div className="my-2 h-px w-full bg-neutral-200"></div>
            <div className="space-y-2">
              <div className="h-3 w-5/6 rounded bg-neutral-100"></div>
              <div className="h-3 w-5/6 rounded bg-neutral-100"></div>
              <div className="h-3 w-5/6 rounded bg-neutral-100"></div>
            </div>
            <div className="mt-4 text-right text-xs text-neutral-500">Page 1</div>
          </div>
        </div>
      </div>
    </div>
  );
};