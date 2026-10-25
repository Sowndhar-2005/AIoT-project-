import React from 'react';
import { 
  Cpu, 
  Server, 
  Wifi, 
  Radio, 
  Database, 
  ShieldAlert, 
  Layers, 
  ArrowRight,
  Zap,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const AIoTSection: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Notice Banner */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 flex items-start gap-3">
        <ShieldAlert className="text-amber-600 shrink-0 mt-0.5" size={18} />
        <div>
          <h4 className="font-bold text-amber-900 text-xs sm:text-sm">Proposed Architecture Specification</h4>
          <p className="text-xs text-amber-800 leading-relaxed mt-0.5">
            The IoT edge broker, telemetry models, and AI microservices described below represent planned systems. Machine telemetry is currently modeled using verified simulation contracts.
          </p>
        </div>
      </div>

      {/* 6-Layer Architecture Overview */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs">
        <div className="mb-6">
          <h3 className="text-base font-bold text-slate-900">6-Layer Distributed System Topology</h3>
          <p className="text-xs text-slate-500">Separation of concerns between shop-floor machinery, edge gateways, cloud ingestion, and user portals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Layer 1 */}
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition">
            <div className="flex items-center gap-2 mb-2 font-bold text-xs text-blue-700 uppercase tracking-wider">
              <Zap size={14} />
              <span>Layer 1: Physical Edge</span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Machinery & Sensors</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              CNC Laser cutter, CNC Press brake, 20MP GigE camera rig, non-invasive current clamps (I &gt; 15A), and nitrogen gas pressure transducers.
            </p>
          </div>

          {/* Layer 2 */}
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition">
            <div className="flex items-center gap-2 mb-2 font-bold text-xs text-indigo-700 uppercase tracking-wider">
              <Radio size={14} />
              <span>Layer 2: Edge Gateway</span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">ESP32 &amp; IPC Ingestion</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Industrial edge microcontrollers running Store-and-Forward ring buffers. Buffers up to 50k events during Wi-Fi outages; publishes over TLS MQTT 5.0.
            </p>
          </div>

          {/* Layer 3 */}
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition">
            <div className="flex items-center gap-2 mb-2 font-bold text-xs text-purple-700 uppercase tracking-wider">
              <Wifi size={14} />
              <span>Layer 3: Message Broker</span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Eclipse Mosquitto (MQTT)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Topic taxonomy: <code className="text-[11px] bg-slate-100 px-1 rounded">factory/workcenter/events</code> with QoS 1 guaranteed delivery and cryptographic HMAC validation.
            </p>
          </div>

          {/* Layer 4 */}
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition">
            <div className="flex items-center gap-2 mb-2 font-bold text-xs text-emerald-700 uppercase tracking-wider">
              <Server size={14} />
              <span>Layer 4: Core Microservices</span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">FastAPI &amp; Celery Workers</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Asynchronous Python backend enforcing event state transitions. Background Celery queues for nesting solvers and OpenCV metrology processing.
            </p>
          </div>

          {/* Layer 5 */}
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition">
            <div className="flex items-center gap-2 mb-2 font-bold text-xs text-cyan-700 uppercase tracking-wider">
              <Database size={14} />
              <span>Layer 5: Unified Storage</span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">PostgreSQL &amp; MinIO Object Store</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              PostgreSQL 16 for ACID job ledgers and revision history. MinIO S3 for binary CAD assemblies (.sldasm), flat patterns (DXF), and 20MP inspection frames.
            </p>
          </div>

          {/* Layer 6 */}
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition">
            <div className="flex items-center gap-2 mb-2 font-bold text-xs text-rose-700 uppercase tracking-wider">
              <Layers size={14} />
              <span>Layer 6: Multi-Role UI</span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Role-Based Portals</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dedicated workspaces for Customers, Design Engineers, Shop Operators (touch screen), Quality Inspectors (metrology review), and Plant Managers.
            </p>
          </div>
        </div>
      </div>

      {/* AI Services Catalogue with HITL Governance */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">AI Microservices Catalogue &amp; HITL Safeguards</h3>
            <p className="text-xs text-slate-500">Every AI service operates in advisory mode (<code className="text-blue-600 font-mono">PROPOSED</code>); mandatory human confirmation required.</p>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold">
            Human-in-the-Loop Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* AI 1 */}
          <div className="p-4 rounded-xl border border-slate-200/80 bg-white">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-slate-900">1. Document Requirement Extractor</span>
              <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Advisory</span>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Extracts dimensional limits, sheet thickness, and switchgear counts from customer PDF single-line diagrams.
            </p>
            <div className="text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1">
              <div><strong className="text-slate-700">Input:</strong> Customer PDF / Image / RFQ text</div>
              <div><strong className="text-slate-700">HITL Gate:</strong> Design engineer must approve extracted specs before 3D CAD modeling begins.</div>
            </div>
          </div>

          {/* AI 2 */}
          <div className="p-4 rounded-xl border border-slate-200/80 bg-white">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-slate-900">2. Layout &amp; Placement Assistant</span>
              <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Advisory</span>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Optimizes component arrangement on mounting sub-plates complying with thermal convection and cable duct standards.
            </p>
            <div className="text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1">
              <div><strong className="text-slate-700">Input:</strong> Component 3D dimensions, heat dissipation (Watts)</div>
              <div><strong className="text-slate-700">HITL Gate:</strong> Electrical engineer verifies terminal access before coordinate lock.</div>
            </div>
          </div>

          {/* AI 3 */}
          <div className="p-4 rounded-xl border border-slate-200/80 bg-white">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-slate-900">3. Sheet Nesting Optimizer</span>
              <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Advisory</span>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Solves 2D irregular polygon bin-packing across multi-order production batches maximizing stock utilization ($\eta \ge 82\%$).
            </p>
            <div className="text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1">
              <div><strong className="text-slate-700">Input:</strong> DXF flat patterns, stock sheet inventory (2500x1250mm)</div>
              <div><strong className="text-slate-700">HITL Gate:</strong> Planner checks grain orientation &amp; clamp clearance prior to G-code execution.</div>
            </div>
          </div>

          {/* AI 4 */}
          <div className="p-4 rounded-xl border border-slate-200/80 bg-white">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-slate-900">4. Optical Metrology Assistant</span>
              <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Advisory</span>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Detects sub-pixel edge boundaries and overlays nominal CAD DXF vectors, calculating delta tolerances against ISO 2768-m.
            </p>
            <div className="text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1">
              <div><strong className="text-slate-700">Input:</strong> 20MP telecentric frame, nominal CAD DXF</div>
              <div><strong className="text-slate-700">HITL Gate:</strong> Certified QA inspector reviews deviation heatmap; AI cannot issue CoC release.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
