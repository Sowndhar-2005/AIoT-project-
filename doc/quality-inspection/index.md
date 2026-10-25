---
type: "Index"
title: "Quality Inspection & Metrology Domain Index"
description: "Central navigation and master index for inspection and quality assurance, encompassing Processes 12 to 14, optical metrology rigs, computer-vision analysis, and final release criteria."
resource: "quality-inspection/index.md"
tags:
  - metrology
  - quality-inspection
  - computer-vision
  - iso-2768
  - domain-index
timestamp: "2026-10-25T18:50:00"
domain: "Quality Inspection & Metrology"
status: "Authoritative Systems Index"
---

# Domain 3: Quality Inspection & Metrology

The **Quality Inspection & Metrology** domain establishes the hardware standards, calibration protocols, computer-vision algorithms, and final acceptance criteria ensuring fabricated sheet-metal enclosures strictly adhere to approved engineering drawings and customer specifications.

---

## 1. Domain Workflow Architecture

```mermaid
flowchart LR
    P8["P08: Cut/Bent Sheet"] --> P12["Process 12: Optical Rig & Calibration"]
    P12 --> P13["Process 13: CV Feature Analysis & DXF Overlay"]
    P9["P09: Finished Enclosure"] --> P14["Process 14: Final QA Gate & CoC Release"]
    P13 -. "Optical Measurement Table" .-> P14
    P14 -- "Non-Conformance" --> Rework["Rework Loop"]
    P14 -- "Approved" --> CoC["Customer Certificate of Conformance (CoC)"]
```

---

## 2. Authoritative Process Reports (Processes 12 to 14)

- **[Process 12: Camera-Based Dimensional Inspection](processes/process-12-camera-dimensional-inspection.md)**
  - Gantry hardware mounting, telecentric optics, diffuse LED backlighting, and sub-pixel calibration.
- **[Process 13: Computer-Vision Feature Detection and Dimension Comparison](processes/process-13-computer-vision-analysis.md)**
  - Canny edge detection, ICP coordinate registration, nominal DXF overlay, and tolerance calculation.
- **[Process 14: Final Fabricated Enclosure and Quality Inspection](processes/process-14-final-quality-inspection.md)**
  - The 6 mandatory QA gates (dimensions, workmanship, coating, mechanics, earth bonding, BOM audit) and release authorization.

---

## 3. Specialized Metrology Reference Standards

- **[Inspection Criteria & Tolerance Standards](inspection-criteria.md)**
  - ISO 2768-m tolerance tables, surface defect classification, and coating thickness standards.
- **[Inspection Data Flow & Review Gates](inspection-data-flow.md)**
  - Detailed pipeline mapping image acquisition, telecentric correction, edge detection, CAD comparison, and CoC signing.
