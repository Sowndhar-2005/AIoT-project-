import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  FileText, 
  Cpu, 
  Wrench,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { PROCESSES_DATA, ProcessItem } from '../data/projectData';

interface ManufacturingSectionProps {
  searchQuery: string;
  selectedProcessId: number | null;
  onSelectProcess: (id: number | null) => void;
}

export const ManufacturingSection: React.FC<ManufacturingSectionProps> = ({
  searchQuery,
  selectedProcessId,
  onSelectProcess,
}) => {
  const [filterDomain, setFilterDomain] = useState<string>('all');

  // Filter processes
  const filteredProcesses = PROCESSES_DATA.filter((proc) => {
    const matchesSearch = 
      proc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proc.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proc.number.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDomain = filterDomain === 'all' || proc.domain === filterDomain;
    return matchesSearch && matchesDomain;
  });

  const selectedProcess = PROCESSES_DATA.find((p) => p.id === selectedProcessId);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Controls: Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900">14-Process Manufacturing Directory</h2>
          <p className="text-xs text-slate-500">Documented engineering specifications spanning physical fabrication, AIoT, and metrology.</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setFilterDomain('all')}
            className={`px-3 py-1.5 rounded-md transition ${filterDomain === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
          >
            All (14)
          </button>
          <button
            onClick={() => setFilterDomain('manufacturing')}
            className={`px-3 py-1.5 rounded-md transition ${filterDomain === 'manufacturing' ? 'bg-white text-blue-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Manufacturing (P1-P9)
          </button>
          <button
            onClick={() => setFilterDomain('digital-systems')}
            className={`px-3 py-1.5 rounded-md transition ${filterDomain === 'digital-systems' ? 'bg-white text-indigo-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
          >
            AIoT (P10-P11)
          </button>
          <button
            onClick={() => setFilterDomain('quality-inspection')}
            className={`px-3 py-1.5 rounded-md transition ${filterDomain === 'quality-inspection' ? 'bg-white text-emerald-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Metrology (P12-P14)
          </button>
        </div>
      </div>

      {/* Process Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProcesses.map((proc) => {
          const isManufacturing = proc.domain === 'manufacturing';
          const isDigital = proc.domain === 'digital-systems';
          const isQA = proc.domain === 'quality-inspection';

          return (
            <div
              key={proc.id}
              className="bg-white rounded-xl border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Image Thumbnail */}
              <div className="h-44 bg-slate-100 relative overflow-hidden border-b border-slate-100">
                <img
                  src={proc.image}
                  alt={proc.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition duration-300"
                  onError={(e) => {
                    // Fallback to placeholder if image link fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                {/* Domain Pill Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs font-bold text-xs text-slate-800 shadow-xs border border-slate-200/60">
                    {proc.number}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider backdrop-blur-xs ${
                    isManufacturing ? 'bg-blue-600/90 text-white' :
                    isDigital ? 'bg-indigo-600/90 text-white' :
                    'bg-emerald-600/90 text-white'
                  }`}>
                    {proc.domain.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-blue-600 transition leading-snug">
                    {proc.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {proc.shortDesc}
                  </p>
                </div>

                <div>
                  {/* Status Tag */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-slate-400 truncate max-w-[170px]">
                      {proc.status}
                    </span>
                    <button
                      onClick={() => onSelectProcess(proc.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-blue-50 text-blue-600 font-semibold text-xs transition"
                    >
                      <span>View Details</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Process Detail Modal / Drawer */}
      {selectedProcess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-start justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                  {selectedProcess.number}
                </span>
                <div>
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-0.5">
                    {selectedProcess.domain.replace('-', ' ')}
                  </div>
                  <h2 className="text-lg font-extrabold text-slate-900">{selectedProcess.title}</h2>
                </div>
              </div>
              <button
                onClick={() => onSelectProcess(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm">
              {/* Visual Banner */}
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 max-h-60 flex items-center justify-center">
                <img
                  src={selectedProcess.image}
                  alt={selectedProcess.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Full Description */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Scope & Detailed Procedure</h4>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {selectedProcess.fullDesc}
                </p>
              </div>

              {/* Inputs & Outputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">Required Inputs</h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {selectedProcess.inputs.map((inp, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        <span>{inp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                  <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">Engineering Outputs</h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {selectedProcess.outputs.map((out, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                        <span>{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tools & Status */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Engineering Tools & Methods</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProcess.tools.map((t, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                Authoritative Specification from <code className="bg-slate-200/60 px-1.5 py-0.5 rounded text-slate-700 font-mono">doc/</code>
              </span>
              <button
                onClick={() => onSelectProcess(null)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
