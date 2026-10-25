---
type: "Guide"
title: "Multi-Role Web Application Requirements & Screen Specifications"
description: "User roles, access control matrices, detailed UI screen requirements, and interaction patterns for the Angular web application."
resource: "digital-systems/web-application/index.md"
tags:
  - web-application
  - ui-ux
  - rbac
  - angular
timestamp: "2026-10-25T18:50:00"
domain: "Digital Systems & AIoT"
status: "Authoritative Systems Specification"
---

# Multi-Role Web Application Requirements & Screen Specifications

The platform web application provides customized interfaces tailored to specific organizational roles across the sheet-metal fabrication lifecycle.

---

## 1. Role-Based Access Control (RBAC) Matrix

| Portal Module | Customer | Design Engineer | Production Operator | Quality Inspector | Executive Manager | System Admin |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **Submit Order / Upload Spec** | Full | Read-Only | None | None | Read-Only | Full |
| **Component Library Management** | None | Full | None | None | Read-Only | Full |
| **CAD Revision & BOM Approval** | None | Full | None | None | Read-Only | Full |
| **Quotation Release** | Read (Own) | Draft | None | None | Approve | Full |
| **Shop-Floor Event Logging** | None | None | Full (Assigned) | None | None | Full |
| **Optical Metrology Rig Trigger** | None | Read | None | Full | Read-Only | Full |
| **Quality Release & CoC Signing** | None | None | None | Full | Read-Only | Full |
| **Executive Reports & Analytics** | None | Read-Only | None | Read-Only | Full | Full |

---

## 2. Key Screen Workflows & UI Specifications

### 2.1 Customer Order & Spec Intake Screen
- **Enclosure Dimension Inputs**: Height, Width, Depth (mm) with real-time bounding box preview.
- **Environment Class Selector**: Indoor Mild (IP20), Dust/Drip Proof (IP54), Weatherproof / Washdown (IP65).
- **Document Drag-and-Drop**: Multi-file uploader accepting PDF, DWG, DXF, SLDPRT, STEP.
- **Component Checklist**: Dynamic grid for declaring customer-supplied switchgear vs. workshop-procured equipment.

### 2.2 Engineering CAD & BOM Workspace
- **Revision Tree**: Interactive history showing `REV_0` (Concept), `REV_A` (Engineering Approved), `REV_B` (Manufacturing ECO).
- **Hierarchical BOM Grid**: In-line editing of cut parts, purchased hinges, locks, gaskets, and DIN rails.
- **Direct DXF Viewer**: High-performance SVG/WebGL canvas rendering sheet-metal flat patterns with layer toggle (Perimeter, Bend Up, Bend Down).

### 2.3 Shop-Floor Touch Workstation
- **Barcode Scanner Integration**: USB/Bluetooth HID barcode wedge immediately fetches Job ID upon traveler scan.
- **One-Tap Actions**: Oversized, high-contrast buttons (`START OPERATION`, `HOLD / PAUSE`, `COMPLETE`, `SCRAP REPORT`).
- **Remnant Measurement Form**: Instant prompt on laser cut completion to record remnant width and height for inventory return.

### 2.4 Metrology & Quality Inspection Station
- **Live Camera Stream**: Low-latency video preview with optical crosshairs and staging perimeter guide.
- **Tolerance Overlay**: Green/Red vector overlay displaying nominal CAD geometry superimposed over detected physical edges.
- **Discrepancy Table**: Interactive deviation grid showing feature ID, nominal dimension, measured value, deviation, and pass/fail flag.
- **One-Click Release**: Digital signature pad and cryptographic stamp generating the customer Certificate of Conformance.
