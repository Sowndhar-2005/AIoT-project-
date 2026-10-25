import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { OverviewSection } from './components/OverviewSection';
import { ManufacturingSection } from './components/ManufacturingSection';
import { AIoTSection } from './components/AIoTSection';
import { TrackingSection } from './components/TrackingSection';
import { CADSection } from './components/CADSection';
import { QualitySection } from './components/QualitySection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { AboutSection } from './components/AboutSection';
import { PROCESSES_DATA, ProcessItem } from './data/projectData';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedProcessId, setSelectedProcessId] = useState<number | null>(null);

  const selectedProcess: ProcessItem | undefined = PROCESSES_DATA.find(p => p.id === selectedProcessId);

  const handleSelectProcess = (id: number | null) => {
    setSelectedProcessId(id);
  };

  const renderActiveSection = () => {
    switch (currentTab) {
      case 'overview':
        return (
          <OverviewSection 
            onNavigate={(tab) => setCurrentTab(tab)}
            onSelectProcess={(id) => handleSelectProcess(id)}
          />
        );
      case 'manufacturing':
        return (
          <ManufacturingSection 
            searchQuery={searchQuery}
            selectedProcessId={selectedProcessId}
            onSelectProcess={(id) => handleSelectProcess(id)}
          />
        );
      case 'aiot':
        return <AIoTSection />;
      case 'tracking':
        return <TrackingSection />;
      case 'cad':
        return <CADSection />;
      case 'quality':
        return <QualitySection />;
      case 'architecture':
        return <ArchitectureSection />;
      case 'about':
        return <AboutSection />;
      default:
        return (
          <OverviewSection 
            onNavigate={(tab) => setCurrentTab(tab)}
            onSelectProcess={(id) => handleSelectProcess(id)}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 antialiased overflow-hidden">
      {/* Sidebar with responsive toggle */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        isOpen={mobileMenuOpen}
        setIsOpen={setMobileMenuOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header 
          currentTab={currentTab}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="max-w-7xl mx-auto">
            {renderActiveSection()}
          </div>
        </main>
      </div>

      {/* Global Process Detail Modal if selected */}
      {selectedProcess && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
          onClick={() => setSelectedProcessId(null)}
        >
          <div 
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-slate-200 p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
                  Process {selectedProcess.id < 10 ? `0${selectedProcess.id}` : selectedProcess.id} • {selectedProcess.domain}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedProcess.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProcessId(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {selectedProcess.image && (
              <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                <img 
                  src={selectedProcess.image} 
                  alt={selectedProcess.title} 
                  className="w-full h-56 object-cover object-center" 
                />
              </div>
            )}

            <div className="space-y-3 text-xs text-slate-600">
              <p className="leading-relaxed">{selectedProcess.fullDesc || selectedProcess.shortDesc}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Inputs</span>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {selectedProcess.inputs.map((inp, idx) => (
                      <li key={idx}>{inp}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Key Deliverables</span>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {selectedProcess.outputs.map((out, idx) => (
                      <li key={idx}>{out}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-blue-900">
                <span className="text-[10px] uppercase font-bold text-blue-700 block mb-1">Engineering Tools & Software</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedProcess.tools.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-white rounded border border-blue-200 text-[11px] font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedProcessId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
