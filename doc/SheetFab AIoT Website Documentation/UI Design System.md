---
type: "Design System Specification"
title: "UI Design System"
status: "documented"
tags:
  - sheetfab-aiot
  - design-system
  - tailwindcss
  - ui-components
---

# UI Design System — SheetFab AIoT Platform

The SheetFab AIoT user interface is built on a clean, light-themed industrial design system engineered for high legibility, low eye strain in manufacturing shop floor environments, and crisp technical rendering.

---

## 🎨 Color Palette & Thematic Hierarchy

The application utilizes an **Engineering Blue** primary theme paired with high-contrast slate neutrals and standard industrial status colors (green, amber, red, and slate).

### 1. Primary & Brand Colors
- **Primary Brand Blue**: `#2563eb` (`blue-600`) — Key action buttons, active tab indicators, prominent links, and primary badges.
- **Deep Navy / Slate 900**: `#0f172a` (`slate-900`) — Primary headings, high-contrast numbers, and structural frames.
- **Brand Tint / Light Blue**: `#eff6ff` (`blue-50`) — Selected row highlights, active menu backgrounds, and soft info cards.

### 2. Neutral Surfaces & Backgrounds
- **Application Backdrop**: `#f8fafc` (`slate-50`) — Soft off-white canvas providing depth beneath cards.
- **Card & Panel Surface**: `#ffffff` (`white`) — Clean white surfaces for high contrast.
- **Borders & Dividers**: `#e2e8f0` (`slate-200`) and `#f1f5f9` (`slate-100`) — Subtle separation of dense technical tables and forms.
- **Body Text**: `#334155` (`slate-700`) and `#475569` (`slate-600`) — High legibility technical typography.
- **Subtitles & Muted Metadata**: `#64748b` (`slate-500`) and `#94a3b8` (`slate-400`).

### 3. Industrial Status Palette
The application enforces strict semantic coloring across all equipment, inspection, and job tracking monitors:

| Status | Color Name | Tailwind Class | Semantic Meaning | Example Usage |
|---|---|---|---|---|
| **Healthy / Confirmed** | Emerald / Green | `emerald-600` / `bg-emerald-50` | Physically connected, verified OK, or within nominal tolerance | Pass metrology results, connected devices |
| **Warning / Attention** | Amber | `amber-600` / `bg-amber-50` | Warning, parameter drift, or attention required | Inspection near tolerance threshold |
| **Fault / Error** | Red / Rose | `rose-600` / `bg-rose-50` | Confirmed fault, critical dimensional deviation, or missing deliverable | Inspection failure, machine trip |
| **Unknown / Inactive** | Slate / Grey | `slate-500` / `bg-slate-100` | Device disconnected, status unknown, or awaiting physical integration | Unconnected edge gateway, offline machine |

---

## 🔤 Typography & Hierarchy

The interface uses standard system sans-serif font stacks (`Inter, system-ui, -apple-system, sans-serif`) with strict monospace pairings (`font-mono`) for technical identifiers, G-code strings, coordinates, and part numbers.

| Level | Size | Weight | Tracking | Usage |
|---|---|---|---|---|
| **H1 (Screen Title)** | `1.5rem` (24px) | Bold (`700`) | Normal | Screen headers in `Header.tsx` and top banners |
| **H2 (Section Header)** | `1.125rem` (18px) | Bold (`700`) | Tight (`-0.025em`) | Section dividers, card grouping headers |
| **H3 (Card Title)** | `0.875rem` (14px) | Semibold (`600`) | Normal | Modal titles, equipment card names |
| **Body (Standard)** | `0.8125rem` (13px) | Regular (`400`) | Normal | General technical descriptions, table contents |
| **Technical / Metadata** | `0.75rem` (12px) | Medium (`500`) | Wide (`0.025em`) | Field values, status badges, timestamp labels |
| **Micro Labels** | `0.6875rem` (11px) | Bold (`700`) | Uppercase (`0.05em`) | Form field labels, table headers, protocol tags |

---

## 🧱 Reusable UI Component Patterns

### 1. Metric Overview Cards
Dense, high-contrast KPI cards located at the top of screens (e.g., `OverviewSection`, `IoTManagementSection`, `TrackingSection`):
- Clean white background with `border border-slate-200/80` and subtle elevation (`shadow-xs`).
- Distinct icon container in light colored circle (`w-10 h-10 rounded-lg bg-blue-50 text-blue-600`).
- Prominent integer count in bold font (`text-2xl font-bold text-slate-900 font-mono`).
- Supporting subtitle or percentage trend below count.

### 2. Status Badges & Pills
- Compact height (`py-0.5 px-2.5 rounded-full text-xs font-semibold`).
- Color-matched border and soft tinted background:
  - Green: `bg-emerald-50 text-emerald-700 border border-emerald-200`
  - Amber: `bg-amber-50 text-amber-700 border border-amber-200`
  - Grey: `bg-slate-100 text-slate-600 border border-slate-200`

### 3. Dense Technical Tables
- Bordered container with rounded corners (`rounded-lg border border-slate-200 overflow-hidden`).
- Light grey header strip (`bg-slate-50 text-slate-500 font-semibold text-[11px] uppercase tracking-wider`).
- Alternating hover row highlights (`hover:bg-slate-50/80 transition-colors`).
- Monospace font for numerical measurements, part IDs, and IP addresses.

### 4. Interactive Dialogs & Modals
- Backdrop blur overlay (`fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50`).
- Card container with `max-w-4xl max-h-[90vh] rounded-xl bg-white shadow-2xl border border-slate-200`.
- Sticky header with clear title and close icon (`X`).
- Scrollable interior viewport for high-density documents and images.

---

## 📱 Responsive Layout Conventions

- **Desktop (1024px and wider)**: Persistent 64-column (256px) left navigation sidebar. Content area expands automatically with a max-width constrainer (`max-w-7xl mx-auto`).
- **Tablet (768px – 1023px)**: Sidebar remains visible or condenses; 3-column grids fold into 2-column grids.
- **Mobile (< 768px)**: Persistent sidebar hides off-screen (`-translate-x-full`). Top header exposes a hamburger toggle button that reveals the navigation in a high-z-index slide-over drawer with backdrop blur.

---

## 🔗 Related Pages

- [[Website Overview]]
- [[Navigation and Screen Index]]
- [[Website Architecture]]
- [[Technical Reference/Routes and Components|Routes and Components]]
