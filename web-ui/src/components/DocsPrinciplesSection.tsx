import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  Cpu, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  Maximize2,
  FileText,
  Sliders,
  Sparkles,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { PROCESSES_DATA, ProcessItem } from '../data/projectData';

export const DocsPrinciplesSection: React.FC = () => {
  const [selectedProcessId, setSelectedProcessId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [modalImage, setModalImage] = useState<string | null>(null);

  const processDetails: Record<number, {
    workingPrinciple: string;
    engineeringFormula?: string;
    industrialStandards: string[];
    hardwareTools: string[];
    keySteps: string[];
  }> = {
    1: {
      workingPrinciple: "Extracts customer physical enclosure constraints (height, width, depth, environmental ingress IP54/IP65) and maps them directly against incoming single-line electrical diagrams (SLD). Generates a structured boundary definition that governs sub-plate area and heat-dissipation allowances before 3D CAD modeling begins.",
      engineeringFormula: "Required Internal Volume: V_{min} = \\sum V_{components} \\times 2.8 \\text{ (clearance factor)}",
      industrialStandards: ["IEC 60529 (IP Enclosure Ratings)", "IS 513 CRCA Steel Standards", "NEMA 250 Type 4/12"],
      hardwareTools: ["Angular / React Web Intake Portal", "FastAPI Scope Verification Service", "CAD Boundary Validator"],
      keySteps: [
        "Customer uploads Single-Line Diagram and equipment bills.",
        "System extracts overall dimensions (H × W × D) and environmental rating.",
        "Algorithmic intake checklist validates thermal wattage and conduit gland entry requirements.",
        "Scope sign-off initiates parametric digital twin workflow."
      ]
    },
    2: {
      workingPrinciple: "Every physical electrical switchgear device, circuit breaker, power supply, and contactor is cataloged with exact micrometer/caliper bounding dimensions, weight, heat output, and 3D mounting interfaces (DIN-rail or chassis screws). Standardized 3D models (.sldprt) form the authoritative foundation for interference-free 3D assembly.",
      engineeringFormula: "Clearance Volume: V_{envelope} = (W + 20\\text{mm}) \\times (H + 50\\text{mm}) \\times D",
      industrialStandards: ["IEC 60715 (35mm Top-Hat DIN Rail Standard)", "DIN 43880 Modular Dimensions"],
      hardwareTools: ["Mitutoyo Digital Caliper", "SOLIDWORKS Part Modeling", "Parametric SQL Component Master Database"],
      keySteps: [
        "Physical inspection & measurement of vendor hardware samples.",
        "3D CAD parametric modeling with DIN-rail clips and terminal blocks.",
        "Cataloging electrical load, thermal wattage, and wire-duct connection vectors.",
        "Verification against manufacturer specification datasheets."
      ]
    },
    3: {
      workingPrinciple: "Applies algorithmic 2D packing and simulated annealing heuristics to position electrical components on mounting sub-plates. The placement engine enforces strict clearance rules: heavier components at the base for center-of-gravity balance, heat-generating transformers/SMPS at the top near convective louvers, and 125mm vertical DIN-rail pitch for slotted wire ducts.",
      engineeringFormula: "Thermal Placement Convection: Q = m \\cdot C_p \\cdot \\Delta T + h \\cdot A \\cdot (T_s - T_\\infty)",
      industrialStandards: ["IEEE 141 Industrial Control Layout Guidelines", "UL 508A Industrial Control Panels"],
      hardwareTools: ["Layout Optimization AI Engine", "CADcraft Placement Heuristics", "Human-In-The-Loop Approval Gateway"],
      keySteps: [
        "Import sub-plate bounding dimensions (e.g., 800 × 600 mm).",
        "Algorithmic optimization groups components by voltage tier and thermal rating.",
        "Wire duct channel routing verified for minimum 25mm cable bend radius.",
        "Mechanical engineer inspects and approves 2D layout coordinates."
      ]
    },
    4: {
      workingPrinciple: "Builds a full 3D parametric sheet-metal assembly in SOLIDWORKS and CADcraft. Generates native sheet-metal base flanges, edge flanges, miter corners, door gasket channels, lift-off hinges, and 3-point quarter-turn cam locks. Performs real-time collision detection between internal components and door stiffeners.",
      engineeringFormula: "Internal Volume Factor: Clearance_{door} = D_{enclosure} - D_{subplate} - D_{deepest\\_component} > 35\\text{mm}",
      industrialStandards: ["ISO 1101 Geometrical Tolerancing", "DIN EN 10130 Cold-Rolled Low Carbon Steel"],
      hardwareTools: ["SOLIDWORKS Sheet Metal Add-in", "CADcraft Automation API", "3D Dynamic Interference Checker"],
      keySteps: [
        "Create outer sheet-metal enclosure body and welded corner flanges.",
        "Insert mounting sub-plate, DIN rails, and slotted wire ducts.",
        "Model front door with polyurethane gasket channel and concealed hinges.",
        "Run 3D collision check and generate master assembly (.sldasm)."
      ]
    },
    5: {
      workingPrinciple: "Extracts the complete Bill of Materials (BOM) from the verified 3D assembly and correlates it with raw steel weight, laser cutting meters, CNC press brake bend hits, powder-coating square meters, and electrical component catalog prices. Produces formal 2D production blueprints (GA) and accurate commercial quotation breakdowns.",
      engineeringFormula: "Manufacturing Cost: C_{total} = C_{materials} + \\sum (T_{laser} \\times R_{laser} + N_{bends} \\times R_{bend}) + C_{powder} + C_{components}",
      industrialStandards: ["ASME Y14.5 Drafting & Tolerancing Standard", "ISO 9001 Quality Documentation"],
      hardwareTools: ["Parametric BOM Generator", "Costing & Quotation Engine", "Automated PDF Drawing Generator"],
      keySteps: [
        "FeatureTree BOM export categorizing fabricated sheet metal, hardware, and electrical items.",
        "Calculation of steel sheet weight, cutting perimeter, and bend cycle count.",
        "Commercial costing algorithm applies labor rates, finishing costs, and scrap margins.",
        "Generate 2D General Arrangement (GA) production drawings."
      ]
    },
    6: {
      workingPrinciple: "Unfolds 3D CAD sheet-metal components into 2D flat patterns using calibrated K-factor bend allowances. K-factor (0.38 for 1.5mm CRCA air-bent on V8 dies) represents the neutral axis shift during bending. This guarantees that flanges achieve the exact 90° specification post-bending without edge deformation or hole elongation.",
      engineeringFormula: "Bend Allowance: BA = \\frac{\\pi}{180} \\times \\theta \\times (R + K \\times T) \\quad (K = 0.38, \\, T = 1.5\\text{mm})",
      industrialStandards: ["DIN 6935 Cold Bending of Flat Steel", "VDI 3388 Sheet Metal Bending Accuracy"],
      hardwareTools: ["SOLIDWORKS Flat-Pattern Engine", "Empirical K-Factor Database", "DXF Polyline Sanitizer"],
      keySteps: [
        "Select base fixed face and trigger 3D sheet unfolding algorithm.",
        "Apply validated K-Factor (0.38) and bend deduction values per bend line.",
        "Detect hole-to-bend line proximity (minimum distance: 2T + R).",
        "Export clean 1:1 scale DXF files on standardized laser-cutting layers."
      ]
    },
    7: {
      workingPrinciple: "Arranges flat-pattern 2D DXF cut profiles onto standard 2500 × 1250 mm CRCA raw sheets and remnant drop inventory using 2D irregular genetic nesting algorithms. Common-line cutting, part-in-part nesting, and heat-dispersion laser lead-in paths maximize material yield above 84% while preventing sheet heat distortion.",
      engineeringFormula: "Nesting Efficiency: \\eta_{nest} = \\frac{\\sum A_{parts}}{A_{sheet}} \\times 100\\% \\ge 84.7\\%",
      industrialStandards: ["ISO 14001 Waste Minimization", "Sheet Metal Nesting Standards"],
      hardwareTools: ["CypCut / SigmaNEST / Radan Algorithm Core", "Genetic 2D Nesting Optimizer", "Laser CNC G-Code Post-Processor"],
      keySteps: [
        "Import validated 1:1 DXF flat pattern geometry files.",
        "Define sheet envelope (2500 × 1250 mm) and clamp border margin (15 mm).",
        "Algorithmic nesting optimizes rotation, part spacing (5 mm), and small-part drop placement.",
        "Simulate laser pierce sequence and export optimized CNC G-code (NC/TAP)."
      ]
    },
    8: {
      workingPrinciple: "Physical fabrication of sheet metal: 2kW fiber laser cutting cuts boundary contours and mounting perforations with nitrogen assist gas (producing oxide-free weldable edges). Parts move to CNC press brakes where multi-step back-gauge air bending forms chassis box flanges according to the bend sequence table.",
      engineeringFormula: "Bending Force: F_{press} = \\frac{1.42 \\times \\sigma_u \\times L \\times T^2}{V} \\text{ (kN)}",
      industrialStandards: ["ISO 2768-m (General Tolerances - Medium)", "DIN EN ISO 9013 Thermal Cutting Quality"],
      hardwareTools: ["2kW - 4kW Fiber Laser CNC", "100-Ton CNC Press Brake (Amada/Trumpf)", "Capacitor Discharge Stud Welder"],
      keySteps: [
        "Laser cutting: Sheet loading, optical edge detection, nitrogen-assisted pierce and cut.",
        "Deburring and edge rounding to remove micro-dross and sharp edges.",
        "CNC press brake bending: Sequential 90° bends with automated back-gauge positioning.",
        "Capacitor discharge welding of M5/M6 earth studs and internal mounting brackets."
      ]
    },
    9: {
      workingPrinciple: "Fabricated enclosures undergo 7-tank chemical pre-treatment (degreasing, phosphating, water rinses) to ensure anti-corrosion bonding. Electrostatic powder spray coats thermoset pure polyester powder (RAL 7035 light grey), cured in a 200°C oven for 20 minutes to achieve 60–80 µm dry film thickness (DFT). Finished panels receive polyurethane foam door gaskets and full mechanical hardware assembly.",
      engineeringFormula: "Salt Spray Corrosion Resistance: \\text{Exposure} \\ge 500 \\text{ hours (ASTM B117)}",
      industrialStandards: ["ASTM B117 Salt Spray Test Standard", "ISO 2808 Coating Thickness", "RAL Color Standard 7035"],
      hardwareTools: ["7-Tank Pre-treatment Line", "Electrostatic Powder Coating Booth", "Convection Curing Oven (200°C)", "Hardware Assembly Cell"],
      keySteps: [
        "Pre-treatment: Hot alkaline degrease, water rinse, zinc phosphate conversion, de-ionized rinse.",
        "Powder coating: Manual/robotic electrostatic spray gun application of pure polyester powder.",
        "Oven curing: 200°C for 20 minutes for cross-linking polymer finish.",
        "Assembly: Install 120° concealed hinges, quarter-turn cam locks, and polyurethane door gasket."
      ]
    },
    10: {
      workingPrinciple: "Connects physical fabrication machinery and shop-floor workstations to a centralized digital twin architecture. Edge microcontrollers (ESP32) and industrial PCs interface via Modbus RTU, current transducers, and barcode imagers, publishing telemetry payloads to a high-concurrency Eclipse Mosquitto MQTT broker over TLS 1.3.",
      engineeringFormula: "Telemetry Sampling Rate: f_{sample} = 10\\text{Hz}, \\quad \\text{Latency} \\le 50\\text{ms}",
      industrialStandards: ["MQTT v5.0 OASIS Standard", "ISA-95 Enterprise-Control Integration", "TLS 1.3 Cryptography"],
      hardwareTools: ["ESP32-WROOM-32D Microcontrollers", "Eclipse Mosquitto MQTT Broker", "FastAPI Python Microservices", "PostgreSQL / InfluxDB"],
      keySteps: [
        "Deploy ESP32 barcode scanner nodes at all 14 physical workstations.",
        "Configure station state-machine topics: aiot/station_{id}/telemetry and /event.",
        "Ingest event streams into FastAPI microservice with QoS 1 guaranteed delivery.",
        "Maintain synchronized shop-floor digital twin in PostgreSQL relational store."
      ]
    },
    11: {
      workingPrinciple: "Provides operators, plant managers, and quality inspectors with real-time shop-floor tracking. Tracking tokens (barcodes/QR codes affixed to sheet blanks at Process 08) are scanned at each machine handoff, automatically advancing the work order state, calculating cycle times, and flagging production bottlenecks.",
      engineeringFormula: "Overall Equipment Effectiveness: OEE = \\text{Availability} \\times \\text{Performance} \\times \\text{Quality}",
      industrialStandards: ["ISO 22400 Manufacturing Operations Management", "Shop-Floor MES Guidelines"],
      hardwareTools: ["Honeywell 1950G 2D QR / DataMatrix Imager", "Industrial Touch Operator Terminal", "WebSocket Real-time Client"],
      keySteps: [
        "Generate unique Job Barcode Tag (JOB-YYYY-XXXX) during laser nesting release.",
        "Operator scans barcode at station commencement; node publishes station start event.",
        "Machine cycle times logged; real-time dashboard updates workstation progress bar.",
        "Workstation completion triggers automated inspection dispatch to Quality Metrology."
      ]
    },
    12: {
      workingPrinciple: "A high-resolution calibrated industrial machine-vision camera (Sony IMX264 5.1MP CMOS) mounted overhead captures the flat sheet-metal blank or finished panel under high-uniformity 450nm blue polarized backlight and top ring illumination. A chessboard calibration grid rectifies lens optical distortion and calculates the sub-millimeter scaling matrix (0.0423 mm/pixel).",
      engineeringFormula: "Pixel Resolution Scaling: S_{ratio} = \\frac{\\text{Physical Dimension (mm)}}{\\text{Pixel Count (px)}} = 0.0423 \\text{ mm/pixel}",
      industrialStandards: ["EMVA 1288 Standard for Machine Vision Sensors", "ISO 10360 Dimensional Metrology"],
      hardwareTools: ["Sony IMX264 5.1MP Monochromatic Camera", "16mm Low-Distortion C-Mount Lens", "Polarized Blue Backlight Table", "OpenCV 4.8"],
      keySteps: [
        "Sheet blank placed on diffuse backlit metrology fixture table.",
        "Camera captures high-contrast monochromatic image with strobe ring light.",
        "Homography matrix rectifies lens barrel distortion and perspective tilt.",
        "Pixel-to-metric ratio applied to convert sensor coordinates into physical millimeters."
      ]
    },
    13: {
      workingPrinciple: "Applies Canny edge detection and sub-pixel moment invariants to extract all hole boundaries, cutout slots, and outer perimeter edges from the rectified image. The captured polygon is automatically aligned against the nominal CAD DXF vector using Iterative Closest Point (ICP), generating a feature-by-feature deviation report against the ±0.5mm engineering tolerance envelope.",
      engineeringFormula: "ICP Point-to-Plane Alignment: \\min_{R, t} \\sum_{i=1}^N \\left( (R p_i + t - q_i) \\cdot n_i \\right)^2",
      industrialStandards: ["ISO 286 ISO System of Limits and Fits", "ASME Y14.5M Geometric Dimensioning & Tolerancing"],
      hardwareTools: ["OpenCV Sub-Pixel Edge Operator", "Shapely Vector Geometry Library", "SciPy ICP Registration Engine"],
      keySteps: [
        "Sub-pixel edge detection extracts contour vector points from captured image.",
        "Import nominal 1:1 DXF cut drawing for the corresponding part number.",
        "ICP algorithm aligns feature centroids (holes, cutouts, outer corners).",
        "Compute Cartesian deviations (\\Delta X, \\Delta Y); flag any feature exceeding \\pm 0.5\\text{mm}."
      ]
    },
    14: {
      workingPrinciple: "The final authoritative quality release gateway. Enforces rigorous verification across Six Mandatory Acceptance Gates: dimensional tolerance (\\pm 0.5\\text{mm}), deburred workmanship, powder coating DFT (60–80 \\mu m), smooth 120° door hinge operation, electrical earthing continuity (< 0.1 \\Omega), and 100% BOM hardware completeness. Authorizes signed Certificate of Conformance (CoC).",
      engineeringFormula: "Earth Bond Impedance: R_{earth} = \\frac{V_{test}}{I_{test}} \\le 0.10 \\, \\Omega \\quad (I_{test} = 10\\text{A})",
      industrialStandards: ["IEC 61439-1 Low-Voltage Switchgear and Controlgear", "ISO 9001 Quality Release Authority"],
      hardwareTools: ["Vernier Height Gauge", "Electromagnetic DFT Coating Gauge", "Earth Bond Milliohm Meter", "Digital CoC Release System"],
      keySteps: [
        "Inspect all 6 mandatory QA gates (dimensions, finish, coating, mechanics, grounding, BOM).",
        "Correlate Process 12 optical metrology and Process 13 CV deviation reports.",
        "Conduct physical continuity test across earth bonding studs with 10A current injection.",
        "If all gates pass: digitally sign Certificate of Conformance (CoC) and authorize dispatch."
      ]
    }
  };

  const filteredProcesses = PROCESSES_DATA.filter(p => {
    const matchesDomain = categoryFilter === 'all' || p.domain === categoryFilter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  const selectedProcess = PROCESSES_DATA.find(p => p.id === selectedProcessId) || PROCESSES_DATA[0];
  const selectedDetail = processDetails[selectedProcess.id] || processDetails[1];

  return (
    <div className="space-y-6">
      {/* Top Banner Context */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Process Documentation & Engineering Principles</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">14-Process Working Principles & Visual Metrology Guide</h2>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Comprehensive technical breakdown of each process: scientific working principles, governing engineering formulas, 
            industrial standards, real project diagrams, and hardware instrumentation.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="px-3 py-1 rounded bg-blue-50 border border-blue-200 text-xs text-blue-700 font-mono">
            14 Authoritative Processes
          </span>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Process Selector List (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 shadow-xs p-4 space-y-3 flex flex-col h-[780px]">
          {/* Search & Domain Filter */}
          <div className="space-y-2 pb-2 border-b border-slate-100">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search processes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-1 text-[11px] overflow-x-auto pb-1">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-2 py-1 rounded font-medium transition ${
                  categoryFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All (14)
              </button>
              <button
                onClick={() => setCategoryFilter('manufacturing')}
                className={`px-2 py-1 rounded font-medium transition ${
                  categoryFilter === 'manufacturing' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Fabrication (P01-P09)
              </button>
              <button
                onClick={() => setCategoryFilter('digital-systems')}
                className={`px-2 py-1 rounded font-medium transition ${
                  categoryFilter === 'digital-systems' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Digital AIoT (P10-P11)
              </button>
              <button
                onClick={() => setCategoryFilter('quality-inspection')}
                className={`px-2 py-1 rounded font-medium transition ${
                  categoryFilter === 'quality-inspection' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Metrology QA (P12-P14)
              </button>
            </div>
          </div>

          {/* Scrollable Process Cards List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {filteredProcesses.map((proc) => {
              const isSelected = proc.id === selectedProcessId;
              return (
                <div
                  key={proc.id}
                  onClick={() => setSelectedProcessId(proc.id)}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50/70 shadow-xs ring-1 ring-blue-400' 
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-blue-600 uppercase">
                      {proc.number} • {proc.domain.replace('-', ' ')}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-mono">
                      Step {proc.id} of 14
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">{proc.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{proc.shortDesc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: In-Depth Process Documentation & Visuals (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 shadow-xs p-6 space-y-6 h-[780px] overflow-y-auto">
          {/* Header */}
          <div className="border-b border-slate-200 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
                Technical Specification Document: {selectedProcess.number}
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                Authoritative Engineering Standard
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">{selectedProcess.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">Classification: {selectedProcess.domain.toUpperCase()} PIPELINE</p>
          </div>

          {/* Visual Reference / Screenshot Card */}
          {selectedProcess.image && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                  Engineering Visual Reference / Technical Screenshot
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Click image to expand full-res</span>
              </div>
              <div 
                onClick={() => setModalImage(selectedProcess.image)}
                className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-50 cursor-pointer group hover:border-blue-400 transition"
              >
                <img 
                  src={selectedProcess.image} 
                  alt={selectedProcess.title} 
                  className="w-full h-64 object-cover object-center group-hover:scale-[1.01] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-md text-xs font-semibold text-slate-800 shadow-md transition-opacity">
                    View High-Resolution Image
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Working Principle Section */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Scientific & Engineering Working Principle
            </h4>
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed">
              {selectedDetail.workingPrinciple}
            </div>
          </div>

          {/* Governing Formula if available */}
          {selectedDetail.engineeringFormula && (
            <div className="space-y-1.5">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Governing Engineering Mathematical Model</h5>
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs font-mono text-blue-900">
                <code>{selectedDetail.engineeringFormula}</code>
              </div>
            </div>
          )}

          {/* Sequential Execution Steps */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              Step-by-Step Technical Execution
            </h4>
            <div className="space-y-1.5">
              {selectedDetail.keySteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2 bg-white rounded border border-slate-100 text-xs text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inputs, Outputs & Standards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5">
              <span className="font-bold text-slate-800 uppercase text-[10px] tracking-wider block">Input Requirements</span>
              <ul className="list-disc pl-4 space-y-0.5 text-slate-600 text-[11px]">
                {selectedProcess.inputs.map((inp, idx) => (
                  <li key={idx}>{inp}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5">
              <span className="font-bold text-slate-800 uppercase text-[10px] tracking-wider block">Key Deliverables</span>
              <ul className="list-disc pl-4 space-y-0.5 text-slate-600 text-[11px]">
                {selectedProcess.outputs.map((out, idx) => (
                  <li key={idx}>{out}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Standards & Tools */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-bold text-slate-800 text-[11px]">Industrial Codes & Standards:</span>
              <div className="flex flex-wrap gap-1">
                {selectedDetail.industrialStandards.map((std, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono text-slate-700">
                    {std}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1 border-t border-slate-200">
              <span className="font-bold text-slate-800 text-[11px]">Engineering Hardware & Software:</span>
              <div className="flex flex-wrap gap-1">
                {selectedProcess.tools.map((tool, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-blue-50 border border-blue-200 rounded text-[10px] font-mono text-blue-800">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Full-Resolution Image Viewing */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
          onClick={() => setModalImage(null)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-4 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-mono font-bold text-blue-600">High-Resolution Engineering Diagram</span>
              <button 
                onClick={() => setModalImage(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 rounded"
              >
                ✕ Close
              </button>
            </div>
            <div className="max-h-[75vh] overflow-auto rounded border border-slate-200 bg-slate-50 flex items-center justify-center">
              <img src={modalImage} alt="Expanded View" className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
