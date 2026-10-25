---
type: "Guide"
title: "CAD Modeling Standards & Blueprint Rules"
description: "Parametric sheet-metal modeling rules in SOLIDWORKS, corner relief standards, bend radii tables, DXF export rules, and drawing title block requirements."
resource: "manufacturing/cad-design/index.md"
tags:
  - cad
  - solidworks
  - sheet-metal-design
  - blueprint
timestamp: "2026-10-25T18:50:00"
domain: "Manufacturing Engineering"
status: "Authoritative Engineering Reference"
---

# CAD Modeling Standards & Blueprint Rules

This document establishes the mandatory 3D CAD modeling standards and 2D engineering drawing practices for electrical sheet-metal enclosures.

---

## 1. Visual References

![Electrical Enclosure CAD Blueprint Sheet](../../assets/images/cad/Electrical%20Enclosure%20CAD%20Blueprint%20Sheet.png)
*Figure CAD.1: Standard multi-view production drawing showing orthogonal projections, section views, bend callouts, and revision block.*

![Electrical Enclosure CAD Flat Patterns](../../assets/images/cad/Electrical%20Enclosure%20CAD%20Flat%20Patterns.png)
*Figure CAD.2: Unfolded flat-pattern DXF export geometry showing outer profiles, piercing holes, and dashed bend lines.*

---

## 2. SOLIDWORKS Sheet-Metal Modeling Rules

All sheet-metal parts must be modeled using **native SOLIDWORKS Sheet Metal features** (`Base Flange`, `Edge Flange`, `Miter Flange`) rather than solid features with shell commands:
1. **Uniform Thickness**: Every part must enforce single-gauge thickness across all flanges ($T = 1.5\text{ mm}$ or $2.0\text{ mm}$ CRCA steel).
2. **Standard Bend Radius**: Internal bend radius must match workshop tooling:
   - For $T = 1.5\text{ mm}$: $R_{internal} = 1.5\text{ mm}$
   - For $T = 2.0\text{ mm}$: $R_{internal} = 2.0\text{ mm}$
3. **Corner Relief**: All adjacent 90° bends must specify **Tear** or **Circular** corner reliefs with a minimum diameter of $1.5 \times T$ to prevent metal tearing during forming.
4. **Hole-to-Bend Minimum Distance**: No cutouts or mounting holes may be placed closer than $3 \times T + R$ from any bend line to prevent hole distortion during bending.

---

## 3. Flat Pattern & DXF Export Protocols

Laser-cutting CAM programs require clean, uninterrupted vector profiles:
- **Geometry Layer (0 or CUT)**: Continuous polyline representing the outer perimeter and interior cutouts (white/black, continuous, zero elevation).
- **Bend Layer (BEND)**: Centerline bend trajectories showing angle and direction (`UP 90° R1.5` or `DOWN 90° R1.5`) mapped to dashed magenta lines.
- **Scale**: Strictly **1:1 metric scale** ($1\text{ CAD unit} = 1\text{ mm}$).
- **Spline Elimination**: All splines must be converted to tangent arcs or polylines before DXF export.
