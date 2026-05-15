# Fetching & Managing the BOM

The BOM is FRC BOM's most important screen. This page documents everything you can do with it.

URL (admin): `/{team_number}/Admin/{robot_name}/{system}`
URL (user):  `/{team_number}/{robot_name}/{system}`

---

## How a BOM is built

When you press **Fetch BOM**, the server walks through:

1. **Fetch the main assembly BOM** from Onshape using your system's Access/Secret + assembly URL.
2. **Detect headers** (`Name`, `Description`, `Quantity`, `Material`, `Pre Process`, `Process 1`, `Process 2`, `BOM Material`). Header matching is tolerant of dashes, en/em-dashes, NBSPs and extra spaces.
3. For each listed **subassembly URL**:
   - Look it up in the parent document's elements.
   - Match the subassembly name against the assembly row.
   - Multiply each part's quantity by the parent row's quantity.
4. **Merge** parent rows that appear as expanded subassemblies → keep only the leaf parts.
5. **Apply the soft-delete list** (`bom_deleted`) — anything tagged is removed from the output.
6. **Append manual parts** (`bom_manual`) — anything you added by hand stays.
7. **Preserve progress** — existing `done_preprocess / done_process1 / done_process2 / available_qty` counters are matched by `partId` and copied forward.
8. **Save** the unified BOM and the latest thumbnail.

The result is a single flat list rendered as a grid of part cards.

---

## Anatomy of a part card

```
┌───────────────────────────────────────────────────────────┐
│ [thumb]   Part Name                          🔽 STEP ▾    │
│           Description                                     │
│           Qty 12 ▸ Avail 4    ⛏ Pre 4 ▸ P1 7 ▸ P2 0      │
│           [ Pre Process: Saw ]  [ Process 1: CNC ]        │
│           Material: Aluminum 6061 — 1/8"                  │
│           [+] [-]  buttons per stage                      │
│           Show 3D • Download CAD • 🗑                     │
└───────────────────────────────────────────────────────────┘
```

| Field           | Source                                                                  |
|-----------------|-------------------------------------------------------------------------|
| Part Name       | Onshape `Name`                                                          |
| Description     | Onshape `Description`                                                   |
| Quantity        | Onshape `Quantity` × subassembly multipliers                            |
| Material        | Onshape `Material`                                                      |
| materialBOM     | `FRCBOM - Bom Material` (falls back to Material)                        |
| Pre Process     | `FRCBOM - Pre Process`                                                  |
| Process 1       | `FRCBOM - Process 1`                                                    |
| Process 2       | `FRCBOM - Process 2`                                                    |
| partId          | Onshape `partId` (used for CAD download + GLTF)                         |
| is_manual       | `true` if you added the part by hand                                    |
| done_preprocess | Live counter; +/- in the UI                                             |
| done_process1   | Live counter; +/- in the UI                                             |
| done_process2   | Live counter; +/- in the UI                                             |
| available_qty   | Stock on hand (used by COTS / order export)                             |

> "COTS vs in-house" is detected from the presence of a Process value. If `Process 1` and `Process 2` are blank/`N/A`, the part is treated as COTS.

---

## Filters

A row of filter buttons sits above the grid:

- **All Parts** — show everything
- **COTS** — show only purchased parts. When active, the *Order Mode* controls appear (admin only).
- **In-House** — show only manufactured parts

Plus two dropdowns:

- **Filter by Material** — narrow to a single material
- **Download All Material** — pick a material, queue every CAD download for that material at once

---

## Adding a manual part (admin)

Click **+ Add Manual Part**. The modal accepts:

| Field          | Required | Notes                                       |
|----------------|----------|---------------------------------------------|
| Part Name      | yes      |                                             |
| Quantity       | yes      | Integer ≥ 1                                 |
| Material       | no       |                                             |
| Description    | no       |                                             |
| Pre Process    | no       | Free text. Matches your machine names.      |
| Process 1      | no       | Free text.                                  |
| Process 2      | no       | Free text.                                  |

A new row with a `M-` prefixed `partId` is appended. Manual parts:

- **Survive re-fetches** of the BOM.
- Can be **deleted** the same way as imported parts.
- Cannot have a CAD download (no Onshape `partId` to look up).

API: `POST /api/bom_add_manual`.

---

## Deleting & restoring parts (admin)

Click 🗑 on a part card. The flow depends on whether the part is manual or imported:

- **Manual part** → removed from `bom_manual` permanently.
- **Imported part** → appended to `bom_deleted` as `{partId, name}`. The part disappears from the grid but stays out of the BOM until you click **Restore Deleted Parts**.

Restore puts every soft-deleted part back the next time you re-fetch (or immediately if you re-render the page).

API:
- `POST /api/bom_delete_part` with `{team_number, robot_name, system_name, partId, partName, is_manual}`
- `GET  /api/bom_deleted_status` to see how many parts are currently hidden
- `POST /api/bom_restore_deleted` to clear the soft-delete list

---

## Updating progress (admin and user)

Each in-house part card has +/- buttons next to:

- **Pre-Process**
- **Process 1**
- **Process 2**

Tap to update. Every change:

1. Writes to the system's `bom_data` row.
2. Emits a Socket.IO event on the room `team_number:robot:system`.
3. May trigger a **recent completion** if the part just hit its quantity target — that pops a confetti modal on the robot/system dashboards.

You can also edit **Available Qty** for in-house parts and use it to model raw-stock counts.

---

## Bulk material download

In the **Download All Material** dropdown, pick a material name. The page kicks off one CAD download per part with that material, in the part's preferred format. The bell icon (top-right) shows the in-flight queue:

```
🛎  Download Queue
  • intake_plate.step
  • side_rail.step
  • elevator_carriage.stl
```

Each finished download triggers a regular browser save.

---

## Main system (aggregate)

`/{team_number}/{robot_name}/Main` (and the admin version) renders every system's parts in one grid. You can:

- Filter / search exactly like a normal system
- **Run Order Mode** across the whole robot (admin only)
- **Bulk-download a material** across the whole robot

You can **not** fetch into Main — fetch into the underlying systems instead.

---

## API surface

| Endpoint                                             | Purpose                                        |
|------------------------------------------------------|------------------------------------------------|
| `POST /api/bom`                                      | Fetch a system's BOM from Onshape              |
| `GET  /api/get_bom?team_number=…&robot_name=…&system_name=…` | Read the unified BOM (admin or user)   |
| `POST /api/save_bom_for_robot_system`                | Persist progress changes (used by the UI)      |
| `POST /api/bom_add_manual`                           | Add a manual part                              |
| `POST /api/bom_delete_part`                          | Soft-delete an imported part / hard-delete manual |
| `GET  /api/bom_deleted_status`                       | Count soft-deleted parts                       |
| `POST /api/bom_restore_deleted`                      | Restore all soft-deleted parts                 |

See [REST API →](api.md) for full schemas.

---

**Next:**
- [FRCTools Orders (COTS) →](orders.md)
- [3D Viewer & CAD Download →](viewer.md)
- [Tracking Parts →](trackingParts.md)
