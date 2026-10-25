import React from 'react';
import { 
  Network, 
  Cpu, 
  Radio, 
  Server, 
  Layers, 
  Database, 
  Monitor, 
  Camera, 
  ArrowRight, 
  CheckCircle2,
  Lock,
  Workflow
} from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
            <Network className="w-4 h-4" />
            <span>End-to-End System Integration</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">AIoT Smart Sheet-Metal Fabrication Architecture</h2>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Holistic data pipeline linking physical CNC/press machines, edge barcode nodes, MQTT telemetry brokers, 
            FastAPI microservices, deep-learning models, and quality metrology rigs.
          </p>
        </div>
        <span className="px-3 py-1 rounded bg-blue-50 border border-blue-200 text-xs text-blue-700 font-mono self-start md:self-auto">
          Reference Model: ISA-95
        </span>
      </div>

      {/* Visual System Architecture Diagram (SVG / Flow Canvas) */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Multi-Tier Data Flow Diagram</h3>
            <p className="text-xs text-slate-500">How fabrication signals propagate from the shop floor to the management dashboard</p>
          </div>
          <span className="text-xs text-slate-400">Zero-Latency Pipeline</span>
        </div>

        {/* 4-Tier Interactive Architecture Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Tier 1: Physical Shop Floor */}
          <div className="p-4 rounded-lg border-2 border-slate-200 bg-slate-50 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">
                  Tier 1: Physical
                </span>
                <Radio className="w-4 h-4 text-slate-500" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-2">Shop-Floor Machinery & Sensors</h4>
              <p className="text-[11px] text-slate-500 mt-1">Physical sheet-metal equipment across all 14 stages</p>

              <div className="mt-4 space-y-2 text-xs">
                <div className="p-2 bg-white rounded border border-slate-200 font-medium text-slate-700">
                  ⚡ Fiber Laser Cutters (1-3 kW)
                </div>
                <div className="p-2 bg-white rounded border border-slate-200 font-medium text-slate-700">
                  📐 CNC Press Brakes (Amada / Trumpf)
                </div>
                <div className="p-2 bg-white rounded border border-slate-200 font-medium text-slate-700">
                  📷 Sony IMX Metrology Rig (P12)
                </div>
                <div className="p-2 bg-white rounded border border-slate-200 font-medium text-slate-700">
                  🏷️ ESP32 Barcode / RFID Scanners
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-400 font-mono">
              Protocols: Modbus RTU / GPIO / USB-Serial
            </div>
          </div>

          {/* Tier 2: Edge & Ingestion */}
          <div className="p-4 rounded-lg border-2 border-blue-200 bg-blue-50/40 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-semibold">
                  Tier 2: Edge
                </span>
                <Cpu className="w-4 h-4 text-blue-600" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-2">Edge Broker & Gateways</h4>
              <p className="text-[11px] text-slate-500 mt-1">Low-latency station filtering and event serialization</p>

              <div className="mt-4 space-y-2 text-xs">
                <div className="p-2 bg-white rounded border border-blue-200 font-medium text-slate-700">
                  📡 Mosquitto MQTT Broker
                </div>
                <div className="p-2 bg-white rounded border border-blue-200 font-medium text-slate-700">
                  ⏱️ Micro-Edge Telemetry Buffer
                </div>
                <div className="p-2 bg-white rounded border border-blue-200 font-medium text-slate-700">
                  🔒 TLS 1.3 Machine Handshake
                </div>
                <div className="p-2 bg-white rounded border border-blue-200 font-medium text-slate-700">
                  🔄 QoS Level 1 Guaranteed Event Pub
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-blue-200 text-[10px] text-blue-600 font-mono">
              Topic: aiot/station_+/event
            </div>
          </div>

          {/* Tier 3: Core AI & Microservices */}
          <div className="p-4 rounded-lg border-2 border-indigo-200 bg-indigo-50/40 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-semibold">
                  Tier 3: Analytics
                </span>
                <Server className="w-4 h-4 text-indigo-600" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-2">AI Engine & Backend Core</h4>
              <p className="text-[11px] text-slate-500 mt-1">Parametric optimization & CV metrology processing</p>

              <div className="mt-4 space-y-2 text-xs">
                <div className="p-2 bg-white rounded border border-indigo-200 font-medium text-slate-700">
                  🧠 AI Packing & Arrangement (P03)
                </div>
                <div className="p-2 bg-white rounded border border-indigo-200 font-medium text-slate-700">
                  🎯 ICP Sub-Pixel Metrology (P13)
                </div>
                <div className="p-2 bg-white rounded border border-indigo-200 font-medium text-slate-700">
                  🚀 FastAPI High-Concurrency Server
                </div>
                <div className="p-2 bg-white rounded border border-indigo-200 font-medium text-slate-700">
                  🗄️ PostgreSQL + InfluxDB Time-Series
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-indigo-200 text-[10px] text-indigo-600 font-mono">
              Inference: ONNX Runtime / PyTorch
            </div>
          </div>

          {/* Tier 4: Client Presentation */}
          <div className="p-4 rounded-lg border-2 border-emerald-200 bg-emerald-50/40 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-semibold">
                  Tier 4: UI/UX
                </span>
                <Monitor className="w-4 h-4 text-emerald-600" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-2">Production Web UI</h4>
              <p className="text-[11px] text-slate-500 mt-1">Human-In-The-Loop engineering and QA oversight</p>

              <div className="mt-4 space-y-2 text-xs">
                <div className="p-2 bg-white rounded border border-emerald-200 font-medium text-slate-700">
                  📊 Executive & Plant Overview
                </div>
                <div className="p-2 bg-white rounded border border-emerald-200 font-medium text-slate-700">
                  📋 14-Process Workflow Controls
                </div>
                <div className="p-2 bg-white rounded border border-emerald-200 font-medium text-slate-700">
                  🔬 Metrology & QA Gate Certification
                </div>
                <div className="p-2 bg-white rounded border border-emerald-200 font-medium text-slate-700">
                  📦 Parametric Component Explorer
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-200 text-[10px] text-emerald-600 font-mono">
              Frontend: React + Vite + Tailwind CSS
            </div>
          </div>
        </div>
      </div>

      {/* Hardware & Software Inventory Spec */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-3">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Server className="w-4 h-4 text-blue-600" />
            Software Stack & Protocols
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Frontend Layer</span>
              <span className="font-semibold text-slate-800">React 18, TypeScript, Tailwind CSS, Lucide</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">API Gateway / Services</span>
              <span className="font-semibold text-slate-800">FastAPI, Uvicorn, Python 3.11</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">IoT Broker & Transport</span>
              <span className="font-semibold text-slate-800">Eclipse Mosquitto (MQTT v5.0, TLS 1.3)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Computer Vision Stack</span>
              <span className="font-semibold text-slate-800">OpenCV 4.8, NumPy, Scikit-Image, Shapely</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">CAD Integration</span>
              <span className="font-semibold text-slate-800">SOLIDWORKS API, CADcraft, DXF R12 Standard</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-3">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-600" />
            Target Hardware Specification
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Station Edge Nodes</span>
              <span className="font-semibold text-slate-800">ESP32-WROOM-32D / Raspberry Pi 4</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Inspection Camera Sensor</span>
              <span className="font-semibold text-slate-800">Sony IMX264 5.1MP USB3 Vision</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Metrology Lighting</span>
              <span className="font-semibold text-slate-800">High-Uniformity Blue LED Polarized Ring</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Barcode / Tag Scanners</span>
              <span className="font-semibold text-slate-800">Honeywell 1950G 2D QR / DataMatrix Imager</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Shop-Floor Industrial PC</span>
              <span className="font-semibold text-slate-800">Fanless DIN-Rail Box PC (Intel Core i5, 16GB)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
