---
type: "Glossary"
title: "Engineering, Digital Systems, AIoT & Quality Metrology Glossary"
description: "Comprehensive terminology definitions covering sheet-metal manufacturing, CAD/CAM systems, IoT telemetry, artificial intelligence, and optical metrology."
resource: "glossary.md"
tags:
  - glossary
  - terminology
  - sheet-metal
  - aiot
  - metrology
timestamp: "2026-10-25T18:50:00"
domain: "Master"
status: "Authoritative Reference"
---
# Engineering, Digital Systems, AIoT & Quality Metrology Glossary

This glossary establishes standard definitions across the manufacturing, software, AI, IoT, and metrology domains of the AIoT Sheet-Metal Fabrication Platform.

---

## 1. Sheet-Metal Engineering & Fabrication

### Bend Allowance (BA)
The arc length of the neutral axis between the bend lines in a sheet-metal part. Calculated using:
$$BA = \frac{\pi}{180} \cdot (\theta) \cdot (R + K \cdot T)$$
where $\theta$ is bend angle, $R$ is internal bend radius, $K$ is K-factor, and $T$ is sheet thickness.

### Bend Deduction (BD)
The difference between the sum of the flange lengths (setback dimensions) and the total flat-pattern length:
$$BD = 2 \cdot OSSB - BA$$
where $OSSB$ is the Outside Setback.

### K-Factor
The ratio of the neutral axis location to the material thickness ($t/T$). For mild steel (CRCA) bent on standard air-bend V-dies, the empirical K-factor typically ranges between 0.33 and 0.42.

### Neutral Axis
The geometric line within a sheet-metal bend where the material fibers experience neither tension nor compression during forming.

### CRCA (Cold Rolled Close Annealed)
Mild steel sheets processed through cold rolling followed by batch or continuous annealing, providing tight thickness tolerances, smooth surface finish, and predictable bending behavior for enclosure manufacturing.

### DIN Rail
A standard metal rail widely used for mounting circuit breakers, terminal blocks, industrial control relays, and power supplies inside equipment racks and electrical enclosures (typically 35 mm top-hat rail according to IEC 60715).

### Gland Plate
A removable sheet-metal plate located on the bottom, top, or sides of an electrical enclosure, designed with cutouts or knockouts for cable gland entry while maintaining the enclosure's IP (Ingress Protection) rating.

### Laser Kerf
The width of material vaporized or removed during the laser beam cutting process (typically 0.15 mm to 0.25 mm for 1.5–2.0 mm mild steel using nitrogen or oxygen assist gas). Must be compensated in CAM post-processing.

### Nesting
The geometric optimization process of arranging flat sheet-metal part profiles onto standard stock sheets (e.g., 2500 mm × 1250 mm) or usable remnant sheets to maximize material utilization and minimize scrap tonnage.

### Remnant (Drop Sheet)
An irregular or cut sheet remaining after a nesting run that contains sufficient contiguous surface area (e.g., > 300 mm × 300 mm) to justify returning to stock inventory rather than disposing as scrap.

---

## 2. CAD, CAM & Software Integration

### STEP (Standard for the Exchange of Product Model Data, ISO 10303)
An application-independent CAD exchange standard (primarily AP203/AP214/AP242) used to transfer solid geometry, assembly structure, and PMI between heterogeneous CAD platforms (SOLIDWORKS, FreeCAD, CADcraft).

### DXF (Drawing Exchange Format)
An open vector data format developed by Autodesk used in this platform as the primary 1:1 scale exchange standard for flat-pattern cut geometry sent to laser CAM nesting engines.

### SOLIDWORKS
A parametric 3D feature-based CAD modeling software widely used for mechanical and sheet-metal design. Supports automated design tables, sheet-metal unfolding algorithms, and COM/VBA API automation.

### AutoCAD
A 2D/3D computer-aided design and drafting application developed by Autodesk, primarily used for electrical wiring schematics, panel general arrangement (GA) drawings, and DWG/DXF creation.

### CADcraft
A high-performance open-source 2D CADD drafting engine built in Rust focusing on AutoCAD-style command-line drafting, layers, blocks, and native DXF/DWG file parsing. (Distinguished from its sibling 3D parametric engine SolidCraft).

---

## 3. Digital Systems, IoT & Telemetry

### Job ID
The immutable primary key and system-wide correlation token representing a distinct customer fabrication order as it traverses requirements, CAD modeling, CAM nesting, shop-floor fabrication, and inspection.

### Work Order (WO)
An operational subdivision of a Job ID assigned to a specific workshop work center (e.g., Laser Cutting Station, Press Brake Station, Assembly Bay) detailing targeted parts, quantities, and tooling instructions.

### Edge Device
A microcontroller (ESP32) or single-board computer (Raspberry Pi / Industrial IPC) located at the physical machine tool that interfaces with hardware sensors, acquires telemetry, and publishes structured events to the central broker.

### MQTT (Message Queuing Telemetry Transport)
A lightweight publish-subscribe network protocol (ISO/IEC 20922) designed for constrained devices and low-bandwidth/high-latency industrial networks, utilized for streaming shop-floor machine telemetry.

### Event Sourcing / Event Log
An architectural paradigm where state changes (e.g., `JOB_STARTED`, `LASER_CUT_COMPLETED`, `INSPECTION_FAILED`) are permanently recorded as an immutable, timestamped chronological ledger.

---

## 4. Artificial Intelligence & Microservices

### Human-in-the-Loop (HITL)
A governance principle requiring explicit human verification and manual approval before any AI-generated layout, quotation, or inspection decision can be promoted to an authoritative manufacturing record.

### Optical Feature Detection
The application of computer vision algorithms (e.g., Canny edge detection, Hough circles, contour analysis) to isolate physical part boundaries, mounting holes, and bend reliefs from digital camera frames.

### Nesting Heuristics
Mathematical optimization algorithms (e.g., Genetic Algorithms, Simulated Annealing, No-Fit Polygon algorithms) applied to determine optimal 2D rotational placement of sheet-metal blanks.

---

## 5. Quality Assurance & Metrology

### ISO 2768-m
The international tolerance standard governing linear and angular dimensions produced by machining or fabrication without individual tolerance indications. Designates medium fabrication tolerances (e.g., ±0.3 mm for 30–120 mm spans, ±0.5 mm for 120–400 mm spans).

### Telecentric Lens
A specialized optical lens featuring entrance or exit pupils at infinity, providing orthographic projection. This eliminates optical perspective error (parallax) so objects closer to or further from the camera appear at identical magnification across the field of view.

### Fiducial Marker
An optical reference mark (such as a high-contrast checkerboard, circle grid, or ArUco marker) permanently affixed to an inspection staging table with micrometric precision to establish physical coordinate calibration (pixels per millimeter).

### Inspection Certificate (CoC)
A signed quality document binding a fabricated enclosure's serial number and Job ID to its optical measurement logs, surface finish checks, functional hardware tests, and QA inspector sign-off.
