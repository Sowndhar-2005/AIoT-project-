import React, { useState } from 'react';
import { 
  ArrowRight, 
  Layers, 
  Cpu, 
  Box, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  FileText,
  Activity
} from 'lucide-react';
import { SAMPLE_JOBS, PROCESSES_DATA } from '../data/projectData';

interface OverviewSectionProps {
  onNavigate: (tab: string) => void;
  onSelectProcess: (processId: number) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  onNavigate,
  onSelectProcess,
}) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Welcome Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-4">
            <span>Academic Capstone Project</span>
            <span>&bull;</span>
            <span>AIoT Manufacturing Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
            AIoT-Based Smart Sheet-Metal Panel Fabrication System
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
            An end-to-end connected engineering platform linking customer enclosure requirements, 3D parametric CAD modeling, AI-assisted component layouts, automated laser nesting, IoT shop-floor telemetry, and computer-vision dimensional quality inspection.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('manufacturing')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition active:scale-98"
            >
              Explore 14 Processes
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onNavigate('architecture')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 text-slate-700 text-sm font-semibold transition"
            >
              View System Architecture
            </button>
          </div>
        </div>

        {/* Decorative Watermark / Badge */}
        <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-radial from-blue-100/60 to-transparent rounded-full pointer-events-none blur-2xl" />
      </div>

      {/* 4 Core Domain Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Manufacturing */}
        <div 
          onClick={() => onNavigate('manufacturing')}
          className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs hover:border-blue-400 hover:shadow-sm cursor-pointer transition group"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
            <Layers size={20} />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">Manufacturing Flow</h3>
          <p className="text-xs text-slate-500 mb-3 leading-relaxed">
            Processes 01 to 09: Intake, 3D CAD design, K-factor (0.38) unfolding, nesting, and assembly.
          </p>
          <div className="text-xs font-semibold text-blue-600 flex items-center gap-1 group-hover:gap-1.5 transition-all">
            <span>9 Authoritative Stages</span>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Card 2: AIoT System */}
        <div 
          onClick={() => onNavigate('aiot')}
          className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs hover:border-blue-400 hover:shadow-sm cursor-pointer transition group"
        >
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
            <Cpu size={20} />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">Digital Systems & AIoT</h3>
          <p className="text-xs text-slate-500 mb-3 leading-relaxed">
            Processes 10 to 11: 6-layer architecture, FastAPI microservices, and MQTT event broker.
          </p>
          <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1 group-hover:gap-1.5 transition-all">
            <span>Software & Edge Specs</span>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Card 3: CAD & Components */}
        <div 
          onClick={() => onNavigate('cad')}
          className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs hover:border-blue-400 hover:shadow-sm cursor-pointer transition group"
        >
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
            <Box size={20} />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">CAD & Component Hub</h3>
          <p className="text-xs text-slate-500 mb-3 leading-relaxed">
            SOLIDWORKS sheet metal, AutoCAD schematics, CADcraft research, and DIN-rail digital library.
          </p>
          <div className="text-xs font-semibold text-amber-600 flex items-center gap-1 group-hover:gap-1.5 transition-all">
            <span>Component Master Data</span>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Card 4: Quality Inspection */}
        <div 
          onClick={() => onNavigate('quality')}
          className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs hover:border-blue-400 hover:shadow-sm cursor-pointer transition group"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition">
            <CheckCircle2 size={20} />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">Optical Metrology & QA</h3>
          <p className="text-xs text-slate-500 mb-3 leading-relaxed">
            Processes 12 to 14: 20MP telecentric camera, OpenCV feature detection, and final CoC release.
          </p>
          <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1 group-hover:gap-1.5 transition-all">
            <span>6 Mandatory QA Gates</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </div>

      {/* Mid-Row: Active Job Tracking Preview & Quick Process Jump */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Job Tracking Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-slate-900 text-base">Active Fabrication Jobs</h2>
              <p className="text-xs text-slate-500">Simulated shop-floor progress indicators across active work orders.</p>
            </div>
            <button
              onClick={() => onNavigate('tracking')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>View Full Dashboard</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-y border-slate-200/60">
                <tr>
                  <th className="py-2.5 px-3">Job ID</th>
                  <th className="py-2.5 px-3">Enclosure Spec</th>
                  <th className="py-2.5 px-3">Current Stage</th>
                  <th className="py-2.5 px-3">Progress</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SAMPLE_JOBS.slice(0, 4).map((job) => (
                  <tr key={job.jobId} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-3 font-semibold text-slate-900">{job.jobId}</td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-800 truncate max-w-xs">{job.enclosureType}</div>
                      <div className="text-[11px] text-slate-400">{job.dimensions}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-600">{job.stage}</td>
                    <td className="py-3 px-3">
                      <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full rounded-full transition-all"
                          style={{ width: `${job.progressPercent}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium mt-0.5 inline-block">{job.progressPercent}%</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        job.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        job.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Notice: UI demonstration with simulated shop-floor telemetry.</span>
            <span>Refreshed: Live</span>
          </div>
        </div>

        {/* Right Col: Key Process Highlights */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-slate-900 text-base mb-1">Process Quick Jump</h2>
            <p className="text-xs text-slate-500 mb-4">Direct access to core engineering milestones.</p>
            
            <div className="space-y-2.5">
              {[PROCESSES_DATA[2], PROCESSES_DATA[5], PROCESSES_DATA[6], PROCESSES_DATA[12]].map((proc) => (
                <div
                  key={proc.id}
                  onClick={() => onSelectProcess(proc.id)}
                  className="p-2.5 rounded-lg border border-slate-100 hover:border-blue-300 hover:bg-blue-50/40 cursor-pointer transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-md bg-slate-100 group-hover:bg-blue-600 group-hover:text-white font-bold text-xs flex items-center justify-center text-slate-700 transition">
                      {proc.number.replace('P-', '')}
                    </span>
                    <span className="text-xs font-medium text-slate-800 line-clamp-1">{proc.title}</span>
                  </div>
                  <ArrowRight size={12} className="text-slate-400 group-hover:text-blue-600 transition" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-3 rounded-lg bg-slate-50 border border-slate-200/60 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800 mb-1">
              <AlertCircle size={14} className="text-blue-600" />
              <span>Decoupled Quality Policy</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Manufacturing completion does not equal quality approval. Final release strictly requires certified QA inspector sign-off in Process 14.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
