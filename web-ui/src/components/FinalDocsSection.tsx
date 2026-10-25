import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Layers, 
  Printer, 
  CheckCircle2, 
  Info,
  Maximize2,
  FileCheck,
  ShieldCheck,
  FileSpreadsheet,
  Workflow,
  Sparkles
} from 'lucide-react';
import { EnclosureRecord, SAMPLE_COMPONENTS } from '../data/projectData';
import { 
  triggerFileDownload, 
  generateBOMCSV, 
  generateQuotationHTML, 
  generateNestingSVG, 
  generateAssemblySVG, 
  generateWorkflowSVG, 
  generateQualityReportHTML 
} from '../utils/documentGenerator';

interface FinalDocsSectionProps {
  enclosureRecord: EnclosureRecord;
  onUpdateRecord: (updated: Partial<EnclosureRecord>) => void;
}

export const FinalDocsSection: React.FC<FinalDocsSectionProps> = ({
  enclosureRecord,
  onUpdateRecord,
}) => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const selectedComps = SAMPLE_COMPONENTS.filter(c => enclosureRecord.selectedComponentIds.includes(c.id));
  const compTotal = selectedComps.reduce((acc, c) => acc + (c.unitCost * enclosureRecord.quantity), 0);
  
  const steelWeightEst = Math.round((2 * (enclosureRecord.height * enclosureRecord.width + enclosureRecord.height * enclosureRecord.depth + enclosureRecord.width * enclosureRecord.depth) / 1e6) * enclosureRecord.thickness * 7.85 * 10) / 10;
  const rawMaterialCost = Math.round(steelWeightEst * enclosureRecord.materialCostPerKg * enclosureRecord.quantity);
  const fabricationLaborCost = Math.round((enclosureRecord.laserCutTimeMinutes / 60) * enclosureRecord.laborRatePerHour * enclosureRecord.quantity + (enclosureRecord.bendCyclesCount * 25 * enclosureRecord.quantity));
  
  const subtotal = compTotal + rawMaterialCost + fabricationLaborCost;
  const tax = Math.round(subtotal * (enclosureRecord.taxPercent / 100));
  const grandTotal = subtotal + tax;

  const handleDownload = (type: string) => {
    switch (type) {
      case 'bom-csv':
        const csv = generateBOMCSV(enclosureRecord);
        triggerFileDownload(`BOM-${enclosureRecord.id}.csv`, csv, 'text/csv');
        setDownloadSuccess('BOM CSV downloaded successfully.');
        break;
      case 'quotation-html':
        const qHtml = generateQuotationHTML(enclosureRecord);
        triggerFileDownload(`Quotation-${enclosureRecord.orderNumber}.html`, qHtml, 'text/html');
        setDownloadSuccess('Commercial Quotation HTML downloaded.');
        break;
      case 'nesting-svg':
        const nestSvg = generateNestingSVG(enclosureRecord);
        triggerFileDownload(`Laser-Nesting-${enclosureRecord.id}.svg`, nestSvg, 'image/svg+xml');
        setDownloadSuccess('Laser Nesting Schematic SVG downloaded.');
        break;
      case 'assembly-svg':
        const assySvg = generateAssemblySVG(enclosureRecord);
        triggerFileDownload(`Assembly-Drawing-${enclosureRecord.id}.svg`, assySvg, 'image/svg+xml');
        setDownloadSuccess('Exploded Assembly Diagram SVG downloaded.');
        break;
      case 'workflow-svg':
        const wfSvg = generateWorkflowSVG();
        triggerFileDownload(`AIoT-Manufacturing-Workflow.svg`, wfSvg, 'image/svg+xml');
        setDownloadSuccess('Manufacturing 14-Process Workflow SVG downloaded.');
        break;
      case 'quality-html':
        const qaHtml = generateQualityReportHTML(enclosureRecord);
        triggerFileDownload(`Quality-Report-CoC-${enclosureRecord.id}.html`, qaHtml, 'text/html');
        setDownloadSuccess('Certificate of Conformance (CoC) Report downloaded.');
        break;
      default:
        break;
    }

    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const allGatesPassed = Object.values(enclosureRecord.qaGateChecks).every(v => v === true);

  const handleSimulateRelease = () => {
    if (!allGatesPassed) return;
    onUpdateRecord({
      status: 'Released (CoC Signed)',
      qaApproved: true
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Context */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            <span>Process 14: Final Deliverables & Document Workspace</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Final Enclosure Release & Client-Side Document Centre</h2>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Download client-side generated engineering documents, manufacturing drawings, quotation previews, 
            and the final Certificate of Conformance (CoC).
          </p>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className={`px-3 py-1 rounded text-xs font-bold border ${
            enclosureRecord.status === 'Released (CoC Signed)' 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}>
            {enclosureRecord.status}
          </span>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center justify-between animate-fadeIn">
          <span>✓ {downloadSuccess}</span>
          <button onClick={() => setDownloadSuccess(null)} className="text-emerald-600 hover:text-emerald-900 font-bold">✕</button>
        </div>
      )}

      {/* Main Grid: Enclosure Summary on Left, Document Center on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Enclosure Technical Portfolio (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-mono text-blue-600 font-bold uppercase">Enclosure Record</span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">{enclosureRecord.id}</h3>
            </div>
            <button
              onClick={() => setShowLightbox(true)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
              title="Expand enclosure render"
            >
              <Maximize2 size={16} />
            </button>
          </div>

          {/* Enclosure Render Image */}
          <div 
            onClick={() => setShowLightbox(true)}
            className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50 cursor-pointer group relative"
          >
            <img
              src={enclosureRecord.primaryDrawingImage}
              alt="Final Enclosure Model"
              className="w-full h-56 object-contain bg-white p-2 group-hover:scale-[1.02] transition-transform duration-200"
            />
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-xs px-3 py-1 text-xs font-semibold text-slate-800 shadow-md transition-opacity">
                Click to Expand Render & Drawing
              </span>
            </div>
          </div>

          {/* Quick Technical Specs */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Outer Envelope</span>
              <span className="font-mono font-bold text-slate-900">
                {enclosureRecord.height} × {enclosureRecord.width} × {enclosureRecord.depth} mm
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Material Specification</span>
              <span className="font-medium text-slate-800">{enclosureRecord.material} ({enclosureRecord.thickness}mm)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Surface Finish & Ingress</span>
              <span className="font-medium text-slate-800">{enclosureRecord.finish} | {enclosureRecord.ipRating}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">CAD Master Model</span>
              <span className="font-mono text-blue-700">{enclosureRecord.cadModelRef}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Total Commercial Estimation</span>
              <span className="font-mono font-bold text-emerald-700">₹ {grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Final Release Action Button */}
          <div className="pt-2">
            {enclosureRecord.status === 'Released (CoC Signed)' ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold">Enclosure Certified & Released</div>
                  <div className="text-[11px] text-emerald-700">Digital CoC certificate signed by {enclosureRecord.qaInspectorName}.</div>
                </div>
              </div>
            ) : (
              <button
                onClick={handleSimulateRelease}
                disabled={!allGatesPassed}
                className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
                  allGatesPassed 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <ShieldCheck size={15} /> 
                {allGatesPassed ? 'Authorize Release & Sign CoC Certificate' : 'Requires All 6 QA Gates Passed'}
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Download Centre (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Client-Side Document Generator Centre</h3>
            <p className="text-xs text-slate-500">Real, downloadable engineering files generated directly from the current enclosure parameters</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Card 1: Quotation */}
            <div className="p-4 rounded-lg border border-slate-200 hover:border-blue-300 transition-all bg-slate-50/50 space-y-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="p-1.5 bg-blue-100 text-blue-700 rounded-md">
                    <FileText size={16} />
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">HTML / Print</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-2">Commercial Quotation</h4>
                <p className="text-[11px] text-slate-500">
                  Itemized pricing covering components (₹{compTotal.toLocaleString()}), raw steel (₹{rawMaterialCost.toLocaleString()}), and fabrication labor.
                </p>
              </div>
              <button
                onClick={() => handleDownload('quotation-html')}
                className="w-full py-1.5 px-3 bg-white hover:bg-blue-50 text-blue-700 border border-slate-200 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download size={13} /> Download Quotation
              </button>
            </div>

            {/* Card 2: Bill of Materials */}
            <div className="p-4 rounded-lg border border-slate-200 hover:border-blue-300 transition-all bg-slate-50/50 space-y-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="p-1.5 bg-emerald-100 text-emerald-700 rounded-md">
                    <FileSpreadsheet size={16} />
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">CSV Spreadsheet</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-2">Bill of Materials (BOM)</h4>
                <p className="text-[11px] text-slate-500">
                  Multi-tier structured CSV containing verified component models, mounting brackets, and raw steel gauge specifications.
                </p>
              </div>
              <button
                onClick={() => handleDownload('bom-csv')}
                className="w-full py-1.5 px-3 bg-white hover:bg-emerald-50 text-emerald-700 border border-slate-200 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download size={13} /> Download BOM (.csv)
              </button>
            </div>

            {/* Card 3: Laser Nesting Layout */}
            <div className="p-4 rounded-lg border border-slate-200 hover:border-blue-300 transition-all bg-slate-50/50 space-y-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="p-1.5 bg-sky-100 text-sky-700 rounded-md">
                    <Layers size={16} />
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Vector SVG</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-2">Laser Nesting Schematic</h4>
                <p className="text-[11px] text-slate-500">
                  2500 × 1250 mm sheet layout preview showing chassis, door, and gland plate positioning (84.7% utilization).
                </p>
              </div>
              <button
                onClick={() => handleDownload('nesting-svg')}
                className="w-full py-1.5 px-3 bg-white hover:bg-sky-50 text-sky-700 border border-slate-200 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download size={13} /> Download Nesting (.svg)
              </button>
            </div>

            {/* Card 4: Assembly Exploded View */}
            <div className="p-4 rounded-lg border border-slate-200 hover:border-blue-300 transition-all bg-slate-50/50 space-y-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="p-1.5 bg-indigo-100 text-indigo-700 rounded-md">
                    <Layers size={16} />
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Vector SVG</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-2">Exploded Assembly View</h4>
                <p className="text-[11px] text-slate-500">
                  Schematic CAD diagram showing chassis, rear equipment sub-plate, front door, polyurethane seal, and gland plates.
                </p>
              </div>
              <button
                onClick={() => handleDownload('assembly-svg')}
                className="w-full py-1.5 px-3 bg-white hover:bg-indigo-50 text-indigo-700 border border-slate-200 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download size={13} /> Download Assembly (.svg)
              </button>
            </div>

            {/* Card 5: Manufacturing Workflow Diagram */}
            <div className="p-4 rounded-lg border border-slate-200 hover:border-blue-300 transition-all bg-slate-50/50 space-y-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="p-1.5 bg-amber-100 text-amber-700 rounded-md">
                    <Workflow size={16} />
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Vector SVG</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-2">14-Process Workflow Diagram</h4>
                <p className="text-[11px] text-slate-500">
                  Visual roadmap linking CAD optimization (P01-P07), physical fabrication (P08-P09), and metrology QA (P12-P14).
                </p>
              </div>
              <button
                onClick={() => handleDownload('workflow-svg')}
                className="w-full py-1.5 px-3 bg-white hover:bg-amber-50 text-amber-700 border border-slate-200 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download size={13} /> Download Workflow (.svg)
              </button>
            </div>

            {/* Card 6: Quality Report & CoC */}
            <div className="p-4 rounded-lg border border-slate-200 hover:border-blue-300 transition-all bg-slate-50/50 space-y-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="p-1.5 bg-emerald-100 text-emerald-700 rounded-md">
                    <ShieldCheck size={16} />
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Printable HTML</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-2">Certificate of Conformance</h4>
                <p className="text-[11px] text-slate-500">
                  Formal inspection audit certificate covering all 6 mandatory QA gates (dimensions, coating, grounding, and BOM).
                </p>
              </div>
              <button
                onClick={() => handleDownload('quality-html')}
                className="w-full py-1.5 px-3 bg-white hover:bg-emerald-50 text-emerald-700 border border-slate-200 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download size={13} /> Download CoC Report
              </button>
            </div>
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
                High-Resolution Engineering Render & Drawings: {enclosureRecord.id}
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
