---
type: "Technical Reference"
title: "Known Limitations"
status: "documented"
tags:
  - sheetfab-aiot
  - technical-reference
  - limitations
  - boundaries
---

# Technical Reference: Known Limitations and System Boundaries

To maintain strict academic and professional engineering integrity, this document explicitly records all current system boundaries, unverified features, and planned future integrations for the SheetFab AIoT platform.

---

## 🚫 1. Hardware & Shop-Floor Integration Boundaries

| Subsystem | Implemented Frontend Capability | Current System Limitation / Unimplemented Boundary |
|---|---|---|
| **Industrial IoT Network** | Configured asset registry with 8 equipment profiles, schema definitions, and connection filters (`IoTManagementSection.tsx`). | **No Live Broker Connection**: Devices are not connected to a live EMQX/Mosquitto MQTT broker over TCP/WebSocket. Status is statused as *Status Unknown*. |
| **CNC Machine Tools** | TRUMPF TruLaser and Amada Press Brake records, station assignments, and protocol tags. | **No Live OPC-UA / Modbus Polling**: The frontend does not read real PLC registers, axis coordinates, or laser assist gas pressures. |
| **Edge Gateways** | ESP32-WROOM-32E and Jetson AGX Orin device configurations and telemetry key mappings. | **No Physical Microcontroller Stream**: No physical microcontroller is transmitting live JSON packets to the web browser. |
| **Barcode Scanner** | Interactive traveler barcode simulation with format validation (`TrackingSection.tsx`). | **No Physical USB/Bluetooth Handshake**: Requires keyboard/virtual entry rather than an integrated hardware driver. |

---

## 🔍 2. Computer-Vision & Quality Assurance Boundaries

| Subsystem | Implemented Frontend Capability | Current System Limitation / Unimplemented Boundary |
|---|---|---|
| **Optical Metrology Viewport** | Calibrated reference workpiece image with sub-pixel edge detection overlay (`QualitySection.tsx`). | **Offline Image Model**: Renders a calibrated benchmark reference image rather than streaming from a live GigE camera sensor. |
| **Metrology Deviation Table** | 6 dimensional checks evaluated against ISO 2768-m medium class tolerances. | **Static Reference Matrix**: Measurements reflect verified laboratory baseline results rather than continuous real-time part measurement. |
| **Certificate of Conformance** | Formatted compliance certificate with download option (`Certificate_of_Conformance_AIOT_Enclosure_Demo.pdf`). | **Provisional Status**: Explicitly labeled *Inspection Pending*. The application does not claim physical stamp approval. |

---

## 💾 3. Persistence & Application Architecture Boundaries

1. **Client-Side Storage**:
   - Application configuration relies on browser `localStorage` (`aiot_sheetfab_enclosure_record`).
   - Clearing browser cache or switching devices resets values back to default constants.
2. **No Multi-User Authorization**:
   - There are currently no user login roles (Operator, Plant Supervisor, QA Auditor).
3. **Static File Serving**:
   - Deliverables in `/report/` are statically served via Vite. Dynamically generating fresh DXF patterns from user-entered dimensions requires a server-side CAD kernel (e.g. FreeCAD Python script).

---

## 🔗 Related Pages
- [[Website Overview]]
- [[Website Architecture]]
- [[Technical Reference/Data and State Model|Data and State Model]]
- [[Documentation Audit]]
