# Robot & System Dashboards

Dashboards are read-only summary pages designed for TVs and team standups.

---

## Robot Dashboard

URL: `/{team_number}/Admin/{robot_name}/Dashboard` (or `/{team_number}/{robot_name}/Dashboard` for users)

### Top stats strip

| Card             | Value                                                  |
|------------------|--------------------------------------------------------|
| **Total**        | Count of every part across every system of the robot.  |
| **Completed**    | Parts where every configured stage hit target.         |
| **% Complete**   | Percentage indicator next to Completed.                |
| **COTS**         | Count of COTS parts.                                   |
| **In-House**     | Count of in-house parts.                               |
| **Top Material** | Material with the most parts in the robot.            |

API: `GET /api/dashboard/robot_stats?team_number=…&robot_name=…`

### Systems grid

Below the stats, every real system is rendered as a card:

- System thumbnail (Onshape)
- System name
- A mini-stats line: total / completed / % complete
- An embedded mini 3D viewer (auto-rotating GLTF)

Click a system to open its dashboard.

### Confetti feed

When a part hits its target quantity, the **Recent Completions** modal animates in:

- The part name and quantity hit
- A 3D preview of the part (per-part GLTF)
- An **OK** button that acknowledges the completion so it doesn't pop again

Acknowledgement: `POST /api/dashboard/ack_completion`.

---

## System Dashboard

URL: `/{team_number}/Admin/{robot_name}/{system}/Dashboard`

### Layout

| Section                       | Description                                                      |
|-------------------------------|------------------------------------------------------------------|
| **System viewer**             | Auto-rotating GLTF of the whole system assembly.                 |
| **Now Making**                | Live list of parts that have been updated in the last few mins.  |
| **% Complete ring**           | Animated SVG ring; center label shows percent.                   |
| **System Stats**              | Counts by stage, by material, by status.                         |
| **Confetti modal**            | Same as the robot dashboard.                                     |

API: `GET /api/dashboard/system_stats?team_number=…&robot_name=…&system_name=…`

### What feeds it

- `system.bom_data` — unified BOM list (Onshape + manual − deleted).
- `robot.recent_completion` — recent completion entries keyed by `system_name`.
- Live Socket.IO updates.

---

## "Show Completed Parts" mode

Both dashboards (and the System detail page) support a **Show Completed Parts** toggle that renders only the finished parts in the 3D viewer. Use it to make celebrations more visible or to confirm the next subassembly is ready to ship.

---

## Display tips

- Open the dashboard on a TV/large monitor over LAN.
- Use `?compact=1` in the URL (future feature; check for support) to shrink the controls and maximise the viewer.
- Confetti pops at most once per completion — acknowledging it on one browser dismisses it across all browsers.

---

**Next:**
- [3D Viewer & CAD Download →](viewer.md)
- [Tracking Parts →](trackingParts.md)
