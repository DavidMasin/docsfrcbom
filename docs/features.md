# Features

Everything FRC BOM does today.

---

## 🔐 Accounts & access

- **Team registration** with separate **User** and **Admin** passwords.
- **JWT cookie sessions** with 30-day expiry; CORS-enabled.
- **Login auto-detect**: enter either password and FRC BOM routes you to the matching view.
- **Legacy plaintext passwords are auto-upgraded** to scrypt on first successful login.
- **Strong-password rules** (≥8 chars, upper + lower + digit) enforced when changing credentials.
- **Change credentials** page: rename the team, rotate user or admin password.
- **Global admin** (team `0000` + admin password) — can reset any team's passwords and audit team configs.
- **Demo team** — one-click, auto-expiring (24h), self-cleaning every 15 min.

---

## 🤖 Robots & systems

- **Multiple robots per team** (practice, competition, off-season, archive).
- Each robot has a **name, competition year, optional uploaded image**, and an **Onshape main-assembly thumbnail**.
- **Robot fleet** card grid with hover actions (open, delete).
- **Inline robot rename** + delete.
- **Per-robot main assembly** (URL + keys + thumbnail) drives the hero image and the "Main" aggregated BOM.
- **Multiple systems per robot** with thumbnails.
- **Auto-generated *Main* system** that combines every system's parts; cannot be deleted, cannot be fetched into directly.
- **Inline system rename** on the system page.
- **Delete a system** (Main is protected).

---

## 📦 Bill of Materials

- **Onshape BOM import** with header detection that handles dashes, en-/em-dashes, NBSPs, and extra spaces in property names.
- **Subassembly expansion** — list each subassembly URL once, FRC BOM multiplies parts by the parent quantity.
- **Quantity multiplier** preserves progress: existing `done_*` counters survive a re-fetch.
- **Soft-delete parts** — removed parts can be restored in one click.
- **Manual parts** — add things not in CAD; they survive re-fetches.
- **Filters:** All / COTS / In-House, plus a **material filter** dropdown.
- **Bulk material download** — pick a material, download every part in that material at once.
- **Material BOM** column resolved from `FRCBOM - Bom Material`, with fall-back to Onshape's `Material`.

---

## 🛠️ Process tracking

- Three configurable stages per part: **Pre-Process**, **Process 1**, **Process 2**.
- `+ / -` counters per stage and an **Available** counter.
- **Live updates** via Socket.IO — every browser viewing the same robot/system updates instantly.
- **Recent completion feed** + confetti modal when a part hits its target quantity.
- **Per-row "Now Making"** indicator on the system dashboard.

---

## 🏭 Team configuration

- **Machines manager** with name, default CAD format (STEP / STL / GLTF / x_t), and stage (Process / PreProcess).
- **Materials manager** with **categories** + ordered items. Categories and items are reorderable with ↑ / ↓.
- **Onshape folder URL + API keys** stored once for the whole team.
- **Custom property IDs** for Material / Pre Process / Process 1 / Process 2 (so FRC BOM can write your existing Onshape properties).

---

## ⚡ Onshape integration

- **API-key-only auth** (no Onshape OAuth required).
- **Auto-create FeatureStudio** in your Onshape folder. Re-running updates the existing doc — no orphans.
- **`setMaterial` + `setProcesses` features** generated from your team's machines & materials lists.
- **Optional version creation** after each FS update.
- **Live thumbnails** for robots and systems pulled from Onshape, with credentials proxied through `/api/onshape/thumbnail` so users never see the keys.

---

## 🛒 FRCTools Orders (COTS)

- **Order Mode** toggle that appears on the COTS filter.
- **Search FRCTools Orders** for a product and **link** it to a COTS row.
- **Auto-detect from URL** if the COTS row already contains a vendor URL.
- **Dismiss** parts that are already on hand (saved per robot).
- **Export Vendor CSVs** — grouped, ready-to-paste into a vendor portal.

---

## 🖼️ Visualization

- **In-browser 3D viewer** using three.js + GLTF.
- **Per-part GLTF** stream from Onshape with sensible smoothness defaults.
- **Per-assembly GLTF** stream for the whole system; toggle "Show Completed Only" to highlight what's done.
- **Auto-rotate** with up-axis normalization (Onshape's Z-up → viewer's Y-up).

---

## ⬇️ CAD download

- Per-part download in **STEP, STL, GLTF, or x_t**.
- **Fast-path STL** using the signed Onshape client (no translation job needed).
- **Translation fallback** for all other formats with polling and timeout.
- **Download queue** — a bell icon on the BOM page that surfaces in-flight downloads.

---

## 📊 Dashboards

- **Robot Dashboard** — totals, completed, COTS vs in-house counts, top material, percentage complete.
- **System Dashboard** — circular completion ring, "Now Making" list, per-process counters.
- **Confetti celebration** with a 3D model preview when a part finishes.

---

## 🌐 URLs & routing

| Pattern                                                | Role            |
|--------------------------------------------------------|-----------------|
| `/`                                                    | Landing page    |
| `/register`                                            | Registration    |
| `/{team_number}`                                       | Team User view  |
| `/{team_number}/Admin`                                 | Team Admin view |
| `/{team_number}/Admin/{robot_name}`                    | Robot detail    |
| `/{team_number}/Admin/{robot_name}/{system}`           | System BOM      |
| `/{team_number}/{robot_name}/{system}`                 | System BOM (user) |
| `/{team_number}/Admin/{robot_name}/Dashboard`          | Robot dashboard |
| `/{team_number}/Admin/{robot_name}/{system}/Dashboard` | System dashboard |
| `/{team_number}/Admin/settings`                        | Team settings   |
| `/{team_number}/credentials`                           | Change credentials |
| `/{team_number}/new_robot`                             | New robot form  |

See [Page Map →](pageMap.md) for the full list.

---

## 🔌 Public REST API

JSON over HTTPS, cookie-based JWT auth.

- `POST /api/login`, `POST /api/register`, `POST /api/demo_team`
- `GET/POST /api/team_settings`, `POST /api/settings/make_fs`
- `GET/POST/PATCH/DELETE /api/machines[...]`
- `GET/POST/PUT/DELETE /api/robots[...]`
- `POST /api/systems`, `DELETE /api/systems/{id}`
- `GET/POST /api/system_settings`, `POST /api/bom`
- `POST /api/bom_add_manual`, `POST /api/bom_delete_part`, `POST /api/bom_restore_deleted`
- `GET/POST /api/cots_order_state`, `POST /api/cots_order_set`, `POST /api/cots_order_dismiss`
- `GET /api/frctools/vendors/search`, `GET /api/frctools/vendors/by_url`
- `POST /api/download_cad`, `POST /api/viewer_gltf`, `POST /api/assembly_gltf`
- `GET /api/dashboard/robot_stats`, `GET /api/dashboard/system_stats`, `GET /api/dashboard/recent_completions`
- `POST /api/dashboard/ack_completion`
- `GET /api/health`

Full reference: [REST API →](api.md).

---

## 🧰 Quality-of-life

- **Auto-prune** of expired demo teams every 15 minutes (per-request idle check).
- **Robot card thumbnails** proxied so the page works even without Onshape login.
- **Edit-in-place** for system name on the BOM page.
- **Copy buttons** for credentials in the demo modal.
- **Mobile-friendly** layout (Tailwind + glass cards).
- **Dark theme** everywhere.

**Happy Building! 🚀**
