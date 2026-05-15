# REST API Reference

Base URL: `https://frcbom.com`

All endpoints return JSON. Authenticated endpoints require a JWT in the `access_token_cookie` cookie (set by `POST /api/login` or `POST /api/demo_team`). The token lasts **30 days**.

> The endpoints below mirror the source code. They are stable for internal use but not versioned — assume small changes between releases.

---

## Conventions

- `team_number` — string. The team's number; pass as a string even if numeric.
- `robot_name` — string. URL-safe.
- `system_name` — string. `"Main"` is a reserved pseudo-system.
- Errors: `{ "error": "human-readable" }` with a 4xx/5xx status.
- Auth: cookie JWT. Claims are `{ identity: team_number, is_team_admin: bool, is_global_admin: bool }`.

---

## Auth & accounts

### `POST /api/register`
Public. Creates a new team.

```json
{ "team_number":"5987", "name":"Galaxia", "password":"User8888", "adminPassword":"Lead8888" }
```
Errors: `400` missing field, `400` team exists.

### `POST /api/login`
Public. Returns user/admin/global-admin role + sets `access_token_cookie`.

```json
{ "team_number":"5987", "password":"Lead8888" }
```
Response:
```json
{ "login": true, "role": "admin", "redirect_to": "/5987/Admin" }
```
Role can be `user`, `admin`, or `global_admin` (team 0000 + admin password).

### `POST /api/demo_team`
Public. Creates a 24-hour demo team and signs you in as admin.

Response:
```json
{
  "message":"Demo team created",
  "team_number":"734512098",
  "user_password":"…", "admin_password":"…",
  "expires_at":"…",
  "redirect_to":"/734512098/Admin"
}
```

### `GET /api/team_exists?team_number=…`
Public. `{ "exists": bool }`.

### `GET /api/health`
Public. `{ "status": "API is running" }`.

### `GET /logout`
Clears the cookie and redirects to `/`.

### `POST /api/change_credentials`
Auth: team admin (own team) or global admin.

```json
{ "team_name":"New Name", "user_password":"…", "admin_password":"…" }
```

### `POST /api/reset_team_password`
Auth: **global admin only**.

```json
{ "team_number":"5987", "password":"NewUser1", "adminPassword":"NewAdmin1" }
```

---

## Team settings

### `GET /api/team_settings?team_number=…`
Returns `materials`, `onshape_folder_url`, `keys`, `fs_doc_id`, `fs_workspace_id`, `fs_element_id`.

### `POST /api/team_settings`
Auth: team admin or global admin. Partial keys merge with existing `keys`.

```json
{
  "team_number":"5987",
  "materials": { "Sheet": ["Al 1/8\"","PC 1/4\""] },
  "onshape_folder_url":"https://cad.onshape.com/documents?nodeId=…",
  "keys": {
    "access":"AK…","secret":"SK…",
    "material_property_id":"…","preprocess_property_id":"…",
    "process1_property_id":"…","process2_property_id":"…"
  }
}
```

### `POST /api/settings/make_fs`
Auth: team admin or global admin. Builds or updates the team's FeatureStudio in the Onshape folder.

```json
{ "team_number":"5987", "folder_url":"…", "create_version": false, "version_name":"" }
```

---

## Machines

### `GET /api/machines?team_number=…`
Returns `{ machines: [{id, name, icon_file, cad_format, stage, robot_id}] }`.

### `POST /api/machines`
Auth: team admin or global admin.

```json
{ "team_number":"5987", "name":"CNC Mill", "cad_format":"STEP", "stage":"Process" }
```

### `PATCH /api/machines/{machine_id}`
Update one or more of `name`, `cad_format`, `stage` (`Process|PreProcess`), `icon_file`.

### `DELETE /api/machines/{machine_id}`
Delete a machine.

---

## Robots

### `GET /api/robots?team_number=…`
Returns all robots for a team.

### `POST /api/robots`
Auth: team admin or global admin.

```json
{ "team_number":"5987", "name":"Valkyrie", "year":2025, "image_text":"uploads/robot_images/foo.png" }
```

### `PUT /api/robots/{robot_id}`
Update robot fields (`name`, `year`, etc.).

### `DELETE /api/robots/{robot_id}`
Delete the robot and cascade to systems and BOM data.

### Web equivalents
- `POST /{team_number}/new_robot` — HTML form post (multipart for the image upload).
- `POST /delete_robot/{robot_id}` — HTML form delete.

### `GET /api/robot_data?team_number=…&robot_name=…`
Hydrates a robot for the user page (thumbnail, year, systems).

### `POST /api/robot_exists`
`{ "team_number":"…","robot_name":"…" } → { "exists": bool }`

### `GET /api/robot_systems?team_number=…&robot_name=…`
Returns `{ systems: ["Drivetrain","Intake"] }` (excludes `Main`).

### `GET / POST /api/robot_main_settings`
Get/Set the robot's **main** assembly URL + access/secret keys + thumbnail.

---

## Systems

### `POST /api/systems`
Auth: team admin or global admin.

```json
{ "team_number":"5987", "robot_name":"Valkyrie", "name":"Intake",
  "assembly_url":"…", "thumbnail_url":"…" }
```

### `DELETE /api/systems/{system_id}`
Delete a system (Main is protected).

### `GET / POST /api/system_settings?team_number=…&robot_name=…&system_name=…`
Get / save a system's `assembly_url`, `partstudio_urls`, `subassembly_urls`, `access_key`, `secret_key`. Defaults Access/Secret to the team's keys if blank.

### `POST /api/update_system_settings`
Rename a system (inline edit).

```json
{ "team_number":"…","robot_name":"…","system_id":12,"name":"New Name" }
```

---

## BOM

### `POST /api/bom`
Auth: team admin or global admin. Fetches the BOM from Onshape, walks subassemblies, preserves progress, applies soft-deletes and manual parts. Returns the unified BOM.

```json
{ "team_number":"…","robot_name":"…","system_name":"…" }
```

### `GET /api/get_bom?team_number=…&robot_name=…&system_name=…`
Returns the unified BOM. Available to anyone with team access.

### `POST /api/save_bom_for_robot_system`
Persist progress changes (the UI fires this when +/- is tapped).

### `POST /api/bom_add_manual`
Add a manual part to a system's `bom_manual`.

### `POST /api/bom_delete_part`
Soft-delete (Onshape) or hard-delete (manual).

### `GET /api/bom_deleted_status?team_number=…&robot_name=…&system_name=…`
Returns `{ count: N }` of soft-deleted parts.

### `POST /api/bom_restore_deleted`
Clear the soft-delete list.

### `GET /api/admin/get_bom?team_number=…&robot_name=…&system_name=…`
Global admin. Get raw BOM for any team.

### `GET /api/admin/download_bom_dict?team_number=…`
Global admin. Dumps every BOM across the team.

### `GET /api/admin/download_settings_dict`
Global admin. Dumps Onshape URLs + keys for every team and robot.

---

## FRCTools Orders (COTS)

### `GET /api/cots_order_state?team_number=…&robot=…`
Returns the per-robot mapping `{ part_key: { mapping, dismissed } }`.

### `POST /api/cots_order_set`
```json
{ "team_number":"…","robot_name":"…","part_key":"rev-spark-max",
  "mapping": { "vendor":"REV","sku":"REV-11-2158","url":"…" },
  "dismissed": false }
```

### `POST /api/cots_order_dismiss`
```json
{ "team_number":"…","robot_name":"…","part_key":"…","dismissed":true }
```

### `GET /api/frctools/vendors/search?q=…`
Proxy to FRCTools Orders product search.

### `GET /api/frctools/vendors/by_url?url=…`
Proxy to FRCTools Orders lookup-by-URL.

---

## CAD download & viewer

### `POST /api/download_cad`
Returns a binary file (Content-Disposition: attachment).

```json
{ "team_number":"…","robot":"…","system":"…","id":"<partId>","format":"STEP" }
```

Formats: `STEP`, `STL`, `GLTF`, `x_t`. STL has an optional fast path; tune with `stl_units`, `stl_mode`, `angleTolerance`, `chordTolerance`, `minFacetWidth`.

### `POST /api/viewer_gltf`
Returns GLTF/GLB bytes for a single part.

### `POST /api/assembly_gltf`
Returns GLTF/GLB bytes for the full assembly of a system.

```json
{ "team_number":"…","robot":"…","system":"…","format":"glb","completed_only":false }
```

### `GET /api/onshape/thumbnail?u=<encoded onshape url>&rid=<robot_id>` or `sid=<system_id>`
Proxies Onshape thumbnails through FRC BOM using the stored team/robot/system keys.

---

## Dashboards

### `GET /api/dashboard/robot_stats?team_number=…&robot_name=…`
Returns:
```json
{
  "total": 142, "completed": 87, "percent": 61,
  "cots": 38, "in_house": 104,
  "top_material": "Aluminum 6061",
  "systems": [ { "name":"Intake", "total":34, "completed":22, "percent":64 }, … ]
}
```

### `GET /api/dashboard/system_stats?team_number=…&robot_name=…&system_name=…`
Per-system breakdown by stage and material.

### `GET /api/dashboard/recent_completions?team_number=…&robot_name=…`
Recent finished parts (drives the confetti modal).

### `POST /api/dashboard/ack_completion`
Mark one or more recent completions as acknowledged.

```json
{ "team_number":"…","robot_name":"…","ids":[123, 124] }
```

---

## Internal & debug

- `GET /internal/prune_demos` — manually triggers the demo-team cleanup.
- `GET /api/debug_system_url?…` — diagnostic helper.
- `POST /api/onshape/thumbnail` — alt path used by the proxy.

---

## Socket.IO

Connect on the same origin; the page subscribes to a room derived from `{team_number}:{robot}:{system}`. Events:

| Event             | Payload                                       | Purpose                                |
|-------------------|-----------------------------------------------|----------------------------------------|
| `qty_update`      | `{ part_id, stage, value }`                   | Live counter sync                      |
| `recent_completion` | `{ part_id, qty, system_name, timestamp }` | Pop confetti modal across browsers     |
| `bom_changed`     | `{}`                                          | Tells listeners to refetch the BOM     |

---

**Next:** [URL & Page Map →](pageMap.md) · [Global Admin →](globalAdmin.md)
