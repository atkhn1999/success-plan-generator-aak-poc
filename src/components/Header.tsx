import React, { useState } from 'react';
import { ChevronDown, Share2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Menu } from '@headlessui/react';

export const Header: React.FC = () => {
  const { isExternalView, toggleExternalView, successPlan, exportData } = useStore();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `success-plan-${successPlan?.customerName}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const text = await file.text();
        try {
          useStore.getState().importData(text);
          alert('Data imported successfully!');
        } catch (error) {
          alert('Failed to import data. Please check the file format.');
        }
      }
    };
    input.click();
  };

  return (
    <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-3">
        <nav className="flex items-center gap-3 text-sm text-neutral-600">
          <span className="text-neutral-400">Customers</span>
          <span>/</span>
          <span>{successPlan?.customerName || 'Unknown'}</span>
          <span>/</span>
          <span className="font-medium text-neutral-900">Success Plan</span>
        </nav>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-600 select-none cursor-pointer">
            External view
            <input 
              type="checkbox" 
              className="peer sr-only"
              checked={isExternalView}
              onChange={toggleExternalView}
            />
            <span className="inline-block h-4 w-8 rounded-full bg-neutral-200 relative after:absolute after:top-0.5 after:left-0.5 after:h-3 after:w-3 after:rounded-full after:bg-white after:transition-all peer-checked:bg-neutral-900 peer-checked:after:left-4"></span>
          </label>
          <button 
            onClick={() => setIsShareModalOpen(true)}
            className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm hover:bg-neutral-50 transition-colors"
          >
            Share
          </button>
          <div className="flex items-center gap-1">
            <button 
              onClick={handleExport}
              className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
            >
              Export
            </button>
            <Menu as="div" className="relative">
              <Menu.Button className="h-9 w-9 rounded-full border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center justify-center">
                <ChevronDown className="h-4 w-4" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="p-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleImport}
                        className={`${
                          active ? 'bg-neutral-100' : ''
                        } group flex w-full items-center rounded-md px-3 py-2 text-sm`}
                      >
                        Import Data
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to reset all data?')) {
                            useStore.getState().resetStore();
                          }
                        }}
                        className={`${
                          active ? 'bg-neutral-100' : ''
                        } group flex w-full items-center rounded-md px-3 py-2 text-sm text-red-600`}
                      >
                        Reset Data
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
      
      {isShareModalOpen && (
        <ShareModal onClose={() => setIsShareModalOpen(false)} />
      )}
    </header>
  );
};

const ShareModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const shareUrl = `${window.location.origin}/external/${useStore.getState().successPlan?.id}`;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold mb-4">Share Success Plan</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Share this link with external stakeholders to give them read-only access to the success plan.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 px-3 py-2 border border-neutral-200 rounded-md text-sm"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              alert('Link copied to clipboard!');
            }}
            className="px-4 py-2 bg-neutral-900 text-white rounded-md text-sm hover:bg-neutral-800 transition-colors"
          >
            Copy
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 border border-neutral-200 rounded-md text-sm hover:bg-neutral-50 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};