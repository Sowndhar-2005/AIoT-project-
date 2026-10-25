---
type: "Engineering Deliverable"
title: "Laser Cutting Layout Deliverable"
status: "verified"
filename: "Laser_Cutting_Layout_Provisional.dxf"
format: "DXF (Drawing Exchange Format)"
process: "P07"
tags:
  - sheetfab-aiot
  - deliverable
  - laser-cutting
  - dxf
  - nesting
---

# Engineering Deliverable: Laser-Cutting Nesting Layout

## 📄 File Profile
- **Exact Filename**: `Laser_Cutting_Layout_Provisional.dxf`
- **Location in Project**: `web-ui/report/Laser_Cutting_Layout_Provisional.dxf`
- **Static Web Path**: `/report/Laser_Cutting_Layout_Provisional.dxf`
- **File Format**: ASCII Drawing Exchange Format (DXF, AutoCAD Release 14/2000 compatibility)
- **Relevant Engineering Process**: **Process 07 (Optimized Laser-Cutting Nesting)**

---

## 🎯 Purpose & Scope
This CAD vector file defines the 2D unfolded sheet-metal flat patterns nested onto a standard industrial raw sheet of size $2500 \times 1250 \text{ mm}$ (Standard Indian raw sheet stock). It contains laser cut paths, lead-in piercing contours, corner bend relief notches, and internal cutouts for gland plates and pushbutton operators.

---

## 📑 Nesting Geometry & Technical Specifications

| Parameter | Value / Engineering Specification |
|---|---|
| **Raw Sheet Dimensions** | $2500 \text{ mm} \times 1250 \text{ mm}$ |
| **Material & Thickness** | IS 513 CRCA Grade D, $1.5 \text{ mm}$ |
| **Laser Kerf Compensation** | $0.20 \text{ mm}$ offset |
| **Minimum Part-to-Part Spacing** | $5.0 \text{ mm}$ web clearance |
| **Minimum Margin to Sheet Edge** | $10.0 \text{ mm}$ clamp border |
| **Calculated Material Utilization** | **78.4%** sheet efficiency |
| **Target Machinery** | TRUMPF TruLaser 3030 Fiber ($2.0 \text{ kW}$ laser power) |
| **Assist Gas** | Nitrogen ($N_2$ at $16 \text{ bar}$) for oxide-free weldable edges |

---

## 🔍 Layer Architecture & Machine Tool Assignment

The DXF file follows standard industrial CAM layer naming:
- `LAYER_CUT_EXTERIOR`: Continuous outer boundary cut paths with tangential arc lead-ins.
- `LAYER_CUT_INTERIOR`: Gland plate, lock cutout, and hinge clearance holes.
- `LAYER_BEND_CENTERLINE`: Dashed reference lines indicating press-brake punch contact lines with bend direction tags (UP/DOWN).
- `LAYER_ETCH_PARTNO`: Low-power laser surface etching for part serialization and traveler tracking.

---

## 💾 In-App Download Integration
The file is hosted in the **Final Enclosure & Document Centre** under Card 3. Clicking `Download DXF` delivers the authentic CAD file directly to the user's workstation for CAM post-processing in Lantek Expert, TruTops, or AutoCAD.

---

## 🔗 Related Pages
- [[Screen Documentation/Final Enclosure Document Centre|Final Enclosure & Document Centre]]
- [[Screen Documentation/Manufacturing Workflow|Manufacturing Workflow (P06, P07)]]
- [[Engineering Deliverables/Exploded Assembly View|Exploded Assembly View Deliverable]]
