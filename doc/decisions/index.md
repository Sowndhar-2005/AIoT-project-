---
type: "Decision"
title: "Architecture Decision Records (ADRs) Master Register"
description: "Index of architectural and technical decisions governing the AIoT Sheet-Metal Fabrication Platform, documenting rationale, trade-offs, and unresolved engineering choices."
resource: "decisions/index.md"
tags:
  - adr
  - decisions
  - architecture
  - governance
timestamp: "2026-10-25T18:50:00"
domain: "Master"
status: "Authoritative Governance Register"
---

# Architecture Decision Records (ADRs) Master Register

This register documents key architectural and software design decisions made for the AIoT platform, providing context, rationale, consequences, and open investigation points.

---

## Architecture Decision Summary Table

| ADR # | Decision Title | Status | Primary Domain | Core Choice / Strategy |
|---|---|---|---|---|
| **ADR-001** | Knowledge Base Representation Standard | **Accepted** | Knowledge Architecture | Open Knowledge Format (OKF) + LLM Wiki principles across all Markdown documents. |
| **ADR-002** | Decoupling Shop-Floor Tracking from Quality Release | **Accepted** | Digital Systems / QA | Physical assembly completion (`ASSEMBLY_COMPLETED`) strictly separated from QA release (`RELEASED`). |
| **ADR-003** | CAD Integration Strategy: Sidecar Pattern vs Direct Browser | **Accepted** | CAD Integration | Local Windows Sidecar agent via COM API for SOLIDWORKS; file-based staging for web portal. |
| **ADR-004** | IoT Message Transport & Ingestion Architecture | **Accepted** | IoT & Telemetry | Eclipse Mosquitto MQTT 5.0 with QoS 1, HMAC authentication, and edge Store-and-Forward buffering. |
| **ADR-005** | Human-in-the-Loop (HITL) Gate for AI Services | **Accepted** | AI Engineering | AI outputs designated advisory (`PROPOSED`); mandatory human confirmation required for all production actions. |
| **ADR-006** | Primary Relational & Object Storage Engine | **Accepted** | Backend Infrastructure | PostgreSQL 16 for ACID relational/event data; MinIO S3 for binary CAD models, raw images, and PDF CoCs. |

---

## Detailed Records

### ADR-001: Knowledge Base Representation Standard
- **Context**: The existing documentation consisted of 14 process reports and loosely organized image assets. Future software developers and AI coding agents need a consistent, portable, and discoverable technical foundation.
- **Decision**: Adopt the Open Knowledge Format (OKF) with standardized YAML frontmatter (`type`, `title`, `description`, `resource`, `tags`, `timestamp`, `domain`, `status`) and dual Markdown/Obsidian `[[WikiLink]]` cross-references.
- **Consequences**: Unifies technical documentation, ensures Obsidian graph compatibility, and enables automated LLM ingestion without proprietary lock-in.

### ADR-002: Decoupling Shop-Floor Tracking from Quality Release
- **Context**: In some factory tracking systems, moving a job to "Assembly Complete" automatically marks the product as ready for shipment, causing uninspected parts to bypass quality gates.
- **Decision**: Physically and logically decouple manufacturing status (`production_events`) from quality inspection records (`inspections`).
- **Consequences**: Eliminates false releases; ensures that only a certified QA inspector can authorize dispatch through an explicit inspection record.

### ADR-003: CAD Integration Strategy: Sidecar Pattern vs Direct Browser
- **Context**: The platform requires 3D enclosure models, flat-pattern DXF generation, and BOM synchronization. Web browsers cannot directly drive desktop CAD APIs (such as SOLIDWORKS COM).
- **Decision**: Implement an asynchronous **CAD Sidecar Agent** running on the engineer's Windows CAD station. The agent polls the Redis queue, launches background SOLIDWORKS automation via COM, extracts DXFs and STEP files, and uploads results to MinIO.
- **Consequences**: Avoids impossible browser-to-desktop API calls; maintains reliable, backgrounded CAD processing while keeping the web application cloud/container friendly.

### ADR-004: IoT Message Transport & Ingestion Architecture
- **Context**: The factory environment features intermittent Wi-Fi connectivity and high electromagnetic noise.
- **Decision**: Utilize MQTT 5.0 with QoS 1 for discrete production events and QoS 0 for high-frequency telemetry. Implement an edge Store-and-Forward ring buffer on ESP32/IPC gateways.
- **Consequences**: Guarantees zero event loss during network outages; prevents duplicated quantities through backend idempotency checks on `event_id`.

### ADR-005: Human-in-the-Loop (HITL) Gate for AI Services
- **Context**: AI models are proposed for document requirement extraction, component arrangement, nesting heuristics, and optical feature inspection.
- **Decision**: Enforce a strict advisory classification (`status = 'PROPOSED'`) for all AI microservices. No AI output can directly alter an approved drawing, release a quote, or approve an inspection.
- **Consequences**: Protects factory equipment, avoids costly scrap from erroneous nesting, and prevents liability from uninspected defective enclosures.

### ADR-006: Primary Relational & Object Storage Engine
- **Context**: The platform manages structured relational data (orders, jobs, BOMs, tolerances) and large binary files (20MP inspection images, SOLIDWORKS assemblies, DXF vectors).
- **Decision**: Deploy PostgreSQL 16 as the master transactional relational database and MinIO (S3-compatible) for distributed binary object storage.
- **Consequences**: Enforces ACID relational integrity while keeping database backups lightweight and high-speed.
