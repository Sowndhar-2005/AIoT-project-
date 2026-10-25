# AIoT-Based Smart Sheet-Metal Panel Fabrication System

Welcome to the engineering knowledge base for the **AIoT-Based Smart Sheet-Metal Panel Fabrication Platform**.

This repository organizes the comprehensive technical documentation for designing, planning, fabricating, tracking, and inspecting sheet-metal electrical enclosures using modern web technologies, AI microservices, IoT event streams, and computer-vision metrology.

---

## 🚀 Quick Navigation

- **Master Knowledge Index**: [`index.md`](file:///d:/Study/IOT%20Design%20and%20Deployment/iot%20project/index.md)
- **Terminology & Definitions**: [`glossary.md`](file:///d:/Study/IOT%20Design%20and%20Deployment/iot%20project/glossary.md)
- **Knowledge Base Changelog**: [`CHANGELOG.md`](file:///d:/Study/IOT%20Design%20and%20Deployment/iot%20project/CHANGELOG.md)

### Three Engineering Domains
1. **[Manufacturing Engineering (Processes 1–9)](file:///d:/Study/IOT%20Design%20and%20Deployment/iot%20project/manufacturing/index.md)**: From customer requirements through 3D CAD modeling, unfolding, laser nesting, bending, and assembly.
2. **[Digital Systems & AIoT (Processes 10–11)](file:///d:/Study/IOT%20Design%20and%20Deployment/iot%20project/digital-systems/index.md)**: Software architecture, web applications, AI capability catalog, IoT event brokers, and CAD integration specifications.
3. **[Quality Inspection & Metrology (Processes 12–14)](file:///d:/Study/IOT%20Design%20and%20Deployment/iot%20project/quality-inspection/index.md)**: Camera hardware setups, optical calibration, CV feature comparison against CAD drawings, and final QA acceptance gates.

---

## 📖 Knowledge Architecture: OKF & LLM Wiki

This repository is formatted according to the **Open Knowledge Format (OKF)** and **LLM Wiki** concepts:
- **Portability**: All documents are pure Markdown with standard YAML frontmatter, rendering cleanly in GitHub, Obsidian, VS Code, or custom static site generators.
- **Obsidian Compatibility**: Contains dual-compatible Markdown and Obsidian `[[WikiLink]]` cross-references for bidirectional graph discovery.
- **Progressive Disclosure**: High-level system overview maps progressively down into deep technical specifications and database entity schemas.
- **Developer & Agent Ready**: Designed to give AI coding agents and software engineers complete architectural and technical context to implement the platform without discovering requirements from scratch.

---

## 🛠️ Implementation Status

| Subsystem | Status | Description |
|---|---|---|
| **Manufacturing Workflows (P1–P9)** | **Authoritative & Verified** | Established engineering calculations, bend allowances, nesting heuristics, and assembly standards. |
| **Inspection Methodology (P12–P14)** | **Authoritative & Verified** | Defined camera setups, telecentric lens principles, edge detection, and tolerance checks. |
| **Web Application & Backend** | **Planned Architecture** | Full technical specifications, API contracts, database entity models, and UI role workflows designed and documented. |
| **IoT Event Ingestion** | **Planned Architecture** | Event schema, telemetry payload definitions, and hybrid MQTT/REST broker architecture defined. |
| **AI Workflows** | **Planned Architecture** | Structured AI capability catalogue documenting inputs, outputs, boundaries, and mandatory human approval gates. |
| **CAD Integrations** | **Planned Architecture** | Integration matrices for SOLIDWORKS, AutoCAD, and CADcraft detailing file exchanges and automation feasibility. |

---

## 📂 Repository Structure

```
iot project/
├── index.md                      # Master OKF Knowledge Index
├── README.md                     # This project overview file
├── glossary.md                   # Engineering, CAD, IoT, AI & Quality glossary
├── CHANGELOG.md                  # Detailed knowledge base restructuring history
│
├── manufacturing/                # Domain 1: Manufacturing Engineering
│   ├── index.md                  # Domain index & workflow overview
│   ├── processes/                # Processes 01 through 09
│   ├── components/index.md       # Component master data & DIN-rail standards
│   ├── cad-design/index.md       # CAD modeling standards & blueprint rules
│   └── manufacturing-data/index.md # BOM, quotation models & sheet inventory
│
├── digital-systems/              # Domain 2: Digital Systems & AIoT
│   ├── index.md                  # Domain index & architectural overview
│   ├── processes/                # Processes 10 and 11
│   ├── architecture/             # System topology, data flow & ownership boundaries
│   ├── web-application/index.md  # Multi-portal web app specifications
│   ├── ai-engineering/index.md   # AI microservices capability catalogue
│   ├── iot-integration/index.md  # IoT event streaming, telemetry & machine state
│   ├── cad-integration/index.md  # SOLIDWORKS, AutoCAD & CADcraft integration specs
│   └── data-models/index.md      # SQL schemas, JSON schemas & REST API definitions
│
├── quality-inspection/           # Domain 3: Quality Assurance & Metrology
│   ├── index.md                  # Domain index & QA framework
│   ├── processes/                # Processes 12 through 14
│   ├── inspection-criteria.md    # Tolerance classes (ISO 2768-m) & defects
│   └── inspection-data-flow.md   # Optical metrology pipeline & review gates
│
├── diagrams/                     # Mermaid master architectural diagrams
├── assets/images/                # Categorized visual evidence and diagrams
├── decisions/                    # Architecture Decision Records (ADRs)
└── documentation-audit/          # Audit logs, inventories & open engineering questions
```
