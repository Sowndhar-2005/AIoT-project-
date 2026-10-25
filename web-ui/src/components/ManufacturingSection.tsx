import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  ArrowLeft,
  X, 
  CheckCircle2, 
  Layers, 
  Maximize2,
  FileCheck,
  ChevronRight,
  Zap,
  Sliders
} from 'lucide-react';
import { PROCESSES_DATA, ProcessItem, EnclosureRecord } from '../data/projectData';

interface ManufacturingSectionProps {
  searchQuery: string;
  selectedProcessId: number | null;
  onSelectProcess: (id: number | null) => void;
  enclosureRecord: EnclosureRecord;
  onNavigate: (tab: string) => void;
}

export const ManufacturingSection: React.FC<ManufacturingSectionProps> = ({
  searchQuery,
  selectedProcessId,
  onSelectProcess,
  enclosureRecord,
  onNavigate,
}) => {
  const [filterDomain, setFilterDomain] = useState<string>('all');
  const [activeProcessIndex, setActiveProcessIndex] = useState<number>(0);
  const [showWorkspace, setShowWorkspace] = useState<boolean>(false);
  const [showLightboxImage, setShowLightboxImage] = useState<string | null>(null);

  // Filter processes for card list
  const filteredProcesses = PROCESSES_DATA.filter((proc) => {
    const matchesSearch = 
      proc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proc.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proc.number.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDomain = filterDomain === 'all' || proc.domain === filterDomain;
    return matchesSearch && matchesDomain;
  });

  const currentProcess = PROCESSES_DATA[activeProcessIndex] || PROCESSES_DATA[0];

  const handleOpenWorkspace = (idx: number) => {
    setActiveProcessIndex(idx);
    setShowWorkspace(true);
  };

  const handleNextProcess = () => {
    if (activeProcessIndex < PROCESSES_DATA.length - 1) {
      setActiveProcessIndex(activeProcessIndex + 1);
    }
  };

  const handlePrevProcess = () => {
    if (activeProcessIndex > 0) {
      setActiveProcessIndex(activeProcessIndex - 1);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner & Guided Journey Breadcrumb */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
            <Layers className="w-4 h-4" />
            <span>Process-Driven Manufacturing Journey</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">14-Process Manufacturing Engineering Workflow</h2>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Sequential engineering pipeline demonstrating how custom enclosure <strong>{enclosureRecord.id}</strong> moves from customer RFQ, 
            through parametric CAD and shop-floor fabrication, to optical metrology release.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => handleOpenWorkspace(activeProcessIndex)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>Open Guided Workspace</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Sequential Process Map Tracker */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-[880px] pb-1">
          {PROCESSES_DATA.map((p, idx) => {
            const isCurrent = activeProcessIndex === idx;
            return (
              <button
                key={p.id}
                onClick={() => handleOpenWorkspace(idx)}
                className={`flex-1 p-2 rounded-md border text-center transition-all ${
                  isCurrent
                    ? 'border-blue-500 bg-blue-50/80 shadow-xs ring-1 ring-blue-400'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>{p.number}</span>
                  {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>}
                </div>
                <div className="text-[11px] font-bold text-slate-800 truncate">
                  {p.title.split(' ')[0]} {p.title.split(' ')[1] || ''}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Workspace View (When active) or Process Directory Grid */}
      {showWorkspace ? (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-6 space-y-6">
          {/* Workspace Nav Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
                  Process {currentProcess.number} • Step {currentProcess.id} of 14
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold text-[10px] uppercase">
                  {currentProcess.domain}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">{currentProcess.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">Enclosure Reference: {enclosureRecord.id}</p>
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={handlePrevProcess}
                disabled={activeProcessIndex === 0}
                className="px-3 py-1.5 rounded-md border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ArrowLeft size={13} /> Previous
              </button>
              <button
                onClick={handleNextProcess}
                disabled={activeProcessIndex === PROCESSES_DATA.length - 1}
                className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shadow-xs"
              >
                Next <ArrowRight size={13} />
              </button>
              <button
                onClick={() => setShowWorkspace(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md border border-slate-200 ml-1"
                title="Exit workspace to process list"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Workspace Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visual Image & Technical Diagram (5 Cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                <span>Process Technical Artifact / Screenshot</span>
                <button
                  onClick={() => setShowLightboxImage(currentProcess.image)}
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1 text-[11px]"
                >
                  <Maximize2 size={12} /> Expand
                </button>
              </div>

              <div 
                onClick={() => setShowLightboxImage(currentProcess.image)}
                className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50 cursor-pointer group"
              >
                <img
                  src={currentProcess.image}
                  alt={currentProcess.title}
                  className="w-full h-72 object-contain bg-white p-2 group-hover:scale-[1.02] transition-transform duration-200"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-100 text-[11px] text-slate-500">
                <strong>Enclosure Link:</strong> This process directly governs parameters of {enclosureRecord.id} ({enclosureRecord.height}×{enclosureRecord.width}×{enclosureRecord.depth} mm, {enclosureRecord.material}).
              </div>
            </div>

            {/* Technical Detail & Inputs/Outputs (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Zap size={14} className="text-amber-500" />
                  Engineering Specification & Operational Scope
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  {currentProcess.fullDesc}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-xs">
                  <span className="font-bold text-blue-900 uppercase text-[10px] tracking-wider block mb-1.5">
                    Required Inputs & Criteria
                  </span>
                  <ul className="space-y-1 text-[11px] text-slate-700">
                    {currentProcess.inputs.map((inp, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        <span>{inp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100 text-xs">
                  <span className="font-bold text-emerald-900 uppercase text-[10px] tracking-wider block mb-1.5">
                    Engineering Deliverables
                  </span>
                  <ul className="space-y-1 text-[11px] text-slate-700">
                    {currentProcess.outputs.map((out, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                        <span>{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Validated Software & Manufacturing Machinery
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentProcess.tools.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                <button
                  onClick={() => onNavigate('final-docs')}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Generate Deliverables in Document Centre &rarr;
                </button>
                <button
                  onClick={() => setShowWorkspace(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold"
                >
                  Return to Process Cards
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Standard 14-Process Cards Grid */
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Sequential Process Portfolio</h3>
              <p className="text-xs text-slate-500">Select any stage to inspect documented parameters, diagrams, and requirements</p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => setFilterDomain('all')}
                className={`px-3 py-1 rounded-md transition ${filterDomain === 'all' ? 'bg-blue-600 text-white font-semibold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                All (14)
              </button>
              <button
                onClick={() => setFilterDomain('manufacturing')}
                className={`px-3 py-1 rounded-md transition ${filterDomain === 'manufacturing' ? 'bg-blue-600 text-white font-semibold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                Fabrication (P01-P09)
              </button>
              <button
                onClick={() => setFilterDomain('digital-systems')}
                className={`px-3 py-1 rounded-md transition ${filterDomain === 'digital-systems' ? 'bg-blue-600 text-white font-semibold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                AIoT (P10-P11)
              </button>
              <button
                onClick={() => setFilterDomain('quality-inspection')}
                className={`px-3 py-1 rounded-md transition ${filterDomain === 'quality-inspection' ? 'bg-blue-600 text-white font-semibold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                Metrology QA (P12-P14)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProcesses.map((proc) => (
              <div
                key={proc.id}
                onClick={() => handleOpenWorkspace(proc.id - 1)}
                className="bg-white rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all p-4 space-y-3 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-mono font-bold text-blue-600">{proc.number}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium capitalize">
                      {proc.domain.replace('-', ' ')}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 mt-2 group-hover:text-blue-600 transition">
                    {proc.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {proc.shortDesc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400 font-mono">Tools: {proc.tools[0]}</span>
                  <span className="text-blue-600 font-semibold inline-flex items-center text-[11px] group-hover:underline">
                    Inspect Workspace <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {showLightboxImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
          onClick={() => setShowLightboxImage(null)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-4 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-mono font-bold text-blue-600">
                Technical Diagram & Process Artifact
              </span>
              <button 
                onClick={() => setShowLightboxImage(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 rounded"
              >
                ✕ Close
              </button>
            </div>
            <div className="max-h-[75vh] overflow-auto rounded border border-slate-200 bg-white flex items-center justify-center p-4">
              <img 
                src={showLightboxImage} 
                alt="Process Visual" 
                className="w-full h-auto object-contain" 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
