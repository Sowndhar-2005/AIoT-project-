---
type: "Audit"
title: "Visual Asset Registry & Image Inventory Audit"
description: "Master inventory of all 25 image assets detailing filenames, categorized asset locations, file sizes, MD5 checksums, semantic descriptions, and document embed references."
resource: "documentation-audit/image-inventory.md"
tags:
  - audit
  - image-inventory
  - visual-assets
  - traceability
timestamp: "2026-10-25T18:50:00"
domain: "Master"
status: "Authoritative Audit Record"
---

# Visual Asset Registry & Image Inventory Audit

This document accounts for every visual asset present in the project, recording its physical location in the structured `assets/images/` tree, file integrity hash (MD5), file size, and primary embedding documents.

---

## 1. Master Image Registry Table

| # | Image File Name | Categorized Folder | Size (KB) | MD5 Checksum | Primary Embedding Document(s) | Semantic Description |
|---|---|---|---:|---|---|---|
| **01** | `Electrical Control Panel Engineering Diagram.png` | `cad` | 1966.1 | `b1bd97f25c...` | [Process 04](../manufacturing/processes/process-04-final-cad-design.md), [Process 06](../manufacturing/processes/process-06-flat-pattern-validation.md), [CAD Index](../manufacturing/cad-design/index.md) | SOLIDWORKS 3D blueprints, unfolded flat pattern DXFs, and GA drawings. |
| **02** | `Electrical Enclosure CAD Blueprint Sheet.png` | `cad` | 1622.6 | `2ee8070c6a...` | [Process 04](../manufacturing/processes/process-04-final-cad-design.md), [Process 06](../manufacturing/processes/process-06-flat-pattern-validation.md), [CAD Index](../manufacturing/cad-design/index.md) | SOLIDWORKS 3D blueprints, unfolded flat pattern DXFs, and GA drawings. |
| **03** | `Electrical Enclosure CAD Flat Patterns.png` | `cad` | 1480.8 | `baea1f48b2...` | [Process 04](../manufacturing/processes/process-04-final-cad-design.md), [Process 06](../manufacturing/processes/process-06-flat-pattern-validation.md), [CAD Index](../manufacturing/cad-design/index.md) | SOLIDWORKS 3D blueprints, unfolded flat pattern DXFs, and GA drawings. |
| **04** | `Electrical Control Panel Components Catalog.png` | `components` | 1688.3 | `73dd657676...` | [Process 02](../manufacturing/processes/process-02-component-identification-library.md), [Components Index](../manufacturing/components/index.md) | Switchgear catalogs, DIN rail guides, flat lay components, and 3D library items. |
| **05** | `Electrical Control Panel Components Flat Lay.png` | `components` | 2534.2 | `681b36cad5...` | [Process 02](../manufacturing/processes/process-02-component-identification-library.md), [Components Index](../manufacturing/components/index.md) | Switchgear catalogs, DIN rail guides, flat lay components, and 3D library items. |
| **06** | `Electrical Panel Component Dimension Guide.png` | `components` | 2107.8 | `68859bffa9...` | [Process 02](../manufacturing/processes/process-02-component-identification-library.md), [Components Index](../manufacturing/components/index.md) | Switchgear catalogs, DIN rail guides, flat lay components, and 3D library items. |
| **07** | `customer-supplied-components.png` | `components` | 56.8 | `960731af62...` | [Process 02](../manufacturing/processes/process-02-component-identification-library.md), [Components Index](../manufacturing/components/index.md) | Switchgear catalogs, DIN rail guides, flat lay components, and 3D library items. |
| **08** | `digital-component-library.png` | `components` | 20.1 | `beb153b781...` | [Process 02](../manufacturing/processes/process-02-component-identification-library.md), [Components Index](../manufacturing/components/index.md) | Switchgear catalogs, DIN rail guides, flat lay components, and 3D library items. |
| **09** | `imported-model-verification.png` | `components` | 23.1 | `6fd7ab10a8...` | [Process 02](../manufacturing/processes/process-02-component-identification-library.md), [Components Index](../manufacturing/components/index.md) | Switchgear catalogs, DIN rail guides, flat lay components, and 3D library items. |
| **10** | `manufacturer-datasheet-cad-model.png` | `components` | 77.3 | `b5c21d5025...` | [Process 02](../manufacturing/processes/process-02-component-identification-library.md), [Components Index](../manufacturing/components/index.md) | Switchgear catalogs, DIN rail guides, flat lay components, and 3D library items. |
| **11** | `process-2-flowchart-reference.png` | `components` | 46.5 | `25c2ca8fdb...` | [Process 02](../manufacturing/processes/process-02-component-identification-library.md), [Components Index](../manufacturing/components/index.md) | Switchgear catalogs, DIN rail guides, flat lay components, and 3D library items. |
| **12** | `solidworks-electrical-component-models.png` | `components` | 232.8 | `dbed246745...` | [Process 02](../manufacturing/processes/process-02-component-identification-library.md), [Components Index](../manufacturing/components/index.md) | Switchgear catalogs, DIN rail guides, flat lay components, and 3D library items. |
| **13** | `AI-Assisted Electrical Enclosure Workflow.png` | `digital-systems` | 2082.2 | `7c6f8db15a...` | [Process 10](../digital-systems/processes/process-10-aiot-implementation.md), [Process 11](../digital-systems/processes/process-11-job-tracking-dashboard.md) | AIoT system architecture, fabrication dashboards, and AI workflows. |
| **14** | `SheetFab AIoT Fabrication Dashboard.png` | `digital-systems` | 1788.3 | `568d2ee054...` | [Process 10](../digital-systems/processes/process-10-aiot-implementation.md), [Process 11](../digital-systems/processes/process-11-job-tracking-dashboard.md) | AIoT system architecture, fabrication dashboards, and AI workflows. |
| **15** | `Smart AIoT Fabrication Architecture.png` | `digital-systems` | 1796.0 | `bf04405636...` | [Process 10](../digital-systems/processes/process-10-aiot-implementation.md), [Process 11](../digital-systems/processes/process-11-job-tracking-dashboard.md) | AIoT system architecture, fabrication dashboards, and AI workflows. |
| **16** | `Camera-Based Enclosure Dimensional Inspection Setup.png` | `inspection` | 2072.9 | `5a2b4c9bf5...` | [Process 12](../quality-inspection/processes/process-12-camera-dimensional-inspection.md), [Process 13](../quality-inspection/processes/process-13-computer-vision-analysis.md), [Process 14](../quality-inspection/processes/process-14-final-quality-inspection.md) | Camera metrology rig, industrial vision inspection UI, and final QA pass evidence. |
| **17** | `Electrical Enclosure Quality Inspection Pass.png` | `inspection` | 2042.2 | `22ac615a27...` | [Process 12](../quality-inspection/processes/process-12-camera-dimensional-inspection.md), [Process 13](../quality-inspection/processes/process-13-computer-vision-analysis.md), [Process 14](../quality-inspection/processes/process-14-final-quality-inspection.md) | Camera metrology rig, industrial vision inspection UI, and final QA pass evidence. |
| **18** | `Industrial Vision Inspection Dashboard.png` | `inspection` | 2112.6 | `74f457af5c...` | [Process 12](../quality-inspection/processes/process-12-camera-dimensional-inspection.md), [Process 13](../quality-inspection/processes/process-13-computer-vision-analysis.md), [Process 14](../quality-inspection/processes/process-14-final-quality-inspection.md) | Camera metrology rig, industrial vision inspection UI, and final QA pass evidence. |
| **19** | `Sheet-Metal Fabrication Workflow Infographic.png` | `manufacturing` | 2829.8 | `269b3afea3...` | [Process 07](../manufacturing/processes/process-07-laser-nesting.md), [Process 08](../manufacturing/processes/process-08-cutting-bending-fabrication.md) | Laser nesting optimization board and shop-floor fabrication infographic. |
| **20** | `Sheet-Metal Laser Nesting Optimization Board.png` | `manufacturing` | 2234.7 | `ee8fa1d59c...` | [Process 07](../manufacturing/processes/process-07-laser-nesting.md), [Process 08](../manufacturing/processes/process-08-cutting-bending-fabrication.md) | Laser nesting optimization board and shop-floor fabrication infographic. |
| **21** | `Existing quotation.png` | `requirements` | 117.9 | `9df394826a...` | [Process 01](../manufacturing/processes/process-01-customer-requirements.md), [Process 05](../manufacturing/processes/process-05-manufacturing-documentation.md) | Customer requirement specs, quotation dashboards, and cost summaries. |
| **22** | `Rough customer requirements.png` | `requirements` | 64.0 | `2af5817bb2...` | [Process 01](../manufacturing/processes/process-01-customer-requirements.md), [Process 05](../manufacturing/processes/process-05-manufacturing-documentation.md) | Customer requirement specs, quotation dashboards, and cost summaries. |
| **23** | `Sheet Metal Fabrication Quotation Dashboard (1).png` | `requirements` | 1762.1 | `4ede880286...` | [Process 01](../manufacturing/processes/process-01-customer-requirements.md), [Process 05](../manufacturing/processes/process-05-manufacturing-documentation.md) | Customer requirement specs, quotation dashboards, and cost summaries. |
| **24** | `Sheet Metal Fabrication Quotation Dashboard.png` | `requirements` | 1762.1 | `4ede880286...` | [Process 01](../manufacturing/processes/process-01-customer-requirements.md), [Process 05](../manufacturing/processes/process-05-manufacturing-documentation.md) | Customer requirement specs, quotation dashboards, and cost summaries. |
| **25** | `website's quotation summary.png` | `requirements` | 56.8 | `e799d4fab1...` | [Process 01](../manufacturing/processes/process-01-customer-requirements.md), [Process 05](../manufacturing/processes/process-05-manufacturing-documentation.md) | Customer requirement specs, quotation dashboards, and cost summaries. |

---

## 2. Duplicate Image Audit Note

- **Image Audit**: `Sheet Metal Fabrication Quotation Dashboard.png` and `Sheet Metal Fabrication Quotation Dashboard (1).png` were confirmed via MD5 hash comparison (`4ede880286f8bc2eee19fc98ed8129b1`) to be identical files. Both have been preserved in `assets/images/requirements/` to maintain backwards compatibility, with canonical references pointing to `Sheet Metal Fabrication Quotation Dashboard.png`.
