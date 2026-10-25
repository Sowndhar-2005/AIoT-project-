---
type: "Workflow Guide"
title: "Manufacturing Process Workflow"
status: "documented"
tags:
  - sheetfab-aiot
  - manufacturing-processes
  - p01-p14
  - engineering-workflow
---

# Manufacturing Process Workflow — Processes P01 through P14

The SheetFab AIoT platform maps the complete life cycle of an industrial electrical control enclosure across **14 distinct processes**. Rather than treating fabrication as an undifferentiated manual sequence, the platform establishes three structured engineering domains:

```text
┌──────────────────────────────────────────────────────────────────┐
│ 1. Manufacturing Engineering (Processes P01 – P09)               │
│    • From initial customer requirements to complete assembly    │
├──────────────────────────────────────────────────────────────────┤
│ 2. Digital Systems & AIoT (Processes P10 – P11)                  │
│    • Edge gateways, MQTT infrastructure, and job tracking       │
├──────────────────────────────────────────────────────────────────┤
│ 3. Inspection & Metrology (Processes P12 – P14)                  │
│    • Optical metrology, sub-pixel edge detection, and CoC sign-off│
└──────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Domain 1: Manufacturing Engineering (P01–P09)

### Process 01: Customer Requirement Collection
- **Objective**: Capture dimensional constraints ($H \times W \times D$), environmental ingress protection (IP55/IP66), mounting style (wall-mount vs floor-standing), and cable gland quantity.
- **Tools**: SheetFab Parametric Configurator, Form Builder.
- **Deliverable**: Customer Specification Sheet (`SPEC-ENC-2025-01`).

### Process 02: Component Identification & Digital Library
- **Objective**: Catalog all switchgear, DIN rails, power supplies, and wire ducts required for internal installation.
- **Tools**: SOLIDWORKS Component Library, Part Data Sheets.
- **Deliverable**: Standardized 3D STEP / SLDPRT files with electrical metadata.

### Process 03: AI-Assisted Internal Arrangement
- **Objective**: Optimize component placement across DIN rails while enforcing high-voltage/low-voltage segregation (min 30 mm) and thermal convection clearance.
- **Tools**: Python Layout Engine, Heuristic Rule Validator.
- **Deliverable**: 2D/3D Backplate Clearance Layout Plan.

### Process 04: Final 3D CAD Enclosure Design
- **Objective**: Model the parametric sheet metal enclosure body, door, removable gland plates, and internal mounting studs.
- **Tools**: SOLIDWORKS 2024 Sheet Metal Module.
- **Deliverable**: 3D CAD Master Assembly (`.SLDASM`, `.STEP`).

### Process 05: CAD-to-Manufacturing Docs & BOM
- **Objective**: Generate manufacturing bill of materials, cost breakdown, and commercial quotation.
- **Tools**: ERP Export, Automated Costing Script.
- **Deliverable**: 14-Item Bill of Materials (`BOM_AIOT_Sheet_Metal_Enclosure.pdf`) and Quotation (`Quotation_AIOT_Sheet_Metal_Enclosure.html`).

### Process 06: Flat-Pattern Development & Validation
- **Objective**: Calculate neutral axis bend allowances ($BA$) and bend deductions ($BD$) using material $K$-factors ($K = 0.40$ for CRCA 1.5mm air bending).
- **Tools**: SOLIDWORKS Sheet Metal Flat Pattern, K-Factor Tables.
- **Deliverable**: Unfolded 2D Flat Pattern DXF with bend centerline annotations.

### Process 07: Optimized Laser-Cutting Nesting
- **Objective**: Nest multiple enclosure panels onto standard $2500 \times 1250 \text{ mm}$ raw sheet metal stock to maximize material utilization ($> 78\%$).
- **Tools**: Lantek Expert, TruTops Boost.
- **Deliverable**: Laser Nesting Layout DXF (`Laser_Cutting_Layout_Provisional.dxf`) and CNC G-code.

### Process 08: Sheet-Metal Cutting & Bending
- **Objective**: Execute 2kW fiber laser cutting with nitrogen assist gas, followed by 8-stage precision CNC press brake bending.
- **Tools**: TRUMPF TruLaser 3030, Amada HFE-M2 8-Axis CNC Press Brake.
- **Deliverable**: Formed CRCA sheet metal chassis and door ready for welding.

### Process 09: Verification, Painting & Assembly
- **Objective**: Spot/TIG weld corner seams, apply iron phosphate chemical pretreatment, electrostatically apply RAL 7035 powder coating ($70\ \mu\text{m}$), and assemble hinges and polyurethane gasket.
- **Tools**: Positector 6000 DFT Gauge, Powder Coating Curing Oven.
- **Deliverable**: Finished, assembled enclosure ready for electrical integration.

---

## 📡 Domain 2: Digital Systems & AIoT (P10–P11)

### Process 10: AIoT System Implementation Guide
- **Objective**: Architect the shop-floor edge network connecting machine tools and workstations to the central monitoring platform.
- **Tools**: ESP32-WROOM-32E microcontrollers, RS-485 Modbus converters, EMQX Enterprise MQTT broker.
- **Deliverable**: IoT Edge Gateway Hardware Schematic & Network Configuration Map.

### Process 11: IoT Job-Tracking Dashboard
- **Objective**: Implement the shop-floor operator interface for tracking work-order travelers, machine cycle times, and batch progression.
- **Tools**: React 19, Tailwind CSS, MQTT WebSocket Client.
- **Deliverable**: Production Tracking Dashboard (`TrackingSection.tsx`).

---

## 🔍 Domain 3: Inspection & Quality Assurance (P12–P14)

### Process 12: Camera-Based Dimensional Inspection
- **Objective**: Capture distortion-free high-resolution optical imagery of fabricated sheet metal panels on the metrology inspection table.
- **Tools**: Basler ace 2 12MP Telecentric Camera, High-CRI Backlight Panel.
- **Deliverable**: Calibrated Raw Optical Images ($0.05 \text{ mm/pixel}$ resolution).

### Process 13: Computer-Vision Feature Detection & Metrology
- **Objective**: Apply sub-pixel Canny edge detection, line fitting, and polygon contour extraction to calculate actual dimensional deviations from nominal CAD coordinates.
- **Tools**: Python 3.11, OpenCV 4.9, NumPy.
- **Deliverable**: Dimensional Deviation Map and ISO 2768-m Metrology Audit.

### Process 14: Final Enclosure Quality Inspection
- **Objective**: Conduct comprehensive visual, mechanical, electrical continuity, and dimensional compliance audits prior to shipment release.
- **Tools**: Calibrated Vernier Calipers, Dial Gauges, DFT Coating Thickness Meter.
- **Deliverable**: Certificate of Conformance (`Certificate_of_Conformance_AIOT_Enclosure_Demo.pdf`).

---

## 🔗 Related Pages
- [[Screen Documentation/Manufacturing Workflow|Manufacturing Workflow Screen]]
- [[Engineering Deliverables/14 Process Workflow Diagram|14 Process Workflow Diagram]]
- [[Screen Documentation/IoT Management|IoT Management Screen]]
- [[Screen Documentation/Quality Inspection|Quality Inspection Screen]]
