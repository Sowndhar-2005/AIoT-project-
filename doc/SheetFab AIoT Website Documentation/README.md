---
type: "Knowledge Base Index"
title: "SheetFab AIoT Website Documentation"
status: "documented"
tags:
  - sheetfab-aiot
  - website-documentation
  - industrial-iot
  - manufacturing-execution
---

# SheetFab AIoT Website Documentation

Welcome to the definitive Obsidian engineering documentation for the **SheetFab AIoT Smart Sheet-Metal Fabrication Platform** frontend application (`web-ui`).

This knowledge base documents the complete architecture, UI design system, navigation hierarchy, 8 primary operational screens, 14 manufacturing/inspection processes, live engineering document centre, and the newly integrated industrial **IoT Management** screen.

---

## 🧭 Main Sections & Indices

- [[Website Overview]] — System scope, purpose, operational boundary, and technical profile.
- [[Navigation and Screen Index]] — Canonical screen list, navigation map, and routing registry.
- [[UI Design System]] — Light theme color palette, typography, badges, cards, and responsive tokens.
- [[Website Architecture]] — React 19 / Vite component hierarchy, data models, state synchronization, and ISA-95 interface boundaries.

---

## 🖥️ Screen Documentation

Detailed architectural breakdowns, UI controls, data sources, and full-resolution screenshots for each application screen:

1. [[Project Overview]] — Executive dashboard, batch parameters, 14-stage workflow roadmap, and engineering specs.
2. [[Enclosure Specifications]] — Interactive 3D parametric configurator, sheet metal gage selector, and live costing engine.
3. [[Manufacturing Workflow]] — Interactive process workspace covering all 14 manufacturing, AIoT, and metrology stages.
4. [[CAD and Component Library]] — DIN rail component inventory, clearance rules, and enclosure cut-out layout manager.
5. [[Production Tracking]] — Station-by-station fabrication progress, barcode validation, and event stream monitor.
6. [[IoT Management]] — Industrial equipment registry, ISA-95 communication flow, connection states, and telemetry metadata.
7. [[Quality Inspection]] — Telecentric camera metrology model, OpenCV edge detection, and dimensional deviation analysis.
8. [[Final Enclosure Document Centre]] — Verified engineering release package, discrepancy audit, preview modals, and downloads.

---

## 🔄 User & Operational Workflows

- [[Navigation Workflow]] — Navigation behavior, persistent sidebar, mobile drawers, and synchronized tab switching.
- [[Manufacturing Process Workflow]] — End-to-end breakdown of processes P01 through P14.
- [[IoT Monitoring Workflow]] — Equipment discovery, connection vs. operational states, search/filter, and detail inspection.
- [[Engineering Document Download Workflow]] — Verification, in-browser previewing, and downloading of deliverables.

---

## 📑 Engineering Deliverables (Actual Files)

Verified deliverables integrated from `web-ui/report/` and served via `web-ui/public/report/`:

1. [[Quotation]] — `Quotation_AIOT_Sheet_Metal_Enclosure.html` (Total: ₹62,983.00 incl. 18% GST).
2. [[Bill of Materials]] — `BOM_AIOT_Sheet_Metal_Enclosure.pdf` (14 line-item structural & electrical BOM).
3. [[Laser Cutting Layout]] — `Laser_Cutting_Layout_Provisional.dxf` (2D nested sheet geometry).
4. [[Exploded Assembly View]] — `Electrical Control Enclosure Engineering Infographic.png` (High-res exploded view).
5. [[14 Process Workflow Diagram]] — `AIoT_14_Process_Workflow_Diagram.pdf` (Full engineering flow chart).
6. [[Certificate of Conformance]] — `Certificate_of_Conformance_AIOT_Enclosure_Demo.pdf` (Provisional CoC audit record).

---

## 🛠️ Technical Reference & Quality Audit

- [[Routes and Components]] — Comprehensive file and component reference mapping.
- [[Data and State Model]] — Shared interfaces (`EnclosureRecord`, `IoTDevice`, `ProcessItem`), defaults, and localStorage persistence.
- [[Known Limitations]] — Explicit documentation of frontend mock boundaries, offline sensors, and pending backend APIs.
- [[Documentation Audit]] — Verification matrix confirming screen coverage, screenshot paths, and deliverable integrity.
