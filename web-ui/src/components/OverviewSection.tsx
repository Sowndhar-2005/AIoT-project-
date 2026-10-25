import React, { useState } from 'react';
import { 
  ArrowRight, 
  Layers, 
  Box, 
  CheckCircle2, 
  PlusCircle,
  FileCheck,
  Maximize2,
  Activity,
  Cpu
} from 'lucide-react';
import { SAMPLE_JOBS, PROCESSES_DATA, EnclosureRecord } from '../data/projectData';

interface OverviewSectionProps {
  enclosureRecord: EnclosureRecord;
  onNavigate: (tab: string) => void;
  onSelectProcess: (processId: number) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  enclosureRecord,
  onNavigate,
  onSelectProcess,
}) => {
  const [showDrawingLightbox, setShowDrawingLightbox] = useState(false);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Hero Section with Live Enclosure Drawing and Orthographic Views */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold">
            <span>Engineering System Platform</span>
            <span>&bull;</span>
            <span>Active Enclosure: {enclosureRecord.id}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            AIoT-Based Smart Sheet-Metal Panel Fabrication System
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            An end-to-end connected manufacturing platform linking customer enclosure requirements, 
            3D parametric CAD engineering, algorithmic component layouts, laser cutting nesting, 
            IoT production tracking, and computer-vision quality acceptance.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => onNavigate('requirements')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition active:scale-98"
            >
              <PlusCircle size={15} />
              Configure Specifications
            </button>
            <button
              onClick={() => onNavigate('manufacturing')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold transition"
            >
              <Layers size={15} />
              Open 14-Process Workflow
            </button>
            <button
              onClick={() => onNavigate('final-docs')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold transition"
            >
              <FileCheck size={15} />
              Download Documents
            </button>
          </div>
        </div>

        {/* Hero Image Card: Real Enclosure Drawing & 3D Render */}
        <div className="lg:col-span-5 bg-slate-50 rounded-lg border border-slate-200 p-3 space-y-2">
          <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-200">
            <span className="font-semibold text-slate-800">Enclosure Drawing & Render</span>
            <button
              onClick={() => setShowDrawingLightbox(true)}
              className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1 text-[11px]"
            >
              <Maximize2 size={12} /> Expand
            </button>
          </div>

          <div 
            onClick={() => setShowDrawingLightbox(true)}
            className="rounded overflow-hidden bg-white border border-slate-200 cursor-pointer group"
          >
            <img
              src={enclosureRecord.primaryDrawingImage}
              alt="Enclosure Drawing and 3D Render"
              className="w-full h-52 object-contain p-2 group-hover:scale-[1.02] transition-transform duration-200"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Dimensions: {enclosureRecord.height} × {enclosureRecord.width} × {enclosureRecord.depth} mm</span>
            <span className="text-emerald-700 font-bold">{enclosureRecord.cadStatus}</span>
          </div>
        </div>
      </div>

      {/* 4 Core Workflow Modules Quick Jump */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Module 1: Customer Requirements & CAD */}
        <div 
          onClick={() => onNavigate('requirements')}
          className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-sm cursor-pointer transition group"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5">
            <PlusCircle size={18} />
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-blue-600 transition">
            1. Enclosure Requirements
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-3">
            Outer envelope dimensions ({enclosureRecord.height}×{enclosureRecord.width}mm), CRCA material grade, and IP rating.
          </p>
          <span className="text-xs font-semibold text-blue-600 inline-flex items-center gap-1">
            Edit Specs &rarr;
          </span>
        </div>

        {/* Module 2: Manufacturing Workflow */}
        <div 
          onClick={() => onNavigate('manufacturing')}
          className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-sm cursor-pointer transition group"
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2.5">
            <Layers size={18} />
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-indigo-600 transition">
            2. 14-Process Workflow
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-3">
            Step-by-step guided journey across CAD design, flat-patterns, CNC laser nesting, and assembly.
          </p>
          <span className="text-xs font-semibold text-indigo-600 inline-flex items-center gap-1">
            Explore Processes &rarr;
          </span>
        </div>

        {/* Module 3: Production Tracking */}
        <div 
          onClick={() => onNavigate('tracking')}
          className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-sm cursor-pointer transition group"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-2.5">
            <Activity size={18} />
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-amber-600 transition">
            3. Production Tracking
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-3">
            Shop-floor work order queue, station progress indicators, and configured machine event routes.
          </p>
          <span className="text-xs font-semibold text-amber-600 inline-flex items-center gap-1">
            Shop-Floor Tracking &rarr;
          </span>
        </div>

        {/* Module 4: Metrology & QA */}
        <div 
          onClick={() => onNavigate('quality')}
          className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-sm cursor-pointer transition group"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5">
            <CheckCircle2 size={18} />
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-emerald-600 transition">
            4. Quality Metrology
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-3">
            Overhead camera inspection rig, CV ICP vector comparison, and the 6 mandatory acceptance gates.
          </p>
          <span className="text-xs font-semibold text-emerald-600 inline-flex items-center gap-1">
            Inspect QA Gates &rarr;
          </span>
        </div>
      </div>

      {/* Production Queue & Quick Milestones Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Jobs Table (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Active Shop-Floor Work Order Queue</h3>
              <p className="text-xs text-slate-500">Track current enclosures through fabrication and metrology stations</p>
            </div>
            <button
              onClick={() => onNavigate('tracking')}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              View Full Tracker &rarr;
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-2 px-3">Job ID</th>
                  <th className="py-2 px-3">Enclosure Spec</th>
                  <th className="py-2 px-3">Current Station</th>
                  <th className="py-2 px-3">Progress</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {SAMPLE_JOBS.slice(0, 3).map((job) => (
                  <tr key={job.jobId} className="hover:bg-slate-50 font-sans">
                    <td className="py-2.5 px-3 font-mono font-medium text-blue-700">{job.jobId}</td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-800">{job.enclosureType}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{job.dimensions}</div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 font-medium">{job.stage}</td>
                    <td className="py-2.5 px-3 min-w-[100px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${job.progressPercent === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`}
                            style={{ width: `${job.progressPercent}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">{job.progressPercent}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold ${
                        job.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Process Milestone Quick Jump (1 Col) */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Process Quick Jump</h3>
              <p className="text-xs text-slate-500">Jump directly into any of the 14 processes</p>
            </div>

            <div className="space-y-1.5 mt-3 max-h-56 overflow-y-auto pr-1">
              {PROCESSES_DATA.slice(0, 6).map((proc) => (
                <div
                  key={proc.id}
                  onClick={() => {
                    onNavigate('manufacturing');
                    onSelectProcess(proc.id);
                  }}
                  className="p-2 rounded bg-slate-50 hover:bg-blue-50/70 border border-slate-100 hover:border-blue-200 cursor-pointer transition flex items-center justify-between text-xs"
                >
                  <div className="truncate mr-2">
                    <span className="font-mono text-blue-600 font-semibold mr-1.5">{proc.number}</span>
                    <span className="text-slate-800 font-medium">{proc.title}</span>
                  </div>
                  <ArrowRight size={13} className="text-slate-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('manufacturing')}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold transition"
          >
            Browse All 14 Processes &rarr;
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {showDrawingLightbox && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
          onClick={() => setShowDrawingLightbox(false)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-4 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-mono font-bold text-blue-600">
                Primary Enclosure Technical Drawing & 3D Render: {enclosureRecord.id}
              </span>
              <button 
                onClick={() => setShowDrawingLightbox(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 rounded"
              >
                ✕ Close
              </button>
            </div>
            <div className="max-h-[75vh] overflow-auto rounded border border-slate-200 bg-white flex items-center justify-center p-4">
              <img 
                src={enclosureRecord.primaryDrawingImage} 
                alt="Enclosure Drawing Full View" 
                className="w-full h-auto object-contain" 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
