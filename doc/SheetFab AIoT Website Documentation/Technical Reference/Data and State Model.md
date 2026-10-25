---
type: "Technical Reference"
title: "Data and State Model"
status: "documented"
tags:
  - sheetfab-aiot
  - typescript
  - data-model
  - state-management
---

# Technical Reference: Data and State Model

This reference defines the core TypeScript interfaces, data models, and persistence mechanisms that drive the SheetFab AIoT platform.

---

## 📐 1. Enclosure Record Model (`EnclosureRecord`)

Defined in `src/data/projectData.ts`:

```typescript
export interface EnclosureRecord {
  // Dimensions
  heightMm: number;          // Default: 600
  widthMm: number;           // Default: 500
  depthMm: number;           // Default: 250
  sheetThicknessMm: number;  // Default: 1.5

  // Materials & Finish
  materialGrade: string;      // E.g. 'IS 513 CRCA Grade D'
  finishType: string;         // E.g. 'RAL 7035 Powder Coat (60-80 um)'
  ipRating: string;           // E.g. 'IP66 Dual Gasket'
  doorHinge: 'left' | 'right';// Default: 'right'
  batchQuantity: number;      // Default: 5

  // Commercial & Timing
  targetDeliveryDays: number; // Default: 14
  calculatedCostInr: number;  // Default: 62983

  // Release Sign-off State
  isReleased: boolean;        // Default: false (Honest engineering state)
  inspectorName: string;      // Default: '' (Unassigned)
  releaseDate: string;        // Default: ''
}
```

### Persistence Logic
- **Key**: `'aiot_sheetfab_enclosure_record'` in browser `localStorage`.
- **Initialization**: Automatically deserialized on application mount in `App.tsx`.
- **Synchronization**: Any change submitted in `RequirementsSection` or `FinalDocsSection` calls `onUpdateRecord()`, which triggers an immediate `localStorage.setItem()` call.

---

## 📡 2. Industrial IoT Device Model (`IoTDevice`)

Defined in `src/data/iotDeviceData.ts`:

```typescript
export interface IoTTelemetryField {
  key: string;              // E.g. 'laser_power_kw'
  label: string;            // E.g. 'Laser Output Power'
  unit: string;             // E.g. 'kW'
  dataType: 'float' | 'integer' | 'boolean' | 'string';
  description: string;      // Field description
}

export interface IoTDeviceEvent {
  timestamp: string;        // ISO format or plant timestamp
  level: 'info' | 'warning' | 'error';
  message: string;          // Event message
}

export interface IoTDevice {
  id: string;               // Unique device ID, e.g. 'DEV-LASER-01'
  name: string;             // Human readable name
  category: 'machine' | 'edge-device' | 'sensor' | 'camera' | 'service';
  connectionStatus: 'connected' | 'disconnected' | 'unknown';
  operationalStatus: 'running' | 'idle' | 'warning' | 'fault' | 'unavailable';
  stationId: string;        // E.g. 'ST-01', 'ST-06'
  stationName: string;      // E.g. 'Station 01: Laser Cutting'
  relatedProcessId: number; // Links to P01-P14
  protocol: string;         // E.g. 'OPC-UA / TCP', 'MQTT (Port 1883)'
  mqttTopic?: string;       // Target telemetry topic
  hardwareProfile?: string; // Controller/CPU specs
  telemetryFields: IoTTelemetryField[];
  recentEvents: IoTDeviceEvent[];
  source: 'configured' | 'mock' | 'live'; // Distinguishes real telemetry
}
```

### Data Honesty Principle
In `INITIAL_IOT_DEVICES`, all devices are initialized with:
- `connectionStatus: 'unknown'`
- `operationalStatus: 'unavailable'`
- `source: 'configured'`

This prevents the dashboard from claiming that physical machine tools are active before physical network deployment.

---

## 🏭 3. Manufacturing Process Model (`ProcessItem`)

Defined in `src/data/projectData.ts`:

```typescript
export interface ProcessItem {
  id: number;               // 1 to 14
  title: string;            // E.g. 'Customer Requirement Collection'
  domain: string;           // E.g. 'Manufacturing', 'Digital Systems', 'Quality Metrology'
  shortDesc: string;        // 1-line summary
  fullDesc: string;         // Comprehensive engineering explanation
  inputs: string[];         // Required upstream engineering inputs
  outputs: string[];        // Generated engineering deliverables
  tools: string[];          // Software and machine tools used
  image: string;            // Visual screenshot or diagram path
}
```

---

## 🔗 Related Pages
- [[Website Architecture]]
- [[Technical Reference/Routes and Components|Routes and Components]]
- [[Screen Documentation/IoT Management|IoT Management Screen]]
