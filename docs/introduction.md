# Introduction

> Need help? DM **@DavidMasin** on Chief Delphi.

## What is FRC BOM?

**FRC BOM** is a free, web-based Bill of Materials and manufacturing manager built specifically for FRC robotics teams. It bridges your Onshape CAD models and your shop floor so you always know:

- What parts the robot needs
- What's been made, ordered, or installed
- Who's working on what right now
- What's blocking the next subsystem

The platform is hosted at **[frcbom.com](https://frcbom.com)** and is free to use for every team.

---

## Why teams use it

Build season is chaotic. A spreadsheet falls behind the moment someone edits CAD. FRC BOM solves that with:

- **One-click BOM import** from any Onshape assembly (including subassemblies with quantity multipliers).
- **Multiple robots** per team (practice bot, competition bot, off-season, archive).
- **Multiple systems** per robot (Drivetrain, Intake, Elevator, etc.) plus an automatic **Main** view that aggregates them all.
- **Manual parts** for things that aren't in CAD (spares, raw stock, custom orders).
- **Process tracking** with three configurable stages: Pre-Process → Process 1 → Process 2.
- **Real-time updates** — when a teammate hits “+1” on a CNC part, every other browser shows it instantly (Socket.IO).
- **3D assembly viewer** in the browser (no Onshape login required for non-admins).
- **CAD downloads** in STEP, STL, GLTF, or x_t directly from the parts list.
- **FRCTools Orders integration** to group COTS parts by vendor and export ready-to-order CSVs.
- **Auto-generated FeatureScript** that writes a customized Material & Processes Feature into your Onshape folder.
- **Demo mode** — spin up a fully functional throw-away team in one click.

---

## Core concepts

| Concept           | What it is                                                                                            |
|-------------------|--------------------------------------------------------------------------------------------------------|
| **Team**          | Your FRC team account, identified by team number. Has a User password and an Admin password.          |
| **Robot**         | A physical build (e.g. *Valkyrie 2025*). One team can have many robots.                               |
| **System**        | A subsystem of a robot (e.g. *Intake*, *Elevator*). Each system points to one Onshape assembly.       |
| **Main**          | An auto-generated pseudo-system that aggregates every part across all real systems of a robot.        |
| **BOM**           | The flat list of parts for a system — pulled live from Onshape and persisted with progress.           |
| **Manual Part**   | A part you add by hand inside FRC BOM (not in Onshape). Lives next to imported parts.                 |
| **Process**       | A manufacturing stage. Up to three are tracked per part: **Pre-Process**, **Process 1**, **Process 2**. |
| **Machine**       | A shop resource (CNC, Mill, Lathe, 3D Printer…) bound to a stage and a default CAD format.           |
| **Material**      | A material name, grouped under a category (Sheet, Tube, Bar…). Reorderable.                           |
| **Demo Team**     | An auto-expiring team (24h) anyone can create to evaluate the product.                                |
| **Global Admin**  | The super-user account (team number `0000`, admin password) that can manage every team.               |

---

## How it works end-to-end

1. **Register your team** (team number, name, user password, admin password) — or click *Try a Demo*.
2. **Configure team settings**: add machines, list materials, paste Onshape API keys.
3. (Recommended) **Generate the FeatureStudio** so Onshape exposes the correct dropdowns and IDs.
4. **Create a robot** and add **systems** for each subassembly.
5. **Fetch the BOM** for each system — FRC BOM walks subassemblies and applies quantity multipliers.
6. The shop **updates progress** with +/- counters; everyone watching the same robot sees changes live.
7. **Order COTS parts** with FRCTools Orders or **download CAD** for in-house manufacturing.
8. **Dashboards** show completion rings, recent finishes, and what's currently being made.

---

## Who is it for?

- **Build leads** who need a single source of truth.
- **Manufacturing leads** who want to know which stage every part is in.
- **Drive team / mentors** who want a dashboard view without diving into Onshape.
- **Off-season** teams that want to archive last year's BOM and start a fresh robot.

---

## What's different from a spreadsheet?

| Spreadsheet                              | FRC BOM                                                            |
|------------------------------------------|--------------------------------------------------------------------|
| Manual data entry                        | One-click import from Onshape (with subassembly recursion)         |
| Goes stale the moment CAD changes        | Re-fetch keeps quantities synced; manual edits survive             |
| One person edits at a time               | Real-time multi-user with Socket.IO                                |
| No CAD link                              | 3D viewer + per-part STEP/STL/GLTF/x_t download                    |
| No vendor grouping                       | FRCTools Orders integration, CSV export per vendor                 |
| No celebration when a part is done       | Confetti modal + live "now making" feed                            |

---

## Next steps

- [Try the demo →](demo.md) (no signup needed)
- [Get started step-by-step →](getStarted.md)
- [See the full feature list →](features.md)

**Happy Building! 🚀**
**~ The FRC BOM Team**
