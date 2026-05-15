# Page & URL Map

Every page in FRC BOM, the role required, and what it does.

---

## Public pages (no login)

| URL                          | Page                  | Notes                                             |
|------------------------------|-----------------------|---------------------------------------------------|
| `/`                          | Landing               | Hero, Sign in card, **Try a Demo**, Features.     |
| `/register`                  | Registration          | Team number / name / user pw / admin pw.          |

---

## Logged-in: Team Admin

Use the **admin** password.

| URL                                                       | Page                       | What you can do                                          |
|-----------------------------------------------------------|----------------------------|----------------------------------------------------------|
| `/{team}/Admin`                                           | **Robot Fleet**            | Create / delete robots, open settings, change creds.     |
| `/{team}/Admin/settings`                                  | **Team Settings**          | Machines, Materials, Onshape FS.                         |
| `/{team}/Admin/{robot}`                                   | **Robot detail**           | Manage systems, set main assembly image, open viewer.    |
| `/{team}/Admin/{robot}/Main`                              | **Main BOM (aggregate)**   | All parts across all systems; Order Mode, exports.       |
| `/{team}/Admin/{robot}/{system}`                          | **System BOM (admin)**     | Filters, Manual parts, Delete/Restore, Fetch BOM.        |
| `/{team}/Admin/{robot}/Dashboard`                         | **Robot Dashboard**        | Stats, system grid, confetti feed.                       |
| `/{team}/Admin/{robot}/{system}/Dashboard`                | **System Dashboard**       | % ring, Now Making, system viewer.                       |
| `/{team}/new_robot`                                       | **New Robot Form**         | Create a robot (name / year / image).                    |
| `/{team_number}/credentials`                              | **Change Credentials**     | Rename team, rotate passwords.                           |

---

## Logged-in: User

Use the **user** password.

| URL                                          | Page                  | What you can do                              |
|----------------------------------------------|-----------------------|----------------------------------------------|
| `/{team}`                                    | **Robot Fleet (user)**| Browse robots.                               |
| `/{team}/{robot}`                            | **Robot detail (user)** | Browse systems, open viewer.                 |
| `/{team}/{robot}/{system}`                   | **System BOM (user)** | Filters, material download, update counters. |
| `/{team}/{robot}/Main`                       | **Main BOM (user)**   | Aggregate parts across systems.              |

---

## Logged-in: Global Admin

Sign in as team `0000` with the admin password.

You can do everything in this table for **any team**:

| URL                                                       | Page                       |
|-----------------------------------------------------------|----------------------------|
| All admin URLs above (substitute any team number)         | Full admin access          |
| `/{team}/Admin/settings`                                  | **🔐 Reset Team Passwords** card appears |

---

## API endpoints (used by the pages above)

See [REST API →](api.md) for the full reference.

| Page                | Calls                                                                                                       |
|---------------------|-------------------------------------------------------------------------------------------------------------|
| Landing             | `POST /api/login`, `POST /api/demo_team`                                                                    |
| Registration        | `POST /api/register`, `GET /api/team_exists`                                                                |
| Robot Fleet         | (rendered server-side)                                                                                      |
| Team Settings       | `GET/POST /api/team_settings`, `POST /api/settings/make_fs`, `GET/POST/PATCH/DELETE /api/machines[...]`     |
| System BOM          | `POST /api/bom`, `GET /api/get_bom`, `POST /api/save_bom_for_robot_system`, `POST /api/bom_add_manual`, `POST /api/bom_delete_part`, `POST /api/bom_restore_deleted` |
| Main BOM            | `GET /api/get_bom?system_name=Main`, FRCTools endpoints                                                     |
| Robot Dashboard     | `GET /api/dashboard/robot_stats`, `GET /api/dashboard/recent_completions`, `POST /api/dashboard/ack_completion` |
| System Dashboard    | `GET /api/dashboard/system_stats`                                                                           |
| Robot detail        | `POST /api/systems`, `DELETE /api/systems/{id}`, `GET/POST /api/robot_main_settings`, `POST /api/assembly_gltf` |
| 3D viewer           | `POST /api/viewer_gltf`, `POST /api/assembly_gltf`                                                          |
| CAD download        | `POST /api/download_cad`                                                                                    |
| FRCTools            | `GET /api/frctools/vendors/search`, `GET /api/frctools/vendors/by_url`, `POST /api/cots_order_set`, `POST /api/cots_order_dismiss` |
| Credentials         | `POST /api/change_credentials`, `POST /api/reset_team_password` (global admin)                              |
| Health              | `GET /api/health`                                                                                           |

---

## Permission cheat sheet

| Action                                       | User | Team admin | Global admin |
|----------------------------------------------|------|------------|--------------|
| View `/`, `/register`                        | ✅   | ✅         | ✅           |
| View `/{team}` etc                           | ✅ (own team) | ✅ | ✅ (any) |
| View `/{team}/Admin*`                        | ❌   | ✅ (own)   | ✅ (any)     |
| Update counters                              | ✅   | ✅         | ✅           |
| Add / delete manual parts                    | ❌   | ✅         | ✅           |
| Soft-delete / restore Onshape parts          | ❌   | ✅         | ✅           |
| Fetch BOM                                    | ❌   | ✅         | ✅           |
| Edit team settings (machines, materials, FS) | ❌   | ✅         | ✅           |
| Edit system settings                         | ❌   | ✅         | ✅           |
| Order Mode + Vendor CSV export               | ❌   | ✅         | ✅           |
| Change team's passwords                      | ❌   | ✅ (own)   | ✅ (any)     |
| Reset another team's passwords               | ❌   | ❌         | ✅           |

---

**Next:** [REST API →](api.md)
