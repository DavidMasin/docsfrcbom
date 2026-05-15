# Team Admin Dashboard

URL: `/{team_number}/Admin`

This is your home base after signing in with the admin password. From here you manage every robot, every system, and every team-wide setting.

---

## What you see

| Element                | What it does                                                                 |
|------------------------|------------------------------------------------------------------------------|
| **Robot Fleet** header | Page title.                                                                  |
| **Add New Robot** btn  | Opens the new-robot form (`/{team_number}/new_robot`).                       |
| **Robot cards**        | One per robot. Hover to reveal "Open" and "Delete" icons.                    |
| **Empty state**        | If no robots exist, shows a friendly call-to-action.                         |
| Top nav                | Settings, Credentials, Logout.                                               |

Each robot card shows:
- The robot's main-assembly thumbnail (if set) or its uploaded image, or a placeholder.
- The robot **name** in bold.
- The **Competition Year**.
- Hover: an **→ Open** button and a **🗑 Delete** button (with confirm).

Clicking a card opens the **Robot detail** page (`/{team_number}/Admin/{robot_name}`).

---

## Roles

| Role             | Can do                                                                            |
|------------------|-----------------------------------------------------------------------------------|
| **Team Admin**   | Create/delete robots & systems, fetch BOMs, edit team settings, change passwords. |
| **Global Admin** | Everything above for **every team** + reset other teams' passwords.               |
| **User**         | Cannot access `/Admin`. Their version of the page is `/{team_number}`.            |

The role is encoded in the JWT (`is_team_admin`, `is_global_admin` claims) issued at login time.

---

## Top-bar actions

- **⚙️ Team Settings** → [Team Settings](teamSettings.md)
- **🔑 Credentials** → [Change credentials](credentials.md)
- **Logout** → clears the JWT cookie and returns to `/`.

---

## Add a new robot

Click **Add New Robot** to open `/{team_number}/new_robot`:

| Field                | Required | Notes                                            |
|----------------------|----------|--------------------------------------------------|
| Robot Name           | yes      | Becomes part of the URL.                         |
| Competition Year     | yes      | Defaults to current.                             |
| Robot Schematic      | no       | An image upload (PNG/JPG). Used as a card image. |

After submit you're sent to `/{team_number}/Admin/{robot_name}` to add systems. A `Main` system is automatically created (it cannot be deleted and you should not fetch BOM directly into it).

---

## Delete a robot

Hover a robot card and click the red trash icon. You'll be prompted to confirm; this deletes the robot **and** every system, BOM row, manual part, deleted-part record, and recent-completion entry that belongs to it. There is no undo.

> Admins of team `0000` (global admin) can delete robots belonging to any team.

---

## What lives where

```
/{team}/Admin                       ← this page (Robot Fleet)
  └─ /{team}/Admin/{robot}          ← Robot detail (systems list, hero image)
      ├─ /{team}/Admin/{robot}/Main           ← Main aggregated BOM
      ├─ /{team}/Admin/{robot}/{system}       ← System BOM (admin actions visible)
      └─ /{team}/Admin/{robot}/Dashboard      ← Robot dashboard

/{team}                             ← User home (same fleet, user view)
  └─ /{team}/{robot}                ← User robot view
      └─ /{team}/{robot}/{system}   ← User system BOM (no settings)

/{team}/Admin/settings              ← Team-wide settings
/{team}/credentials                 ← Change passwords / team name
```

See [Page Map →](pageMap.md) for everything.

---

## Best practices

1. **One robot per real build.** It's fine to have a *Practice 2025* and *Comp 2025*; both can re-use the same Onshape doc.
2. **Use the FeatureStudio.** Make / Update FeatureStudio once per season; everyone applies its features instead of free-typing values.
3. **Don't store keys on the system if you've stored them on the team.** System Settings will fall back to the team-level Access/Secret keys automatically.
4. **Use Main only as a viewer.** Always fetch into a real subsystem.

---

**Next:**
- [Robots & Systems →](systems.md)
- [Team Settings →](teamSettings.md)
- [Fetching & Managing BOM →](bomManagement.md)
