import React, { useState } from 'react';
import { SAMPLE_COMPONENTS, ComponentItem } from '../data/projectData';
import { 
  Box, 
  Layers, 
  FileText, 
  Scissors, 
  Grid, 
  Search, 
  Download, 
  CheckCircle2, 
  Cpu
} from 'lucide-react';

export const CADSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'components' | 'enclosure' | 'bom' | 'flatpattern' | 'nesting'>('components');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedComp, setSelectedComp] = useState<ComponentItem | null>(SAMPLE_COMPONENTS[0]);

  const categories = ['All', 'Circuit Protection', 'Power Supply', 'Motor Control', 'Automation & Control', 'Wire Management', 'Mounting Hardware'];

  const filteredComponents = SAMPLE_COMPONENTS.filter(comp => {
    const matchesCat = categoryFilter === 'All' || comp.category === categoryFilter;
    const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          comp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          comp.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner with Engineering Context */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
            <Layers className="w-4 h-4" />
            <span>Digital Engineering & CAD Workflow</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">CAD Library, BOM & Sheet-Metal Development</h2>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Parametric digital twins, standardized library components, 3D enclosure modeling (SOLIDWORKS / CADcraft), 
            K-factor bend compensation, and nesting layouts.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="px-3 py-1 rounded bg-slate-100 border border-slate-200 text-xs text-slate-600 font-mono">
            CAD Standard: STEP AP214 / DXF
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white px-4 rounded-t-lg">
        <button
          onClick={() => setActiveTab('components')}
          className={`py-3 px-4 text-xs font-medium border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'components'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Box className="w-4 h-4" />
          Component Digital Library ({SAMPLE_COMPONENTS.length})
        </button>

        <button
          onClick={() => setActiveTab('enclosure')}
          className={`py-3 px-4 text-xs font-medium border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'enclosure'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          3D Enclosure Assembly (P04)
        </button>

        <button
          onClick={() => setActiveTab('bom')}
          className={`py-3 px-4 text-xs font-medium border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'bom'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          Bill of Materials (BOM) & Costs (P05)
        </button>

        <button
          onClick={() => setActiveTab('flatpattern')}
          className={`py-3 px-4 text-xs font-medium border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'flatpattern'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Scissors className="w-4 h-4" />
          Flat Pattern & K-Factor (P06)
        </button>

        <button
          onClick={() => setActiveTab('nesting')}
          className={`py-3 px-4 text-xs font-medium border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'nesting'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Grid className="w-4 h-4" />
          Laser Nesting Layouts (P07)
        </button>
      </div>

      {/* TAB 1: Component Library */}
      {activeTab === 'components' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search component by name, ID, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1 overflow-x-auto text-xs">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                      categoryFilter === cat 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Component Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[580px] overflow-y-auto pr-1">
              {filteredComponents.map((comp) => {
                const isSelected = selectedComp?.id === comp.id;
                return (
                  <div
                    key={comp.id}
                    onClick={() => setSelectedComp(comp)}
                    className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-50/50 shadow-xs ring-1 ring-blue-400' 
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 bg-slate-100 text-blue-600 rounded">
                          <Cpu className="w-3.5 h-3.5" />
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{comp.name}</h4>
                          <span className="text-[10px] font-mono text-slate-400">{comp.id}</span>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                        {comp.category}
                      </span>
                    </div>

                    <div className="mt-2.5 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                      <div>
                        <span className="text-slate-400 text-[10px] block">Dimensions</span>
                        <span className="font-mono">{comp.dimensions}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Mounting Standard</span>
                        <span>{comp.mounting}</span>
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Thermal: <strong>{comp.powerLoss}</strong></span>
                      <span className="font-mono font-medium text-emerald-700">{comp.cadStatus}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Component CAD Detail Inspector */}
          {selectedComp && (
            <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-mono text-blue-600 uppercase tracking-wider font-semibold">
                  CAD Digital Library Specification
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">{selectedComp.name}</h3>
                <p className="text-xs text-slate-500">Part No: {selectedComp.id}</p>
              </div>

              {/* Parametric Details Table */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Classification</span>
                  <span className="font-medium text-slate-800">{selectedComp.category}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Bounding Box (L×W×H)</span>
                  <span className="font-mono font-medium text-slate-800">{selectedComp.dimensions}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Mounting Standard</span>
                  <span className="font-medium text-slate-800">{selectedComp.mounting}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Thermal Dissipation</span>
                  <span className="font-medium text-amber-700">{selectedComp.powerLoss}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">3D CAD Model Status</span>
                  <span className="font-semibold text-emerald-700">{selectedComp.cadStatus}</span>
                </div>
              </div>

              {/* CAD Integration Rules */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-2">
                <span className="font-semibold text-slate-800 block text-[11px] uppercase tracking-wider">
                  Automated Placement Clearance Rules
                </span>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 text-[11px]">
                  <li>Minimum clearance perimeter: 20 mm airflow spacing.</li>
                  <li>DIN-rail top-down engagement offset: 35 mm.</li>
                  <li>Connector cable-bend radius allowance: 40 mm.</li>
                </ul>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
                  <Download className="w-3.5 h-3.5" /> Export Parametric STEP Model
                </button>
                <p className="text-[10px] text-center text-slate-400">
                  Model references SOLIDWORKS FeatureTree & CADcraft libraries
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Enclosure Assembly (P04) */}
      {activeTab === 'enclosure' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-5 space-y-4">
              <h3 className="text-base font-bold text-slate-900">Process 04: Final 3D CAD Enclosure Model</h3>
              <p className="text-xs text-slate-600">
                Parametric 3D solid model designed in SOLIDWORKS and CADcraft with exact DIN-rail mounting slots, 
                gland-plate punchouts, louvers for passive airflow, and IP54 gasket grooves.
              </p>

              {/* Enclosure Preview Visual */}
              <div className="rounded-lg overflow-hidden border border-slate-200 bg-white">
                <img 
                  src="/assets/images/cad/enclosure-drawing-render.png" 
                  alt="3D CAD Enclosure Model and Orthographics" 
                  className="w-full h-80 object-contain p-2"
                />
                <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-medium">Chassis Assembly: SOLIDWORKS-ASM-ENC-600400200.sldasm</span>
                  <span className="font-mono">Dimensions: 600 × 500 × 250 mm | Material: CRCA 1.5 mm</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4">
              <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Design Specifications</h4>
              
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase block font-mono">Ingress Protection</span>
                  <span className="font-semibold text-slate-800">IP54 (Dust protected, splash proof)</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase block font-mono">Material Specification</span>
                  <span className="font-semibold text-slate-800">IS 513 CRCA Grade D, 1.5 mm thickness</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase block font-mono">Thermal Dissipation</span>
                  <span className="font-semibold text-slate-800">Passive Louver + 80mm Fan Cutout (48W Max)</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase block font-mono">Locking & Hinge</span>
                  <span className="font-semibold text-slate-800">Dual Quarter-Turn Cam Locks, 120° Concealed Hinges</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-100 rounded-md text-xs text-blue-900">
                <div className="font-semibold flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  CAD Validation Checklist Passed
                </div>
                <p className="text-[11px] text-blue-700">
                  Zero interferences detected between DIN-rail components and chassis door. Cable-entry bend radius &gt; 35 mm verified.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BOM (P05) */}
      {activeTab === 'bom' && (
        <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Process 05: Engineering Bill of Materials (BOM)</h3>
              <p className="text-xs text-slate-500">Synchronized itemized costs for components, raw sheet metal, hardware, and fabrication labor</p>
            </div>
            <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors">
              <Download className="w-3.5 h-3.5" /> Export BOM CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-2.5 px-3">Item #</th>
                  <th className="py-2.5 px-3">Part ID</th>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Mounting</th>
                  <th className="py-2.5 px-3">CAD Model</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {SAMPLE_COMPONENTS.map((comp, idx) => (
                  <tr key={comp.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 text-slate-400">{idx + 1}</td>
                    <td className="py-2.5 px-3 text-blue-700 font-medium">{comp.id}</td>
                    <td className="py-2.5 px-3 font-sans text-slate-800">{comp.name}</td>
                    <td className="py-2.5 px-3 font-sans text-slate-500">{comp.category}</td>
                    <td className="py-2.5 px-3 font-sans text-slate-600">{comp.mounting}</td>
                    <td className="py-2.5 px-3 text-emerald-700">{comp.cadStatus}</td>
                    <td className="py-2.5 px-3 text-right font-semibold text-emerald-600">VERIFIED</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Flat Pattern Development (P06) */}
      {activeTab === 'flatpattern' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-5 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Process 06: Flat-Pattern Unfolding & Bend Calculation</h3>
            <p className="text-xs text-slate-600">
              Validated unfold algorithm incorporating precise K-Factor (0.38) for 1.5 mm CRCA steel to ensure exact 90° flange dimensions 
              post-bending without material tearing or elongation distortion.
            </p>

            <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
              <img 
                src="/assets/images/cad/Electrical Enclosure CAD Flat Patterns.png" 
                alt="Sheet Metal Flat Pattern" 
                className="w-full h-80 object-cover object-center"
              />
              <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span className="font-medium">DXF Pattern: FP-AIOT-ENC-01.dxf</span>
                <span className="font-mono">Bend Lines: 8 Bends | V-Die: 12mm | Tool Radius: 1.5mm</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Bend Compensation Parameters</h4>

            <div className="space-y-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase block font-mono">Empirical K-Factor</span>
                <span className="font-semibold text-slate-800 text-sm">0.38 (Air Bending)</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase block font-mono">Bend Allowance (BA) Formula</span>
                <span className="font-mono text-slate-700 text-[11px] block mt-0.5">
                  BA = (π / 180) × Angle × (R + K × T)
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase block font-mono">Bend Deduction (BD)</span>
                <span className="font-semibold text-slate-800">2.68 mm per 90° bend</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase block font-mono">Corner Relief Standard</span>
                <span className="font-semibold text-slate-800">Round Relief (Radius: 2.0 mm)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Nesting Layouts (P07) */}
      {activeTab === 'nesting' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-5 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Process 07: Laser-Cutting Nesting Optimization</h3>
            <p className="text-xs text-slate-600">
              Genetic algorithm-based nesting layout maximizing sheet utilization on standard 2500 × 1250 mm CRCA sheets. 
              Features common-line cutting and heat-dispersion laser lead-in paths.
            </p>

            <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
              <img 
                src="/assets/images/manufacturing/Laser Cutting Nesting Sheet Remnant Optimization.png" 
                alt="Laser Cutting Nesting Layout" 
                className="w-full h-80 object-cover object-center"
              />
              <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span className="font-medium">Nesting Job: NEST-2026-04</span>
                <span className="font-mono font-bold text-emerald-600">Material Efficiency: 84.7%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Nesting Key Performance Metrics</h4>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-emerald-50 rounded border border-emerald-100">
                <span className="text-[10px] text-emerald-600 uppercase block font-medium">Sheet Utilization</span>
                <span className="text-2xl font-bold text-emerald-700">84.7%</span>
                <p className="text-[11px] text-emerald-600 mt-0.5">Scrap reduced by 14% vs. manual layout</p>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase block font-mono">Sheet Dimensions</span>
                <span className="font-semibold text-slate-800">2500 × 1250 × 1.5 mm (Standard)</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase block font-mono">Laser Pierce Count</span>
                <span className="font-semibold text-slate-800">42 Pierces (Optimized sequence)</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase block font-mono">Total Cutting Path</span>
                <span className="font-semibold text-slate-800">18.4 meters (Rapid traverse: 4.2m)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
