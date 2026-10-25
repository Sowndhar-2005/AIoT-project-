import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  Maximize2,
  FileCheck,
  ShieldCheck,
  FileSpreadsheet,
  Workflow,
  Eye,
  ExternalLink
} from 'lucide-react';
import { EnclosureRecord } from '../data/projectData';

interface FinalDocsSectionProps {
  enclosureRecord: EnclosureRecord;
  onUpdateRecord: (updated: Partial<EnclosureRecord>) => void;
}

interface EngineeringDeliverable {
  id: string;
  title: string;
  filename: string;
  format: 'PDF' | 'HTML' | 'DXF' | 'PNG';
  sizeFormatted: string;
  publicPath: string;
  previewUrl?: string;
  description: string;
  isAvailable: boolean;
  statusBadge: string;
}

export const FinalDocsSection: React.FC<FinalDocsSectionProps> = ({
  enclosureRecord,
  onUpdateRecord,
}) => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<EngineeringDeliverable | null>(null);

  // Map to the actual physical deliverables present in D:\Study\IOT Design and Deployment\iot project\web-ui\report
  const deliverables: EngineeringDeliverable[] = [
    {
      id: 'doc-quotation',
      title: 'Commercial Quotation (Approved Parameters)',
      filename: 'Quotation_AIOT_Sheet_Metal_Enclosure.html',
      format: 'HTML',
      sizeFormatted: '8.3 KB',
      publicPath: '/report/Quotation_AIOT_Sheet_Metal_Enclosure.html',
      previewUrl: '/report/Quotation_AIOT_Sheet_Metal_Enclosure.html',
      description: 'Approved commercial quotation ORD-9410-IN itemizing 6 component lines (MCCBs, MCBs, SMPS, Contactors), CRCA steel shell, fabrication tariffs, GST 18%, and total of ₹62,983.',
      isAvailable: true,
      statusBadge: 'Approved Deliverable'
    },
    {
      id: 'doc-bom',
      title: 'Engineering Bill of Materials (BOM)',
      filename: 'BOM_AIOT_Sheet_Metal_Enclosure.pdf',
      format: 'PDF',
      sizeFormatted: '5.9 KB',
      publicPath: '/report/BOM_AIOT_Sheet_Metal_Enclosure.pdf',
      previewUrl: '/report/BOM_AIOT_Sheet_Metal_Enclosure.pdf',
      description: 'Formal multi-tier BOM containing part identifiers, catalog descriptions, materials, and batch quantities for 5 enclosure units.',
      isAvailable: true,
      statusBadge: 'Approved Deliverable'
    },
    {
      id: 'doc-laser-layout',
      title: 'Provisional Laser-Cutting Nesting Layout',
      filename: 'Laser_Cutting_Layout_Provisional.dxf',
      format: 'DXF',
      sizeFormatted: '2.5 KB',
      publicPath: '/report/Laser_Cutting_Layout_Provisional.dxf',
      description: 'Provisional DXF geometry with sheet boundary and component flat outlines. Marked as provisional for CAD review before machine cutting.',
      isAvailable: true,
      statusBadge: 'Provisional Layout'
    },
    {
      id: 'doc-assembly',
      title: 'Exploded Assembly & Engineering Infographic',
      filename: 'Electrical Control Enclosure Engineering Infographic.png',
      format: 'PNG',
      sizeFormatted: '2.1 MB',
      publicPath: '/report/Electrical Control Enclosure Engineering Infographic.png',
      previewUrl: '/report/Electrical Control Enclosure Engineering Infographic.png',
      description: 'High-resolution engineering infographic showing exploded structural relationships: chassis body, gasketed door, mounting flanges, and DIN sub-plate.',
      isAvailable: true,
      statusBadge: 'Visual Reference'
    },
    {
      id: 'doc-workflow',
      title: 'AIoT 14-Process Workflow Architecture',
      filename: 'AIoT_14_Process_Workflow_Diagram.pdf',
      format: 'PDF',
      sizeFormatted: '30.5 KB',
      publicPath: '/report/AIoT_14_Process_Workflow_Diagram.pdf',
      previewUrl: '/report/AIoT_14_Process_Workflow_Diagram.pdf',
      description: 'System flow diagram illustrating the handoffs between customer requirements, CAD optimization, physical fabrication, and optical metrology inspection.',
      isAvailable: true,
      statusBadge: 'Approved Architecture'
    },
    {
      id: 'doc-coc',
      title: 'Certificate of Conformance (Awaiting Physical Inspection)',
      filename: 'Certificate_of_Conformance_AIOT_Enclosure_Demo.pdf',
      format: 'PDF',
      sizeFormatted: '5.3 KB',
      publicPath: '/report/Certificate_of_Conformance_AIOT_Enclosure_Demo.pdf',
      previewUrl: '/report/Certificate_of_Conformance_AIOT_Enclosure_Demo.pdf',
      description: 'Draft Certificate of Conformance detailing the 6 mandatory quality gates (dimensions, deburring, powder DFT 60-80µm, door seal, earth bonding <0.1Ω).',
      isAvailable: true,
      statusBadge: 'Inspection Pending'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Context */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 mb-1">
            <FileCheck className="w-4 h-4 text-blue-600" />
            <span>Process 14: Engineering Deliverables & Document Centre</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Enclosure Release Records & Engineering Documents</h2>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Verified engineering deliverables located in the project repository (<code className="font-mono text-slate-700 bg-slate-100 px-1 py-0.5 rounded">web-ui/report</code>). 
            Review technical documentation, download approved files, and audit parameter consistency.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="px-3 py-1 rounded text-xs font-semibold border bg-slate-100 text-slate-700 border-slate-200">
            6 Documents Integrated
          </span>
        </div>
      </div>

      {/* Main Grid: Enclosure Record on Left (5 Cols), Document Center on Right (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Enclosure Technical Portfolio & Discrepancy Audit */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-mono text-blue-600 font-bold uppercase">Enclosure Record</span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">{enclosureRecord.id}</h3>
            </div>
            <button
              onClick={() => setShowLightbox(true)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
              title="Expand enclosure technical drawing"
            >
              <Maximize2 size={16} />
            </button>
          </div>

          {/* Enclosure Technical Reference Image */}
          <div 
            onClick={() => setShowLightbox(true)}
            className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50 cursor-pointer group relative"
          >
            <img
              src="/assets/images/cad/enclosure-drawing-render.png"
              alt="Enclosure Orthographic Drawing and 3D Render"
              className="w-full h-56 object-contain bg-white p-2 group-hover:scale-[1.02] transition-transform duration-200"
            />
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-xs px-3 py-1 text-xs font-semibold text-slate-800 shadow-md transition-opacity">
                Click to Expand Reference Drawing
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
              <span className="font-medium text-slate-800">{enclosureRecord.material}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Sheet Gauge & Finish</span>
              <span className="font-medium text-slate-800">{enclosureRecord.thickness} mm | {enclosureRecord.finish}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Quoted Total Commercial Value</span>
              <span className="font-mono font-bold text-blue-700">₹62,983.00 (Incl. 18% GST)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Quality Release State</span>
              <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Awaiting Physical Inspection
              </span>
            </div>
          </div>

          {/* Data Consistency & Discrepancy Audit Box */}
          <div className="p-3.5 bg-amber-50/80 rounded-lg border border-amber-200 text-xs space-y-1.5 text-amber-900">
            <div className="font-bold flex items-center gap-1.5 text-amber-800">
              <AlertTriangle size={14} className="text-amber-600 shrink-0" />
              <span>Specification Audit Notice</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-800">
              The approved commercial quotation (<code className="font-mono">ORD-9410-IN</code>) and BOM specify a 5-unit batch with total value <strong>₹62,983.00</strong>. 
              The supplied orthographic drawing shows modular gland-plate cutouts and external mounting flanges. 
              Always review the exact dimensional callouts on the drawing sheet before shop-floor cutting.
            </p>
          </div>
        </div>

        {/* Right Column: Integrated Real Deliverable Document Centre (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Approved Engineering Deliverables Directory</h3>
            <p className="text-xs text-slate-500">Directly linked to files in <code className="font-mono text-slate-700 bg-slate-100 px-1 py-0.5 rounded">web-ui/report</code></p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {deliverables.map((doc) => (
              <div 
                key={doc.id}
                className="p-4 rounded-lg border border-slate-200 hover:border-blue-300 transition-all bg-slate-50/50 space-y-2.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-white border border-slate-200 text-slate-700">
                      {doc.format} • {doc.sizeFormatted}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                      doc.statusBadge === 'Approved Deliverable' || doc.statusBadge === 'Approved Architecture'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {doc.statusBadge}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 mt-2">{doc.title}</h4>
                  <div className="font-mono text-[10px] text-slate-400 truncate mt-0.5">{doc.filename}</div>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-3 leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center gap-2">
                  <a
                    href={doc.publicPath}
                    download={doc.filename}
                    className="flex-1 py-1.5 px-3 bg-white hover:bg-blue-50 text-blue-700 border border-slate-200 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Download size={13} /> Download
                  </a>
                  {doc.previewUrl && (
                    <button
                      onClick={() => setPreviewDocument(doc)}
                      className="py-1.5 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold flex items-center gap-1"
                      title="Preview document in browser"
                    >
                      <Eye size={13} /> Preview
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Document In-App Preview Modal */}
      {previewDocument && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
          onClick={() => setPreviewDocument(null)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-5xl w-full h-[85vh] flex flex-col p-4 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600">{previewDocument.filename}</span>
                <h4 className="text-sm font-bold text-slate-900">{previewDocument.title}</h4>
              </div>
              <div className="flex items-center gap-2">
                <a 
                  href={previewDocument.publicPath} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded flex items-center gap-1"
                >
                  <ExternalLink size={12} /> Open in New Tab
                </a>
                <button 
                  onClick={() => setPreviewDocument(null)}
                  className="text-slate-400 hover:text-slate-700 text-sm font-bold px-2 py-1 rounded hover:bg-slate-100"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            <div className="flex-1 w-full bg-slate-100 rounded border border-slate-200 overflow-hidden">
              {previewDocument.format === 'PNG' ? (
                <div className="w-full h-full flex items-center justify-center p-4 overflow-auto">
                  <img src={previewDocument.publicPath} alt={previewDocument.title} className="max-w-full max-h-full object-contain" />
                </div>
              ) : (
                <iframe 
                  src={previewDocument.publicPath} 
                  title={previewDocument.title} 
                  className="w-full h-full border-0"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Drawing */}
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
                src="/assets/images/cad/enclosure-drawing-render.png" 
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
