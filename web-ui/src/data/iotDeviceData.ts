// Shared Device & Component Data Model for SheetFab AIoT System

export type DeviceCategory = 
  | 'Machine' 
  | 'Edge Gateway' 
  | 'Optical Metrology' 
  | 'Sensor' 
  | 'Barcode / RFID' 
  | 'Communication Service' 
  | 'Analytics Service';

export type ConnectionStatus = 'Connected' | 'Disconnected' | 'Status Unknown';

export type OperationalStatus = 'Running' | 'Idle' | 'Warning' | 'Fault' | 'Awaiting Configuration' | 'Status Unavailable';

export interface IoTDevice {
  id: string;
  name: string;
  category: DeviceCategory;
  connectionStatus: ConnectionStatus;
  operationalStatus: OperationalStatus;
  lastSeen: string; // e.g. "Not Connected" or timestamp
  ipAddress?: string;
  macAddress?: string;
  protocol: string; // e.g. "Modbus RTU", "MQTT v5.0", "GigE Vision"
  relatedProcess: string; // e.g. "P-08: Fiber Laser Cutting"
  workstation: string; // e.g. "WC-LASER-01"
  source: 'Configured Hardware' | 'Proposed Specification' | 'Active Telemetry';
  description: string;
  telemetryFields: { name: string; unit: string; currentReading: string }[];
  recentEvents: { timestamp: string; level: 'Info' | 'Warning' | 'Alert'; message: string }[];
}

export const INITIAL_IOT_DEVICES: IoTDevice[] = [
  {
    id: "DEV-LASER-01",
    name: "3kW Fiber Laser Cutting Cell",
    category: "Machine",
    connectionStatus: "Status Unknown",
    operationalStatus: "Awaiting Configuration",
    lastSeen: "Not Connected",
    protocol: "Ethernet / Modbus TCP",
    relatedProcess: "P-08: Sheet-Metal Cutting & Bending",
    workstation: "WC-LASER-01",
    source: "Configured Hardware",
    description: "3000W Raycus Fiber Laser source with CypCut CNC controller and high-pressure nitrogen gas assist regulator.",
    telemetryFields: [
      { name: "Laser Power Output", unit: "W", currentReading: "Unavailable" },
      { name: "N2 Assist Pressure", unit: "bar", currentReading: "Unavailable" },
      { name: "Chiller Temperature", unit: "°C", currentReading: "Unavailable" },
      { name: "Nozzle Feed Rate", unit: "m/min", currentReading: "Unavailable" }
    ],
    recentEvents: [
      { timestamp: "—", level: "Info", message: "Device profile registered in manufacturing database. Awaiting network configuration." }
    ]
  },
  {
    id: "DEV-PRESS-01",
    name: "100-Ton CNC Press Brake (8-Axis)",
    category: "Machine",
    connectionStatus: "Status Unknown",
    operationalStatus: "Awaiting Configuration",
    lastSeen: "Not Connected",
    protocol: "Modbus RTU over RS-485",
    relatedProcess: "P-08: Sheet-Metal Cutting & Bending",
    workstation: "WC-BEND-01",
    source: "Configured Hardware",
    description: "Multi-axis back-gauge hydraulic press brake programmed for calibrated K=0.38 air-bending sequences.",
    telemetryFields: [
      { name: "Tonnage Applied", unit: "kN", currentReading: "Unavailable" },
      { name: "Y1/Y2 Ram Position", unit: "mm", currentReading: "Unavailable" },
      { name: "Bend Cycle Count", unit: "cycles", currentReading: "Unavailable" }
    ],
    recentEvents: [
      { timestamp: "—", level: "Info", message: "Tooling profile for 1.5mm CRCA air-bending configured." }
    ]
  },
  {
    id: "DEV-CAM-P12",
    name: "Sony IMX264 5.1MP Inspection Rig",
    category: "Optical Metrology",
    connectionStatus: "Status Unknown",
    operationalStatus: "Awaiting Configuration",
    lastSeen: "Not Connected",
    protocol: "USB3 Vision / GenICam",
    relatedProcess: "P-12: Camera-Based Dimensional Inspection",
    workstation: "WC-QA-OPTICAL-01",
    source: "Configured Hardware",
    description: "Overhead 5.1MP monochrome sensor with 16mm low-distortion telecentric lens (0.0423 mm/pixel calibrated scale).",
    telemetryFields: [
      { name: "Sensor Resolution", unit: "px", currentReading: "2448 × 2048" },
      { name: "Exposure Time", unit: "ms", currentReading: "Unavailable" },
      { name: "Ring Light Intensity", unit: "%", currentReading: "Unavailable" }
    ],
    recentEvents: [
      { timestamp: "—", level: "Info", message: "Ceramic chessboard calibration target homography matrix defined." }
    ]
  },
  {
    id: "DEV-EDGE-ESP32-01",
    name: "ESP32 Workstation Edge Scanner Node",
    category: "Edge Gateway",
    connectionStatus: "Status Unknown",
    operationalStatus: "Awaiting Configuration",
    lastSeen: "Not Connected",
    protocol: "MQTT v5.0 over TLS 1.3",
    relatedProcess: "P-11: IoT Job-Tracking Dashboard",
    workstation: "WC-ASSY-01",
    source: "Proposed Specification",
    description: "ESP32-WROOM-32D node with RS-232 2D QR imager interface publishing job state events.",
    telemetryFields: [
      { name: "WiFi Signal (RSSI)", unit: "dBm", currentReading: "Unavailable" },
      { name: "MQTT Publish QoS", unit: "level", currentReading: "QoS 1" },
      { name: "Active Work Order", unit: "ID", currentReading: "Awaiting Scan" }
    ],
    recentEvents: [
      { timestamp: "—", level: "Info", message: "Node firmware built with Eclipse Paho MQTT client." }
    ]
  },
  {
    id: "DEV-SRV-MQTT",
    name: "Mosquitto Telemetry Message Broker",
    category: "Communication Service",
    connectionStatus: "Status Unknown",
    operationalStatus: "Awaiting Configuration",
    lastSeen: "Not Connected",
    protocol: "MQTT / WebSockets Port 8883/9001",
    relatedProcess: "P-10: AIoT System Architecture",
    workstation: "CENTRAL-EDGE-BOX",
    source: "Proposed Specification",
    description: "Central publish/subscribe messaging broker handling machine state, operator events, and QA results.",
    telemetryFields: [
      { name: "Active Client Connections", unit: "count", currentReading: "Unavailable" },
      { name: "Message Ingestion Rate", unit: "msg/sec", currentReading: "Unavailable" },
      { name: "Broker Memory Footprint", unit: "MB", currentReading: "Unavailable" }
    ],
    recentEvents: [
      { timestamp: "—", level: "Info", message: "Topic hierarchy defined: aiot/station/+/telemetry and /event." }
    ]
  },
  {
    id: "DEV-SCAN-BARCODE",
    name: "Honeywell 1950G Industrial 2D Imager",
    category: "Barcode / RFID",
    connectionStatus: "Status Unknown",
    operationalStatus: "Awaiting Configuration",
    lastSeen: "Not Connected",
    protocol: "USB HID / Virtual COM",
    relatedProcess: "P-11: IoT Job-Tracking Dashboard",
    workstation: "WC-PLAN-01",
    source: "Configured Hardware",
    description: "Handheld area-imaging scanner for DataMatrix job travelers and raw material lot tracking.",
    telemetryFields: [
      { name: "Barcode Scan Success Rate", unit: "%", currentReading: "Unavailable" },
      { name: "Last Scanned Job Traveler", unit: "ID", currentReading: "None" }
    ],
    recentEvents: [
      { timestamp: "—", level: "Info", message: "Scan parser configured for prefix JOB-2026-XXXX." }
    ]
  },
  {
    id: "DEV-SRV-CV-INFER",
    name: "OpenCV Sub-Pixel CAD Alignment Service",
    category: "Analytics Service",
    connectionStatus: "Status Unknown",
    operationalStatus: "Awaiting Configuration",
    lastSeen: "Not Connected",
    protocol: "HTTP REST / gRPC",
    relatedProcess: "P-13: CV Feature Detection & CAD Comparison",
    workstation: "METROLOGY-PC-01",
    source: "Proposed Specification",
    description: "Python microservice running Zernike moment edge detection and Iterative Closest Point (ICP) against DXF vectors.",
    telemetryFields: [
      { name: "ICP Registration RMS Error", unit: "mm", currentReading: "Unavailable" },
      { name: "Feature Extraction Latency", unit: "ms", currentReading: "Unavailable" }
    ],
    recentEvents: [
      { timestamp: "—", level: "Info", message: "DXF vector co-registration pipeline benchmarked." }
    ]
  },
  {
    id: "DEV-SENS-DFT",
    name: "Electromagnetic Coating DFT Gauge",
    category: "Sensor",
    connectionStatus: "Status Unknown",
    operationalStatus: "Awaiting Configuration",
    lastSeen: "Not Connected",
    protocol: "Bluetooth BLE / Serial",
    relatedProcess: "P-14: Final Enclosure Quality Acceptance",
    workstation: "WC-QA-PAINT-01",
    source: "Configured Hardware",
    description: "Digital dry-film thickness probe measuring electrostatic pure polyester coating across 60–80 µm tolerance range.",
    telemetryFields: [
      { name: "DFT Coating Thickness", unit: "µm", currentReading: "Unavailable" },
      { name: "Substrate Type", unit: "mode", currentReading: "Ferrous (CRCA)" }
    ],
    recentEvents: [
      { timestamp: "—", level: "Info", message: "Calibration zero-plate verified for IS 513 cold-rolled steel." }
    ]
  }
];
