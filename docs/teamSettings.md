# Team Settings

URL: `/{team_number}/Admin/settings`

Team-wide configuration that drives every robot, every system, and every BOM fetch.

The page is divided into three cards:

1. **Machines**
2. **Materials**
3. **Onshape FeatureStudio**

(When you're logged in as global admin a fourth **🔐 Reset Team Passwords** card also appears — see [Global Admin →](globalAdmin.md).)

---

## 1. Machines

Define every shop resource you want to track. Each machine has:

| Property      | Values                                  | What it drives                                                                |
|---------------|-----------------------------------------|-------------------------------------------------------------------------------|
| **Name**      | free text, e.g. `CNC Mill`              | Display name + value injected into the FeatureStudio dropdowns.               |
| **CAD Format**| `STEP`, `STL`, `GLTF`, `x_t`            | Default download format when a builder grabs CAD for this machine's parts.    |
| **Stage**     | `Process` or `PreProcess`               | `PreProcess` machines populate Onshape's *Pre Process* dropdown; everything else populates *Process 1* / *Process 2*. |

### Add a machine
Fill the small form at the top of the card and click **Add Machine**.

### Change the stage of an existing machine
Each machine row has a stage dropdown. Changing it issues `PATCH /api/machines/{id}` and updates the FS the next time you regenerate.

### Delete a machine
Click **Delete** in the row. Confirm. The machine is removed from your team and from the next FS generation. Any existing BOM rows that referenced it still display the value as plain text — they just won't snap to a dropdown the next time someone re-tags in Onshape.

### Default machines
A starter list is shipped (`machines.json`) when the team is first created:
- Lathe, CNC, Mill, 3D Printer, Jigsaw, Powder Coat, Riveting, Welding, Sanding…

You can rename/remove any of them.

### API
- `GET  /api/machines?team_number=…`
- `POST /api/machines`
- `PATCH /api/machines/{id}`  (change name / stage / icon / cad_format)
- `DELETE /api/machines/{id}`

---

## 2. Materials

Materials are grouped by **category** (e.g. *Sheet*, *Tube*, *Bar*, *Hardware*) and ordered within their category.

### Add a category
Type the category name in the small input at the top of the materials card and click **Add Category**.

### Add an item to a category
Inside each category there's an input + **Add** button. Type the material name (e.g. `Aluminum 6061 — 1/8"`) and press add.

### Reorder
Use the ↑ / ↓ buttons next to each category and each item. Order is preserved across reloads and shows up in the generated FeatureScript dropdowns.

### Delete
Trash icon per row. Categories can be deleted only when empty.

### Save
Click **Save Materials**. Materials are stored on the team as a JSON map: `{ "Sheet": ["Aluminum 6061 1/8\"", "Polycarbonate 1/4\""], ... }`.

### API
- `GET  /api/team_settings?team_number=…`
- `POST /api/team_settings`  (with `materials` key)

---

## 3. Onshape FeatureStudio

This is where you wire FRC BOM to Onshape **once** and never have to copy-paste IDs again.

### Onshape Folder URL
Paste the URL of a folder in your Onshape Documents view. FRC BOM accepts:
- A full folder URL containing `nodeId=...`
- A path with `/folders/{24-hex-id}`
- Or the raw 24-hex folder ID

The first time you click **Make / Update FeatureStudio**, FRC BOM creates a new document named `FRCBOM_{team_number}_FS` inside that folder.

### Access Key / Secret Key
Onshape API keys with the scopes:
- **Read Documents**
- **Read Information about and Edit Documents**

Required so FRC BOM can create documents in your folder and write FeatureStudio content. See [Onshape API Keys →](onshapeAPI.md).

> Keys are stored in the team's `keys` JSON. They are not displayed back to the page in plain text after save (the secret field is masked).

### Custom Property IDs (optional)
If you've created the four Onshape custom properties yourself (e.g. via the classroom-level setup in [FeatureScript Setup](FeatureScriptSetup.md)), paste their IDs here so the generated `setMaterial` / `setProcesses` features write to your existing properties instead of creating new ones.

| Field                       | Purpose                                |
|-----------------------------|----------------------------------------|
| Material Property ID        | Property that stores the material.     |
| Pre-Process Property ID     | Stores the Pre Process selection.      |
| Process 1 Property ID       | Stores Process 1 selection.            |
| Process 2 Property ID       | Stores Process 2 selection.            |

Leave them blank to use the defaults the FS generator ships with.

See [Custom Property IDs →](propertyIds.md) for a step-by-step on where to find them in Onshape.

### Save Onshape Settings
Stores the folder URL, keys, and any property IDs you typed. No Onshape calls are made.

### Make / Update FeatureStudio

When you click this button FRC BOM:

1. Pulls your machines (split by stage) and materials (with category order) from the DB.
2. Builds a single Onshape FeatureScript file containing:
   - A `setMaterial` feature with your materials grouped by category
   - A `setProcesses` feature with your machines split into PreProcess / Process
3. Either:
   - **Creates** a new document in your folder (first run), creates a FeatureStudio tab named **FRCBOM Settings**, and writes the FS code. OR
   - **Updates** the existing tab in-place.
4. (Optional) Creates a **Version** so you can roll back from Onshape if needed.
5. Stores the doc/workspace/element IDs on the team so re-runs target the same document.

If anything fails the error panel surfaces the doc/workspace/element IDs and Onshape's response body — handy for diagnosing token scope issues.

### After it succeeds
- An **Open FS** button appears that opens the FeatureStudio tab in Onshape.
- A **Copy URL** button copies the link to your clipboard.

Use the two features inside *any* Part Studio in your team's documents. See [Auto-Generated FeatureScript →](autoFeatureScript.md).

---

## Where this data lives

- `team.materials` — categorized material map
- `team.machines` (via `Machine` rows joined on `team_id`)
- `team.keys` — `{access, secret, material_property_id, preprocess_property_id, process1_property_id, process2_property_id}`
- `team.onshape_folder_url`
- `team.fs_doc_id`, `team.fs_workspace_id`, `team.fs_element_id`

---

**Next:**
- [Onshape API Keys →](onshapeAPI.md)
- [Custom Property IDs →](propertyIds.md)
- [Auto-Generated FeatureScript →](autoFeatureScript.md)
