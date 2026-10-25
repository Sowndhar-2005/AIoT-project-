// Central shared data models for AIoT Sheet-Metal Fabrication System

export interface ProcessItem {
  id: number;
  number: string;
  title: string;
  domain: 'manufacturing' | 'digital-systems' | 'quality-inspection';
  shortDesc: string;
  fullDesc: string;
  inputs: string[];
  outputs: string[];
  tools: string[];
  image: string;
  status: string;
}

export interface EnclosureRecord {
  // Identification
  id: string;
  orderNumber: string;
  customerName: string;
  projectTitle: string;
  status: 'Draft Requirements' | 'In Engineering' | 'In Fabrication' | 'In Assembly' | 'Pending QA Review' | 'Released (CoC Signed)';
  
  // Physical & Material Specs
  height: number; // mm
  width: number;  // mm
  depth: number;  // mm
  material: string;
  thickness: number; // mm
  finish: string;
  ipRating: string;
  mountingType: string;
  doorType: string;
  lockingType: string;
  quantity: number;
  customerNotes: string;

  // Engineering & CAD
  cadModelRef: string;
  cadStatus: 'Preliminary' | '3D Modeled' | 'Validation Passed';
  primaryDrawingImage: string;
  orthographicViewsImage: string;
  kFactor: number;
  bendDeduction: number;
  flangeCount: number;

  // Selected Components inside
  selectedComponentIds: string[];

  // Manufacturing & Nesting
  sheetStandard: string;
  sheetUtilizationPercent: number;
  laserCutTimeMinutes: number;
  bendCyclesCount: number;

  // Quotation & Commercials
  materialCostPerKg: number;
  laborRatePerHour: number;
  taxPercent: number;

  // Quality Inspection Gates State
  qaGateChecks: {
    g1_dimensions: boolean;
    g2_flangeBends: boolean;
    g3_holePositions: boolean;
    g4_powderCoatingDFT: boolean;
    g5_gasketDoorSeal: boolean;
    g6_earthBonding: boolean;
  };
  qaInspectorName: string;
  qaDate: string;
  qaApproved: boolean;
}

export const DEFAULT_ENCLOSURE_RECORD: EnclosureRecord = {
  id: "ENC-2026-600400200",
  orderNumber: "ORD-9410-IN",
  customerName: "Apex Power & Control Systems Ltd.",
  projectTitle: "AIoT Industrial Modular Control Enclosure",
  status: "In Engineering",

  height: 600,
  width: 500,
  depth: 250,
  material: "IS 513 CRCA Cold-Rolled Steel Grade D",
  thickness: 1.5,
  finish: "Electrostatic Pure Polyester Powder Coat (RAL 7035)",
  ipRating: "IP55 / NEMA 12 (Dust Protected & Water Splash Proof)",
  mountingType: "External Wall-Mounting Flange Brackets (4x M8 slots)",
  doorType: "Single Left-Hinged Door with Polyurethane Gasket",
  lockingType: "Dual Quarter-Turn Cam Locks with Key",
  quantity: 5,
  customerNotes: "Top and bottom removable gland plates required. Internal Din-rail layout must accommodate 24V SMPS and motor contactors with 35mm cable duct clearance.",

  cadModelRef: "SOLIDWORKS-ASM-ENC-600400200.sldasm",
  cadStatus: "Validation Passed",
  primaryDrawingImage: "/assets/images/cad/enclosure-drawing-render.png",
  orthographicViewsImage: "/assets/images/cad/enclosure-drawing-render.png",
  kFactor: 0.38,
  bendDeduction: 2.68,
  flangeCount: 8,

  selectedComponentIds: ["COMP-001", "COMP-002", "COMP-003", "COMP-004", "COMP-006", "COMP-007"],

  sheetStandard: "2500 × 1250 × 1.5 mm CRCA Sheet",
  sheetUtilizationPercent: 84.7,
  laserCutTimeMinutes: 14.2,
  bendCyclesCount: 8,

  materialCostPerKg: 85,
  laborRatePerHour: 450,
  taxPercent: 18,

  qaGateChecks: {
    g1_dimensions: true,
    g2_flangeBends: true,
    g3_holePositions: true,
    g4_powderCoatingDFT: true,
    g5_gasketDoorSeal: true,
    g6_earthBonding: true
  },
  qaInspectorName: "M. Chen (Senior Metrologist - QA-802)",
  qaDate: "2026-10-25",
  qaApproved: false
};

export const PROCESSES_DATA: ProcessItem[] = [
  {
    id: 1,
    number: "P-01",
    title: "Customer Requirement Collection",
    domain: "manufacturing",
    shortDesc: "Intake of dimensional specs, IP rating environment requirements, and electrical single-line diagrams.",
    fullDesc: "Collects customer enclosure requirements (height, width, depth, mounting type, IP54/IP65 ingress protection). Analyzes customer-supplied electrical single-line diagrams and vendor equipment specifications to define structural boundaries and cooling needs.",
    inputs: ["Customer RFQ Form", "Single-Line Diagram (SLD)", "Equipment Datasheets"],
    outputs: ["Verified Dimensional Specification", "Component Intake Checklist", "Approved Design Scope"],
    tools: ["Interactive Spec Builder", "FastAPI Scope Verification", "Requirement Extraction Validator"],
    image: "/assets/images/requirements/Rough customer requirements.png",
    status: "Authoritative Engineering Process"
  },
  {
    id: 2,
    number: "P-02",
    title: "Component Identification & Digital Library",
    domain: "manufacturing",
    shortDesc: "Physical measurement and 3D modeling of switchgear, DIN rails, power supplies, and wire ducts.",
    fullDesc: "Catalogs electrical devices (MCCBs, MCBs, 24V SMPS, contactors) with precise physical dimensions, weight, heat dissipation wattage, and mounting envelopes. Maintained as reusable SOLIDWORKS 3D library parts and parametric database records.",
    inputs: ["Vendor Equipment Samples", "Manufacturer CAD Models", "Clearance Standards"],
    outputs: ["Digital Component Master Records", "Verified 3D CAD Parts (.sldprt)", "Thermal Dissipation Tags"],
    tools: ["Vernier Caliper", "SOLIDWORKS 3D", "Component Database"],
    image: "/assets/images/components/Electrical Control Panel Components Catalog.png",
    status: "Authoritative Engineering Process"
  },
  {
    id: 3,
    number: "P-03",
    title: "AI-Assisted Component Arrangement",
    domain: "manufacturing",
    shortDesc: "Algorithmic placement on mounting plates optimizing thermal convection, DIN rail pitch, and wiring ducts.",
    fullDesc: "Simulates 2D internal component layouts on rear equipment mounting sub-plates. Applies strict domain clearance rules (50mm above/below power supplies, 125mm DIN rail vertical spacing) with mandatory Human-in-the-Loop engineering approval.",
    inputs: ["Component Dimensions", "Thermal Wattage", "Sub-Plate Bounding Box (600x400mm)"],
    outputs: ["Sub-Plate Component Coordinates (X, Y)", "Clearance Compliance Report", "Approved Arrangement Blueprint"],
    tools: ["Layout Optimization Heuristic Engine", "Electrical Layout Rules Engine", "Design Approval Gate"],
    image: "/assets/images/components/Electrical Control Panel Components Flat Lay.png",
    status: "Authoritative Engineering Process"
  },
  {
    id: 4,
    number: "P-04",
    title: "Final 3D CAD Enclosure Design",
    domain: "manufacturing",
    shortDesc: "SOLIDWORKS parametric modeling of enclosure chassis, door, gland plates, hinges, and locks.",
    fullDesc: "Complete parametric 3D assembly based on verified design requirements. Incorporates native sheet-metal base/edge flanges, corner tear reliefs (1.5x thickness), concealed lift-off hinges, quarter-turn cam locking, and removable top/bottom gland plates.",
    inputs: ["Approved Component Layout", "Chassis Outer Envelope", "Sheet-Metal Gauge (1.5mm/2.0mm)"],
    outputs: ["Master 3D CAD Assembly (.sldasm)", "General Arrangement (GA) Drawing", "Manufacturing Revisions"],
    tools: ["SOLIDWORKS Sheet Metal", "Design Tables", "Parametric Mating"],
    image: "/assets/images/cad/enclosure-drawing-render.png",
    status: "Authoritative Engineering Process"
  },
  {
    id: 5,
    number: "P-05",
    title: "CAD-to-Manufacturing Docs, BOM & Quotation",
    domain: "manufacturing",
    shortDesc: "Hierarchical Bill of Materials compilation, 2D production blueprints, and automated fabrication cost estimation.",
    fullDesc: "Generates production drawings, multi-tier BOM (fabricated parts, mechanical hardware, electrical devices), and algorithmic quotation models calculating raw steel weight, cutting meterage, press brake bend hits, and finishing area.",
    inputs: ["Approved 3D CAD Model", "Standard Labor Rates", "Raw Steel Price ($/kg)"],
    outputs: ["2D Production Drawings (PDF)", "Hierarchical Production BOM", "Commercial Quotation Summary"],
    tools: ["Automated BOM Engine", "Costing Algorithm", "Drawing Generator"],
    image: "/assets/images/requirements/Sheet Metal Fabrication Quotation Dashboard.png",
    status: "Authoritative Engineering Process"
  },
  {
    id: 6,
    number: "P-06",
    title: "Sheet-Metal Flat-Pattern Validation",
    domain: "manufacturing",
    shortDesc: "Sheet unfolding algorithms, bend deduction/allowance calculation (K=0.38), and 1:1 DXF generation.",
    fullDesc: "Unfolds 3D sheet-metal parts into 2D flat patterns using validated empirical K-factors (K=0.38 for 1.5mm CRCA air-bent on V8 dies). Checks for hole-to-bend distortions, corner reliefs, and generates clean, single-layer 1:1 DXF cut files.",
    inputs: ["3D Part Flanges", "Material K-Factor (0.38)", "Tooling V-Die Width"],
    outputs: ["1:1 Vector Flat Patterns (DXF)", "Bend Trajectory Callouts", "Unfolded Boundary Coordinates"],
    tools: ["SOLIDWORKS Unfolder", "DXF Polyline Sanitizer", "K-Factor Math Model"],
    image: "/assets/images/cad/Electrical Enclosure CAD Flat Patterns.png",
    status: "Authoritative Engineering Process"
  },
  {
    id: 7,
    number: "P-07",
    title: "Optimized Laser-Cutting Nesting",
    domain: "manufacturing",
    shortDesc: "2D irregular nesting optimization on standard sheets and remnant inventory maximizing yield.",
    fullDesc: "Arranges flat-pattern DXF profiles onto standard 2500x1250mm stock sheets and stored remnant drop-sheets. Optimizes rotation, part-in-part nesting, grain constraints, and lead-in piercing, targeting material utilization efficiency above 82%.",
    inputs: ["Flat-Pattern DXF Files", "Stock Sheet Inventory", "Remnant Geometry Ledger"],
    outputs: ["Nesting Cut Program (NC G-Code)", "Material Utilization Score (η%)", "Remnant Return Cut Polygons"],
    tools: ["2D Nesting Optimization Solver", "Laser CAM Software", "Remnant Ledger"],
    image: "/assets/images/manufacturing/Sheet-Metal Laser Nesting Optimization Board.png",
    status: "Authoritative Engineering Process"
  },
  {
    id: 8,
    number: "P-08",
    title: "Cutting, Bending & Component Fabrication",
    domain: "manufacturing",
    shortDesc: "CNC fiber laser cutting execution, nitrogen assist gas parameters, deburring, and CNC press brake air-bending.",
    fullDesc: "Physical cutting on 3kW CNC fiber laser with nitrogen assist gas (12-14 bar) for dross-free edge quality. Subsequent rotary deburring and sequential air-bending on 100-ton CNC press brake following verified tool collision sequences.",
    inputs: ["Nesting NC Programs", "CRCA Sheet Steel (1.5mm/2.0mm)", "Bend Sequence Sheet"],
    outputs: ["Cut & Deburred Blanks", "Formed Sheet-Metal Parts", "Scrap Tonnage Records"],
    tools: ["3kW CNC Fiber Laser", "CNC Press Brake 100T", "Rotary Deburring Machine"],
    image: "/assets/images/manufacturing/Sheet-Metal Fabrication Workflow Infographic.png",
    status: "Authoritative Engineering Process"
  },
  {
    id: 9,
    number: "P-09",
    title: "Dimensional Verification, Painting & Assembly",
    domain: "manufacturing",
    shortDesc: "Bare-metal trial fit, chemical pre-treatment, RAL 7035 powder coating, and mechanical assembly.",
    fullDesc: "Receives fabricated part kit from press brake. Verifies mechanical fit-up and door alignment. Applies conversion pre-treatment coating and electrostatic pure polyester powder coat (cured at 190°C, 60-80µm DFT). Assembles hinges, cam lock, gland plates, and earth braids.",
    inputs: ["Formed Components Kit", "Powder Coating Spec (RAL 7035)", "Assembly Hardware Kit"],
    outputs: ["Assembled Electrical Enclosure", "Powder Coat DFT Record", "Job Traveler Staged for QA"],
    tools: ["Powder Coating Line", "Thermal Curing Oven", "Mechanical Assembly Bay"],
    image: "/assets/images/cad/enclosure-drawing-render.png",
    status: "Authoritative Engineering Process"
  },
  {
    id: 10,
    number: "P-10",
    title: "AIoT System Implementation Architecture",
    domain: "digital-systems",
    shortDesc: "6-layer distributed software architecture, FastAPI microservices, PostgreSQL schemas, and MQTT streaming.",
    fullDesc: "Specifies the software backend, edge gateway telemetry interfaces, relational database entities, asynchronous Celery workers, and role-based web portals connecting factory floor machinery with enterprise engineering management.",
    inputs: ["System Boundary Specifications", "REST / WebSocket Contracts", "Data Ownership Rules"],
    outputs: ["FastAPI Backend Microservices", "PostgreSQL DDL Schema", "MQTT Ingestion Pipeline"],
    tools: ["FastAPI (Python 3.11)", "Eclipse Mosquitto MQTT", "PostgreSQL 16", "Docker Compose"],
    image: "/assets/images/digital-systems/Smart AIoT Fabrication Architecture.png",
    status: "Proposed Engineering Specification"
  },
  {
    id: 11,
    number: "P-11",
    title: "IoT Job-Tracking Dashboard",
    domain: "digital-systems",
    shortDesc: "Real-time shop-floor state monitoring, station utilization cards, Kanban boards, and immutable event logs.",
    fullDesc: "Operational tracking preview visualizing active fabrication jobs, machine health telemetry, operator station progress, and event timelines. Decoupled from quality release to ensure production velocity never bypasses quality gates.",
    inputs: ["Machine Telemetry Payloads", "Operator Barcode Scans", "Job ID Status Transitions"],
    outputs: ["Live Kanban Job Board", "Machine Utilization Cards", "Immutable Chronological Event Log"],
    tools: ["React Telemetry Visualizer", "Tailwind UI", "MQTT Event Simulator"],
    image: "/assets/images/digital-systems/SheetFab AIoT Fabrication Dashboard.png",
    status: "Proposed Engineering Specification"
  },
  {
    id: 12,
    number: "P-12",
    title: "Camera-Based Dimensional Inspection Rig",
    domain: "quality-inspection",
    shortDesc: "20MP top-down industrial monochrome camera, telecentric lens, diffuse LED backlight table, and calibration.",
    fullDesc: "Controlled optical metrology cell designed for sheet-metal flat blanks. Uses a telecentric lens to eliminate perspective parallax distortion, high-uniformity diffuse bottom LED backlighting for sharp silhouette edges, and ceramic dot-grid sub-pixel calibration.",
    inputs: ["Fabricated Sheet Blank", "Dot-Grid Calibration Target", "Camera Rig Settings"],
    outputs: ["Calibrated 20MP Silhouette Frame (5472x3648)", "Active Intrinsic Matrix (K, D)", "Reprojection Accuracy Log"],
    tools: ["20MP GigE Monochrome Camera", "Telecentric Optical Lens", "Diffuse LED Backlight Table"],
    image: "/assets/images/inspection/Camera-Based Enclosure Dimensional Inspection Setup.png",
    status: "Authoritative Engineering Process"
  },
  {
    id: 13,
    number: "P-13",
    title: "Computer-Vision Feature Detection & Comparison",
    domain: "quality-inspection",
    shortDesc: "Sub-pixel Canny edge extraction, ICP CAD DXF alignment, delta tolerance calculations, and deviation heatmaps.",
    fullDesc: "Analytical computer-vision microservice. Performs sub-pixel edge detection, segments holes and cutouts, co-registers physical contour with nominal CAD DXF vectors via Iterative Closest Point (ICP), and calculates deviations against ISO 2768-m tolerances.",
    inputs: ["Calibrated Optical Frame", "Nominal CAD Flat Pattern (DXF)", "ISO 2768-m Tolerance Limits"],
    outputs: ["Feature Dimension Table", "Delta Deviations (Δ = Meas - Nom)", "Annotated Vector Deviation Overlay"],
    tools: ["OpenCV (Python)", "ICP Coordinate Registration", "Sub-Pixel Zernike Moments"],
    image: "/assets/images/inspection/Industrial Vision Inspection Dashboard.png",
    status: "Authoritative Engineering Process"
  },
  {
    id: 14,
    number: "P-14",
    title: "Final Fabricated Enclosure & Quality Inspection",
    domain: "quality-inspection",
    shortDesc: "The 6 mandatory acceptance gates: dimensions, workmanship, powder coating DFT, mechanics, earth bonding, BOM audit.",
    fullDesc: "Authoritative quality release authority. Enforces physical inspection across Six Mandatory Gates: dimensions, burr-free deburring, 60-80µm powder coating thickness, smooth 120° door swing, electrical earth bonding (<0.1Ω), and BOM completeness, issuing signed CoC.",
    inputs: ["Assembled Enclosure", "Process 12/13 CV Inspection Reports", "Approved Master Drawings"],
    outputs: ["Signed Certificate of Conformance (CoC)", "Non-Conformance Records (NCR)", "Authorized Dispatch Release"],
    tools: ["Vernier Height Gauge", "Electromagnetic DFT Gauge", "Earth Bond Milliohm Meter"],
    image: "/assets/images/inspection/Electrical Enclosure Quality Inspection Pass.png",
    status: "Authoritative Engineering Process"
  }
];

export interface ComponentItem {
  id: string;
  name: string;
  category: string;
  dimensions: string;
  mounting: string;
  powerLoss: string;
  cadStatus: string;
  unitCost: number;
}

export const SAMPLE_COMPONENTS: ComponentItem[] = [
  { id: "COMP-001", name: "Molded Case Circuit Breaker (MCCB) 3P 100A", category: "Circuit Protection", dimensions: "105 × 165 × 86 mm", mounting: "Chassis M4 Screws", powerLoss: "15.0 W", cadStatus: "Verified 3D (.sldprt)", unitCost: 3200 },
  { id: "COMP-002", name: "Miniature Circuit Breaker (MCB) 2-Pole C16", category: "Circuit Protection", dimensions: "36 × 85 × 73 mm", mounting: "35mm Top-Hat DIN Rail", powerLoss: "4.8 W", cadStatus: "Verified 3D (.sldprt)", unitCost: 650 },
  { id: "COMP-003", name: "Switch Mode Power Supply (SMPS) 24V 10A (240W)", category: "Power Supply", dimensions: "60 × 125 × 114 mm", mounting: "35mm Top-Hat DIN Rail", powerLoss: "28.5 W", cadStatus: "Verified 3D (.sldprt)", unitCost: 2800 },
  { id: "COMP-004", name: "Industrial Motor Contactor 3P 32A + Overload", category: "Motor Control", dimensions: "45 × 140 × 95 mm", mounting: "35mm DIN Rail / M4", powerLoss: "8.2 W", cadStatus: "Verified 3D (.sldprt)", unitCost: 1950 },
  { id: "COMP-005", name: "Compact Industrial PLC CPU Unit (14 I/O)", category: "Automation & Control", dimensions: "150 × 90 × 80 mm", mounting: "35mm Top-Hat DIN Rail", powerLoss: "12.0 W", cadStatus: "Verified 3D (.sldprt)", unitCost: 9500 },
  { id: "COMP-006", name: "Slotted PVC Wiring Duct (Panduit) 60x40", category: "Wire Management", dimensions: "60 × 40 × 1000 mm", mounting: "Slotted Base Screws", powerLoss: "0.0 W", cadStatus: "Parametric Model", unitCost: 380 },
  { id: "COMP-007", name: "Standard 35mm Steel Top-Hat DIN Rail (IEC 60715)", category: "Mounting Hardware", dimensions: "35 × 7.5 × 1000 mm", mounting: "Sub-Plate M5 Studs", powerLoss: "0.0 W", cadStatus: "Standard Part", unitCost: 240 }
];

export interface JobItem {
  jobId: string;
  orderNumber: string;
  enclosureType: string;
  dimensions: string;
  stage: string;
  progressPercent: number;
  status: 'In Progress' | 'Completed' | 'Pending Review' | 'Hold';
  lastUpdated: string;
  workCenter: string;
  operator: string;
}

export const SAMPLE_JOBS: JobItem[] = [
  {
    jobId: "JOB-2026-0042",
    orderNumber: "ORD-9410-IN",
    enclosureType: "AIoT Industrial Modular Control Enclosure",
    dimensions: "600 × 500 × 250 mm",
    stage: "Process 09: Dimensional Verification & Assembly",
    progressPercent: 78,
    status: "In Progress",
    lastUpdated: "10 mins ago",
    workCenter: "WC-ASSY-01",
    operator: "S. Miller (OP-305)"
  },
  {
    jobId: "JOB-2026-0043",
    orderNumber: "ORD-9412",
    enclosureType: "Outdoor Weatherproof Distribution Box (IP65)",
    dimensions: "1000 × 800 × 300 mm",
    stage: "Process 07: Laser Nesting",
    progressPercent: 52,
    status: "In Progress",
    lastUpdated: "25 mins ago",
    workCenter: "WC-PLAN-01",
    operator: "R. Sharma (OP-104)"
  },
  {
    jobId: "JOB-2026-0041",
    orderNumber: "ORD-9398",
    enclosureType: "Modular Floor-Standing Electrical Cabinet",
    dimensions: "1200 × 800 × 400 mm",
    stage: "Process 14: Quality Gate Review",
    progressPercent: 95,
    status: "Pending Review",
    lastUpdated: "1 hour ago",
    workCenter: "WC-QA-01",
    operator: "M. Chen (QA-802)"
  },
  {
    jobId: "JOB-2026-0040",
    orderNumber: "ORD-9385",
    enclosureType: "Compact Operator Terminal Enclosure",
    dimensions: "500 × 400 × 200 mm",
    stage: "Final Released & CoC Signed",
    progressPercent: 100,
    status: "Completed",
    lastUpdated: "3 hours ago",
    workCenter: "DISPATCH",
    operator: "A. Patel (QA-Lead)"
  }
];
