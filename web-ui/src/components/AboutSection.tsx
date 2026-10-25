import React from 'react';
import { 
  BookOpen, 
  Target, 
  AlertCircle, 
  Sparkles, 
  Code, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  CheckCircle2,
  ExternalLink,
  Award
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Academic Capstone & Engineering Portfolio</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">About the AIoT Fabrication System</h2>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            An end-to-end framework uniting sheet-metal manufacturing, digital CAD twins, IoT production telemetry, 
            and automated computer-vision quality acceptance.
          </p>
        </div>
        <span className="px-3 py-1 rounded bg-slate-100 border border-slate-200 text-xs text-slate-600 font-mono self-start md:self-auto">
          Scope: Frontend Architecture Prototype
        </span>
      </div>

      {/* 3 Pillars Grid: Objective, Problem, Solution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Problem */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-3">
          <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">The Industrial Problem</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Conventional custom electrical enclosure fabrication suffers from disconnected handoffs between 
            customer requirement capture, CAD design, manual component layout iterations, and post-fabrication quality 
            checks. Discrepancies often go undetected until final painting and assembly, resulting in expensive rework.
          </p>
          <div className="pt-2 text-[11px] text-rose-700 font-medium">
            • High scrap rates &gt; 12%<br />
            • Manual inspection bottlenecks<br />
            • Disconnected shop-floor tracking
          </div>
        </div>

        {/* Card 2: Solution */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">The AIoT Solution</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            A cohesive 14-process smart manufacturing framework integrating parametric CAD libraries, 
            AI-assisted optimal component placement, automated K-factor sheet flattening, genetic laser nesting, 
            and edge IoT barcode tracking across each machine workstation.
          </p>
          <div className="pt-2 text-[11px] text-blue-700 font-medium">
            • Algorithmic packing & thermal spacing<br />
            • Automated BOM and quotation sync<br />
            • Edge barcode tracking per station
          </div>
        </div>

        {/* Card 3: Metrology & QA */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Automated QA Metrology</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Closed-loop visual inspection utilizing telecentric calibrated optics, sub-pixel edge detection, 
            and ICP alignment against nominal CAD DXF vectors, coupled with 6 mandatory quality gates for 100% first-pass yield.
          </p>
          <div className="pt-2 text-[11px] text-emerald-700 font-medium">
            • ±0.2 mm measurement accuracy<br />
            • Zero-defect dispatch verification<br />
            • Digital QA certificate generation
          </div>
        </div>
      </div>

      {/* Technical Domains & Core Disciplines */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Multi-Disciplinary Engineering Domains</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5">
            <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs">
              <Layers className="w-4 h-4 text-blue-600" />
              Sheet-Metal Manufacturing
            </div>
            <p className="text-[11px] text-slate-500">
              CRCA sheet processing, laser cutting, CNC press brake air-bending, weld studs, 7-tank pretreatment, and thermoset powder coating.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5">
            <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs">
              <Code className="w-4 h-4 text-indigo-600" />
              CAD & Automation
            </div>
            <p className="text-[11px] text-slate-500">
              Parametric 3D solid modeling in SOLIDWORKS / CADcraft, DXF export, empirical K-factor bend allowances, and nesting heuristics.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5">
            <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs">
              <Cpu className="w-4 h-4 text-emerald-600" />
              AIoT Edge Systems
            </div>
            <p className="text-[11px] text-slate-500">
              ESP32 shop-floor barcode tracking, MQTT event message brokers, low-latency telemetry ingestion, and ISA-95 tier segregation.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5">
            <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Computer Vision & AI
            </div>
            <p className="text-[11px] text-slate-500">
              Telecentric camera calibration, homography warping, sub-pixel Canny edge extraction, and iterative vector alignment (ICP).
            </p>
          </div>
        </div>
      </div>

      {/* Prototype Scope & Disclaimer */}
      <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 space-y-3">
        <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Prototype Scope & Academic Context</h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          This web application is a frontend demonstration prototype developed for an academic engineering project titled: 
          <strong> AIoT-Based Smart Sheet-Metal Panel Fabrication System</strong>. 
          It synthesizes real design data, engineering calculations, and documented manufacturing workflows from the project knowledge base 
          into an interactive industrial SaaS dashboard.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-200">
          <span>Author / Student: <strong>Sowndhar</strong></span>
          <span>•</span>
          <span>Repository: <strong>Sowndhar-2005/AIoT-project-</strong></span>
          <span>•</span>
          <span>Documentation Engine: <strong>Obsidian Vault / OKF Standard</strong></span>
        </div>
      </div>
    </div>
  );
};
