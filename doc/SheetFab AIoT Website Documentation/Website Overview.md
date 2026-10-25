---
type: "System Overview"
title: "Website Overview"
status: "documented"
tags:
  - sheetfab-aiot
  - system-architecture
  - engineering-overview
---

# Website Overview — SheetFab AIoT Platform

The **SheetFab AIoT Smart Sheet-Metal Fabrication Platform** (`web-ui`) is a specialized industrial web application designed to bridge computer-aided engineering (CAD), manufacturing execution systems (MES), industrial IoT device tracking, and computer-vision metrology into a single, cohesive operator interface.

---

## 🎯 Purpose & Scope

The application serves as the primary digital touchpoint for sheet-metal manufacturing engineers, plant supervisors, quality assurance inspectors, and commercial estimators. It coordinates:

1. **Parametric Enclosure Customization**: Ingesting customer spatial dimensions (Height, Width, Depth), material grades, IP ingress protection ratings, and door hinge orientations.
2. **Manufacturing Process Transparency**: Providing deep technical documentation and step-by-step guidance for all 14 stages of sheet metal enclosure realization.
3. **Internal Component Arrangement**: Managing DIN rails, wire ducts, circuit breakers (MCCB/MCB), power supplies, and thermal clearance boundaries.
4. **Shop-Floor Job Tracking**: Tracking fabrication lots through cutting, CNC bending, welding, powder coating, and final assembly stations.
5. **Industrial IoT Monitoring**: Registering and inspecting machine tools, micro-controllers (ESP32), telecentric cameras, and edge computing nodes across the shop floor.
6. **Optical Metrology Inspection**: Evaluating fabricated parts against CAD nominal models using OpenCV-based contour and edge detection.
7. **Engineering Document Release**: Hosting, validating, previewing, and dispensing verified project deliverables (Quotations, BOMs, DXF cut patterns, and quality records).

---

## 🏗️ Operational Boundary & Technical Profile

| Characteristic | Specification / Current Implementation |
|---|---|
| **Frontend Framework** | React 19.0.0 + TypeScript 5.8.2 |
| **Bundler & Build Tool** | Vite 6.2.0 |
| **Styling Architecture** | Tailwind CSS 4.0.0 (Vanilla CSS utility classes, light theme) |
| **Icons Library** | Lucide React (`lucide-react`) |
| **State Management** | React hooks (`useState`, `useEffect`) + `localStorage` persistence |
| **Physical Hardware Status** | Frontend Interface with defined boundaries. Real hardware integration is **Awaiting Gateway/Broker Connection**. |
| **Backend / Database** | None currently connected. Application operates autonomously in offline/mock-data mode. |
| **Repository Path** | `d:\Study\IOT Design and Deployment\iot project\web-ui` |
| **Static Deliverables Path** | `d:\Study\IOT Design and Deployment\iot project\web-ui\public\report` |

---

## 📐 High-Level Architecture Diagram

```mermaid
graph TD
    User([Shop Floor Operator / Engineer]) --> UI[SheetFab AIoT Web Application]
    
    subgraph UI_Modules["SheetFab Frontend Modules"]
        direction TB
        M1["1. Project Overview"]
        M2["2. Enclosure Specs"]
        M3["3. Manufacturing Workflow (P01-P14)"]
        M4["4. CAD & Component Library"]
        M5["5. Production Tracking"]
        M6["6. IoT Management"]
        M7["7. Quality Inspection"]
        M8["8. Final Enclosure & Documents"]
    end
    
    UI --> UI_Modules
    
    subgraph State_Storage["Client-Side State"]
        LS[("localStorage: aiot_sheetfab_enclosure_record")]
        MEM["React State Context (iotDeviceData, projectData)"]
    end
    
    M2 <--> LS
    M1 <--> LS
    M8 <--> LS
    M6 <--> MEM
    
    subgraph Future_Integration["Industrial IoT & Hardware Boundary (Planned)"]
        L1["Sensors & Machines (TRUMPF Laser, Amada Press Brake, Basler Cam)"]
        L2["Edge Gateways (ESP32-WROOM, Jetson AGX Orin)"]
        L3["EMQX MQTT Broker (Port 1883/8883)"]
    end
    
    M6 -.->|Defined Data Interface| L3
    M5 -.->|Barcode / Station Events| L2
```

---

## 🔗 Related Documents

- [[Navigation and Screen Index]]
- [[UI Design System]]
- [[Website Architecture]]
- [[Screen Documentation/Project Overview|Project Overview Screen]]
- [[Screen Documentation/IoT Management|IoT Management Screen]]
- [[Technical Reference/Known Limitations|Known Limitations]]
