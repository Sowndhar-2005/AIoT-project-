---
type: "Architecture Specification"
title: "Website Architecture"
status: "documented"
tags:
  - sheetfab-aiot
  - software-architecture
  - react
  - vite
  - component-hierarchy
---

# Website Architecture — SheetFab AIoT Platform

This document describes the software structure, component tree, state management patterns, and system integration boundaries of the SheetFab AIoT frontend application (`web-ui`).

---

## 🏗️ Technology Stack & Dependencies

```text
React 19.0.0 (Core Component Runtime)
├── TypeScript 5.8.2 (Type Safety & Domain Model Definitions)
├── Vite 6.2.0 (Modern ESBuild & HMR Development Server)
├── Tailwind CSS 4.0.0 (Atomic Styling Engine & Layout Utilities)
└── Lucide React 1.16.0 (Consistent Industrial & Technical Vector Icons)
```

The application is completely self-contained on the client side. It runs without an external Node/Python backend server, persisting user edits and session state locally.

---

## 🌲 Component Hierarchy & Data Flow

The component architecture is strictly hierarchical, driven by top-level coordination in `App.tsx`:

```mermaid
graph TD
    App["App.tsx\n(Global State: currentTab, enclosureRecord, selectedProcessId)"]
    
    App --> Sidebar["Sidebar.tsx\n(Navigation, Enclosure Mini-Spec, Reset Action)"]
    App --> Header["Header.tsx\n(Breadcrumb, Global Search, Active Tab Title)"]
    App --> Main["main (Scrollable Body)"]
    
    Main --> Screen1["OverviewSection.tsx"]
    Main --> Screen2["RequirementsSection.tsx"]
    Main --> Screen3["ManufacturingSection.tsx"]
    Main --> Screen4["CADSection.tsx"]
    Main --> Screen5["TrackingSection.tsx"]
    Main --> Screen6["IoTManagementSection.tsx"]
    Main --> Screen7["QualitySection.tsx"]
    Main --> Screen8["FinalDocsSection.tsx"]
    
    App --> GlobalModal["Process Detail Modal\n(App.tsx: Lines 154-232)"]
    Screen8 --> PrevModal["Document Preview Modal\n(FinalDocsSection.tsx)"]
    Screen3 --> WorkModal["Process Lightbox Modal\n(ManufacturingSection.tsx)"]
    
    subgraph SharedData["Shared Data Stores & Models"]
        PD["data/projectData.ts\n(DEFAULT_ENCLOSURE_RECORD, PROCESSES_DATA)"]
        ID["data/iotDeviceData.ts\n(INITIAL_IOT_DEVICES, IoTDevice Interface)"]
    end
    
    Screen1 -.-> PD
    Screen2 -.-> PD
    Screen3 -.-> PD
    Screen6 -.-> ID
    Screen8 -.-> PD
```

---

## 💾 State Management & Persistence

The application employs a dual-tier state strategy:

### 1. Persistent Enclosure Specification (`EnclosureRecord`)
- Stored under `localStorage` key: `'aiot_sheetfab_enclosure_record'`.
- Initialized from `DEFAULT_ENCLOSURE_RECORD` if no storage key exists.
- Propagates downwards to `RequirementsSection`, `OverviewSection`, `FinalDocsSection`, and `Sidebar`.
- Modifications made in `RequirementsSection` (e.g. dimension adjustments, material changes) trigger automatic reactive updates across all dependent screens.

### 2. Transient In-Memory State
- Active tab selection (`currentTab`).
- Search filtering terms (`searchQuery`).
- Selected process inspector modal ID (`selectedProcessId`).
- IoT device filters (`categoryFilter`, `connectionFilter`, `operationalFilter`).
- Selected IoT device detail inspector (`selectedDevice`).

---

## 📡 Industrial IoT & System Integration Boundaries

The application is architected with clear boundaries separating implemented UI models from physical hardware:

```mermaid
flowchart LR
    subgraph Frontend_App["SheetFab AIoT Frontend (Implemented)"]
        UI_Table["Equipment Status Table"]
        UI_Card["Device Overview Cards"]
        UI_Insp["Device Detail Inspector"]
        Model["Shared IoT Device Model\n(iotDeviceData.ts)"]
        
        UI_Table <--> Model
        UI_Card <--> Model
        UI_Insp <--> Model
    end
    
    subgraph Boundary["Integration Boundary (Planned Services)"]
        direction TB
        API["Future REST / WebSocket API Gateway"]
        MQTT["EMQX Enterprise MQTT Broker\n(Port 1883 / 8883)"]
    end
    
    subgraph Field_Level["Physical Plant Floor (Level 0 - Level 2)"]
        direction TB
        M1["TRUMPF Fiber Laser"]
        M2["Amada CNC Press Brake"]
        GW["ESP32 Edge Gateways"]
        CAM["Basler Telecentric Cam"]
    end
    
    Model -.->|"Future Client Subscription"| API
    API -.-> MQTT
    MQTT <--> GW
    GW <--> M1
    GW <--> M2
    CAM -.-> API
```

### Data Honesty Principle
The current frontend intentionally declares all field hardware as **Not Connected** or **Status Unknown**. It does not fabricate live sensor waveforms, animate pseudo-timestamps, or simulate false MQTT message receipts, ensuring engineering documentation integrity.

---

## 🔗 Related Pages

- [[UI Design System]]
- [[Navigation and Screen Index]]
- [[Technical Reference/Data and State Model|Data and State Model]]
- [[Technical Reference/Routes and Components|Routes and Components Reference]]
- [[Technical Reference/Known Limitations|Known Limitations]]
