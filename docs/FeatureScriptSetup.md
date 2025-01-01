### If any assistance is needed, contact me @DavidMasin in Cheif Delphi (you can DM me)
# Onshape Setup for Importing BOM (Educator License)

This guide walks you through creating custom properties in Onshape for managing Bill of Materials (BOM) data and setting up a BOM template. These properties will be useful for capturing manufacturing/pre-processing steps and materials. This setup is particularly helpful when exporting to an FRC-oriented BOM workflow.

---

## 1. Access Classroom Settings

1. Log in to your Onshape ADMIN **Educator** account.
2. Open your **Classroom** 
3. Click the gear icon or navigate to **Settings** to access the configuration options.

---

## 2. Create Custom Properties

1. In the **Settings** menu, select **Properties** on the left-hand tab.
2. Click the **Create custom property** button.

Each custom property will have:
- **Name** (the key used in the BOM and within Onshape)
- **Type** (e.g., string, list, etc.)
- **List of values** (if applicable)
- **Category** (e.g., Part, Assembly, Drawing, etc.)

### Example: `Pre Process`

- **Property Name:** `Pre Process`
- **Type:** List
- **Values:**
   - `Jigsaw`
   - `Saw`
- **Category:** `Part` (ensures this property applies to Part objects)

Click **Create** or **Save** when done.

---

### Repeat for `Process 1` and `Process 2`

Follow the same steps to create two more custom properties, `Process 1` and `Process 2`. These will have the same list of values but can be used to indicate separate operations if needed.

- **Property Name:** `Process 1`
   - **Type:** List
   - **Values:**
      - `Lathe`
      - `CNC`
      - `Printer3D`
      - `Mill`
      - `Welding`
      - `Riveting`
      - `Sanding`
      - `PowderCoat`
   - **Category:** `Part`

- **Property Name:** `Process 2`
   - **Type:** List
   - **Values:**
      - `Lathe`
      - `CNC`
      - `Printer3D`
      - `Mill`
      - `Welding`
      - `Riveting`
      - `Sanding`
      - `PowderCoat`
   - **Category:** `Part`

> **Tip:** These properties can capture the primary and secondary manufacturing processes for each part.

---

### Add `BOM Material` Property

Finally, create a `BOM Material` property to track the material used in each part. There are two approaches:

1. **Type: String** – A free-text field where team members can type any material name.
2. **Type: List** – A predefined list of materials to standardize your entries.

#### Example Using a List

- **Property Name:** `BOM Material`
- **Type:** List
- **Values:**
   - `Aluminum 6061`
   - `Steel`
   - `Polycarbonate`
   - `ABS Plastic`
   - `Plywood`
- **Category:** `Part`

---

## 3. Create a BOM Template

After setting up the custom properties, do the following:

1. Go to the **Preferences** tab in your Onshape settings.
2. Select **Create BOM Template**.
3. Choose which columns to include in the template. A recommended set is:
   - **Item**
   - **Name**
   - **Quantity**
   - **Description**
   - **Material**
   - **Mass**
   - **Vendor**
   - **BOM Material**
   - **Pre Process**
   - **Process 1**
   - **Process 2**

You can name this template however you like (e.g., `FRC BOM Template`).

---

## 4. Apply the BOM Template

Once you have created your BOM template:

1. Open the **document** you want to import/export (the one where you’ve created the parts using these custom properties).
2. Use the **Material and Processes FeatureScript** (FS).
   - **Important:** To use this FeatureScript, you **must make a copy** of it into your own Onshape environment.
   - After that, you need to change the IDs of the properties. You can access them in the **Properties** tab that we set up before to ensure the FS references the correct fields.
3. In the **Assembly** workspace, click the **BOM** button.
4. Click **Apply BOM Template** and select the BOM template you created (e.g., `FRC BOM Template`).

Your BOM should now display the custom columns (`Pre Process`, `Process 1`, `Process 2`, `BOM Material`, etc.) with the data you entered in the properties.
> ⚠️ Anyone from your classroom will see that BOM template and can Apply it themselves!
---

## 5. Verify and Maintain

1. **Verify** the newly created BOM to ensure the values from custom properties (Pre Process, Process 1, etc.) appear correctly.
2. **Maintain** these properties moving forward so team members have a consistent record of processes, materials, and other part metadata.

---


By following these steps, your FRC team will have a streamlined process for generating BOMs directly from Onshape, ensuring compliance, clarity, and better collaboration.
