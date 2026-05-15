# Global Admin (Team 0000)

FRC BOM ships with one super-user role: the **Global Admin**. There is exactly one of these per installation. It is intended for the platform operator (David, in production at frcbom.com).

---

## How to become Global Admin

Sign in with:
- **Team number:** `0000`
- **Password:** the **admin** password set for team `0000`

The login endpoint checks `team_number == "0000"` AND `ok_admin` and, if both are true, issues a JWT with:

```json
{ "is_team_admin": true, "is_global_admin": true }
```

> Signing in with the *user* password of team 0000 does **not** grant global admin — only the admin password unlocks it.

---

## What Global Admin can do that nobody else can

| Capability                                      | Endpoint                            |
|-------------------------------------------------|-------------------------------------|
| Reset any team's user / admin password          | `POST /api/reset_team_password`     |
| Dump every team's BOM                           | `GET /api/admin/download_bom_dict`  |
| Dump every team's Onshape URLs + API keys       | `GET /api/admin/download_settings_dict` |
| Inspect a specific team's BOM                   | `GET /api/admin/get_bom?team_number=…` |
| Act as admin on **any** team's pages            | Visit `/{team_number}/Admin/…` for any team |
| Manually prune expired demo teams               | `GET /internal/prune_demos`         |

The Global Admin can also do **anything** a team admin can do, for **any team** — fetching BOMs, editing settings, creating robots, etc.

---

## Reset another team's passwords

From Global Admin's **Team Settings** page (open settings while signed in as 0000-admin), a **🔐 Reset Team Passwords** card appears at the top:

| Field                  | Notes                                              |
|------------------------|----------------------------------------------------|
| Target Team Number     | The team whose passwords you want to reset.        |
| New Team Password      | Optional. Leave empty to keep current user pw.     |
| New Admin Password     | Optional. Leave empty to keep current admin pw.    |

Click **Reset Passwords**. The target team's password fields are rewritten with the new scrypt hashes.

API:
```bash
POST /api/reset_team_password
{
  "team_number":   "5987",
  "password":      "NewUser1",
  "adminPassword": "NewAdmin1"
}
```

Requires the global-admin JWT. Returns `200 {"message": "Passwords updated for team 5987"}`.

---

## Inspecting a team's data

Just substitute the team number in any URL:

- `/{team_number}/Admin` — that team's Robot Fleet
- `/{team_number}/Admin/{robot_name}` — that team's robot detail
- `/{team_number}/Admin/settings` — that team's Team Settings

Global admin's session JWT carries an identity of `"0000"`, but the `is_global_admin` claim short-circuits the per-team authorization check.

---

## Demo cleanup

The server prunes expired demo teams automatically every 15 minutes (only when API traffic is hitting the host). If you suspect cleanup is stuck:

```
GET https://frcbom.com/internal/prune_demos
```
Returns `{ "status": "ok" }`. No auth required for this endpoint (it's safe — it just deletes already-expired teams).

---

## Operational data exports

These are intended for the operator/owner only — never share their output.

### Full BOM dump
```
GET /api/admin/download_bom_dict
GET /api/admin/download_bom_dict?team_number=5987
```
Returns nested JSON: `{ team_number → { robot → bom_data } }`.

### Full settings dump
```
GET /api/admin/download_settings_dict
```
Returns nested JSON of every team's Onshape Access/Secret keys plus assembly URLs. **Treat this output like a credentials dump** — it contains every team's keys in plaintext.

> The Global Admin can read keys to help a team debug; the platform never exposes them to anyone else.

---

## Security expectations

- The 0000 admin password is the only thing standing between a logged-in user and a credentials dump. Use a long, unique secret.
- Rotate it any time someone in the operator chain leaves.
- Never paste the global-admin password into a chat or screen share.
- The login flow records nothing about the global admin path beyond standard Flask request logs.

---

**Next:** [REST API →](api.md) · [FAQ →](faq.md)
