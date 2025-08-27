---
sidebar_position: 3
title: Onshape Team Properties
---

Create the following **custom properties** in **Onshape → Company Settings → Properties**.
Use **Text** type unless noted otherwise.

| Property Name        | Type       | Notes |
|----------------------|------------|-------|
| Assem                | Text       | Parent assembly / subsystem tag (e.g., `Intake`, `Elevator`). |
| Part                 | Text       | Part identifier if different from name. |
| Revision             | Text       | Sync with your revision policy if used. |
| Qty                  | Integer    | Planned manufacturing quantity. |
| Material             | Text       | e.g., `6061-T6 Al`, `PETG`, `Steel`. |
| Dimensions           | Text       | Freeform; not strictly reliable. |
| CAD                  | URL/Text   | Link to part studio / assembly / GLTF model. |
| Pre-process          | Text       | Stage before machining (e.g., `Gerung`, cut-to-length). |
| Done Pre-Process     | Boolean    | Mark when pre-process is complete. |
| Process 1            | Text       | First machine/process (e.g., `CNC`, `Lathe`, `3D Printer`). |
| Done Process 1       | Boolean    | Mark when process 1 is complete. |
| Process 2            | Text       | Optional second process. |
| Done Process 2       | Boolean    | Mark when process 2 is complete. |

> These properties align with FRCBOM’s expected BOM headers.
> You can add more properties as needed by your team.
