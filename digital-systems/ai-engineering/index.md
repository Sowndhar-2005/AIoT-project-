---
type: "Guide"
title: "AI Capability Catalogue & Human-in-the-Loop Governance"
description: "Comprehensive catalogue of artificial intelligence services across document extraction, layout generation, nesting optimization, and computer-vision quality inspection with strict human approval gates."
resource: "digital-systems/ai-engineering/index.md"
tags:
  - ai
  - machine-learning
  - human-in-the-loop
  - computer-vision
  - nesting
timestamp: "2026-10-25T18:50:00"
domain: "Digital Systems & AIoT"
status: "Authoritative Systems Specification"
---

# AI Capability Catalogue & Human-in-the-Loop Governance

This document establishes the functional requirements, operational bounds, input/output schemas, and mandatory human review gates for all AI microservices.

---

## 1. Core Governance Principles

1. **Strict Advisory Status**: AI models operate exclusively in an advisory capacity (`PROPOSED`). Under no circumstances can an AI model directly release a CAD revision, approve a quotation, or certify quality release.
2. **Mandatory Human-in-the-Loop (HITL)**: Every AI-generated output requires explicit review and confirmation by an authorized human engineer or inspector before downstream propagation.
3. **Traceability & Versioning**: All model inferences are logged with model version, prompt hash, confidence score, and timestamp.

---

## 2. AI Microservice Specifications

### 2.1 AI Service A: Document Requirement Extractor
- **Problem Solved**: Eliminates manual data entry errors from PDF electrical single-line diagrams (SLDs) and rough customer RFQ notes.
- **Inputs**: Multipage PDF, scanned TIFF/PNG, or unformatted text.
- **Outputs**:
  ```json
  {
    "enclosure_type": "WALL_MOUNT",
    "suggested_dimensions_mm": { "height": 800, "width": 600, "depth": 250 },
    "sheet_thickness_mm": 1.5,
    "material": "CRCA_STEEL",
    "ip_rating_requested": "IP55",
    "detected_components": [
      { "tag": "CB1", "type": "MCCB_3P_100A", "quantity": 1 },
      { "tag": "PSU1", "type": "SMPS_24V_10A", "quantity": 1 }
    ],
    "confidence_score": 0.92
  }
  ```
- **HITL Verification Gate**: CAD Design Engineer must verify extracted values and explicitly accept or edit the specification prior to 3D CAD modeling.

### 2.2 AI Service B: Layout & Component Placement Assistant
- **Problem Solved**: Generates optimized internal component arrangements on sub-plates complying with thermal convection and cable duct clearance standards.
- **Inputs**: Digital component geometries, thermal dissipation wattage, enclosure volume, cable entry direction.
- **Outputs**: Coordinate positions $(x, y)$ for DIN rails, wire ducts, and mounted equipment.
- **HITL Verification Gate**: Electrical engineer reviews layout for clearance violations, hand access, and terminal accessibility before importing coordinates into SOLIDWORKS.

### 2.3 AI Service C: Sheet Nesting Heuristic Optimizer
- **Problem Solved**: Resolves complex 2D irregular polygon bin-packing to maximize sheet utilization across mixed-order production batches.
- **Inputs**: DXF flat pattern polylines, stock sheet inventory (2500 × 1250 mm), remnant polygons.
- **Outputs**: Optimized multi-part nesting layout, cut order sequence, utilization score ($\eta \ge 82\%$), scrap geometry.
- **HITL Verification Gate**: Production Planner confirms grain orientation, clamp clearance, and lead-in piercing locations before CAM G-code generation.

### 2.4 AI Service D: Optical Metrology & Edge Anomaly Detector
- **Problem Solved**: Automatically identifies sheet-metal part contours, mounting hole pitches, and surface defects from high-resolution telecentric camera frames.
- **Inputs**: 20MP calibrated grayscale inspection frame, nominal DXF vector CAD model, tolerance class.
- **Outputs**: Sub-pixel edge vectors, measured feature diameters, deviation table ($\Delta x, \Delta y$), defect bounding boxes.
- **HITL Verification Gate**: Quality Inspector reviews flagged deviations on the interactive metrology screen. Releasing the part or declaring rework requires human sign-off.
