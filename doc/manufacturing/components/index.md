---
type: "Component"
title: "Digital Component Library Master Reference"
description: "Master specifications, dimensions, mounting rules, and digital 3D model standards for internal electrical components and hardware used in industrial enclosures."
resource: "manufacturing/components/index.md"
tags:
  - components
  - electrical-library
  - din-rail
  - solidworks
timestamp: "2026-10-25T18:50:00"
domain: "Manufacturing Engineering"
status: "Authoritative Engineering Reference"
---

# Digital Component Library Master Reference

The Digital Component Library provides standardized physical, electrical, and 3D geometric definitions for all equipment mounted inside the electrical enclosure.

---

## 1. Visual Catalog Overview

![Electrical Control Panel Components Catalog](../../assets/images/components/Electrical%20Control%20Panel%20Components%20Catalog.png)
*Figure C.1: Master component catalog illustrating industrial switchgear, circuit breakers, terminal blocks, power supplies, and DIN rails.*

![Electrical Control Panel Components Flat Lay](../../assets/images/components/Electrical%20Control%20Panel%20Components%20Flat%20Lay.png)
*Figure C.2: Flat lay physical arrangement of customer-supplied and stock electrical components prior to dimensional cataloging.*

![Electrical Panel Component Dimension Guide](../../assets/images/components/Electrical%20Panel%20Component%20Dimension Guide.png)
*Figure C.3: Dimensioning guide and tolerance allowances for panel-mounted devices and clearance envelopes.*

---

## 2. Standard Component Specifications

| Component Type | Model / Standard | Dimensions (W × H × D mm) | Mounting Method | Heat Dissipation |
|---|---|---|---|---|
| **Molded Case Circuit Breaker (MCCB)** | 3-Pole 100A | 105 × 165 × 86 | Direct M4 Screws | 15 W |
| **Miniature Circuit Breaker (MCB)** | 1-Pole / 2-Pole C-Curve | 18 / 36 × 85 × 73 | 35 mm DIN Rail | 2.5 W per pole |
| **Switch Mode Power Supply (SMPS)** | 24V DC, 10A (240W) | 60 × 125 × 120 | 35 mm DIN Rail | 25 W |
| **Motor Contactor & Overload** | 3-Pole 32A + Relay | 45 × 140 × 95 | 35 mm DIN Rail / M4 | 8 W |
| **Programmable Logic Controller (PLC)** | Compact I/O CPU | 150 × 90 × 80 | 35 mm DIN Rail | 12 W |
| **Terminal Blocks (Feed-Through)** | Screw clamp / Push-in | 6.2 × 48 × 42 | 35 mm DIN Rail | Negligible |
| **Cooling Fan & Filter Unit** | 120 mm Axial 230V | 150 × 150 × 75 | Cutout snap-in | N/A (Exhaust) |

---

## 3. DIN-Rail & Wire Duct Layout Standards

- **DIN Rail Standard**: Standard Top-Hat Rail conforming to **IEC/EN 60715** ($35\text{ mm} \times 7.5\text{ mm}$, slotted steel zinc-dichromate).
- **DIN Rail Spacing**: Minimum vertical pitch between parallel rails is **125 mm** to allow adequate hand clearance and wire routing.
- **Wire Duct (Panduit / Slotted PVC)**: Standard size $40\text{ mm} \times 60\text{ mm}$ or $60\text{ mm} \times 60\text{ mm}$ installed parallel to DIN rails with a minimum clearance of **25 mm** from component terminals.
- **Thermal Clearance**: Power supplies (SMPS) and heat-generating drives require a minimum of **50 mm vertical clearance** and **20 mm lateral clearance** for convective cooling.

---

## 4. CAD File & Metadata Schema

Each component in the digital library is stored in the database with the following attributes:
```json
{
  "component_id": "COMP-ELEC-0042",
  "part_number": "SDR-240-24",
  "manufacturer": "Mean Well",
  "category": "Power Supply",
  "dimensions_mm": { "width": 60.0, "height": 125.2, "depth": 113.5 },
  "weight_kg": 1.05,
  "mounting_type": "DIN_RAIL_35MM",
  "cad_model_file": "cad/library/power_supplies/sdr-240-24.sldprt",
  "step_file": "cad/library/power_supplies/sdr-240-24.step",
  "clearance_envelope_mm": { "top": 50.0, "bottom": 50.0, "sides": 20.0, "front": 30.0 },
  "thermal_dissipation_watts": 28.5,
  "verification_status": "VERIFIED_PHYSICAL_SAMPLE"
}
```
