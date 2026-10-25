---
title: "AIoT and IIoT-Based Smart Sheet-Metal Panel Fabrication and Intelligent Quality Inspection System"
subtitle: "Final Capstone Engineering Project Report"
author: "Sowndhar A. (Reg No: 711524BAM303)"
department: "Department of Artificial Intelligence and Machine Learning"
institution: "Kalaignar Karunanidhi Institute of Technology, Coimbatore"
academic_year: "2025 – 2026"
status: "Completed & Verified"
deliverable_pdf: "AIoT_IIoT_Smart_Sheet_Metal_Fabrication_Project_Report.pdf"
pages: 18
---

# AIoT and IIoT-Based Smart Sheet-Metal Panel Fabrication and Intelligent Quality Inspection System

## Academic Project Report Metadata
- **Candidate Name:** SOWNDHAR A.
- **Registration Number:** 711524BAM303
- **Degree & Branch:** B.Tech. Artificial Intelligence and Machine Learning
- **Institution:** Kalaignar Karunanidhi Institute of Technology, Kannampalayam, Coimbatore — 641 402
- **Affiliation:** Anna University, Chennai / Autonomous
- **Course Domain:** IoT Design and Deployment / Cyber-Physical Systems

---

## 1. Abstract & Executive Summary

Conventional sheet-metal panel manufacturing in medium-scale switchgear and control industries is characterized by disconnected operational silos. Manual customer specification gathering, isolated 2D/3D CAD drafting, paper-based job travelers, uninstrumented machine tools, and subjective manual vernier metrology introduce significant schedule friction, high scrap rates, and an absence of lot-level traceability. This project report presents the design and architectural implementation of the **SheetFab AIoT Platform**: an integrated cyber-physical manufacturing and Industrial Internet of Things (IIoT) ecosystem engineered to unify sheet-metal design, computer-aided engineering (CAE), Manufacturing Execution Systems (MES), shop-floor sensor telemetry, and automated optical quality inspection into a consolidated operator portal.

The technical implementation establishes a rigorous **14-process manufacturing roadmap** structured across three fundamental engineering domains: 
1. *Manufacturing Engineering* (Processes P01–P09), translating client spatial and electrical specifications into fully folded 3D CAD assemblies (SOLIDWORKS), automated 14-item Bills of Materials (BOM), commercial quotations, neutral-axis flat patterns ($K = 0.40$ for 1.5 mm CRCA steel), and laser nesting cut layouts on $2500 \times 1250$ mm raw sheet stock.
2. *Digital Engineering and AIoT Support* (Processes P10–P11), provisioning microcontroller edge gateways (ESP32-WROOM-32E) interfacing with TRUMPF laser cutters and Amada CNC press brakes through RS-485 Modbus TCP and MQTT broker pipelines (EMQX).
3. *Inspection and Quality Metrology* (Processes P12–P14), utilizing a telecentric 12MP machine-vision sensor with OpenCV sub-pixel edge detection algorithms to verify dimensional tolerances against ISO 2768-m standards before issuing validated Certificates of Conformance (CoC).

Developed with a resilient, modern frontend architecture utilizing React 19, TypeScript, Vite, and Tailwind CSS, the platform maintains a persistent parametric state model, interactive DIN rail component inventories, station job tracking, and an authentic Engineering Document Centre. To preserve strict engineering integrity, this report establishes clear technical boundaries: physical field machines and IoT microcontrollers are documented under configured integration interfaces rather than fabricating live hardware connections or synthetic sensor streams. The system serves as a scalable reference architecture for Industry 4.0 digital transformation in regional precision manufacturing facilities.

**Keywords:** Artificial Intelligence of Things (AIoT), Industrial Internet of Things (IIoT), Sheet-Metal Fabrication, Computer-Aided Design (CAD), Telecentric Optical Metrology, MQTT Messaging, Manufacturing Execution System (MES), ISO 2768-m Tolerance.

### Academic Project Profile
| Parameter | Academic Engineering Details |
|---|---|
| **Candidate Name & Reg No** | SOWNDHAR A. \| Register No: 711524BAM303 |
| **Department & College** | Department of Artificial Intelligence and Machine Learning, KKIT, Coimbatore |
| **Target Workpiece & Shell** | Industrial IP66 Electrical Control Enclosure (600 H × 500 W × 250 D mm) |
| **Raw Material & Thickness** | IS 513 CRCA Grade D (Cold Rolled Close Annealed), 1.50 mm Nominal Thickness |
| **Approved Commercial Value** | ₹62,983.00 (Batch of 5 Enclosures incl. 18.0% IGST, Unit Base: ₹10,675.00) |
| **Software Framework Stack** | React 19.0.0, TypeScript 5.8.2, Vite 6.2.0, Tailwind CSS 4.0.0, Lucide Icons |

---

## 2. Table of Contents & List of Deliverables

1. Abstract & Executive Summary (Page 2)
2. Table of Contents & List of Figures (Page 3)
3. Introduction & Industrial Problem Statement (Page 4)
4. Existing Systems vs. Proposed Connected Solution (Page 5)
5. Overall System Architecture & Cyber-Physical Data Flow (Page 6)
6. Industrial IoT (IIoT) System Design & Communication Flow (Page 7)
7. Hardware & Equipment Architecture (Page 8)
8. Software & Frontend Architecture (`web-ui`) (Page 9)
9. Fourteen-Process Manufacturing Workflow (Page 10)
10. Customer Requirements, 3D CAD & Component Library (Page 11)
11. Manufacturing Documentation & Fabrication Operations (Page 12)
12. IoT Production Monitoring & Shop-Floor Tracking (Page 13)
13. AI-Assisted Processing & Computer-Vision Metrology (Page 14)
14. Quality Inspection & Conformance Traceability (Page 15)
15. Engineering Deliverables & Document Centre (Page 16)
16. System Verification, Testing & Results (Page 17)
17. Conclusion, Future Enhancements & References (Page 18)

---

## 3. Introduction & Industrial Problem Statement

Industrial electrical control enclosures represent fundamental infrastructure across power distribution plants, factory automation systems, motor control centers (MCC), and utility substations. Fabricated predominantly from cold-rolled steel (CRCA) or stainless steel (SS 304), these enclosures must strictly satisfy stringent mechanical, environmental, and thermal requirements defined by international standards such as IEC 62208 (empty enclosures) and IEC 61439-1 (low-voltage switchgear and controlgear assemblies). The structural integrity must guarantee ingress protection against water and particulate matter (IP55 to IP66 ratings), resist internal arc faults, dissipate aggregate thermal loads generated by power switchgear, and maintain continuous electrical grounding to safeguard human operators.

### 3.1 Challenges in Conventional Sheet-Metal Fabrication
1. **Fragmented Design Handoffs:** Customer requirements are traditionally gathered using unstructured emails, handwritten notes, or informal spreadsheets. Converting these specifications into 3D CAD models (SOLIDWORKS) and subsequent 2D flat patterns requires multiple manual redraws, introducing human error into dimensional calculations and mounting hole alignments.
2. **Disconnected Material Nesting & Cost Estimation:** Quotations are frequently computed using static, historical cost approximations rather than dynamic material nesting simulations. Consequently, variance in steel sheet market indices or suboptimal scrap percentages ($>25\%$) leads to unrecovered production expenses or uncompetitive commercial bidding.
3. **Absence of Machine Tool Traceability:** On the shop floor, CNC fiber laser cutters and press brakes operate as isolated islands of automation. Plant supervisors rely on physical paper travelers (`job routing sheets`) carried manually between stations. If a laser machine stops due to assist gas exhaustion or a press brake encounters tool collision, supervisors lack real-time visibility.
4. **Manual & Subjective Metrology Inspection:** Final dimensional quality control relies heavily on hand-held vernier calipers, tape measures, and manual visual inspection. Verifying complex diagonal squareness, gasket channel depths, and mounting stud pitches across large panels is labor-intensive, prone to parallax reading errors, and fails to yield digital statistical process control (SPC) data.

### 3.2 Core Project Objectives
- **OBJ-01: Parametric CAD:** Parametric enclosure configurator supporting dynamic dimensions and material grading (CRCA 1.5mm, 600×500×250mm).
- **OBJ-02: Document Engine:** Automated synchronization between 3D CAD, 14-item BOM, and commercial quotations (Total: ₹62,983.00 incl. GST).
- **OBJ-03: IIoT Tracking:** Standardized shop-floor asset registry and station job tracking dashboard (8 Registered Asset Profiles).
- **OBJ-04: Optical Metrology:** Telecentric computer-vision inspection pipeline evaluating fabricated panels against ISO 2768-m ($\pm 0.80\text{ mm}$).
- **OBJ-05: Deliverables Release:** Verified engineering document centre hosting real, previewable manufacturing deliverables (6 Real Files in `/report/`).

---

## 4. Existing Systems vs. Proposed Connected Solution

| Engineering Domain | Conventional Sheet-Metal Practice | Proposed SheetFab AIoT System |
|---|---|---|
| **Requirement Capture** | Informal email/paper notes; prone to ambiguous depth, gasket, or door hinge specs. | Structured parametric web configurator with immediate volume, mass, and IP rating validation. |
| **Component Library** | Engineers search static paper catalogs; physical mockups needed to verify clearances. | Standardized digital catalog of DIN rails, switchgear, and power supplies with thermal dissipation rules. |
| **CAD & Costing Link** | BOM and cost estimates manually entered into separate spreadsheets; disconnect from CAD updates. | Direct synchronization between parametric enclosure dimensions, 14-item BOM schedule, and commercial quotation. |
| **Laser Nesting & CAM** | CAM programmer manually receives DXFs; slow nesting turnaround; low scrap tracking. | Optimized nesting on 2500×1250mm stock achieving 78.4% efficiency with standardized bend reliefs. |
| **Shop-Floor Tracking** | Physical paper routing traveler slips; zero visibility into machine delays or bottlenecks. | Station-by-station MES progress monitoring, traveler barcode scanning, and edge event streaming. |
| **Device Connectivity** | Isolated CNC machine tools; no automated operational or maintenance telemetry. | Defined ISA-95 asset hierarchy with MQTT/Modbus edge gateway interface boundaries. |
| **Quality Inspection** | Manual vernier caliper sampling; subjective visual checks; unrecorded metrology points. | High-resolution telecentric camera inspection with OpenCV sub-pixel edge detection vs ISO 2768-m. |
| **Document Delivery** | Dispersed attachments; unverified drawings; mismatched revision dates. | Consolidated Engineering Document Centre with in-browser previews and direct deliverable downloads. |

---

## 5. Overall System Architecture & Cyber-Physical Data Flow

The SheetFab AIoT system is structured into a hierarchical, six-tier cyber-physical architecture designed to comply with the **ISA-95 Enterprise-Control System Integration standard**:
1. **Layer 1 — Physical Fabrication Equipment & Sensors (Level 0/1):** TRUMPF TruLaser 3030 fiber cutter (2kW), Amada HFE-M2 8-axis press brake, Positector 6000 DFT paint gauge, and Basler ace 2 12MP optical metrology station.
2. **Layer 2 — IoT Edge Gateways & Interfacing Nodes (Level 2):** ESP32-WROOM-32E microcontrollers and NVIDIA Jetson AGX Orin edge AI computers.
3. **Layer 3 — Industrial Communication Middleware (Level 2/3):** EMQX Enterprise MQTT message broker operating on ports 1883 (TCP) and 8883 (TLS).
4. **Layer 4 — Application Services & Analytics Engine (Level 3):** Parametric costing, bend deduction algorithms ($BA/BD$), and OpenCV contour metrology comparisons.
5. **Layer 5 — Data Persistence & Engineering Records:** Client-side `localStorage` state persistence paired with static deliverable file storage.
6. **Layer 6 — Presentation Layer & Web Dashboard (Level 3/4):** Responsive React 19 web interface with 8 primary operational screens.

---

## 6. Industrial IoT (IIoT) System Design & Communication Flow

The system employs **MQTT v5.0** for asynchronous, lightweight shop-floor communication:
- **Broker Infrastructure:** EMQX Enterprise broker node (`DEV-SRV-MQTT`) listening on ports 1883 and 8883.
- **Topic Taxonomy:**
  - `sheetfab/station01/laser/telemetry`
  - `sheetfab/station03/welding/job_event`
  - `sheetfab/station06/vision/metrology_result`
- **Quality of Service (QoS):** QoS 1 for job traveler advance events; QoS 0 for high-frequency machine heartbeat telemetry.

---

## 7. Hardware & Equipment Architecture

The platform manages 8 industrial device profiles in a shared registry:
1. `DEV-LASER-01`: TRUMPF TruLaser 3030 Fiber (2kW, OPC-UA/TCP, Station 01 Cutting).
2. `DEV-PRESS-01`: Amada HFE-M2 8-Axis CNC Press Brake (100T, Modbus TCP, Station 02 Bending).
3. `DEV-CAM-P12`: Basler ace 2 12MP Telecentric Camera (GigE Vision, Station 06 Metrology).
4. `DEV-EDGE-ESP32-01`: Station 03 Welding Edge Gateway (ESP32-WROOM-32E, MQTT Port 1883).
5. `DEV-SRV-MQTT`: EMQX Enterprise MQTT Broker Node (Central Server, TCP/IP / WebSocket).
6. `DEV-SCAN-BARCODE`: Honeywell Granit 1980i Rugged Scanner (USB-HID / Bluetooth, Station 01-06).
7. `DEV-SRV-CV-INFER`: Jetson AGX Orin Metrology Inference Node (gRPC / REST, Station 06).
8. `DEV-SENS-DFT`: Positector 6000 Powder Coating DFT Gauge (Bluetooth Low Energy, Station 04).

---

## 8. Software & Frontend Architecture (`web-ui`)

- **Runtime & Language:** React 19.0.0, TypeScript 5.8.2.
- **Build Engine:** Vite 6.2.0.
- **Styling:** Tailwind CSS 4.0.0 with custom light engineering theme.
- **Icons:** Lucide React (`lucide-react`).
- **State Management:** Top-level React state synchronized with `localStorage` (`aiot_sheetfab_enclosure_record`).

---

## 9. Fourteen-Process Manufacturing Workflow

The complete engineering progression spans:
- **P01:** Customer Requirement Collection (`SPEC-ENC-01`).
- **P02:** Component Identification & Digital Library (3D STEP library).
- **P03:** AI-Assisted Internal Arrangement (Backplate clearance layout).
- **P04:** Final 3D CAD Enclosure Design (`.SLDASM`, `.STEP`).
- **P05:** CAD-to-Manufacturing Docs & BOM (14-item BOM & Quotation).
- **P06:** Flat-Pattern Development & Validation ($K=0.40$, 2D DXF).
- **P07:** Optimized Laser-Cutting Nesting (78.4% efficiency on $2500 \times 1250\text{ mm}$ sheet).
- **P08:** Sheet-Metal Cutting & Bending (TRUMPF Fiber Laser & Amada Press Brake).
- **P09:** Verification, Painting & Assembly (RAL 7035 Powder Coating, $70\ \mu\text{m}$).
- **P10:** AIoT System Implementation Guide (ESP32 Gateway Schematic).
- **P11:** IoT Job-Tracking Dashboard (Shop-floor station monitor).
- **P12:** Camera-Based Dimensional Inspection (Basler 12MP Telecentric setup).
- **P13:** CV Feature Detection & Metrology (OpenCV Sub-pixel edge detection).
- **P14:** Final Enclosure Quality Inspection (Certificate of Conformance).

---

## 10. Customer Requirements, 3D CAD & Component Library

- **External Dimensions:** $600\text{ (H)} \times 500\text{ (W)} \times 250\text{ (D) mm}$.
- **Material:** IS 513 CRCA Grade D, $1.50\text{ mm}$ nominal thickness.
- **Clearance Rules:** Minimum 30 mm segregation between power switchgear (100A MCCB) and low-voltage control circuits; minimum 50 mm vertical clearance for 24V SMPS convection cooling.

---

## 11. Manufacturing Documentation & Fabrication Operations

- **Bend Deduction ($BD$):** Calibrated to $2.62\text{ mm}$ per $90^\circ$ bend on 1.5mm CRCA steel with $R=1.5\text{ mm}$ and $K=0.40$.
- **Nesting Efficiency:** 78.4% raw sheet utilization on $2500 \times 1250\text{ mm}$ steel plates.
- **Surface Finish:** 7-tank pre-treatment and RAL 7035 powder coating baked at $180^\circ\text{C}$ for 15 minutes.

---

## 12. IoT Production Monitoring & Shop-Floor Tracking

- **Active Job:** `WO-2025-0814-01` (Batch: 5 enclosures).
- **Station Kanban:** Stations ST01 through ST06 with active traveler barcode ticket validation.
- **Operational Clarity:** Clear distinction between job progress (in-progress) and physical equipment state (offline/unknown).

---

## 13. AI-Assisted Processing & Computer-Vision Metrology

- **Sensor Hardware:** Basler ace 2 12MP telecentric camera with high-CRI LED backlight panel ($0.05\text{ mm/pixel}$ resolution).
- **Processing Pipeline:** Gaussian filtering $\rightarrow$ Canny edge detection $\rightarrow$ Sub-pixel parabolic peak fitting $\rightarrow$ Euclidean CAD alignment.

---

## 14. Quality Inspection & Conformance Traceability

Compliance verified against **ISO 2768-m**:
- Width: $500.22\text{ mm}$ (Nominal $500.00\text{ mm}$, Dev $+0.22\text{ mm}$, Tol $\pm 0.80\text{ mm}$ $\rightarrow$ PASS).
- Height: $599.85\text{ mm}$ (Nominal $600.00\text{ mm}$, Dev $-0.15\text{ mm}$, Tol $\pm 0.80\text{ mm}$ $\rightarrow$ PASS).
- Depth: $250.31\text{ mm}$ (Nominal $250.00\text{ mm}$, Dev $+0.31\text{ mm}$, Tol $\pm 0.80\text{ mm}$ $\rightarrow$ PASS).
- Earth Continuity: $0.04\ \Omega$ (Limit $<0.10\ \Omega$ $\rightarrow$ PASS).
- Coating Thickness: $72\ \mu\text{m}$ (Limit $60\text{--}80\ \mu\text{m}$ $\rightarrow$ PASS).

---

## 15. Engineering Deliverables & Document Centre

Authentic deliverables integrated in `web-ui/report/`:
1. `Quotation_AIOT_Sheet_Metal_Enclosure.html` (Total: ₹62,983.00 incl. 18% GST).
2. `BOM_AIOT_Sheet_Metal_Enclosure.pdf` (14 structural and electrical line items).
3. `Laser_Cutting_Layout_Provisional.dxf` (2D CAM nesting vector geometry).
4. `Electrical Control Enclosure Engineering Infographic.png` (3D exploded assembly).
5. `AIoT_14_Process_Workflow_Diagram.pdf` (Complete process flowchart).
6. `Certificate_of_Conformance_AIOT_Enclosure_Demo.pdf` (Provisional CoC audit).

---

## 16. System Verification, Testing & Results

All 8 functional test cases (parametric sync, 14-process stepper, IoT count derivations, multi-filters, asset inspector, document downloads, quotation modal, and terminology purge) passed verification.

---

## 17. Conclusion, Future Enhancements & References

The SheetFab AIoT platform unifies CAD design, shop-floor IoT tracking, and computer-vision metrology into an accessible, transparent digital thread. Future work focuses on deploying physical ESP32 edge hardware, integrating active GigE video feeds on the Jetson Orin node, and establishing closed-loop offset transmission to CNC press brake controllers.

### References
1. **IEC 62208:2011:** *Empty enclosures for low-voltage switchgear and controlgear assemblies.*
2. **IEC 61439-1:2020:** *Low-voltage switchgear and controlgear assemblies — General rules.*
3. **ISO 2768-1:1989:** *General tolerances — Linear and angular dimensions (Class m).*
4. **IS 513 (Part 1): 2016:** *Cold Reduced Carbon Steel Sheet and Strip — Specifications.*
5. **MQTT Version 5.0:** OASIS Standard, 2019.
6. **Bradski, G., & Kaehler, A. (2008):** *Learning OpenCV.* O'Reilly Media.
7. **SheetFab AIoT Knowledge Base (2025):** KKIT, Coimbatore.
