# Custom Property IDs

When the [auto-generated FeatureScript](autoFeatureScript.md) writes part metadata into Onshape, it needs to know **which custom-property fields to write to**. There are four:

| FRC BOM field   | Onshape custom property name | What it stores                                   |
|-----------------|------------------------------|--------------------------------------------------|
| Material        | `BOM Material`               | The material the part is made of                 |
| Pre Process     | `Pre Process`                | A "preparation" stage value (Saw, Jigsaw, …)     |
| Process 1       | `Process 1`                  | Primary machining step (CNC, Lathe, …)           |
| Process 2       | `Process 2`                  | Secondary step (Powder coat, Anodize, …)         |

If you leave the property-ID fields blank in Team Settings, the FS generator uses embedded defaults. If you've already created custom properties yourself, paste the four IDs into Team Settings so FRC BOM writes to **your** existing properties.

---

## Find a property's ID in Onshape

1. Open your **Classroom / Company → Settings → Properties**.
2. Locate the property (e.g. `Pre Process`).
3. Click the row → the URL bar or right-side detail pane shows the property's 24-hex ID.
4. Copy the ID — looks like `6735a8c1b4f0e9c1d2e3a4f4`.

> Some property views hide the ID until you hover the row. If you can't see it, open the row's "edit" view; the ID appears in the URL.

---

## Paste them into FRC BOM

Open **Team Settings → Onshape FeatureStudio → Custom Property IDs (optional)** and fill in:

| Field                       | What to paste                       |
|-----------------------------|-------------------------------------|
| Material Property ID        | `BOM Material` ID                   |
| Pre-Process Property ID     | `Pre Process` ID                    |
| Process 1 Property ID       | `Process 1` ID                      |
| Process 2 Property ID       | `Process 2` ID                      |

Click **Save Onshape Settings** then **Make / Update FeatureStudio**. The generated FeatureScript will write to those exact property fields.

---

## Where they live

These IDs are stored on the team's `keys` JSON:

```json
{
  "access":                  "AK…",
  "secret":                  "SK…",
  "material_property_id":    "6735…f4",
  "preprocess_property_id":  "6735…bc",
  "process1_property_id":    "657d…af",
  "process2_property_id":    "657d…e3"
}
```

You can update them via `POST /api/team_settings` with a partial `keys` payload — FRC BOM merges with the existing keys so partial updates won't wipe your Access/Secret.

---

## Why bother?

- **Reuse existing classroom properties** instead of duplicating them.
- **Keep BOM template columns wired** to your historical data.
- **Avoid two "Material" columns** showing up in the BOM (one from Onshape, one from FRC BOM).

If you're starting fresh and don't care about back-compat, leave the IDs blank — the defaults work.

---

## Troubleshooting

| Symptom                                            | Likely cause                                                  |
|----------------------------------------------------|---------------------------------------------------------------|
| "Property not found" in Onshape after applying FS  | The pasted ID doesn't exist in this classroom.                |
| Values get written but BOM column stays blank      | Your BOM template doesn't include the column. Add it.          |
| Two materials columns                              | You filled in `material_property_id` AND have a Material col enabled in the template. Pick one. |

---

**Next:**
- [Auto-Generated FeatureScript →](autoFeatureScript.md)
- [Onshape API Keys →](onshapeAPI.md)
