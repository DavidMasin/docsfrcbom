# System Settings

System Settings is the modal you open from a system BOM page (admin only): **⚙️ Edit System Settings**.

It's where you point a system at an Onshape assembly, list its subassemblies and part studios, and store the credentials FRC BOM uses for downloads.

---

## Opening the modal

1. Sign in with the **admin** password.
2. Open the system BOM page: `/{team_number}/Admin/{robot_name}/{system}`.
3. Click **⚙️ Edit System Settings** at the top of the page.
4. The modal slides in. Fields are pre-populated from the database (and fall back to team-level keys when the system has none).

> System Settings is hidden when `system_name == "Main"`. The Main view is computed; it doesn't have its own assembly.

---

## Fields

| Field                | Required for…          | Notes                                                                            |
|----------------------|------------------------|----------------------------------------------------------------------------------|
| **Assembly URL**     | BOM fetch              | A full Onshape assembly URL (`https://cad.onshape.com/documents/.../w/.../e/...`). |
| **Subassembly URLs** | Multi-part assemblies  | List one URL per row. Each is expanded with its parent quantity multiplier.       |
| **Part Studio URLs** | CAD download + viewer  | List the Part Studios that contain the parts in this assembly.                    |
| **Access Key**       | All Onshape calls      | Defaults to the team-level key if blank.                                          |
| **Secret Key**       | All Onshape calls      | Defaults to the team-level key if blank.                                          |

### Add a subassembly
Click **+ Add Subassembly**, paste a URL. Repeat for each one. To remove, click 🗑 on that row.

### Add a part studio
Click **+ Add Part Studio**, paste a URL. Multiple are fine — the CAD-download code searches all of them for a matching `partId`.

---

## Save & Fetch

Click **🔄 Fetch BOM**. FRC BOM:

1. Persists the settings via `POST /api/system_settings`.
2. Calls `POST /api/bom` to fetch.
3. Updates the unified BOM (`bom_data`) and the thumbnail.
4. Reloads the page so you can see the parts.

If you just want to save without fetching, use `POST /api/system_settings` from your own tooling — the UI is fetch-and-save in one motion.

---

## API

### Get settings
```
GET /api/system_settings?team_number=…&robot_name=…&system_name=…
```
Returns:
```json
{
  "assembly_url": "…",
  "access_key": "…",          // falls back to team key
  "secret_key": "…",          // falls back to team key
  "partstudio_urls": ["…"],
  "subassembly_urls": ["…"]
}
```

### Save settings
```
POST /api/system_settings?team_number=…&robot_name=…&system_name=…
Body:
{
  "assembly_url": "…",
  "access_key": "…",
  "secret_key": "…",
  "partstudio_urls": [...],
  "subassembly_urls": [...]
}
```

### Rename a system
```
POST /api/update_system_settings
Body: { "team_number": "…", "robot_name": "…", "system_id": 12, "name": "New Name" }
```
(Also exposed inline when you click the editable header.)

### Trigger a BOM fetch
```
POST /api/bom
Body: { "team_number": "…", "robot_name": "…", "system_name": "…" }
```
Returns the unified BOM list. See [BOM Management →](bomManagement.md).

---

## Tips

- **Reuse team-level keys.** If your team's Onshape Access/Secret are valid for every document, leave System-level keys blank. The fetcher falls back to `team.keys` automatically.
- **Add part studios *before* shop builders ask for CAD.** If a part studio is missing, the `download_cad` endpoint can't locate the part and returns a 404.
- **Re-fetching is non-destructive.** Existing done-counters and manual parts survive a fetch.
- **Renaming the system updates the URL.** All sub-pages (Dashboard, Main aggregations) follow the new name.

---

**Next:**
- [BOM Management →](bomManagement.md)
- [3D Viewer & CAD Download →](viewer.md)
