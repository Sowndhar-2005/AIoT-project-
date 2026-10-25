---
type: "Template"
title: "<% tp.file.title %>"
description: "Process documentation template for manufacturing and digital systems engineering."
resource: "<% tp.file.path(true) %>"
tags:
  - aiot
  - sheet-metal-fabrication
  - process
timestamp: "<% tp.date.now('YYYY-MM-DDTHH:mm:ss') %>"
domain: "Manufacturing Engineering"
process_number: 0
status: "Draft"
---

# <% tp.file.title %>

## 1. Purpose & Scope

Brief statement of what this process achieves and its operational boundaries.

---

## 2. Inputs & Prerequisites

- Material / upstream parts kit
- Approved CAD model revision / drawing reference
- Process routing traveler and Job ID

---

## 3. Workflow & Technical Procedure

### Step 1 — Intake & Verification
Description of intake and initial verification steps.

### Step 2 — Execution
Detailed technical parameters, machine settings, and fabrication operations.

### Step 3 — Output & Quality Gate
Verification criteria and handoff to the downstream work center or inspection cell.

---

## 4. Digital Systems & Telemetry Integration

- **Event Name**: `PROCESS_COMPLETED`
- **Telemetry Collected**: Cycle time, machine state, operator badge ID.

---

## 5. Acceptance Checklist

- [ ] Requirements verified against approved drawing revision
- [ ] In-process measurements within specified tolerances
- [ ] Job status updated on shop-floor tracking traveler
