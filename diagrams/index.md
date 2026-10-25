---
type: "Index"
title: "Master Architectural & Engineering Diagrams Index"
description: "Central repository of standalone Mermaid engineering diagrams modeling the manufacturing workflow, digital system topology, and optical inspection pipeline."
resource: "diagrams/index.md"
tags:
  - diagrams
  - mermaid
  - architecture
  - workflow
timestamp: "2026-10-25T18:50:00"
domain: "Master"
status: "Authoritative Reference"
---

# Master Architectural & Engineering Diagrams Index

This directory provides the authoritative, validated standalone Mermaid diagram definitions modeling the platform.

---

## 1. Diagram Catalog

### [Overall Manufacturing & Quality Workflow (`overall-workflow.mmd`)](overall-workflow.mmd)
Models the linear manufacturing sequence from Process 01 through Process 09, digital IoT telemetry streaming into Process 11, optical inspection in Processes 12–13, and the final quality release gate in Process 14 with rework feedback loops.

```mermaid
flowchart TD
    subgraph ManufacturingDomain["Domain 1: Manufacturing Engineering"]
        P1["Process 01: Customer Requirement Collection"] --> P2["Process 02: Component Identification & Digital Library"]
        P2 --> P3["Process 03: AI-Assisted Component Arrangement"]
        P3 --> P4["Process 04: Final 3D CAD Enclosure Design"]
        P4 --> P5["Process 05: CAD-to-Manufacturing Docs, BOM & Quotation"]
        P5 --> P6["Process 06: Flat-Pattern Development & Validation"]
        P6 --> P7["Process 07: Optimized Laser-Cutting Nesting"]
        P7 --> P8["Process 08: Cutting, Bending & Component Fabrication"]
        P8 --> P9["Process 09: Dimensional Verification, Finishing & Assembly"]
    end

    subgraph DigitalSystemsDomain["Domain 2: Digital Systems & AIoT"]
        P10["Process 10: AIoT System Implementation Architecture"]
        P11["Process 11: Real-Time IoT Job-Tracking Dashboard"]
        P8 -. "Machine Cutting & Bending Telemetry" .-> P11
        P9 -. "Assembly Completion Event" .-> P11
        P10 --- P11
    end

    subgraph QualityDomain["Domain 3: Quality Assurance & Metrology"]
        P12["Process 12: Camera Setup & Telecentric Optical Calibration"]
        P13["Process 13: CV Edge Detection & Tolerance Comparison"]
        P14["Process 14: Final QA Enclosure Acceptance & Release"]
        P8 -. "Cut Part Image" .-> P12
        P9 -. "Assembled Enclosure" .-> P14
        P12 --> P13 --> P14
    end

    P14 -- "Non-Conformance / Out-of-Tolerance" --> ReworkBay["Rework & Correction Loop"]
    ReworkBay --> P8
    P14 -- "Approved by QA Inspector" --> Dispatch["Customer Dispatch & Release"]
    P14 -. "Inspection Certificate (CoC)" .-> P11
```

---

### [Digital System Architecture (`system-architecture.mmd`)](system-architecture.mmd)
Illustrates the 5-layer software and physical topology: Physical Machinery $\to$ Edge Gateways $\to$ MQTT Broker $\to$ FastAPI Backend / PostgreSQL / MinIO $\to$ Celery AI Services $\to$ Angular Role-Based Portals.

---

### [Inspection Pipeline Architecture (`inspection-pipeline.mmd`)](inspection-pipeline.mmd)
Details the optical metrology handoff: 20MP raw frame acquisition $\to$ sub-pixel edge detection $\to$ ICP CAD DXF alignment $\to$ tolerance evaluation $\to$ inspector sign-off and Certificate of Conformance issuance.
