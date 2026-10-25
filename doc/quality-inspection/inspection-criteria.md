---
type: "InspectionMethod"
title: "Inspection Criteria, Tolerance Classes & Defect Severity Standards"
description: "Authoritative engineering tolerance standards (ISO 2768-m), powder coating thickness limits, surface defect severity scales, and electrical bonding criteria."
resource: "quality-inspection/inspection-criteria.md"
tags:
  - inspection-criteria
  - iso-2768
  - tolerances
  - defects
timestamp: "2026-10-25T18:50:00"
domain: "Quality Inspection & Metrology"
status: "Authoritative Engineering Reference"
---

# Inspection Criteria, Tolerance Classes & Defect Severity Standards

This reference standard defines the mandatory numeric tolerance intervals, coating requirements, defect severity classifications, and acceptance rules for fabricated sheet-metal enclosures.

---

## 1. General Fabrication Tolerances: ISO 2768-m

Unless individually toleranced on the engineering drawing, all sheet-metal cut profiles, hole pitches, flange lengths, and overall enclosure dimensions must conform to **ISO 2768-m (Medium)**:

### Linear Dimensions (Cut Sheets, Flange Heights, Enclosure Length/Width/Height)
| Nominal Dimension Range (mm) | ISO 2768-m Tolerance (mm) | Permissible Span (Nominal $N$) |
|---|:---:|:---:|
| $0.5 < L \le 3$ | $\pm 0.1$ | $N - 0.1 \le M \le N + 0.1$ |
| $3 < L \le 6$ | $\pm 0.1$ | $N - 0.1 \le M \le N + 0.1$ |
| $6 < L \le 30$ | $\pm 0.2$ | $N - 0.2 \le M \le N + 0.2$ |
| $30 < L \le 120$ | $\pm 0.3$ | $N - 0.3 \le M \le N + 0.3$ |
| $120 < L \le 400$ | $\pm 0.5$ | $N - 0.5 \le M \le N + 0.5$ |
| $400 < L \le 1000$ | $\pm 0.8$ | $N - 0.8 \le M \le N + 0.8$ |
| $1000 < L \le 2000$ | $\pm 1.2$ | $N - 1.2 \le M \le N + 1.2$ |

### Angular Dimensions (Press Brake Bends)
| Length of Shorter Flange (mm) | Angular Tolerance |
|---|:---:|
| Up to 10 mm | $\pm 1^\circ$ |
| 10 to 50 mm | $\pm 0^\circ 30'$ |
| 50 to 120 mm | $\pm 0^\circ 20'$ |

---

## 2. Powder Coating & Surface Finish Standards

| Property | Standard / Specification | Acceptance Criteria |
|---|---|---|
| **Coating Type** | Thermosetting Pure Polyester Powder | RAL 7035 (Light Grey), Fine Texture |
| **Dry Film Thickness (DFT)** | ISO 2808 / Electromagnetic Gauge | **60 to 80 µm** across all exterior faces |
| **Coating Adhesion** | ISO 2409 Cross-Hatch Tape Test | **Class 0** (Lattice edges smooth, zero flaking) |
| **Gloss Level** | 60° Specular Reflectance | 25–35 GU (Semi-Gloss / Satin) |
| **Visual Defects** | 100% Visual Inspection at 500 Lux | Zero visible runs, blisters, bare edges, or craters |

---

## 3. Defect Classification & Severity Matrix

| Severity Level | Definition | Typical Defects | Mandatory Disposition |
|---|---|---|---|
| **Critical Defect (Level 1)** | Compromises safety, electrical insulation, ingress protection, or structural integrity. | Missing earth bonding stud ($R > 0.1\ \Omega$), door gasket tear, hole mismatch preventing assembly, razor-sharp burrs. | **Immediate Rejection / Mandatory Scrap or Major Rework**. Job placed on Hold. |
| **Major Defect (Level 2)** | Deviates from engineering blueprint tolerances or customer specifications, affecting functionality. | Dimension outside ISO 2768-m, door binding during closure, powder coat thickness $< 50\ \mu\text{m}$. | **Quarantine for Engineering Review / Rework**. Requires reinspection. |
| **Minor Defect (Level 3)** | Cosmetic imperfection not affecting structural life, ingress rating, or mechanical fit. | Slight color variation on internal bracket, minor paint orange peel on non-visible bottom panel. | **Accept with Concession / Touch-Up**. Recorded in inspection log. |
