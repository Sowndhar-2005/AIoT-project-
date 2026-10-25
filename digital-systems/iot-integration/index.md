---
type: "Integration"
title: "IoT Edge Telemetry, Message Broker & Event Streaming Specification"
description: "Hardware edge gateway design, MQTT topic taxonomies, sensor hardware interfaces, telemetry schemas, and failure recovery protocols."
resource: "digital-systems/iot-integration/index.md"
tags:
  - iot
  - mqtt
  - telemetry
  - edge-gateway
  - esp32
timestamp: "2026-10-25T18:50:00"
domain: "Digital Systems & AIoT"
status: "Authoritative Systems Specification"
---

# IoT Edge Telemetry, Message Broker & Event Streaming Specification

This document defines the physical hardware interfaces, edge computing architecture, MQTT messaging schemas, and network resilience protocols connecting factory machinery to the digital platform.

---

## 1. Edge Hardware & Sensor Tier

### Edge Gateway Specification (ESP32-S3 / Industrial Raspberry Pi IPC)
- **Controller Core**: Dual-core Xtensa LX7 (ESP32-S3) or ARM Cortex-A72 Industrial IPC.
- **Physical Connectivity**: Isolated RS-485 / Modbus-RTU, optocoupled digital GPIO (24V industrial logic), 10/100 Ethernet (RJ45), 2.4 GHz Wi-Fi (802.11 b/g/n).
- **Power & Isolation**: 24V DC DIN-rail power supply with optical galvanic isolation (2.5 kV) protecting microelectronics from machine motor noise and ground loops.

### Shop-Floor Machine Sensor Tap Points
1. **CNC Fiber Laser Cutter**:
   - *Assist Gas Pressure*: 4–20 mA pressure transducer tapped into nitrogen/oxygen supply lines (0–30 bar).
   - *Beam State*: Non-invasive Hall-effect current clamp on main fiber laser power supply rail ($I > 15\text{ A}$ indicates active cutting beam).
   - *Operator Barcode Wedge*: USB HID handheld 2D scanner connected to edge IPC.
2. **CNC Press Brake**:
   - *Ram Stroke & Cycle*: Optical proximity switch detecting upper beam return-to-top dead center (TDC) to log bend hit counts.
   - *Hydraulic Pressure*: Pressure sensor logging peak forming tonnage.

---

## 2. MQTT Topic Taxonomy & Message Schemas

The platform enforces a structured hierarchical topic space:
```
factory/
├── workcenter/
│   ├── {workcenter_id}/
│   │   ├── events       (QoS 1: Discrete status transitions, cycle completion)
│   │   ├── telemetry    (QoS 0: High-frequency telemetry: pressure, power, temp)
│   │   └── state        (QoS 1, Retained: Online, Offline, Fault, Idle)
└── operator/
    └── {station_id}/
        └── scans        (QoS 1: Barcode scans, traveler routing)
```

### Telemetry Stream Payload (`telemetry`)
Published every 5 seconds during active machine execution:
```json
{
  "workcenter_id": "WC-LASER-01",
  "timestamp": "2026-10-25T14:45:00.000Z",
  "state": "RUNNING",
  "telemetry": {
    "current_amps": 18.4,
    "assist_gas_pressure_bar": 14.2,
    "head_temperature_c": 34.6,
    "beam_on_seconds": 128
  }
}
```

---

## 3. Network Resilience & Offline Buffering

Industrial Wi-Fi and shop-floor networks experience periodic dropouts. The edge firmware implements an automated **Store-and-Forward** architecture:
1. **Local Ring Buffer**: When the MQTT broker connection drops, events are written to local non-volatile SPI flash or an onboard SQLite database (up to 50,000 events / 7 days capacity).
2. **Reconnection & Replay**: Upon broker reconnection, the gateway drains the buffer, publishing stored events in chronological order with their original edge timestamps.
3. **Heartbeat Watchdog**: The backend marks machine state as `STALE_TELEMETRY` if no heartbeat is received for 60 seconds, preventing false assumptions of active operation.
