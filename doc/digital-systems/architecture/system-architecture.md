---
type: "Architecture"
title: "System Architecture, Security & Information Ownership Boundaries"
description: "Comprehensive software architecture defining system boundaries, microservices, component ownership, information custody rules, and security perimeters."
resource: "digital-systems/architecture/system-architecture.md"
tags:
  - architecture
  - information-ownership
  - security
  - microservices
timestamp: "2026-10-25T18:50:00"
domain: "Digital Systems & AIoT"
status: "Authoritative Systems Specification"
---
# System Architecture & Information Ownership Boundaries

This specification defines the component topology, information custody boundaries, and data ownership rules across the AIoT platform.

---

## 1. Information Custody & Ownership Map

To prevent conflicting sources of truth and state corruption, every information domain is assigned an unambiguous owner, producer, and consumer.

| Information Domain | Authoritative Custodian (Source of Truth) | Primary Producer | Primary Consumer(s) | Mutation Rules & Constraints |
|---|---|---|---|---|
| **Customer Requirements & Scope** | Customer Order Record (`customer_orders`) | Customer Portal | Design Engineer, Quoting Engine | Immutable once customer authorizes; modifications create a new order revision. |
| **Component Master Data** | Digital Component Library (`components`) | CAD / Standards Engineer | Layout AI, CAD Modeling, BOM Engine | Only verified components with 3D CAD references can be added. |
| **CAD Models & Drawings** | Object Storage (`cad_revisions`) | SOLIDWORKS Design Engineer | Flat Pattern Unfolding, CAM Nesting, QA Metrology | Native files are immutable artifacts; updates increment major revision (`REV_A` $\to$ `REV_B`). |
| **BOM & Commercial Quotation** | Quotation Service (`quotations`) | Quoting Engine / Engineer | Customer Portal, Production Planner | Deterministic price calculation; discounts require managerial sign-off. |
| **Shop-Floor Job Progress** | Event Sourcing Log (`production_events`) | Machine Gateways, Operator UI | IoT Dashboard, Production Manager | Append-only event ledger; events are never edited or deleted. |
| **Optical Metrology Data** | Inspection Service (`measurements`) | Vision Rig (OpenCV) | QA Inspector, Deviation Map | Raw images and point clouds stored in MinIO; coordinates bound to calibration ID. |
| **Final Quality Acceptance** | Quality Sign-Off (`inspections`) | Authorized QA Inspector | Dispatch System, Customer CoC Portal | Human-in-the-Loop release; cannot be executed by machine event or AI prediction. |

---

## 2. Core Architectural Separation Rules

1. **Manufacturing Status vs. Quality Release**:
   - `ASSEMBLY_COMPLETED` represents physical completion on the shop floor.
   - It **never** implies quality compliance. Quality release is exclusively governed by `inspections.disposition = 'RELEASED'`.
2. **AI Suggestions vs. Engineering Approvals**:
   - AI outputs (extracted specifications, suggested component arrangements, detected visual anomalies) are strictly advisory (`status = 'PROPOSED'`).
   - They cannot update engineering models or authorize manufacturing without an engineer's cryptographic or session signature.
3. **Control Network vs. Enterprise Network Isolation**:
   - Shop-floor CNC machine controllers and internal PLCs operate on an isolated Operational Technology (OT) subnet (VLAN 20).
   - Enterprise web users and customer portals operate on the IT subnet (VLAN 10).
   - Communication between OT and IT occurs exclusively through the secured Edge Gateway broker over TLS-encrypted MQTT.
