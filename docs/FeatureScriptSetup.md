# FeatureScript Setup (Manual)

This page documents the **classroom / manual** approach where you create custom properties yourself, hand-author the FeatureScript, and apply a BOM template.

> **Most teams should use the auto-generated FeatureScript instead** — see [Auto-Generated FeatureScript →](autoFeatureScript.md). It does everything below in one click without touching Onshape settings.

Use the manual approach if:
- You don't have an Educator/Enterprise account and can't create classroom-level properties via the auto-flow.
- You want full control over property names / categories.
- You already have an existing FRC team Onshape with custom properties you'd like to keep.

---

## 1. Open your Onshape company / classroom settings

1. Log in to your Onshape **Educator** (or **Enterprise**) account that owns the team's documents.
2. Open the **Classroom / Company** the documents live under.
3. Click the gear icon → **Settings**.

---

## 2. Create the custom properties

Open **Properties** in the left rail and click **Create custom property** for each:

### Pre Process
- **Name:** `Pre Process`
- **Type:** `List`
- **Category:** `Part`
- **Values:** match your shop, e.g. `Jigsaw`, `Saw`, `Drilling`

### Process 1 and Process 2
- **Name:** `Process 1` / `Process 2`
- **Type:** `List`
- **Category:** `Part`
- **Values:** `Lathe`, `CNC`, `Printer3D`, `Mill`, `Welding`, `Riveting`, `Sanding`, `PowderCoat` (or whatever your shop uses)

### BOM Material
- **Name:** `BOM Material`
- **Type:** `List` (or `String` if you want free text)
- **Category:** `Part`
- **Values:** `Aluminum 6061`, `Steel`, `Polycarbonate`, `ABS Plastic`, `Plywood`, …

> ⚠️ Anyone in your classroom can see and use these properties. Use stable, generic names.

After creating all four, copy each property's **ID** — you'll paste them into FRC BOM as **Custom Property IDs** so the generated FS writes to the same fields. See [Custom Property IDs →](propertyIds.md).

---

## 3. (Optional) Build a BOM template

A BOM template makes the columns appear in your assemblies:

1. **Preferences → BOM Templates → Create BOM Template**.
2. Add the columns: `Item`, `Name`, `Quantity`, `Description`, `Material`, `Mass`, `Vendor`, `BOM Material`, `Pre Process`, `Process 1`, `Process 2`.
3. Name it `FRC BOM Template`.

Apply it to an assembly via the BOM panel → **Apply BOM Template**.

---

## 4. Drop the FeatureScript into Onshape

If you're not using the auto-generator, copy the two open-source FRCBOM scripts:

- **setProcesses** – assigns Pre Process / Process 1 / Process 2 to a part.
- **setMaterial**  – assigns the BOM Material to a part.

The reference document lives at:
**<https://cad.onshape.com/documents/2ab53c1cecf1cb8d258c9308/w/d6c4bbfad44d288bc9cdc221/e/c0f603bee2bd62b76af7d8ac>**

To use them:

1. Open the document → **File → Make a copy → To my Onshape**.
2. In the copy, open each FeatureStudio tab.
3. Replace the four property IDs at the top of the script with **your** IDs from step 2.

---

## 5. Apply the features in your Part Studios

In each Part Studio:

1. Click **+** → **Custom feature** → pick **set Processes**.
2. Select the part(s) → set Pre Process / Process 1 / Process 2.
3. Click **+** → **set Material**. Select the part(s) → pick a material.

When you fetch the BOM, FRC BOM reads these values from the Onshape custom-property fields the script writes.

---

## 6. Verify

1. Apply your BOM template to the assembly.
2. The columns `Pre Process`, `Process 1`, `Process 2`, `BOM Material` should be populated.
3. Open FRC BOM → fetch the BOM. You should see the values in the part cards.

---

## 7. Maintain

- When you add a new machine in your shop, edit the **list values** on the corresponding property (Pre Process, Process 1, Process 2).
- When you add a new material, edit **BOM Material**.
- Re-apply your features on parts that should use the new values.

---

## Why the auto-flow is easier

The auto-generator ([Auto-Generated FeatureScript](autoFeatureScript.md)) takes your **machines** and **materials** lists from FRC BOM and writes a complete FeatureStudio that:

- Lists categories you defined
- Uses the property IDs you pasted
- Updates in-place every time you change the machine/material lists

You only edit lists in one place (FRC BOM); the FS regenerates on demand.

---

**Next:**
- [Auto-Generated FeatureScript →](autoFeatureScript.md)
- [Custom Property IDs →](propertyIds.md)
- [Onshape API Keys →](onshapeAPI.md)
