# 3D Viewer & CAD Download

FRC BOM ships with an in-browser 3D viewer (three.js + GLTF) and per-part CAD download in multiple formats.

---

## 3D Viewer

### Per-system assembly

On the robot detail page, every system row has two viewer buttons:

| Button                         | What it does                                                |
|--------------------------------|-------------------------------------------------------------|
| 👁 **Show Full Assembly**      | Streams the system's whole assembly as GLTF and displays.   |
| ✅ **Show Completed Parts**    | Same viewer but renders only the parts whose stages hit 0.  |

Both call `POST /api/assembly_gltf` with `{team_number, robot, system, format: "glb"}`.

> Tip: GLTF/GLB is generated on demand from Onshape. The first request for a system can take ~5–10 s depending on assembly size; subsequent requests are faster.

### Per-part

On any part card, click **Show 3D**. It calls `POST /api/viewer_gltf` and renders the single part in the viewer modal. Useful to verify "is this the right thing?" before downloading CAD.

### Controls

- **Orbit** — left-mouse drag (or one finger on mobile)
- **Pan** — right-mouse drag (or two fingers)
- **Zoom** — scroll wheel (or pinch)
- **Auto-rotate** — on by default; click the canvas to pause
- **Up axis** — automatically rotated from Onshape's Z-up to viewer's Y-up

### Performance notes

- The viewer uses `outputSeparateFaceNodes=false` and modest angle/chord tolerances. If your assembly is huge, expect slower first-loads.
- Mobile devices fall back to a smaller render target automatically.
- Closing the modal disposes the renderer (no memory leak).

---

## CAD Download

Each in-house part card has a **Download CAD** action with a format selector.

| Format  | How it's fetched                                                   |
|---------|--------------------------------------------------------------------|
| **STEP**| Onshape `translations` job + polling + signed download.            |
| **STL** | **Fast path**: signed direct STL request, raw bytes.               |
| **GLTF**| Onshape `translations` job + polling.                              |
| **x_t** | Onshape `translations` job + polling.                              |

API: `POST /api/download_cad`.

Body:
```json
{
  "team_number": "5987",
  "robot":       "Valkyrie",
  "system":      "Intake",
  "id":          "JHD",          // partId from BOM row
  "format":      "STEP"
}
```

Optional STL tuning:
```json
{
  "stl_units":      "millimeter",  // or "inch"
  "stl_mode":       "binary",      // or "text"
  "angleTolerance": 0.04363323129985824,
  "chordTolerance": 0.06,
  "minFacetWidth":  0.0254
}
```

### How the server finds the part
For each Part Studio listed in **System Settings → Part Studio URLs**, the server hits `GET /parts/d/{did}/w/{wid}/e/{eid}` looking for a `partId == id` match. If no studio contains the part you get a `404 Part ID '…' not found in any part studio`. Add the studio URL and retry.

### Download queue

The 🛎 bell at the top-right of every BOM page shows in-flight downloads:
- One entry per file
- Removes itself when the download lands
- Survives page navigation within the same robot session

---

## Bulk material download

In the **Download All Material** dropdown on the system or Main BOM page:

1. Pick a material.
2. The page queues one download per part with that material.
3. The bell badge increases; entries clear as the browser saves each file.

Format used: the part's per-machine default if assigned (STEP/STL/GLTF/x_t), else STEP.

---

## Thumbnails (read-only)

For lighter-weight previews, FRC BOM proxies Onshape thumbnails:

```
GET /api/onshape/thumbnail?u={onshape_thumbnail_url}&rid={robot_id}|&sid={system_id}
```

The proxy uses the robot's or system's stored Access/Secret keys server-side so anonymous browsers can render the image without exposing credentials.

---

## When the viewer or download "doesn't work"

| Symptom                                | Fix                                                                     |
|----------------------------------------|-------------------------------------------------------------------------|
| "Part ID not found in any part studio" | Add the relevant Part Studio URL in System Settings.                    |
| "Failed to start translation"          | Verify Onshape API keys have **Read documents** scope.                  |
| Viewer stays blank                     | Open DevTools and check for the GLB blob URL; refresh the page; try a different browser. |
| STL download is huge / blocky          | Lower `angleTolerance` and `chordTolerance` in the request body.        |
| GLTF assembly times out                | Big assemblies can exceed Onshape's translation timeout; fetch sub-systems individually. |

---

**Next:**
- [BOM Management →](bomManagement.md)
- [REST API →](api.md)
