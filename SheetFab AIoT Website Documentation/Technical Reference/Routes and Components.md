---
type: "Technical Reference"
title: "Routes and Components"
status: "documented"
tags:
  - sheetfab-aiot
  - technical-reference
  - components
  - routes
---

# Technical Reference: Routes and Components

This reference documents the code organization, component hierarchy, source file locations, and props interfaces for the SheetFab AIoT frontend application (`web-ui`).

---

## 📁 Source Tree Structure

```text
web-ui/src/
├── App.tsx                     # Top-level state coordinator, routing switch, modal hosts
├── main.tsx                    # React 19 application entry point
├── index.css                   # Global styles, Tailwind CSS imports, font definitions
├── components/
│   ├── Sidebar.tsx             # Persistent left navigation drawer & mini-spec display
│   ├── Header.tsx              # Top app bar with search, breadcrumb, active tab title
│   ├── OverviewSection.tsx     # Tab 1: Project Overview executive dashboard
│   ├── RequirementsSection.tsx # Tab 2: Parametric Enclosure Specifications configurator
│   ├── ManufacturingSection.tsx# Tab 3: 14-Process Manufacturing Workflow & workspace
│   ├── CADSection.tsx          # Tab 4: CAD & DIN Rail Component Library workbench
│   ├── TrackingSection.tsx     # Tab 5: Shop-Floor Production Tracking (MES)
│   ├── IoTManagementSection.tsx# Tab 6: Industrial IoT Device & Equipment Manager
│   ├── QualitySection.tsx      # Tab 7: Computer-Vision Quality Inspection & Metrology
│   └── FinalDocsSection.tsx    # Tab 8: Final Enclosure Release & Document Centre
├── data/
│   ├── projectData.ts          # Core EnclosureRecord, DEFAULT_RECORD, PROCESSES_DATA (14 items)
│   └── iotDeviceData.ts        # IoTDevice model, INITIAL_IOT_DEVICES (8 equipment records)
└── public/
    └── report/                 # Static deliverables served directly to browser
        ├── Quotation_AIOT_Sheet_Metal_Enclosure.html
        ├── BOM_AIOT_Sheet_Metal_Enclosure.pdf
        ├── Laser_Cutting_Layout_Provisional.dxf
        ├── Electrical Control Enclosure Engineering Infographic.png
        ├── AIoT_14_Process_Workflow_Diagram.pdf
        └── Certificate of Conformance_AIOT_Enclosure_Demo.pdf
```

---

## 🧩 Component & Routing Directory

| Tab ID | Component Name | Source File | Key Props & Callbacks |
|---|---|---|---|
| `'overview'` | `OverviewSection` | `src/components/OverviewSection.tsx` | `enclosureRecord: EnclosureRecord`<br>`onNavigate: (tab: string) => void`<br>`onSelectProcess: (id: number) => void` |
| `'requirements'` | `RequirementsSection` | `src/components/RequirementsSection.tsx` | `enclosureRecord: EnclosureRecord`<br>`onUpdateRecord: (updated: Partial<EnclosureRecord>) => void`<br>`onNavigateToWorkflow: () => void` |
| `'manufacturing'` | `ManufacturingSection` | `src/components/ManufacturingSection.tsx` | `searchQuery: string`<br>`selectedProcessId: number \| null`<br>`onSelectProcess: (id: number \| null) => void`<br>`enclosureRecord: EnclosureRecord`<br>`onNavigate: (tab: string) => void` |
| `'cad'` | `CADSection` | `src/components/CADSection.tsx` | *(Self-contained state)* |
| `'tracking'` | `TrackingSection` | `src/components/TrackingSection.tsx` | *(Self-contained state)* |
| `'iot-management'` | `IoTManagementSection` | `src/components/IoTManagementSection.tsx` | *(Uses shared `INITIAL_IOT_DEVICES` model)* |
| `'quality'` | `QualitySection` | `src/components/QualitySection.tsx` | *(Self-contained state)* |
| `'final-docs'` | `FinalDocsSection` | `src/components/FinalDocsSection.tsx` | `enclosureRecord: EnclosureRecord`<br>`onUpdateRecord: (updated: Partial<EnclosureRecord>) => void` |

---

## 🪟 Global Modals & Dialogs

1. **Global Process Detail Modal (`App.tsx: Lines 154–232`)**:
   - Active when `selectedProcessId !== null`.
   - Triggers from process cards in `OverviewSection` or `ManufacturingSection`.
   - Displays full process technical overview, input/output badges, tools, and technical diagram.
2. **Document Preview Modal (`FinalDocsSection.tsx: Lines 188–265`)**:
   - Active when `previewDoc !== null`.
   - Displays `<iframe>` for HTML documents, zoomable `<img>` for PNG graphics, and direct tab links for PDFs.
3. **Image Lightbox Modal (`ManufacturingSection.tsx: Lines 340–370`)**:
   - Active when `showLightboxImage !== null`.
   - Expands high-resolution diagrams to maximum viewport dimensions.

---

## 🔗 Related Pages
- [[Website Architecture]]
- [[Technical Reference/Data and State Model|Data and State Model]]
- [[Navigation and Screen Index]]
