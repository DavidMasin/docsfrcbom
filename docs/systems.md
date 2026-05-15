# Robots & Systems

The robot/system hierarchy is the backbone of FRC BOM.

```
Team
└── Robot                              (e.g. "Valkyrie 2025")
    ├── Main           ← auto, aggregates all real systems
    ├── Drivetrain     ← one Onshape assembly
    ├── Intake         ← one Onshape assembly
    └── Elevator       ← one Onshape assembly
```

A team can have many robots; a robot can have many systems. Each *real* system maps to one **Onshape assembly**. The **Main** system is computed on the fly — you can't fetch into it, and you can't delete it.

---

## Robots

### Create
Admin only. From the Fleet page click **Add New Robot** and supply:

| Field             | Required | Notes                                            |
|-------------------|----------|--------------------------------------------------|
| Robot Name        | yes      | Used in the URL.                                 |
| Competition Year  | yes      | Integer. Defaults to current.                    |
| Robot Schematic   | no       | Image upload (PNG/JPG).                          |

The form posts to `POST /{team_number}/new_robot`. On success the robot is created with a `Main` system already attached.

### Rename / Re-image
Inline editing is not exposed on the robot card today. To change the visual:
1. Open the robot detail page.
2. Click **🖼 Set main assembly image**.
3. Paste an Onshape assembly URL + the access/secret keys for it.
4. Click **Save**. The thumbnail is fetched and cached on the robot.

The thumbnail proxy (`/api/onshape/thumbnail`) means viewers don't need Onshape access to see the image.

### Delete
From the Fleet page hover a card, click 🗑, confirm. Cascades to:
- All systems
- All BOM rows, manual parts, deleted-part records, cots_order entries
- All recent-completion entries

There is no undo.

### Per-robot data

| Field                  | Where it's used                                        |
|------------------------|--------------------------------------------------------|
| `name`, `year`         | Cards, URLs, page headers                              |
| `image_text`           | Uploaded thumbnail filename                            |
| `main_assembly_url`    | Source for the hero thumbnail                          |
| `main_thumbnail_url`   | Cached Onshape thumbnail                               |
| `main_access_key`      | Onshape access key for the main assembly (optional)    |
| `main_secret_key`      | Onshape secret key for the main assembly (optional)    |
| `recent_completion`    | Recent finishes (drives the confetti & dashboard feed) |
| `cots_order`           | FRCTools order mapping per part_key                    |

---

## Systems

### Create
On the robot detail page click **➕ Add System**. Modal fields:

| Field           | Required | Notes                                                  |
|-----------------|----------|--------------------------------------------------------|
| System Name     | yes      | Must be unique within the robot. **`Main` is reserved.** |
| Assembly URL    | no       | Onshape assembly URL. Can be set later in System Settings. |
| Thumbnail URL   | no       | Custom thumbnail if you don't want Onshape's auto one. |

API: `POST /api/systems` with `{team_number, robot_name, name, assembly_url?, thumbnail_url?}`.

### Rename
Open a system BOM page (`/{team_number}/Admin/{robot_name}/{system}`) and click the system name in the header. It's a `contenteditable` span — type the new name and click away. The name is saved via `POST /api/update_system_settings`.

### Delete
From the robot detail page, click 🗑 on a system row. Confirm.
- **`Main` cannot be deleted.**
- All BOM data for the system is removed (manual parts, deleted-part records, bom_data).

API: `DELETE /api/systems/{id}`.

### Per-system data

| Field                | Purpose                                                |
|----------------------|--------------------------------------------------------|
| `name`               | System identifier inside the robot                     |
| `assembly_url`       | Onshape assembly to fetch                              |
| `partstudio_urls`    | List of Part Studio URLs (needed for CAD/GLTF lookup)  |
| `subassembly_urls`   | Subassemblies to expand with the parent quantity       |
| `access_key`         | Onshape access key (defaults to team-level)            |
| `secret_key`         | Onshape secret key (defaults to team-level)            |
| `bom_data`           | The full unified BOM (Onshape + manual − deleted)      |
| `bom_manual`         | Manual parts added by hand                             |
| `bom_deleted`        | Soft-deleted Onshape parts (by partId/name pair)       |
| `thumbnail_url`      | Cached system thumbnail                                |

---

## The Main system

`Main` is created automatically when a robot is created and:

- **Cannot be renamed**
- **Cannot be deleted**
- **Cannot be fetched into** (`POST /api/bom` for `system_name=Main` is not supported; settings UI is hidden)
- **Aggregates parts** from every real system on demand using the `/{team}/{robot}/Main` route which renders `system_main.html`

Use Main to:
- Browse every part across every system
- Run **Order Mode** (COTS) across the whole robot at once
- Bulk-download CAD for a material across the whole robot

---

## Conventions

- **One Onshape assembly per system.** If two subsystems share a Part Studio, that's fine — they're separate FRC BOM systems but can reference the same studio for CAD lookups.
- **List subassemblies explicitly.** If your top-level assembly contains a subassembly (e.g. swerve module x4), add that subassembly's URL under **Subassembly URLs**. Its parts will be expanded and multiplied by the parent quantity.
- **Add Part Studio URLs** if you want users to download CAD or view in 3D. FRC BOM walks each studio to find a `partId` when a user asks for STEP/STL/GLTF.

---

**Next:**
- [System Settings →](systemSettings.md)
- [Fetching & Managing BOM →](bomManagement.md)
