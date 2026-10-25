import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { EnclosureRecord } from '../data/projectData';

interface HeaderProps {
  currentTab: string;
  onOpenMobileMenu: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  enclosureRecord: EnclosureRecord;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onOpenMobileMenu,
  searchQuery,
  setSearchQuery,
  enclosureRecord,
}) => {
  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'overview': return 'Project Overview & Manufacturing Platform';
      case 'requirements': return 'New Enclosure Specifications & RFQ Intake';
      case 'manufacturing': return '14-Process Manufacturing Engineering Workflow';
      case 'cad': return 'CAD Design, Digital Component Library & BOM';
      case 'tracking': return 'Real-Time Production Tracking & Work Order Queue';
      case 'quality': return 'Computer-Vision Metrology & Quality Acceptance';
      case 'final-docs': return 'Final Enclosure Release & Document Centre';
      default: return 'Manufacturing Platform';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0">
      {/* Left: Mobile Toggle & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
            {getTabTitle(currentTab)}
          </h2>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Enclosure: <strong>{enclosureRecord.id}</strong></span>
            <span>&bull;</span>
            <span className="text-blue-600 font-semibold">{enclosureRecord.height}×{enclosureRecord.width}×{enclosureRecord.depth}mm</span>
          </div>
        </div>
      </div>

      {/* Right: Search & Notifications */}
      <div className="flex items-center gap-3">
        {/* Search Input */}
        <div className="relative hidden md:block w-64 lg:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search processes, parts, CAD..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>

        {/* Demo Notification Indicator */}
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer relative">
          <Bell size={16} />
          <span className="w-2 h-2 rounded-full bg-blue-600 absolute top-2 right-2"></span>
        </div>
      </div>
    </header>
  );
};
