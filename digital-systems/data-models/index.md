---
type: "DataModel"
title: "Relational Database Schemas, JSON Event Contracts & REST API Endpoints"
description: "Comprehensive PostgreSQL Data Definition Language (DDL), JSON event payload schemas, and RESTful API endpoint contracts for developers."
resource: "digital-systems/data-models/index.md"
tags:
  - data-models
  - postgresql
  - api-contracts
  - schemas
timestamp: "2026-10-25T18:50:00"
domain: "Digital Systems & AIoT"
status: "Authoritative Systems Specification"
---

# Relational Database Schemas, JSON Event Contracts & REST API Endpoints

This document establishes the developer-ready database schemas, event payloads, and RESTful interface definitions for the AIoT platform backend.

---

## 1. PostgreSQL Relational Schema (DDL)

```sql
-- 1. Users and Role-Based Access Control
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(64) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('CUSTOMER', 'DESIGN_ENGINEER', 'SHOP_OPERATOR', 'QUALITY_INSPECTOR', 'MANAGER', 'ADMIN')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Customer Orders and Engineering Jobs
CREATE TABLE customer_orders (
    order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES users(user_id) ON DELETE RESTRICT,
    order_number VARCHAR(32) UNIQUE NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'PENDING_REVIEW',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE jobs (
    job_id VARCHAR(32) PRIMARY KEY, -- e.g., 'JOB-2026-0042'
    order_id UUID REFERENCES customer_orders(order_id) ON DELETE RESTRICT,
    job_name VARCHAR(128) NOT NULL,
    current_stage VARCHAR(32) NOT NULL DEFAULT 'REQUIREMENT_REVIEW',
    priority VARCHAR(16) DEFAULT 'NORMAL' CHECK (priority IN ('LOW', 'NORMAL', 'HIGH', 'EXPEDITE')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    target_delivery_date DATE
);

-- 3. CAD Enclosure Revisions and BOM Items
CREATE TABLE enclosure_revisions (
    revision_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id VARCHAR(32) REFERENCES jobs(job_id) ON DELETE CASCADE,
    revision_code VARCHAR(16) NOT NULL, -- e.g. 'REV_A'
    cad_model_path VARCHAR(512),
    step_file_path VARCHAR(512),
    approved_by UUID REFERENCES users(user_id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (job_id, revision_code)
);

CREATE TABLE bom_items (
    bom_item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    revision_id UUID REFERENCES enclosure_revisions(revision_id) ON DELETE CASCADE,
    part_number VARCHAR(64) NOT NULL,
    item_description VARCHAR(255) NOT NULL,
    item_type VARCHAR(32) NOT NULL CHECK (item_type IN ('FABRICATED_SHEET', 'PURCHASED_HARDWARE', 'ELECTRICAL_DEVICE')),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    material_spec VARCHAR(64),
    thickness_mm NUMERIC(4, 2),
    dxf_flat_pattern_path VARCHAR(512)
);

-- 4. Shop-Floor Production Events (Append-Only Event Log)
CREATE TABLE production_events (
    event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id VARCHAR(32) REFERENCES jobs(job_id) ON DELETE CASCADE,
    workcenter_id VARCHAR(32) NOT NULL,
    event_type VARCHAR(64) NOT NULL,
    operator_id UUID REFERENCES users(user_id),
    produced_quantity INTEGER DEFAULT 0,
    scrap_quantity INTEGER DEFAULT 0,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. Quality Inspection Records and Feature Measurements
CREATE TABLE inspections (
    inspection_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id VARCHAR(32) REFERENCES jobs(job_id) ON DELETE CASCADE,
    revision_id UUID REFERENCES enclosure_revisions(revision_id) ON DELETE RESTRICT,
    inspector_id UUID REFERENCES users(user_id) NOT NULL,
    disposition VARCHAR(32) NOT NULL CHECK (disposition IN ('PENDING', 'ACCEPTED', 'REWORK_REQUIRED', 'REJECTED')),
    notes TEXT,
    signed_coc_path VARCHAR(512),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inspection_measurements (
    measurement_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inspection_id UUID REFERENCES inspections(inspection_id) ON DELETE CASCADE,
    feature_id VARCHAR(64) NOT NULL, -- e.g. 'HOLE_DIA_M4_HINGE_1'
    nominal_dimension_mm NUMERIC(8, 3) NOT NULL,
    measured_dimension_mm NUMERIC(8, 3) NOT NULL,
    upper_tolerance_mm NUMERIC(8, 3) NOT NULL,
    lower_tolerance_mm NUMERIC(8, 3) NOT NULL,
    is_in_tolerance BOOLEAN NOT NULL,
    measurement_method VARCHAR(32) CHECK (measurement_method IN ('COMPUTER_VISION_20MP', 'VERNIER_CALIPER', 'MICROMETER', 'CMM'))
);
```

---

## 2. Core REST API Interface Endpoints

| Method | Endpoint Path | Description | Access Role |
|---|---|---|---|
| `POST` | `/api/v1/auth/login` | Authenticate user; returns JWT bearer token | Public |
| `POST` | `/api/v1/orders` | Create customer order with uploaded specifications | Customer, Admin |
| `GET` | `/api/v1/jobs` | Paginated query of active jobs with stage filter | Authenticated Users |
| `GET` | `/api/v1/jobs/{job_id}` | Retrieve comprehensive job detail, active CAD revision & BOM | Authenticated Users |
| `POST` | `/api/v1/jobs/{job_id}/revisions` | Upload and release new approved CAD revision | Design Engineer |
| `POST` | `/api/v1/jobs/{job_id}/events` | Submit validated shop-floor production event | Operator, Edge Gateway |
| `POST` | `/api/v1/ai/nesting/optimize` | Asynchronously trigger multi-order 2D nesting solver | Engineer, Planner |
| `POST` | `/api/v1/inspections/upload-frame` | Upload inspection frame; returns CV deviation analysis | Quality Inspector, Edge |
| `POST` | `/api/v1/inspections/{id}/sign-off` | Apply cryptographic sign-off; release job and generate CoC | Quality Inspector |
| `GET` | `/api/v1/dashboard/metrics` | Stream real-time OEE, station status, and queue depth | Manager, Admin |
