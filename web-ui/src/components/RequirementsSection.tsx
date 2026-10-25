import React, { useState } from 'react';
import { 
  PlusCircle, 
  Save, 
  ArrowRight, 
  Layers, 
  Info, 
  CheckCircle2, 
  FileText,
  Maximize2
} from 'lucide-react';
import { EnclosureRecord } from '../data/projectData';

interface RequirementsSectionProps {
  enclosureRecord: EnclosureRecord;
  onUpdateRecord: (updated: Partial<EnclosureRecord>) => void;
  onNavigateToWorkflow: () => void;
}

export const RequirementsSection: React.FC<RequirementsSectionProps> = ({
  enclosureRecord,
  onUpdateRecord,
  onNavigateToWorkflow
}) => {
  const [formData, setFormData] = useState<Partial<EnclosureRecord>>({
    customerName: enclosureRecord.customerName,
    projectTitle: enclosureRecord.projectTitle,
    height: enclosureRecord.height,
    width: enclosureRecord.width,
    depth: enclosureRecord.depth,
    material: enclosureRecord.material,
    thickness: enclosureRecord.thickness,
    finish: enclosureRecord.finish,
    ipRating: enclosureRecord.ipRating,
    mountingType: enclosureRecord.mountingType,
    doorType: enclosureRecord.doorType,
    lockingType: enclosureRecord.lockingType,
    quantity: enclosureRecord.quantity,
    customerNotes: enclosureRecord.customerNotes
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateRecord(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
            <PlusCircle className="w-4 h-4" />
            <span>Process 01: Customer Requirement Collection</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">New Enclosure Specification & RFQ Intake</h2>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Collect, edit, and validate custom sheet-metal electrical enclosure requirements. 
            All modifications update the shared local demo record across CAD, BOM, and Metrology stages.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={onNavigateToWorkflow}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            Open 14-Process Workflow <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Form on Left, Technical Drawing Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Specification Intake Form (7 Cols) */}
        <form onSubmit={handleSave} className="lg:col-span-7 bg-white rounded-lg border border-slate-200 shadow-xs p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Enclosure Dimensional & Material Parameters</h3>
              <p className="text-xs text-slate-500">Edit values and save to review downstream impact</p>
            </div>
            {savedSuccess && (
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-xs font-semibold flex items-center gap-1">
                <CheckCircle2 size={13} /> Saved to Local State
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Customer / Organization</label>
              <input
                type="text"
                value={formData.customerName || ''}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Project Work Order Title</label>
              <input
                type="text"
                value={formData.projectTitle || ''}
                onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Dimensions */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Outer Enclosure Envelope Dimensions (mm)
            </span>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Height (A) mm</label>
                <input
                  type="number"
                  min="200"
                  max="2200"
                  value={formData.height || 600}
                  onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded font-mono font-medium text-slate-900"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Width (B) mm</label>
                <input
                  type="number"
                  min="200"
                  max="1600"
                  value={formData.width || 500}
                  onChange={(e) => setFormData({ ...formData, width: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded font-mono font-medium text-slate-900"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Depth (C) mm</label>
                <input
                  type="number"
                  min="150"
                  max="800"
                  value={formData.depth || 250}
                  onChange={(e) => setFormData({ ...formData, depth: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded font-mono font-medium text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Material & Sheet Gauge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Raw Material Specification</label>
              <select
                value={formData.material || ''}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="IS 513 CRCA Cold-Rolled Steel Grade D">IS 513 CRCA Steel Grade D</option>
                <option value="AISI 304 Stainless Steel (Brushed)">AISI 304 Stainless Steel (Brushed)</option>
                <option value="AISI 316L Food/Pharma Stainless Steel">AISI 316L Stainless Steel</option>
                <option value="Aluminium 5052-H32 Marine Grade">Aluminium 5052-H32 Marine Grade</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Sheet Thickness (mm)</label>
              <select
                value={formData.thickness || 1.5}
                onChange={(e) => setFormData({ ...formData, thickness: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
              >
                <option value="1.2">1.2 mm (18 Gauge)</option>
                <option value="1.5">1.5 mm (16 Gauge - Standard)</option>
                <option value="2.0">2.0 mm (14 Gauge - Heavy Duty)</option>
                <option value="2.5">2.5 mm (Industrial Switchboard)</option>
              </select>
            </div>
          </div>

          {/* Environmental Ingress & Finish */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Ingress Protection (IP)</label>
              <select
                value={formData.ipRating || 'IP55 / NEMA 12'}
                onChange={(e) => setFormData({ ...formData, ipRating: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md"
              >
                <option value="IP54 (Dust & Splash Proof)">IP54 (Dust & Splash Proof)</option>
                <option value="IP55 / NEMA 12 (Standard Control)">IP55 / NEMA 12 (Standard Control)</option>
                <option value="IP65 (Outdoor Weatherproof)">IP65 (Outdoor Weatherproof)</option>
                <option value="IP66 / NEMA 4X (Water Jet Proof)">IP66 / NEMA 4X (Water Jet Proof)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Mounting Configuration</label>
              <select
                value={formData.mountingType || 'External Wall-Mounting Flange Brackets'}
                onChange={(e) => setFormData({ ...formData, mountingType: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md"
              >
                <option value="External Wall-Mounting Flange Brackets (4x M8 slots)">External Wall-Mounting Flanges</option>
                <option value="Internal Direct Rear Mount Studs">Internal Direct Rear Mount</option>
                <option value="Floor-Standing Modular Plinth (100mm)">Floor-Standing Modular Plinth</option>
                <option value="Pole-Mount Clamp Brackets">Pole-Mount Clamp Brackets</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Batch Quantity (Units)</label>
              <input
                type="number"
                min="1"
                max="500"
                value={formData.quantity || 5}
                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Engineering & Functional Notes</label>
            <textarea
              rows={2}
              value={formData.customerNotes || ''}
              onChange={(e) => setFormData({ ...formData, customerNotes: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md"
              placeholder="e.g., Gland plate cutouts, ventilation louvers, internal DIN-rail spacing requirements..."
            />
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <span className="text-[11px] text-slate-400">
              Values persist to client-side browser state
            </span>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Save size={14} /> Save Specifications & Update Model
            </button>
          </div>
        </form>

        {/* Technical Drawing & Product Render Reference (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 shadow-xs p-5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider">
                  Technical Reference Image
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">Enclosure Orthographics & Render</h4>
              </div>
              <button
                onClick={() => setShowLightbox(true)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                title="Zoom technical drawing"
              >
                <Maximize2 size={16} />
              </button>
            </div>

            {/* Clickable Image Preview */}
            <div 
              onClick={() => setShowLightbox(true)}
              className="mt-3 relative rounded-lg overflow-hidden border border-slate-200 bg-slate-50 cursor-pointer group"
            >
              <img
                src={enclosureRecord.primaryDrawingImage}
                alt="Enclosure Orthographic Drawing and 3D Render"
                className="w-full h-72 object-contain bg-white p-2 group-hover:scale-[1.02] transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-md text-xs font-semibold text-slate-800 shadow-md transition-opacity">
                  Click to Expand Technical Drawing
                </span>
              </div>
            </div>

            {/* Spec Sheet Callout */}
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Design Model Ref</span>
                <span className="font-mono font-medium text-slate-800">{enclosureRecord.cadModelRef}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Enclosure Bounding Envelope</span>
                <span className="font-mono font-bold text-blue-700">
                  {formData.height}H × {formData.width}W × {formData.depth}D mm
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Mounting Centers</span>
                <span className="font-mono text-slate-800">
                  {Number(formData.width) + 60} mm (Flange Slot Pitch)
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">K-Factor Bend Allowance</span>
                <span className="font-mono text-slate-800">K = {enclosureRecord.kFactor} (V8 Die / 90°)</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-md border border-amber-200 text-[11px] text-amber-800">
            <strong>Drawing Notice:</strong> The orthographic schematic and isometric render above represent the physical reference geometry for this enclosure assembly. Renderings represent visual models and are validated through Process 12-14 QA gates.
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
          onClick={() => setShowLightbox(false)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-4 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-mono font-bold text-blue-600">
                High-Resolution Enclosure Drawing & 3D Render: {enclosureRecord.id}
              </span>
              <button 
                onClick={() => setShowLightbox(false)}
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
