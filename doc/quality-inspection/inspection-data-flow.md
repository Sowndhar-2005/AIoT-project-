---
type: "InspectionMethod"
title: "Optical Metrology Data Flow, Calibration & Review Protocols"
description: "Detailed pipeline mapping image acquisition, telecentric correction, edge detection, CAD comparison, and human inspector review gates."
resource: "quality-inspection/inspection-data-flow.md"
tags:
  - metrology-data-flow
  - optical-pipeline
  - image-processing
  - opencv
timestamp: "2026-10-25T18:50:00"
domain: "Quality Inspection & Metrology"
status: "Authoritative Engineering Reference"
---

# Optical Metrology Data Flow, Calibration & Review Protocols

This document defines the computational pipeline, data exchange interfaces, and human review gates governing optical inspection.

```mermaid
sequenceDiagram
    autonumber
    participant Rig as Optical Inspection Rig (Camera & Backlight)
    participant Edge as Edge IPC Vision Controller
    participant S3 as MinIO Object Storage
    participant CV as OpenCV Analytical Service
    participant DB as PostgreSQL Inspection DB
    actor Inspector as Certified Quality Inspector

    Rig->>Edge: Capture Raw 20MP Silhouette Frame (5472 × 3648 px)
    Edge->>Edge: Undistort Frame using Active Calib Matrix (K & D)
    Edge->>S3: Upload Calibrated Frame (/images/raw/{id}.png)
    Edge->>CV: Trigger Feature Detection Request (image_url, nominal_dxf_url)
    
    CV->>CV: Sub-Pixel Canny Edge Extraction & Contour Splitting
    CV->>CV: Iterative Closest Point (ICP) Geometric Alignment with DXF
    CV->>CV: Compute Feature Deviations vs. ISO 2768-m Limits
    CV->>S3: Upload Annotated Vector Deviation Map (/images/annotated/{id}.png)
    CV->>DB: Record Feature Measurements & Pass/Flag State
    
    DB-->>Inspector: Render Interactive Metrology Screen on QA Workstation
    alt All Features Within Tolerances
        Inspector->>DB: Confirm Measurement & Mark "PASS_CANDIDATE"
    else Deviations Detected
        Inspector->>DB: Flag Discrepancies; Initiate Non-Conformance (NCR)
    end
```
