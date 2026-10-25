---
type: "Screen Documentation"
title: "Final Enclosure Document Centre"
status: "documented"
screenIndex: 8
tabId: "final-docs"
component: "FinalDocsSection.tsx"
tags:
  - sheetfab-aiot
  - screen-documentation
  - document-centre
  - deliverables
  - file-downloads
---

# Screen Documentation — 8. Final Enclosure & Document Centre

## 🎯 Purpose
The **Final Enclosure & Document Centre** is the authoritative engineering deliverable distribution hub. It presents the finalized 3D enclosure assembly view, hosts the live engineering deliverables (commercial quotation, BOM, nesting DXF, assembly graphic, workflow diagram, and CoC), performs real-time data consistency audits, and provides in-browser document previews.

---

## 📸 Screen Captures

### 1. Document Centre Overview & Deliverable Cards
![Final Enclosure Document Centre](../assets/screenshots/08-final-enclosure-document-centre.png)

### 2. In-Browser Document Preview Modal (Commercial Quotation HTML)
![Document Preview Modal](../assets/screenshots/08-document-preview-modal.png)

---

## 🧭 Navigation & Access
- **Sidebar Label**: `8. Final Enclosure & Docs`
- **Internal Tab ID**: `'final-docs'`
- **Alternative Access**: Via `Review Document Centre` button on the Project Overview screen.

---

## 📐 Layout & UI Structure

The screen is structured in a two-column layout:

### 1. Left Column: Enclosure Engineering Record & Assembly Preview
- **Main Enclosure Preview**: Renders the high-resolution exploded assembly drawing (`Electrical Control Enclosure Engineering Infographic.png`) as the central hero visual.
- **Enclosure Specification Summary**:
  - Footprint: `600 (H) × 500 (W) × 250 (D) mm`.
  - Material: `IS 513 CRCA Grade D (1.5 mm)`.
  - Gasket & Protection: Continuous polyurethane foam gasket, IP66 rating.
  - Finish: RAL 7035 Powder Coat ($70 \ \mu\text{m}$ thickness).
- **Quality Release Sign-off State**:
  - Clearly flags: **Release Status: Inspection Pending (Awaiting Metrology Approval)**.
  - Ensures engineering honesty by refraining from inventing simulated quality inspector signatures or false completion timestamps.

### 2. Data Consistency & Specification Audit Panel
A dedicated engineering callout comparing drawing, quotation, and project parameters:
- **Commercial Total**: Aligned to **₹62,983.00** matching `Quotation_AIOT_Sheet_Metal_Enclosure.html` for a batch of 5 enclosures (Subtotal: ₹53,375.00 + 18% GST ₹9,608.00).
- **Dimensional Alignment**: Confirms that 3D CAD models, nesting DXF patterns, and quotation line items all refer to the unified $600 \times 500 \times 250 \text{ mm}$ enclosure shell.

### 3. Right Column: 6 Verified Engineering Deliverable Cards
All 6 cards map to actual files in `public/report/`:

| Card Title | Target Filename | Format | Card Features & Description |
|---|---|---|---|
| **Commercial Quotation** | `Quotation_AIOT_Sheet_Metal_Enclosure.html` | HTML | Approved commercial offer including itemized sheet metal fabrication, hardware, and GST breakdown. Features **Preview** and **Download**. |
| **Bill of Materials (BOM)** | `BOM_AIOT_Sheet_Metal_Enclosure.pdf` | PDF | Comprehensive 14-item schedule including structural components, DIN rails, MCCB, SMPS, and wire ducts. Features **Download** and **Open in Tab**. |
| **Laser-Cutting Layout** | `Laser_Cutting_Layout_Provisional.dxf` | DXF | 2D CAD nesting geometry for $2500 \times 1250 \text{ mm}$ sheet stock, lead-in piercing paths, and bend relief notches. Features **Download DXF**. |
| **Exploded Assembly View** | `Electrical Control Enclosure Engineering Infographic.png` | PNG | High-resolution engineering graphic showing internal backplate, DIN rail mounting, and door grounding strap. Features **Preview** and **Download**. |
| **14-Process Workflow Diagram** | `AIoT_14_Process_Workflow_Diagram.pdf` | PDF | Complete engineering flowchart detailing P01–P14 across manufacturing, digital AIoT, and metrology. Features **Download** and **Open in Tab**. |
| **Certificate of Conformance (CoC)** | `Certificate_of_Conformance_AIOT_Enclosure_Demo.pdf` | PDF | Formatted quality compliance certificate statused as *Pending Final Metrology Sign-Off*. Features **Download**. |

---

## 🖱️ User Interactions & State Flow
- **Clicking "Preview" on HTML / Image / PDF Cards**: Opens the responsive in-app modal (`Document Preview Modal`).
  - HTML documents render inside an interactive `<iframe>`.
  - PNG graphics render with native zoom and pan capability.
  - PDFs provide an immediate `Open PDF in Dedicated Tab` fallback.
- **Clicking "Download"**: Directly triggers native HTML5 file download using the actual file served from `/report/<filename>`.
- **Closing Modal**: Clicking the `Close` button or modal backdrop dismisses the preview viewer.

---

## 📊 Data Sources & Boundary Notes
- **File Integrity**: All links point to real, verified files in `web-ui/public/report/`. No 404 broken links or mock placeholder alerts exist.
- **Compliance**: The Certificate of Conformance is explicitly marked as awaiting metrology approval rather than falsely claiming a finished physical QA sign-off.

---

## 🔗 Related Pages
- [[Screen Documentation/Project Overview|1. Project Overview]]
- [[Engineering Deliverables/Quotation|Commercial Quotation Deliverable]]
- [[Engineering Deliverables/Bill of Materials|Bill of Materials Deliverable]]
- [[User Workflows/Engineering Document Download Workflow|Engineering Document Download Workflow]]
