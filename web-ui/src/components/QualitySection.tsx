import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Camera, 
  Scan, 
  FileCheck, 
  Layers, 
  ShieldCheck, 
  Info,
  Maximize2,
  Crosshair,
  Sliders,
  Check,
  X
} from 'lucide-react';

interface GateCheck {
  id: string;
  name: string;
  criteria: string;
  process: string;
  status: 'passed' | 'review' | 'pending';
  measuredValue: string;
  nominalValue: string;
  tolerance: string;
}

export const QualitySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'p12' | 'p13' | 'p14'>('p12');

  const [qaGates, setQaGates] = useState<GateCheck[]>([
    {
      id: 'G1',
      name: 'Sheet-Metal Blank Outline & Flat Dimensions',
      criteria: 'Blank length & width verification post laser cut',
      process: 'P12 (Camera Metrology)',
      status: 'passed',
      nominalValue: '596.0 mm',
      measuredValue: '596.18 mm',
      tolerance: '±0.5 mm'
    },
    {
      id: 'G2',
      name: 'Flange Bend Angles & Height Deviation',
      criteria: 'Flange height 25.0 mm at 90° bend profile',
      process: 'P13 (Feature Comparison)',
      status: 'passed',
      nominalValue: '25.0 mm',
      measuredValue: '25.12 mm',
      tolerance: '±0.3 mm'
    },
    {
      id: 'G3',
      name: 'DIN-Rail & Component Mounting Pitch',
      criteria: 'Center-to-center hole spacing across mounting grid',
      process: 'P13 (Sub-pixel Detection)',
      status: 'passed',
      nominalValue: '120.0 mm',
      measuredValue: '119.92 mm',
      tolerance: '±0.2 mm'
    },
    {
      id: 'G4',
      name: 'Powder-Coating DFT (Dry Film Thickness)',
      criteria: 'Uniform surface protection layer thickness',
      process: 'P14 (Final QA Inspection)',
      status: 'passed',
      nominalValue: '70 µm',
      measuredValue: '72.4 µm',
      tolerance: '60 - 80 µm'
    },
    {
      id: 'G5',
      name: 'Door Sealing & Gasket Continuity',
      criteria: 'Continuous polyurethane foam seal without gaps',
      process: 'P14 (Physical Audit)',
      status: 'passed',
      nominalValue: 'Continuous',
      measuredValue: '100% Intact',
      tolerance: 'Zero voids'
    },
    {
      id: 'G6',
      name: 'Earthing Continuity & Stud Resistance',
      criteria: 'Grounding bond loop impedance test',
      process: 'P14 (Electrical Safety)',
      status: 'passed',
      nominalValue: '< 0.1 Ω',
      measuredValue: '0.04 Ω',
      tolerance: 'Max 0.1 Ω'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      <div className="bg-slate-50 border-l-4 border-slate-400 p-4 rounded-r-lg flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-slate-500 mt-0.5 shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-slate-800">Quality Assurance & Computer-Vision Metrology</h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Closed-loop quality verification pipeline (Processes 12, 13, and 14). Correlates top-down 20MP camera metrology, ICP CAD DXF vector comparison, and the 6 Mandatory Acceptance Gates before physical enclosure release.
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          Metrology Pipeline
        </span>
      </div>

      {/* Tabs Header */}
      <div className="flex border-b border-slate-200 bg-white px-4 rounded-t-lg">
        <button
          onClick={() => setActiveTab('p12')}
          className={`py-3 px-4 text-xs font-medium border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'p12'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Camera className="w-4 h-4" />
          Process 12: Camera-Based Dimensional Metrology
        </button>

        <button
          onClick={() => setActiveTab('p13')}
          className={`py-3 px-4 text-xs font-medium border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'p13'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Scan className="w-4 h-4" />
          Process 13: CV Feature Detection & CAD Comparison
        </button>

        <button
          onClick={() => setActiveTab('p14')}
          className={`py-3 px-4 text-xs font-medium border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'p14'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Process 14: Final Enclosure Quality Acceptance & 6 QA Gates
        </button>
      </div>

      {/* PROCESS 12: Camera-Based Dimensional Inspection */}
      {activeTab === 'p12' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Overhead Telecentric Optical Inspection Station</h3>
                  <p className="text-xs text-slate-500">High-resolution calibrated camera setup for sheet-metal edge contour extraction</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded">
                  Calibrated (0.042 mm/pixel)
                </span>
              </div>

              {/* Optical Rig Visual */}
              <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-900 relative">
                <img 
                  src="/assets/images/inspection/Camera-Based Enclosure Dimensional Inspection Setup.png" 
                  alt="Camera Inspection Setup" 
                  className="w-full h-80 object-cover object-center opacity-90"
                />
                
                {/* Simulated Reticle Overlay */}
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
                  <div className="flex justify-between items-start text-[10px] font-mono text-emerald-400 bg-black/60 px-2.5 py-1 rounded w-fit">
                    <span>FOV: 800×600 mm | EXPOSURE: 4.2ms | RING LIGHT: 85%</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-24 h-24 border border-dashed border-emerald-400/70 rounded-full flex items-center justify-center">
                      <Crosshair className="w-8 h-8 text-emerald-400/80" />
                    </div>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-emerald-400 bg-black/60 px-2.5 py-1 rounded">
                    <span>CHESSBOARD CALIBRATION MATRIX APPLIED (RMS: 0.12 px)</span>
                    <span>FPS: 30 (STABLE)</span>
                  </div>
                </div>
              </div>

              {/* Step Pipeline Flow */}
              <div className="grid grid-cols-4 gap-2 pt-2">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-center">
                  <span className="text-[10px] text-slate-400 block font-mono">STEP 1</span>
                  <span className="text-xs font-semibold text-slate-800">Ring-Light Strobing</span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-center">
                  <span className="text-[10px] text-slate-400 block font-mono">STEP 2</span>
                  <span className="text-xs font-semibold text-slate-800">Distortion Correction</span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-center">
                  <span className="text-[10px] text-slate-400 block font-mono">STEP 3</span>
                  <span className="text-xs font-semibold text-slate-800">Canny Edge Operator</span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-center">
                  <span className="text-[10px] text-slate-400 block font-mono">STEP 4</span>
                  <span className="text-xs font-semibold text-slate-800">Sub-Pixel Contour</span>
                </div>
              </div>
            </div>

            {/* Calibration Details Column */}
            <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4">
              <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Metrology Rig Parameters</h4>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase block font-mono">Camera Sensor</span>
                  <span className="font-semibold text-slate-800">Sony IMX264 5.1 MP CMOS Monochromatic</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase block font-mono">Optics / Lens</span>
                  <span className="font-semibold text-slate-800">16mm C-Mount Low Distortion (&lt;0.05%)</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase block font-mono">Illumination Source</span>
                  <span className="font-semibold text-slate-800">450nm Blue LED Polarized Backlight + Top Ring</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase block font-mono">Working Distance (WD)</span>
                  <span className="font-semibold text-slate-800">1200 mm above inspection fixture table</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded border border-emerald-100 text-xs text-emerald-800 space-y-1">
                <div className="font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Homography Matrix Validated
                </div>
                <p className="text-[11px] text-emerald-700">
                  Perspective distortion rectified. Conversion scaling ratio: <strong>1 pixel = 0.0423 mm</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROCESS 13: CV Feature Detection & CAD Comparison */}
      {activeTab === 'p13' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Computer Vision CAD Feature Deviation Analysis</h3>
                  <p className="text-xs text-slate-500">Automated ICP alignment comparing captured contour against DXF nominal CAD vector</p>
                </div>
                <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold rounded">
                  Max Deviation: +0.18 mm
                </span>
              </div>

              {/* CV Comparison Visual */}
              <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                <img 
                  src="/assets/images/inspection/Industrial Vision Inspection Dashboard.png" 
                  alt="Computer Vision Feature Detection" 
                  className="w-full h-80 object-cover object-center"
                />
                <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-medium">Cad Overlay: Green (Nominal DXF) | Red Dots (Captured Feature Extents)</span>
                  <span className="font-mono text-emerald-700 font-bold">ALL FEATURES WITHIN TOLERANCE</span>
                </div>
              </div>
            </div>

            {/* Feature Deviation Table */}
            <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4">
              <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Critical Tolerance Check</h4>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-800">Total Width (X)</span>
                    <span className="text-[10px] text-slate-400 block font-mono">Nominal: 596.0 mm</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-700 font-mono">+0.18 mm</span>
                    <span className="text-[10px] text-slate-400 block">Pass (±0.5)</span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-800">Total Height (Y)</span>
                    <span className="text-[10px] text-slate-400 block font-mono">Nominal: 396.0 mm</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-700 font-mono">-0.11 mm</span>
                    <span className="text-[10px] text-slate-400 block">Pass (±0.5)</span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-800">DIN Rail Slot Pitch</span>
                    <span className="text-[10px] text-slate-400 block font-mono">Nominal: 120.0 mm</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-700 font-mono">-0.08 mm</span>
                    <span className="text-[10px] text-slate-400 block">Pass (±0.2)</span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-800">Hole Diameters (Ø 6.5)</span>
                    <span className="text-[10px] text-slate-400 block font-mono">Nominal: 6.50 mm</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-700 font-mono">+0.05 mm</span>
                    <span className="text-[10px] text-slate-400 block">Pass (±0.15)</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded border border-blue-100 text-xs text-blue-800">
                <span className="font-semibold block mb-0.5">Algorithm: Sub-Pixel Edges</span>
                <p className="text-[11px] text-blue-700">
                  Feature centroids extracted via moment invariants and aligned using Iterative Closest Point (ICP).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROCESS 14: Final Enclosure Inspection & 6 QA Gates */}
      {activeTab === 'p14' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Process 14: Final Fabricated Enclosure Quality Acceptance</h3>
                  <p className="text-xs text-slate-500">Comprehensive assembly inspection covering dimensional accuracy, paint finish, and electrical bonding</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approved for Dispatch
                </span>
              </div>

              {/* Final Enclosure Visual */}
              <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                <img 
                  src="/assets/images/inspection/Electrical Enclosure Quality Inspection Pass.png" 
                  alt="Final Assembled Enclosure" 
                  className="w-full h-80 object-cover object-center"
                />
                <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-medium">Chassis Assembly: AIoT-ENC-600400200</span>
                  <span className="font-mono text-emerald-700 font-bold">100% QA Acceptance Certificate Issued</span>
                </div>
              </div>
            </div>

            {/* QA Gates Status Panel */}
            <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">The 6 Mandatory Quality Gates</h4>
                <span className="text-[11px] text-emerald-600 font-bold">6/6 Passed</span>
              </div>

              <div className="space-y-2 text-xs">
                {qaGates.map((gate) => (
                  <div key={gate.id} className="p-2.5 bg-slate-50 rounded border border-slate-100 flex items-start gap-2.5">
                    <span className="p-1 bg-emerald-100 text-emerald-700 rounded-full mt-0.5">
                      <Check className="w-3 h-3" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-800 text-[11px]">{gate.id}: {gate.name}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">{gate.criteria}</p>
                      <div className="mt-1 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-slate-400">Nominal: {gate.nominalValue}</span>
                        <span className="text-emerald-700 font-semibold">Measured: {gate.measuredValue}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
                  <FileCheck className="w-3.5 h-3.5" /> Download Digital Inspection Certificate (PDF)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
