---
type: "DataModel"
title: "Manufacturing Data, BOM Structure & Cost Models"
description: "Hierarchical Bill of Materials schema, laser cutting cost formulas, press brake bending cost models, and sheet stock inventory parameters."
resource: "manufacturing/manufacturing-data/index.md"
tags:
  - bom
  - quotation
  - manufacturing-data
  - costing
timestamp: "2026-10-25T18:50:00"
domain: "Manufacturing Engineering"
status: "Authoritative Engineering Reference"
---

# Manufacturing Data, BOM Structure & Cost Models

This document defines the mathematical models and data structures governing production costing, Bill of Materials compilation, and raw sheet material allocation.

---

## 1. Visual Costing & Quotation Overview

![Existing quotation](../../assets/images/requirements/Existing%20quotation.png)
*Figure M.1: Baseline historical fabrication quote detailing component breakdowns, material tonnage, and line-item processing costs.*

![website's quotation summary](../../assets/images/requirements/website's%20quotation%20summary.png)
*Figure M.2: Automated web application quotation summary screen aggregating laser runtime, bending hits, and assembly labor.*

---

## 2. Hierarchical Bill of Materials (BOM) Architecture

The manufacturing BOM is structured as a three-tier hierarchy:
```
Enclosure Assembly (Level 0)
├── Fabricated Sheet-Metal Sub-Assembly (Level 1)
│   ├── Enclosure Chassis Body (Part, CRCA 1.5mm)
│   ├── Front Door Panel (Part, CRCA 1.5mm)
│   ├── Gland Cover Plates (Part, CRCA 2.0mm, Qty: 2)
│   └── Internal Equipment Mounting Plate (Part, Galvanized Steel 2.0mm)
├── Commercial Mechanical Hardware (Level 1)
│   ├── Concealed Lift-Off Hinges (Qty: 2)
│   ├── 3-Point Quarter-Turn Cam Lock (Qty: 1)
│   ├── EPDM Sponge Door Gasket (Length: 2800 mm)
│   └── Fasteners & Earthing Braids (Kit)
└── Installed Electrical Components (Level 1 - Customer / Company Supplied)
    ├── 35mm DIN Rails (Cut Length: 450 mm, Qty: 3)
    ├── Slotted PVC Wire Ducts (Cut Length: 450 mm, Qty: 4)
    └── Active Electrical Devices (MCCB, MCB, SMPS, Terminals)
```

---

## 3. Manufacturing Cost Mathematical Model

The total fabrication cost ($C_{total}$) is calculated using the verified cost engine:
$$C_{total} = C_{material} + C_{cutting} + C_{bending} + C_{finishing} + C_{assembly} + C_{hardware}$$

### Cost Formulas
1. **Material Cost ($C_{material}$)**:
   $$C_{material} = \frac{\text{Net Area}(\text{m}^2)}{\text{Nesting Efficiency } \eta} \times \text{Thickness}(\text{mm}) \times 7.85 \times \text{Steel Rate}(\$/\text{kg})$$
2. **Laser Cutting Cost ($C_{cutting}$)**:
   $$C_{cutting} = \left(\frac{\text{Total Cut Perimeter}(\text{m})}{\text{Cutting Speed}(\text{m/min})} + \frac{\text{Piercing Count} \times 0.8\text{ s}}{60}\right) \times \text{Laser Machine Rate}(\$/\text{hr})$$
3. **Bending Cost ($C_{bending}$)**:
   $$C_{bending} = \text{Total Bend Hits} \times \text{Cycle Time per Hit}(\text{hr}) \times \text{Press Brake Rate}(\$/\text{hr})$$
4. **Powder Coating Cost ($C_{finishing}$)**:
   $$C_{finishing} = \text{Total Coated Surface Area}(\text{m}^2) \times \text{Powder Rate per }\text{m}^2$$
