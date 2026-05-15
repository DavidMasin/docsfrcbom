# Team Dashboard (User View)

URL: `/{team_number}`

This is the page everyone on your team lands on after signing in with the **user** password. It's a read + update view — perfect for builders running CNCs, lathes, or the 3D-printer farm.

---

## Difference vs. Admin

| Capability                       | User | Admin |
|----------------------------------|------|-------|
| See robots & systems             | ✅   | ✅    |
| Open the 3D viewer               | ✅   | ✅    |
| Update part progress (+/-)       | ✅   | ✅    |
| Download CAD for a part          | ✅   | ✅    |
| Filter / search the BOM          | ✅   | ✅    |
| Edit system settings             | ❌   | ✅    |
| Add / delete manual parts        | ❌   | ✅    |
| Soft-delete & restore BOM rows   | ❌   | ✅    |
| Fetch BOM from Onshape           | ❌   | ✅    |
| Order Mode + Vendor CSV export   | ❌   | ✅    |
| Change team configuration        | ❌   | ✅    |

> The role is determined by which password you used to sign in (`is_team_admin` claim in the JWT). To switch, log out and sign back in with the other password.

---

## Layout

| Section            | What it shows                                                       |
|--------------------|---------------------------------------------------------------------|
| Header             | Team name & number, logout button                                   |
| Robot card grid    | One card per robot — same layout as the admin view                  |
| Robot detail page  | Shows the system list of the chosen robot (no add/delete buttons)   |
| System BOM page    | Parts grid (cards), filters, material download                      |

---

## Robot card

Each card is clickable. The card thumbnail is, in priority order:

1. The robot's Onshape main-assembly thumbnail (if set by the admin)
2. The uploaded `Robot Schematic` image
3. A neutral placeholder

Clicking a card opens `/{team_number}/{robot_name}` — the user-facing robot view, which lists the systems.

---

## System BOM (user)

URL: `/{team_number}/{robot_name}/{system}`

You see the parts grid for that system. Available controls:

### Filters
- **All Parts** — every row in the BOM
- **COTS** — purchased parts
- **In-House** — manufactured parts

### Material
- **Filter by Material** — narrow the grid to one material.
- **Download All Material** — pick a material, grab every CAD file of that material at once. Files queue in the bell icon (top-right).

### Per-part actions
- **+ / − counters** on Pre-Process, Process 1, Process 2 (where applicable for in-house parts).
- **Download CAD** — pick a format (STEP / STL / GLTF / x_t). The bell icon shows in-flight downloads.
- **View 3D model** — opens a viewer modal for that part.
- Click the card body to open the **part detail** view.

> What you cannot do as a user: fetch BOM, add or delete parts, edit machines/materials, or change Onshape keys.

### Live updates
The page is connected via Socket.IO. When anyone — admin or user — updates a counter, every other browser viewing the same system updates within ~200 ms. No refresh needed.

### Confetti
When a part hits its target quantity, a celebration modal appears on the robot dashboard. See [Dashboards →](dashboards.md).

---

## Main view

URL: `/{team_number}/{robot_name}/Main`

The pseudo-system that aggregates parts from every system in the robot. It's read-mostly for users:

- All filters work
- Material filter + bulk download work
- Counters work (the underlying part is updated in its real system)
- COTS Order Mode is admin-only

The Main view is a great place to do "where is this part across the robot?" lookups.

---

## Logout

Click **Logout** in the header. This clears your JWT cookie and returns you to the landing page.

---

**Next:**
- [Tracking Parts →](trackingParts.md)
- [3D Viewer & CAD Download →](viewer.md)
- [Robot & System Dashboards →](dashboards.md)
