---
type: "Audit"
title: "Unresolved Engineering Questions & Decisions Register"
description: "Explicit tracking register of open technical questions, undecided software technology selections, hardware integration uncertainties, and future research paths."
resource: "documentation-audit/unresolved-questions.md"
tags:
  - audit
  - unresolved-questions
  - risk-register
  - engineering-decisions
timestamp: "2026-10-25T18:50:00"
domain: "Master"
status: "Authoritative Audit Record"
---
# Unresolved Engineering Questions & Decisions Register

In accordance with Open Knowledge Format (OKF) principles, engineering uncertainties, architectural choices requiring hardware validation, and open technical trade-offs are explicitly recorded rather than obscured by assumptions.

---

## 1. CAD Software Integration Decisions

| ID | Engineering Question | Current Documented Fact | Proposed Approach / Risk | Planned Resolution Action |
|---|---|---|---|---|
| **Q-CAD-01** | **SOLIDWORKS Automation Interface & Headless Reliability** | SOLIDWORKS 2024 desktop licenses support COM/VBA automation. Direct COM calls from web backends are unstable. | Asynchronous Windows CAD Sidecar agent polling Redis queue. Desktop licensing required. | Benchmark Python `win32com` / C# sidecar performance for 100 consecutive automated DXF exports. |
| **Q-CAD-02** | **CADcraft Role & Open-Source Headless Capability** | Web research indicates CADcraft is a free, Rust-based 2D CADD engine (sibling to 3D SolidCraft). | Potential candidate for containerized Linux 2D DXF polyline sanitization. | Test compiling CADcraft CLI inside Docker container; compare execution speed and memory against Python `ezdxf`. |
| **Q-CAD-03** | **AutoCAD Integration Boundary** | Project source reports mention AutoCAD for electrical single-line diagrams (SLD) and general arrangement (GA) drawings. | File-based exchange (DWG/DXF/PDF upload); no direct browser API integration. | Retain file-based staging boundary until dedicated AutoLISP or ObjectARX automation is formally required. |

---

## 2. IoT Hardware & Machine Telemetry Decisions

| ID | Engineering Question | Current Documented Fact | Proposed Approach / Risk | Planned Resolution Action |
|---|---|---|---|---|
| **Q-IOT-01** | **CNC Laser Machine Controller Interface** | Laser cutter brand and CNC controller model (CypCut, Precitec, Siemens 840D) are not specified in source material. | External non-invasive sensor tap (Hall-effect current clamp + gas pressure transducer) via ESP32-S3. | Survey workshop laser controller interfaces to determine if native Modbus-TCP or OPC-UA read-only ports exist. |
| **Q-IOT-02** | **Press Brake Bend Stroke Monitoring** | Press brake hydraulic/mechanical control circuits cannot be directly tapped without voiding equipment warranty. | External inductive proximity sensor positioned at upper beam top-dead-center (TDC). | Mount prototype optocoupled proximity sensor on press brake frame; log false-trigger rates during test runs. |
| **Q-IOT-03** | **Shop-Floor Network Latency & Wi-Fi Dead Zones** | Sheet-metal enclosures and steel machinery create high RF multipath interference and signal attenuation. | Hybrid 10/100 Ethernet drops at major machine tools; ESP32 Store-and-Forward ring buffer for wireless nodes. | Execute shop-floor 2.4 GHz RF heat-mapping and benchmark MQTT event loss during peak machine operation. |

---

## 3. Optical Metrology & Computer Vision Decisions

| ID | Engineering Question | Current Documented Fact | Proposed Approach / Risk | Planned Resolution Action |
|---|---|---|---|---|
| **Q-QA-01** | **Telecentric Field of View vs. Part Size Trade-Off** | Full electrical enclosure backplates measure up to $800 \times 600\text{ mm}$. True telecentric lenses with an 800 mm FOV are prohibitively expensive ($> \$15,000$). | Large diffuse LED backlight table with a high-resolution 20MP low-distortion lens and sub-pixel distortion grid calibration. | Calibrate prototype lens with precision grid; evaluate measurement uncertainty at outer $800\text{ mm}$ perimeter. |
| **Q-QA-02** | **3D Formed Enclosure Depth & Orthogonality Verification** | 2D top-down cameras cannot measure bend angles, 3D box depth, or internal stud protrusion heights. | 2D optical rig dedicated to bare flat blanks (Processes 12–13); Process 14 combines calibrated vernier height gauges with structured-light handheld 3D scanning. | Formally document hybrid metrology SOP separating 2D camera inspection of cut parts from 3D mechanical verification of formed boxes. |
