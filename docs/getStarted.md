# Getting Started

> Need help? DM **@DavidMasin** on Chief Delphi.

This guide walks you through everything from your first visit to your first fully-tracked BOM.

---

## TL;DR (Fastest path)

1. Go to **[frcbom.com](https://frcbom.com)**.
2. Click **🚀 Try a Demo** to get a throw-away admin account for 24 hours, **or** click **Register**.
3. In **Team Settings**, add your **Onshape API keys**, **machines**, and **materials**.
4. Click **Make / Update FeatureStudio** to auto-build the Onshape FeatureStudio your team will use.
5. Apply the *FRCBOM* properties in Onshape, then **Create a Robot** → **Add a System** → **Fetch BOM**.
6. Share the team URL with your team. They log in as the **User** password and start updating progress.

---

## Step 1 — Visit the site

Open **[frcbom.com](https://frcbom.com)** in any modern browser. The landing page has:

- A **Sign in** card (right side).
- A **🚀 Try a Demo** button.
- A **Register** link in the top nav.
- A **Features** + **How it works** scroll section.

---

## Step 2 — Get an account

You have three options:

### Option A: Demo Team (recommended for evaluation)
Click **🚀 Try a Demo**. A modal pops up with:
- A randomly assigned 9-digit team number
- An auto-generated **admin password**
- An auto-generated **user password**
- A **Copy All** button and **Go to Admin** to jump straight in

The demo team **auto-deletes after 24 hours**. See [Demo Team →](demo.md).

### Option B: Register a real team
Click **Register**, then provide:

| Field            | Required | Notes                                               |
|------------------|----------|-----------------------------------------------------|
| Team Number      | yes      | Your official FRC team number (e.g. `5987`).        |
| Team Name        | yes      | Display name (e.g. *Galaxia*).                      |
| Password         | yes      | Used by builders/students.                          |
| Admin Password   | yes      | Used by leads/mentors. Required for editing config. |

> Passwords must be **at least 8 characters** and include **upper-case, lower-case, and a digit** (enforced when you change credentials).

### Option C: Already registered
Click **Sign in**. Enter your **Team Number** and **either** the user or admin password. The system detects which one you used and routes you to the right view:

- **User password** → `/{team_number}` (read + progress-update only)
- **Admin password** → `/{team_number}/Admin` (full configuration)

---

## Step 3 — First-time admin checklist

Sign in with the **admin** password. You land on the **Robot Fleet** page (`/{team_number}/Admin`). Before fetching any BOM, set up the team-wide pieces in **⚙️ Team Settings** (link in the top bar).

### 3a. Machines
Add every machine in your shop. Each machine has:

| Property     | Example     | What it does                                          |
|--------------|-------------|--------------------------------------------------------|
| Name         | `CNC Mill`  | Display name; appears in the FeatureStudio dropdowns. |
| CAD Format   | `STEP`      | Default download format when a builder grabs a part.   |
| Stage        | `Process`   | `Process` or `PreProcess`. Drives Pre/Process columns.|

> **Stage matters.** Machines flagged `PreProcess` populate the *Pre Process* dropdown in Onshape; everything else populates *Process 1* / *Process 2*.

### 3b. Materials
Group materials into **categories** (e.g. *Sheet*, *Tube*, *Bar*) and add items inside each. You can reorder both categories and items with ↑ / ↓ — the order is preserved in the auto-generated FeatureScript so your team sees a logical dropdown.

### 3c. Onshape FeatureStudio
1. Paste your **Onshape Folder URL** (the folder where you want FRC BOM to create the FeatureStudio document).
2. Paste your **Access Key** and **Secret Key** (see [Onshape API Keys →](onshapeAPI.md)).
3. (Optional) Paste **custom property IDs** if you've already created Material / PreProcess / Process 1 / Process 2 properties (see [Custom Property IDs →](propertyIds.md)).
4. Click **Save Onshape Settings**, then **Make / Update FeatureStudio**.

FRC BOM will create (or update) a document called `FRCBOM_{team_number}_FS` inside your folder, containing one Feature Studio tab named **FRCBOM Settings**. That tab now has:
- A `setMaterial` feature with your materials grouped by category
- A `setProcesses` feature with your machines split into PreProcess / Process

Use those features inside any Part Studio to tag parts. See [Auto-Generated FeatureScript →](autoFeatureScript.md).

---

## Step 4 — Create a robot

From **/{team_number}/Admin**, click **Add New Robot**:

| Field                 | Example       | Notes                                            |
|-----------------------|---------------|--------------------------------------------------|
| Robot Name            | `Valkyrie`    | URL-safe display name.                           |
| Competition Year      | `2025`        | Defaults to current season.                      |
| Robot Schematic Image | *(file)*      | Optional. Used as a card thumbnail.              |

You land on the **robot detail** page (`/{team_number}/Admin/{robot_name}`). Click **🖼 Set main assembly image** to point the card image at an Onshape assembly thumbnail instead of a static upload.

---

## Step 5 — Add systems

A robot has one or more **systems**, plus an automatic **Main** view.

Click **➕ Add System**. Provide:

| Field           | Required | Notes                                              |
|-----------------|----------|----------------------------------------------------|
| System Name     | yes      | E.g. *Intake*, *Drivetrain*. **`Main` is reserved.** |
| Assembly URL    | no       | Onshape assembly URL — can be set later.           |
| Thumbnail URL   | no       | Optional preview image.                            |

> Tip: keep one system per Onshape assembly. The **Main** view aggregates all systems automatically; **do not fetch into Main**.

---

## Step 6 — Configure each system & fetch the BOM

Open a system to land on its BOM page (`/{team_number}/Admin/{robot_name}/{system}`). Click **⚙️ Edit System Settings**:

| Field               | Required | Notes                                                  |
|---------------------|----------|--------------------------------------------------------|
| Assembly URL        | yes      | Onshape assembly URL for *this* system.                |
| Subassembly URLs    | no       | Add any subassembly that should be expanded with multipliers. |
| Part Studio URLs    | recommended | Needed for CAD download & GLTF viewer (locate parts by ID). |
| Access Key          | yes      | Defaults to team-level key.                            |
| Secret Key          | yes      | Defaults to team-level key.                            |

Click **🔄 Fetch BOM**. FRC BOM will:

1. Pull the assembly BOM from Onshape.
2. Walk each subassembly URL you listed and multiply its parts by the parent assembly quantity.
3. Merge results, removing duplicates that already appear inside an expanded subassembly.
4. Apply any **deleted** flags and append any **manual parts**.
5. Persist the unified BOM and snap an updated thumbnail.

The page reloads and shows part cards.

---

## Step 7 — Track manufacturing progress

Each part card shows quantity counters for **Pre-Process**, **Process 1**, and **Process 2**, plus an **Available** counter. Builders log in with the **user password** and:

- Tap **+ / −** to update quantities (saved to the server, broadcast to everyone via Socket.IO).
- Click a part to open the **part detail view** (notes, CAD download).
- Open the 3D viewer to verify the right part.

When a part hits its target, a confetti modal pops up on the dashboard for everyone watching the robot.

See [Tracking Parts →](trackingParts.md) and [Dashboards →](dashboards.md).

---

## Step 8 — Filter, find, and download

On any system BOM page you can:

- **Filter:** All Parts / COTS / In-House
- **Filter by material:** dropdown of every material that appears in this BOM
- **Bulk material download:** pick a material → grab all CAD files in that material
- **Add Manual Part:** for things that aren't in Onshape
- **Delete a part:** soft-delete; one click to restore
- **Order Mode** (COTS only): map parts to FRCTools Orders products and export per-vendor CSVs

See [BOM Management →](bomManagement.md) and [FRCTools Orders →](orders.md).

---

## Step 9 — Share with your team

Send your teammates:

1. **Team URL:** `https://frcbom.com/{team_number}`
2. **User password** (not the admin password)

They can log in and update part counts but cannot change settings, delete systems, or fetch BOM. See [Team Dashboard (User) →](TeamDashboard.md).

---

## Step 10 — Logout & switch

Click **Log Out** in the top bar. It clears the JWT cookie and returns you to the landing page. To log in as a different role, just sign in with the appropriate password.

---

## You're ready! 🎉

Next reads:
- [Demo Team](demo.md)
- [Team Admin Dashboard](TeamAdminDashboard.md)
- [Team Settings](teamSettings.md)
- [Onshape API Keys](onshapeAPI.md)
- [FeatureScript Setup](FeatureScriptSetup.md)

**Happy Building! 🚀**
**~ The FRC BOM Team**
