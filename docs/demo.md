# Demo Team

The fastest way to evaluate FRC BOM is the one-click demo.

---

## What is a Demo Team?

A **fully functional, throw-away team** with admin access. You get:

- A randomly assigned **9-digit team number** (in the range 400 000 000 – 999 999 999)
- A generated **Admin password**
- A generated **User password**
- An admin JWT cookie set immediately so you land in `/{team_number}/Admin`
- A **24-hour lifetime** — after that, the team and all of its data are deleted automatically

Demo teams are real teams with the **`is_demo` flag** set and a **`demo_expires_at`** timestamp. The server prunes expired demos every 15 minutes (and via `GET /internal/prune_demos` if you want to force it).

---

## How to create one

1. Visit **[frcbom.com](https://frcbom.com)**.
2. Click **🚀 Try a Demo** on the hero section.
3. Wait a moment — a modal appears with:
   - Team Number (Copy)
   - Admin Password (Show / Copy)
   - User Password (Show / Copy)
   - **Copy All** button
   - **Go to Admin** button
4. Click **Go to Admin** to land in the dashboard. The JWT cookie is already set.

> Save the credentials! Once you close the modal the password will not be shown again. If you do lose them, just create a new demo.

---

## What you can do in a demo

Everything an admin can do on a real team:

- Configure machines and materials
- Add Onshape API keys
- Auto-generate a FeatureStudio (it lives in *your* Onshape folder; it does **not** auto-delete with the demo)
- Create robots and systems
- Fetch BOMs
- Test the FRCTools Orders flow
- Invite teammates with the user password

> ⚠️ The 24-hour timer starts when the demo is created. Any robots, systems, BOMs, and order state are deleted along with the team.

---

## Caveats

- **You cannot extend a demo.** Migrate to a real team before the timer runs out.
- **Folder docs persist.** If you auto-generate a FeatureStudio in your Onshape folder, that document stays in Onshape after the demo expires. Move or delete it yourself if you don't want it.
- **API keys you saved live with the team.** When the demo prunes, anything stored in `team.keys` is removed.
- The demo team number cannot be reused by you — the random ID space is huge, but the team you got is gone for good once it expires.

---

## Migrating from demo to a real account

There is no automatic migration. If you want to move:

1. Register your real team (`/register`).
2. Recreate machines & materials in your team settings (you can copy them across by hand).
3. Recreate robots & systems and fetch BOMs.

Most users just use the demo to learn the UX, then start fresh.

---

## API

For automation or testing:

```bash
curl -X POST https://frcbom.com/api/demo_team
```

Response:
```json
{
  "message": "Demo team created",
  "team_number": "734512098",
  "user_password": "abc123XyZ",
  "admin_password": "abc123XyZ4567",
  "expires_at": "2026-05-16T12:34:56+00:00",
  "redirect_to": "/734512098/Admin"
}
```

The response also sets an `access_token_cookie` JWT for the admin role.

---

**Next:** [Team Settings →](teamSettings.md)
