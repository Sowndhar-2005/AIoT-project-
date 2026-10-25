---
type: "Engineering Deliverable"
title: "14 Process Workflow Diagram Deliverable"
status: "verified"
filename: "AIoT_14_Process_Workflow_Diagram.pdf"
format: "PDF"
process: "Overview / P01-P14"
tags:
  - sheetfab-aiot
  - deliverable
  - workflow-diagram
  - process-architecture
---

# Engineering Deliverable: 14-Process Workflow Diagram

## 📄 File Profile
- **Exact Filename**: `AIoT_14_Process_Workflow_Diagram.pdf`
- **Location in Project**: `web-ui/report/AIoT_14_Process_Workflow_Diagram.pdf`
- **Static Web Path**: `/report/AIoT_14_Process_Workflow_Diagram.pdf`
- **File Format**: Adobe Portable Document Format (PDF, Vector Flowchart)
- **Relevant Engineering Process**: **Overall System Architecture & Process Workflow (P01–P14)**

---

## 🎯 Purpose & Scope
This comprehensive architectural drawing diagrams the operational relationships, feedback loops, data interfaces, and quality control gates across all 14 processes in the SheetFab platform. It illustrates how physical fabrication operations (P01–P09) interface with edge IoT hardware (P10–P11) and computer-vision metrology systems (P12–P14).

---

## 📑 Diagram Domain Structure

```text
┌─────────────────────────────────────────────────────────────┐
│ Customer & Engineering Requirements                         │
│ P01: Customer Specs ──► P02: CAD Library ──► P03: AI Layout │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ CAD & Manufacturing Preparation                             │
│ P04: 3D CAD ──► P05: BOM/Quotation ──► P06: Flat Pattern    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Shop Floor Physical Fabrication                             │
│ P07: Laser Nesting ──► P08: Cutting/Bending ──► P09: Coating│
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               ▼ (Machine Signals)            ▼ (Station Scans)
┌──────────────────────────────┐┌─────────────────────────────┐
│ Digital AIoT Support         ││ Inspection & Metrology      │
│ P10: AIoT Architecture      ││ P12: Camera Optical Capture │
│ P11: Job Tracking Dashboard  ││ P13: CV Edge Metrology      │
└──────────────────────────────┘│ P14: Final CoC Sign-Off     │
                                └─────────────────────────────┘
```

---

## 🔍 Key Engineering Highlights in Diagram
1. **Upstream & Downstream Interlocks**: Shows how bend allowance calculations in P06 directly dictate cutting profile offsets in P07 nesting algorithms.
2. **AIoT Telemetry Feedback**: Details how machine cycle times captured by Station ESP32 nodes (P10/P11) feed into ERP job tracking to continuously refine costing algorithms.
3. **Closed-Loop Metrology**: Illustrates how dimensional deviations detected in P13 trigger corrective offsets on the Amada CNC press brake backgauge.

---

## 💾 In-App Download Integration
The document is accessible under Card 5 in the **Final Enclosure & Document Centre**. Users can view the PDF in a dedicated browser tab or download the vector file for high-resolution plotting.

---

## 🔗 Related Pages
- [[Screen Documentation/Final Enclosure Document Centre|Final Enclosure & Document Centre]]
- [[Screen Documentation/Manufacturing Workflow|Manufacturing Workflow Screen]]
- [[User Workflows/Manufacturing Process Workflow|Manufacturing Process Workflow]]
