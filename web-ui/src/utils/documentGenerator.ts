// Client-side file generator utility for AIoT Sheet-Metal Fabrication Platform
import { EnclosureRecord, SAMPLE_COMPONENTS } from '../data/projectData';

/**
 * Trigger client-side browser file download from Blob
 */
export function triggerFileDownload(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/**
 * 1. Bill of Materials (BOM) CSV Generator
 */
export function generateBOMCSV(record: EnclosureRecord): string {
  const header = ["Item No", "Part ID", "Description", "Category", "Dimensions / Rating", "Mounting", "Qty", "Unit Price (INR)", "Total Price (INR)"];
  
  const selectedComps = SAMPLE_COMPONENTS.filter(c => record.selectedComponentIds.includes(c.id));
  
  const rows = selectedComps.map((comp, idx) => [
    idx + 1,
    `"${comp.id}"`,
    `"${comp.name}"`,
    `"${comp.category}"`,
    `"${comp.dimensions}"`,
    `"${comp.mounting}"`,
    record.quantity,
    comp.unitCost,
    comp.unitCost * record.quantity
  ]);

  // Add raw sheet metal and fabrication labor rows
  const steelWeightEst = Math.round((2 * (record.height * record.width + record.height * record.depth + record.width * record.depth) / 1e6) * record.thickness * 7.85 * 10) / 10;
  const rawMaterialCost = Math.round(steelWeightEst * record.materialCostPerKg * record.quantity);
  const fabricationLaborCost = Math.round((record.laserCutTimeMinutes / 60) * record.laborRatePerHour * record.quantity + (record.bendCyclesCount * 25 * record.quantity));

  rows.push([
    selectedComps.length + 1,
    `"RAW-CRCA-${record.thickness}MM"`,
    `"Raw Sheet Metal (${record.material}, ~${steelWeightEst} kg/unit)"`,
    `"Raw Material"`,
    `"${record.thickness} mm Gauge"`,
    `"Sheet Blank"`,
    record.quantity,
    Math.round(steelWeightEst * record.materialCostPerKg),
    rawMaterialCost
  ]);

  rows.push([
    selectedComps.length + 2,
    `"SRV-FAB-LASER-BEND"`,
    `"Laser Cutting (${record.laserCutTimeMinutes} min), CNC Bending (${record.bendCyclesCount} bends), Powder Coat (${record.finish})"`,
    `"Manufacturing Services"`,
    `"RAL 7035 60-80um"`,
    `"Chassis Fab"`,
    record.quantity,
    Math.round(fabricationLaborCost / record.quantity),
    fabricationLaborCost
  ]);

  const csvContent = [
    `# AIoT Sheet-Metal Fabrication Platform - Bill of Materials (BOM)`,
    `# Enclosure Ref: ${record.id} | Order No: ${record.orderNumber}`,
    `# Customer: ${record.customerName}`,
    `# Generated: ${new Date().toISOString()}`,
    ``,
    header.join(','),
    ...rows.map(r => r.join(','))
  ].join('\n');

  return csvContent;
}

/**
 * 2. Commercial Quotation HTML Generator (Print-Ready)
 */
export function generateQuotationHTML(record: EnclosureRecord): string {
  const selectedComps = SAMPLE_COMPONENTS.filter(c => record.selectedComponentIds.includes(c.id));
  const compTotal = selectedComps.reduce((acc, c) => acc + (c.unitCost * record.quantity), 0);
  
  const steelWeightEst = Math.round((2 * (record.height * record.width + record.height * record.depth + record.width * record.depth) / 1e6) * record.thickness * 7.85 * 10) / 10;
  const rawMaterialCost = Math.round(steelWeightEst * record.materialCostPerKg * record.quantity);
  const fabricationLaborCost = Math.round((record.laserCutTimeMinutes / 60) * record.laborRatePerHour * record.quantity + (record.bendCyclesCount * 25 * record.quantity));
  
  const subtotal = compTotal + rawMaterialCost + fabricationLaborCost;
  const tax = Math.round(subtotal * (record.taxPercent / 100));
  const grandTotal = subtotal + tax;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Quotation - ${record.id}</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; margin: 40px; font-size: 13px; line-height: 1.5; }
    .header { display: flex; justify-content: space-between; border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 25px; }
    .title { font-size: 24px; font-weight: bold; color: #1e3a8a; }
    .sub { color: #64748b; font-size: 12px; margin-top: 4px; }
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px; background: #f8fafc; padding: 15px; border-radius: 6px; }
    .meta-title { font-weight: bold; color: #0f172a; margin-bottom: 6px; text-transform: uppercase; font-size: 11px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
    th { background: #f1f5f9; color: #475569; text-align: left; padding: 10px; font-size: 11px; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; }
    td { padding: 10px; border-bottom: 1px solid #e2e8f0; }
    .text-right { text-align: right; }
    .totals-table { width: 320px; margin-left: auto; margin-bottom: 30px; }
    .totals-table td { padding: 6px 10px; }
    .total-bold { font-weight: bold; font-size: 16px; color: #1d4ed8; border-top: 2px solid #2563eb; }
    .disclaimer { border-left: 3px solid #f59e0b; padding-left: 12px; color: #b45309; background: #fffbeb; padding: 10px; font-size: 11px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="title">COMMERCIAL QUOTATION</div>
      <div class="sub">AIoT-Based Smart Sheet-Metal Panel Fabrication System</div>
      <div class="sub">ISO 9001:2015 Compliant Engineering Workflow</div>
    </div>
    <div style="text-align: right;">
      <div style="font-weight: bold; font-size: 15px; color: #0f172a;">${record.orderNumber}</div>
      <div class="sub">Ref: ${record.id}</div>
      <div class="sub">Date: ${new Date().toLocaleDateString()}</div>
      <div class="sub">Validity: 30 Days</div>
    </div>
  </div>

  <div class="meta-grid">
    <div>
      <div class="meta-title">Customer / Client Information</div>
      <div><strong>${record.customerName}</strong></div>
      <div>Project: ${record.projectTitle}</div>
      <div>Notes: ${record.customerNotes}</div>
    </div>
    <div>
      <div class="meta-title">Enclosure Technical Parameters</div>
      <div>Dimensions: <strong>${record.height}H × ${record.width}W × ${record.depth}D mm</strong></div>
      <div>Material: ${record.material} (${record.thickness} mm)</div>
      <div>Rating & Finish: ${record.ipRating} | ${record.finish}</div>
      <div>Mounting: ${record.mountingType}</div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Item & Description</th>
        <th>Classification</th>
        <th>Qty</th>
        <th class="text-right">Unit Rate (INR)</th>
        <th class="text-right">Amount (INR)</th>
      </tr>
    </thead>
    <tbody>
      ${selectedComps.map((c, i) => `
        <tr>
          <td>${i + 1}</td>
          <td><strong>${c.name}</strong><br><small style="color: #64748b;">${c.id} | ${c.dimensions}</small></td>
          <td>${c.category}</td>
          <td>${record.quantity}</td>
          <td class="text-right">₹ ${c.unitCost.toLocaleString()}</td>
          <td class="text-right">₹ ${(c.unitCost * record.quantity).toLocaleString()}</td>
        </tr>
      `).join('')}
      <tr>
        <td>${selectedComps.length + 1}</td>
        <td><strong>Raw Sheet Metal Enclosure Shell</strong><br><small style="color: #64748b;">${record.material} (${record.thickness}mm), ~${steelWeightEst} kg/unit</small></td>
        <td>Raw Material</td>
        <td>${record.quantity}</td>
        <td class="text-right">₹ ${Math.round(steelWeightEst * record.materialCostPerKg).toLocaleString()}</td>
        <td class="text-right">₹ ${rawMaterialCost.toLocaleString()}</td>
      </tr>
      <tr>
        <td>${selectedComps.length + 2}</td>
        <td><strong>Fabrication & Finishing Services</strong><br><small style="color: #64748b;">Laser cutting (${record.laserCutTimeMinutes} min), CNC Press-brake (${record.bendCyclesCount} bends), Powder coating</small></td>
        <td>Manufacturing</td>
        <td>${record.quantity}</td>
        <td class="text-right">₹ ${Math.round(fabricationLaborCost / record.quantity).toLocaleString()}</td>
        <td class="text-right">₹ ${fabricationLaborCost.toLocaleString()}</td>
      </tr>
    </tbody>
  </table>

  <table class="totals-table">
    <tr>
      <td>Subtotal:</td>
      <td class="text-right">₹ ${subtotal.toLocaleString()}</td>
    </tr>
    <tr>
      <td>GST (${record.taxPercent}%):</td>
      <td class="text-right">₹ ${tax.toLocaleString()}</td>
    </tr>
    <tr class="total-bold">
      <td>Total Quotation:</td>
      <td class="text-right">₹ ${grandTotal.toLocaleString()}</td>
    </tr>
  </table>

  <div class="disclaimer">
    <strong>Demo Notice:</strong> This quotation document was generated client-side by the AIoT Fabrication System frontend prototype. 
    Prices, lead times, and fabrication tariffs reflect local project reference parameters and are intended for technical design review.
  </div>
</body>
</html>`;
}

/**
 * 3. Schematic Nesting Layout SVG Generator
 */
export function generateNestingSVG(record: EnclosureRecord): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" width="100%" height="100%" style="background-color: #0f172a; font-family: monospace;">
  <!-- Sheet Boundary 2500x1250 scaled to 1000x500 -->
  <rect x="10" y="10" width="980" height="480" fill="#1e293b" stroke="#38bdf8" stroke-width="2" stroke-dasharray="6,4"/>
  
  <text x="25" y="35" fill="#38bdf8" font-size="14" font-weight="bold">AIoT NESTING SCHEMATIC - 2500 x 1250 x ${record.thickness} mm CRCA</text>
  <text x="25" y="55" fill="#94a3b8" font-size="11">Job Ref: ${record.id} | Utilization: ${record.sheetUtilizationPercent}% | Pierce Sequence: 42 Pierces</text>

  <!-- Part 1: Main Enclosure Chassis Body Flat Pattern -->
  <rect x="30" y="80" width="460" height="380" fill="#0284c7" fill-opacity="0.25" stroke="#38bdf8" stroke-width="2"/>
  <text x="180" y="270" fill="#e0f2fe" font-size="12" font-weight="bold">ENC CHASSIS BODY (${record.height}x${record.width})</text>
  <!-- Bend Lines -->
  <line x1="110" y1="80" x2="110" y2="460" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,2"/>
  <line x1="410" y1="80" x2="410" y2="460" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,2"/>
  <line x1="30" y1="160" x2="490" y2="160" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,2"/>
  <line x1="30" y1="380" x2="490" y2="380" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,2"/>

  <!-- Part 2: Front Door Panel -->
  <rect x="510" y="80" width="280" height="380" fill="#0284c7" fill-opacity="0.25" stroke="#38bdf8" stroke-width="2"/>
  <text x="580" y="270" fill="#e0f2fe" font-size="12" font-weight="bold">DOOR PANEL</text>
  <!-- Lock Cutout -->
  <circle cx="750" cy="270" r="11" fill="#0f172a" stroke="#ef4444" stroke-width="1.5"/>

  <!-- Part 3: Gland Plates & Mounting Brackets in Remnant Gaps -->
  <rect x="810" y="80" width="160" height="90" fill="#10b981" fill-opacity="0.25" stroke="#34d399" stroke-width="1.5"/>
  <text x="830" y="130" fill="#a7f3d0" font-size="10">TOP GLAND PLATE</text>

  <rect x="810" y="185" width="160" height="90" fill="#10b981" fill-opacity="0.25" stroke="#34d399" stroke-width="1.5"/>
  <text x="825" y="235" fill="#a7f3d0" font-size="10">BOTTOM GLAND PLATE</text>

  <rect x="810" y="290" width="75" height="170" fill="#6366f1" fill-opacity="0.25" stroke="#818cf8" stroke-width="1.5"/>
  <text x="820" y="380" fill="#c7d2fe" font-size="10">BRACKETS</text>

  <rect x="895" y="290" width="75" height="170" fill="#6366f1" fill-opacity="0.25" stroke="#818cf8" stroke-width="1.5"/>
  <text x="905" y="380" fill="#c7d2fe" font-size="10">HINGES</text>

  <!-- Legend -->
  <text x="25" y="480" fill="#94a3b8" font-size="10">YELLOW DASHED = CNC Press Brake Bends (BA: 2.68mm) | BLUE SOLID = Fiber Laser Cut Perimeter | GREEN/PURPLE = Remnant Fillers</text>
</svg>`;
}

/**
 * 4. Assembly Diagram SVG Generator
 */
export function generateAssemblySVG(record: EnclosureRecord): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%" style="background-color: #ffffff; font-family: 'Segoe UI', Arial, sans-serif;">
  <rect width="800" height="600" fill="#f8fafc"/>
  
  <text x="40" y="45" fill="#0f172a" font-size="18" font-weight="bold">AIoT ENCLOSURE EXPLODED ASSEMBLY DIAGRAM</text>
  <text x="40" y="68" fill="#64748b" font-size="12">Specification: ${record.height}H x ${record.width}W x ${record.depth}D mm | Assembly Ref: ${record.id}</text>
  
  <!-- Outer Chassis Box -->
  <polygon points="180,200 480,200 550,270 250,270" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
  <polygon points="180,200 250,270 250,500 180,430" fill="#cbd5e1" stroke="#1e293b" stroke-width="2"/>
  <polygon points="250,270 550,270 550,500 250,500" fill="#f1f5f9" stroke="#1e293b" stroke-width="2"/>
  <text x="360" y="390" fill="#475569" font-size="13" font-weight="bold">ENCLOSURE CHASSIS BODY</text>

  <!-- Internal Sub-Plate (Exploded Backward) -->
  <polygon points="270,290 530,290 530,480 270,480" fill="#93c5fd" fill-opacity="0.3" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="340" y="340" fill="#1d4ed8" font-size="11" font-weight="bold">EQUIPMENT SUB-PLATE</text>

  <!-- Door Panel (Exploded Forward Left) -->
  <polygon points="80,250 180,250 180,480 80,480" fill="#bae6fd" fill-opacity="0.5" stroke="#0284c7" stroke-width="2"/>
  <text x="95" y="370" fill="#0369a1" font-size="11" font-weight="bold" transform="rotate(-90 95 370)">DOOR WITH GASKET</text>

  <!-- Gland Plates -->
  <polygon points="340,170 440,170 460,190 360,190" fill="#fed7aa" stroke="#ea580c" stroke-width="1.5"/>
  <text x="350" y="160" fill="#c2410c" font-size="10">TOP GLAND PLATE</text>

  <!-- Callouts -->
  <line x1="550" y1="380" x2="680" y2="350" stroke="#64748b" stroke-width="1.5"/>
  <circle cx="550" cy="380" r="3" fill="#64748b"/>
  <text x="690" y="355" fill="#334155" font-size="11">Quarter-turn cam lock</text>

  <line x1="250" y1="460" x2="310" y2="540" stroke="#64748b" stroke-width="1.5"/>
  <circle cx="250" cy="460" r="3" fill="#64748b"/>
  <text x="315" y="555" fill="#334155" font-size="11">M6 Copper Earth Stud</text>

  <!-- Footer metadata -->
  <rect x="40" y="540" width="720" height="40" fill="#ffffff" stroke="#cbd5e1" rx="4"/>
  <text x="55" y="565" fill="#64748b" font-size="11">CAD Model: ${record.cadModelRef} | Ingress Protection: ${record.ipRating} | Fasteners: Zinc-Plated M5/M6 Hardware</text>
</svg>`;
}

/**
 * 5. Manufacturing Workflow SVG Diagram
 */
export function generateWorkflowSVG(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 450" width="100%" height="100%" style="background-color: #ffffff; font-family: 'Segoe UI', Arial, sans-serif;">
  <rect width="1100" height="450" fill="#f8fafc"/>
  
  <text x="40" y="45" fill="#0f172a" font-size="18" font-weight="bold">AIoT 14-PROCESS MANUFACTURING ENGINEERING FLOW</text>
  <text x="40" y="68" fill="#64748b" font-size="12">End-to-End Closed-Loop Sheet Metal Fabrication, IoT Telemetry and Vision Metrology</text>

  <!-- Phase 1: Digital Engineering -->
  <rect x="40" y="90" width="310" height="320" fill="#eff6ff" stroke="#93c5fd" rx="8"/>
  <text x="60" y="115" fill="#1e40af" font-size="13" font-weight="bold">PHASE 1: DIGITAL CAD & OPTIMIZATION</text>
  <text x="60" y="145" fill="#1e293b" font-size="11">P01: Customer Requirement Collection</text>
  <text x="60" y="175" fill="#1e293b" font-size="11">P02: Component Measurement & Library</text>
  <text x="60" y="205" fill="#1e293b" font-size="11">P03: AI-Assisted Component Arrangement</text>
  <text x="60" y="235" fill="#1e293b" font-size="11">P04: Final 3D Parametric CAD Enclosure</text>
  <text x="60" y="265" fill="#1e293b" font-size="11">P05: Manufacturing Docs, BOM & Quotation</text>
  <text x="60" y="295" fill="#1e293b" font-size="11">P06: Sheet-Metal Flat-Pattern Unfolding</text>
  <text x="60" y="325" fill="#1e293b" font-size="11">P07: Optimized Laser-Cutting Nesting</text>

  <!-- Arrow -->
  <polygon points="360,250 375,240 375,260" fill="#2563eb"/>
  <line x1="350" y1="250" x2="370" y2="250" stroke="#2563eb" stroke-width="2"/>

  <!-- Phase 2: Physical Fabrication -->
  <rect x="385" y="90" width="310" height="320" fill="#f0fdf4" stroke="#86efac" rx="8"/>
  <text x="405" y="115" fill="#166534" font-size="13" font-weight="bold">PHASE 2: SHOP-FLOOR FABRICATION</text>
  <text x="405" y="145" fill="#1e293b" font-size="11">P08: Fiber Laser Cutting & CNC Press-Brake</text>
  <text x="405" y="175" fill="#1e293b" font-size="11">P09: Verification, Powder Coating & Assembly</text>
  <rect x="405" y="210" width="270" height="90" fill="#ffffff" stroke="#cbd5e1" rx="4"/>
  <text x="415" y="235" fill="#0f172a" font-size="11" font-weight="bold">Cross-Cutting AIoT Services:</text>
  <text x="415" y="260" fill="#047857" font-size="11">P10: 6-Layer AIoT Systems Architecture</text>
  <text x="415" y="285" fill="#047857" font-size="11">P11: Shop-Floor Barcode / IoT Job Tracking</text>

  <!-- Arrow -->
  <polygon points="705,250 720,240 720,260" fill="#16a34a"/>
  <line x1="695" y1="250" x2="715" y2="250" stroke="#16a34a" stroke-width="2"/>

  <!-- Phase 3: Metrology QA -->
  <rect x="730" y="90" width="330" height="320" fill="#fef2f2" stroke="#fca5a5" rx="8"/>
  <text x="750" y="115" fill="#991b1b" font-size="13" font-weight="bold">PHASE 3: CLOSED-LOOP METROLOGY QA</text>
  <text x="750" y="145" fill="#1e293b" font-size="11">P12: 20MP Camera Metrology Setup</text>
  <text x="750" y="175" fill="#1e293b" font-size="11">P13: CV Edge Detection & ICP CAD Comparison</text>
  <text x="750" y="205" fill="#1e293b" font-size="11">P14: Final 6 Quality Gates & CoC Release</text>
  
  <rect x="750" y="240" width="290" height="120" fill="#ffffff" stroke="#f87171" rx="4"/>
  <text x="760" y="265" fill="#b91c1c" font-size="11" font-weight="bold">The 6 Mandatory Acceptance Gates:</text>
  <text x="760" y="285" fill="#475569" font-size="10">1. Dimensions (±0.5mm) | 2. Flange Bends</text>
  <text x="760" y="305" fill="#475569" font-size="10">3. Hole Centroids | 4. Powder DFT (60-80µm)</text>
  <text x="760" y="325" fill="#475569" font-size="10">5. Gasket Seal | 6. Earth Continuity (&lt;0.1Ω)</text>
  <text x="760" y="345" fill="#15803d" font-size="10" font-weight="bold">Result: Authorized Digital CoC Certificate</text>
</svg>`;
}

/**
 * 6. Final Quality Inspection Certificate & Report HTML Generator
 */
export function generateQualityReportHTML(record: EnclosureRecord): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Quality Acceptance Report - ${record.id}</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #0f172a; margin: 40px; font-size: 13px; line-height: 1.5; }
    .header { display: flex; justify-content: space-between; border-bottom: 2px solid #059669; padding-bottom: 15px; margin-bottom: 25px; }
    .title { font-size: 22px; font-weight: bold; color: #065f46; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: bold; background: #d1fae5; color: #047857; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 15px; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 25px; }
    th { background: #f1f5f9; text-align: left; padding: 8px 10px; font-size: 11px; color: #475569; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; }
    td { padding: 9px 10px; border-bottom: 1px solid #e2e8f0; font-size: 12px; }
    .pass { color: #059669; font-weight: bold; }
    .sign-box { margin-top: 35px; border-top: 1px solid #cbd5e1; padding-top: 20px; display: flex; justify-content: space-between; }
    .disclaimer { border-left: 3px solid #059669; background: #ecfdf5; padding: 10px; font-size: 11px; color: #065f46; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="title">QUALITY ACCEPTANCE REPORT & CERTIFICATE OF CONFORMANCE</div>
      <div style="color: #64748b; font-size: 12px; margin-top: 4px;">AIoT Smart Sheet-Metal Panel Fabrication System • Process 14 QA Release</div>
    </div>
    <div style="text-align: right;">
      <div class="badge">SIMULATED QA ACCEPTANCE</div>
      <div style="margin-top: 6px; font-size: 11px; color: #64748b;">Inspection Ref: QA-${record.id}</div>
      <div style="font-size: 11px; color: #64748b;">Date: ${record.qaDate}</div>
    </div>
  </div>

  <div class="grid">
    <div class="card">
      <div style="font-weight: bold; font-size: 11px; text-transform: uppercase; color: #475569; margin-bottom: 8px;">Enclosure Under Inspection</div>
      <div>Enclosure ID: <strong>${record.id}</strong></div>
      <div>Customer: ${record.customerName}</div>
      <div>Dimensions: <strong>${record.height}H × ${record.width}W × ${record.depth}D mm</strong></div>
      <div>Material: ${record.material} (${record.thickness} mm)</div>
      <div>CAD Model: ${record.cadModelRef}</div>
    </div>
    <div class="card">
      <div style="font-weight: bold; font-size: 11px; text-transform: uppercase; color: #475569; margin-bottom: 8px;">Metrology Instrumentation</div>
      <div>Optical Camera: Sony IMX264 5.1MP Monochrome</div>
      <div>Lens: 16mm Telecentric (0.0423 mm/pixel scale)</div>
      <div>Coating Gauge: Electromagnetic DFT Meter</div>
      <div>Grounding Tester: 10A Earth Continuity Milliohm Meter</div>
      <div>Inspector: <strong>${record.qaInspectorName}</strong></div>
    </div>
  </div>

  <div style="font-weight: bold; font-size: 14px; margin-bottom: 5px;">The 6 Mandatory Acceptance Gates Audit</div>
  <table>
    <thead>
      <tr>
        <th>Gate #</th>
        <th>Inspection Parameter</th>
        <th>Nominal Standard</th>
        <th>Measured / Observed Value</th>
        <th>Tolerance Window</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>G-01</td>
        <td><strong>Sheet-Metal Blank Dimensions</strong></td>
        <td>${record.height} × ${record.width} mm</td>
        <td>${record.height + 0.18} × ${record.width - 0.11} mm</td>
        <td>± 0.50 mm</td>
        <td class="pass">${record.qaGateChecks.g1_dimensions ? 'PASS' : 'FAIL'}</td>
      </tr>
      <tr>
        <td>G-02</td>
        <td><strong>Flange Bend Height & Angles</strong></td>
        <td>25.0 mm at 90.0°</td>
        <td>25.12 mm at 90.2°</td>
        <td>± 0.30 mm / ± 0.5°</td>
        <td class="pass">${record.qaGateChecks.g2_flangeBends ? 'PASS' : 'FAIL'}</td>
      </tr>
      <tr>
        <td>G-03</td>
        <td><strong>DIN-Rail & Slot Pitch</strong></td>
        <td>120.0 mm Center-to-Center</td>
        <td>119.92 mm Centroid</td>
        <td>± 0.20 mm</td>
        <td class="pass">${record.qaGateChecks.g3_holePositions ? 'PASS' : 'FAIL'}</td>
      </tr>
      <tr>
        <td>G-04</td>
        <td><strong>Powder Coating DFT</strong></td>
        <td>70 µm Pure Polyester</td>
        <td>72.4 µm (Avg of 8 points)</td>
        <td>60 - 80 µm</td>
        <td class="pass">${record.qaGateChecks.g4_powderCoatingDFT ? 'PASS' : 'FAIL'}</td>
      </tr>
      <tr>
        <td>G-05</td>
        <td><strong>Polyurethane Door Gasket</strong></td>
        <td>Continuous seamless foam</td>
        <td>100% Intact / Zero voids</td>
        <td>IP55 Enclosure Standard</td>
        <td class="pass">${record.qaGateChecks.g5_gasketDoorSeal ? 'PASS' : 'FAIL'}</td>
      </tr>
      <tr>
        <td>G-06</td>
        <td><strong>Earth Stud Bond Resistance</strong></td>
        <td>&lt; 0.10 Ω at 10A injected</td>
        <td>0.04 Ω Measured</td>
        <td>Max 0.10 Ω</td>
        <td class="pass">${record.qaGateChecks.g6_earthBonding ? 'PASS' : 'FAIL'}</td>
      </tr>
    </tbody>
  </table>

  <div class="sign-box">
    <div>
      <div>Inspected By:</div>
      <div style="font-weight: bold; margin-top: 15px;">${record.qaInspectorName}</div>
      <div style="color: #64748b; font-size: 11px;">Quality Assurance Metrologist</div>
    </div>
    <div style="text-align: right;">
      <div>Authorized Release:</div>
      <div style="font-weight: bold; margin-top: 15px; color: #059669;">CERTIFIED FOR DISPATCH</div>
      <div style="color: #64748b; font-size: 11px;">Digital Signature Hash: 7b9f84a2e1d03c</div>
    </div>
  </div>

  <div class="disclaimer">
    <strong>Prototype Notice:</strong> This quality inspection report is a frontend engineering simulation generated from local browser state. 
    It demonstrates compliance with ISO 9001 and IEC 61439 quality workflows and does not certify physical manufactured products.
  </div>
</body>
</html>`;
}
