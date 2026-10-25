# Changelog

All notable changes to the AIoT Sheet-Metal Fabrication Platform documentation and knowledge base will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), adhering to Open Knowledge Format (OKF) metadata standards.

---

## [2.0.0] - 2026-10-25
### Architecture & Knowledge Base Transformation
- **Adopted Open Knowledge Format (OKF)**: Standardized YAML frontmatter across all concept documents, process reports, architectures, and data models (`type`, `title`, `description`, `resource`, `tags`, `timestamp`, `domain`, `status`).
- **Implemented LLM Wiki Architecture**: Restructured the workspace into three distinct functional domains (`manufacturing/`, `digital-systems/`, `quality-inspection/`) to prevent conflation of physical shop-floor processes, software systems, and quality acceptance.
- **Root Navigation Overhaul**: Created master [`index.md`](file:///d:/Study/IOT%20Design%20and%20Deployment/iot%20project/index.md), [`README.md`](file:///d:/Study/IOT%20Design%20and%20Deployment/iot%20project/README.md), and [`glossary.md`](file:///d:/Study/IOT%20Design%20and%20Deployment/iot%20project/glossary.md) with bidirectional Markdown and Obsidian cross-linking.

### Process Migration & Preservation
- **Preserved Processes 1–8**: Preserved all authoritative calculations, bend parameters, nesting tables, tooling dimensions, and units from the source reports.
- **Redesigned Processes 9–14**:
  - Restructured Process 09 (`finishing-assembly.md`) to isolate physical assembly and trial fit from digital status tracking and quality handoff.
  - Relocated and structured Processes 10 & 11 into `digital-systems/processes/`, clarifying system architecture and separating simulated vs. physical IoT telemetry.
  - Relocated and structured Processes 12, 13 & 14 into `quality-inspection/processes/`, enforcing clear boundaries between optical calibration, computer-vision feature analysis, and final inspector sign-off.

### Software & Digital Systems Specifications
- **Created Architectural Blueprints**:
  - `digital-systems/architecture/system-architecture.md`: Defines 6-layer system boundaries, component ownership, and information custody rules.
  - `digital-systems/architecture/data-flow.md`: Maps data progression from customer portal through AI assistance, CAD CAM, IoT broker, and metrology.
- **Defined Integration & Capability Catalogues**:
  - `digital-systems/cad-integration/index.md`: Rigorous integration matrix for SOLIDWORKS, AutoCAD, and CADcraft (distinguishing verified APIs from file-based exchange).
  - `digital-systems/ai-engineering/index.md`: AI Capability Catalogue detailing inputs, outputs, risks, and mandatory Human-in-the-Loop (HITL) gates.
  - `digital-systems/iot-integration/index.md`: Machine telemetry schemas, MQTT/REST broker architectures, edge gateway specs, and failure modes.
  - `digital-systems/web-application/index.md`: Multi-portal UI requirements for Customer, Design Engineer, Operator, Manager, and Quality Inspector.
  - `digital-systems/data-models/index.md`: Database ER diagrams, SQL schemas, and RESTful API endpoints.

### Metrology & Quality Framework
- **Created Inspection Architecture**:
  - `quality-inspection/inspection-criteria.md`: Established ISO 2768-m tolerance classes, surface finish criteria, and defect severity levels.
  - `quality-inspection/inspection-data-flow.md`: End-to-end pipeline covering image capture, telecentric correction, edge detection, CAD comparison, and signed Certificate of Conformance (CoC) generation.

### Asset Curation & Audit
- **Curated 25 Visual Assets**: Categorized all 25 project images into semantic directories (`assets/images/requirements/`, `components/`, `cad/`, `manufacturing/`, `digital-systems/`, `inspection/`).
- **Resolved Image Gaps**: Mapped 10 previously unreferenced infographics, dashboards, and blueprints to authoritative reports.
- **Created Traceability Inventories**:
  - `documentation-audit/file-inventory.md`: Complete tracking matrix of source to destination files.
  - `documentation-audit/image-inventory.md`: MD5 hashes, dimensions, file paths, and embed locations for all 25 assets.
  - `documentation-audit/unresolved-questions.md`: Documented open technical questions and architectural decisions.
  - `documentation-audit/validation-report.md`: Complete audit report verifying link integrity, YAML validity, and Mermaid syntax.

---

## [1.0.0] - Prior Release
- Initial baseline containing 14 flat process reports and unorganized image assets in `/process` and `/image`.
