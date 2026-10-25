import React from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Layers, 
  Box, 
  Activity, 
  CheckCircle2, 
  FileCheck, 
  X,
  RotateCcw
} from 'lucide-react';
import { EnclosureRecord } from '../data/projectData';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  enclosureRecord: EnclosureRecord;
  onResetDemo: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  isOpen,
  setIsOpen,
  enclosureRecord,
  onResetDemo,
}) => {
  const menuItems = [
    { id: 'overview', label: '1. Project Overview', icon: LayoutDashboard },
    { id: 'requirements', label: '2. New Enclosure Specs', icon: PlusCircle },
    { id: 'manufacturing', label: '3. Manufacturing Workflow', icon: Layers },
    { id: 'cad', label: '4. CAD & Component Library', icon: Box },
    { id: 'tracking', label: '5. Production Tracking', icon: Activity },
    { id: 'quality', label: '6. Quality Inspection', icon: CheckCircle2 },
    { id: 'final-docs', label: '7. Final Enclosure & Docs', icon: FileCheck },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar: static on desktop, slide-over on mobile */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out shrink-0
        lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              SF
            </div>
            <div>
              <h1 className="font-bold text-slate-900 text-sm tracking-tight leading-tight">SheetFab AIoT</h1>
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Engineering Platform</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Active Enclosure Quick Status Card */}
        <div className="px-3.5 pt-3.5 pb-1">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Active Record</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <div className="font-bold text-slate-900 truncate">{enclosureRecord.id}</div>
            <div className="text-[11px] text-slate-500">
              {enclosureRecord.height} × {enclosureRecord.width} × {enclosureRecord.depth} mm
            </div>
            <div className="text-[10px] text-blue-700 font-medium pt-0.5 truncate">
              {enclosureRecord.status}
            </div>
          </div>
        </div>

        {/* Navigation Items (The 7 Core Stages) */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          <div className="px-3 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Engineering Workflow
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all text-left
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs border-l-3 border-blue-600' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'}
                `}
              >
                <Icon size={16} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer: Reset Demo Action */}
        <div className="p-3 border-t border-slate-200 shrink-0">
          <button
            onClick={onResetDemo}
            className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            title="Reset demo parameters to factory defaults"
          >
            <RotateCcw size={13} className="text-slate-500" />
            <span>Reset Demo State</span>
          </button>
        </div>
      </aside>
    </>
  );
};
