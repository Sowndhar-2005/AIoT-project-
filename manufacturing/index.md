---
type: "Index"
title: "Manufacturing Engineering Domain Index"
description: "Central navigation and domain documentation for sheet-metal manufacturing engineering, encompassing Processes 1 to 9, digital component libraries, 3D CAD design, and shop fabrication parameters."
resource: "manufacturing/index.md"
tags:
  - aiot
  - sheet-metal-fabrication
  - manufacturing
  - domain-index
timestamp: "2026-10-25T18:50:00"
domain: "Manufacturing Engineering"
status: "Authoritative Engineering Domain"
---
# Domain 1: Manufacturing Engineering

The **Manufacturing Engineering** domain governs the physical product definition, CAD design, fabrication planning, sheet-metal unfolding, nesting, laser cutting, press-brake forming, surface finishing, and mechanical assembly of electrical enclosures.

---

## 1. Domain Overview & Workflow

```mermaid
flowchart LR
    P1["P01: Customer Requirements"] --> P2["P02: Component Library"]
    P2 --> P3["P03: AI Arrangement"]
    P3 --> P4["P04: Final 3D CAD Design"]
    P4 --> P5["P05: Manufacturing Docs & BOM"]
    P5 --> P6["P06: Flat Pattern Validation"]
    P6 --> P7["P07: Optimized Laser Nesting"]
    P7 --> P8["P08: Cutting & Bending"]
    P8 --> P9["P09: Assembly & Finishing"]
    P9 -. "Physical Enclosure Handoff" .-> P14["Process 14: Final QA Inspection"]
```

---

## 2. Authoritative Process Reports (Processes 1 to 9)

Click any process to access its full authoritative technical report:

1. **[Process 01: Customer Requirement Collection](processes/process-01-customer-requirements.md)**
   - Customer specification intake, dimensional scoping, environment class (IP rating), and drawing intake.
2. **[Process 02: Component Identification, Measurement and Digital Library](processes/process-02-component-identification-library.md)**
   - Physical measurement, DIN-rail and component cataloging, and 3D digital library models.
3. **[Process 03: AI-Assisted Internal Component Arrangement](processes/process-03-ai-assisted-arrangement.md)**
   - Algorithmic layout generation, thermal dissipation spacing, wiring clearance rules, and human design review.
4. **[Process 04: Final 3D CAD Enclosure Design](processes/process-04-final-cad-design.md)**
   - SOLIDWORKS parametric modeling, chassis sheet-metal features, door/gland plate interfaces, and engineering sign-off.
5. **[Process 05: CAD-to-Manufacturing Documentation, BOM and Quotation](processes/process-05-manufacturing-documentation.md)**
   - 2D fabrication blueprints, hierarchical production BOM, operation routing, and cost estimation logic.
6. **[Process 06: Sheet-Metal Flat-Pattern Development and Validation](processes/process-06-flat-pattern-validation.md)**
   - Unfolding algorithms, bend allowance/deduction math, K-factor (0.38) validation, and 1:1 DXF generation.
7. **[Process 07: Optimized Laser-Cutting Nesting](processes/process-07-laser-nesting.md)**
   - 2D nesting optimization, sheet utilization heuristics, grain constraint handling, and remnant stock tracking.
8. **[Process 08: Sheet-Metal Cutting, Bending and Component Fabrication](processes/process-08-cutting-bending-fabrication.md)**
   - CNC fiber laser cutting, nitrogen assist gas parameters, deburring, and CNC press brake air bending sequences.
9. **[Process 09: Dimensional Verification, Painting and Complete Enclosure Assembly](processes/process-09-finishing-assembly.md)**
   - Bare-metal dry fit, chemical pre-treatment, RAL 7035 powder coating, gasket installation, and hardware assembly.

---

## 3. Specialized Manufacturing Knowledge Areas

- **[Digital Component Library](components/index.md)**: Catalog specifications, 3D CAD models, DIN rail standards, and mounting footprint dimensions.
- **[CAD Design & Blueprint Standards](cad-design/index.md)**: SOLIDWORKS feature tree rules, sheet-metal gauge tables, bend relief standards, and drawing templates.
- **[Manufacturing Data & Costing](manufacturing-data/index.md)**: Bill of Materials structures, fabrication labor rate tables, nesting parameters, and inventory tracking.
