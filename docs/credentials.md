# Change Credentials

URL: `/{team_number}/credentials`

Use this page to rotate the team name, the user password, or the admin password.

---

## Who can open it

| Caller                                  | Allowed |
|-----------------------------------------|---------|
| Team admin of *this* team               | ✅      |
| Global admin (team `0000`)              | ✅      |
| User of the team                        | ❌      |
| Anyone else                             | ❌      |

You'll get a 403 if you try to open it without the right role.

---

## Fields

| Field            | Optional? | Notes                                                  |
|------------------|-----------|--------------------------------------------------------|
| Team Name        | yes       | Must be unique across all teams.                       |
| User Password    | yes       | Updates only if filled in.                             |
| Admin Password   | yes       | Updates only if filled in.                             |

You **must** submit at least one of the three. Submitting all three empty will return a 400.

---

## Password rules

When you set a new password, FRC BOM enforces:

- **≥ 8 characters**
- At least one **upper-case** letter
- At least one **lower-case** letter
- At least one **digit**

Passwords are hashed with `scrypt` before being saved. Legacy plaintext or pbkdf2 hashes are auto-upgraded the next time the team logs in.

> Special characters are allowed but not required.

---

## What changes

- **Team Name** — appears in the navbar and on the cards.
- **User Password** — used by builders on `/{team_number}/...`.
- **Admin Password** — used by leads on `/{team_number}/Admin/...`. Also identifies the **Global Admin** account when the team number is `0000`.

Existing JWT cookies remain valid until they expire (30 days) or you log out. After rotating, ask everyone to sign in again.

---

## API

`POST /api/change_credentials`

Body:
```json
{
  "team_name":      "New Display Name",
  "user_password":  "BuilderPass1",
  "admin_password": "LeadPass2025"
}
```

Auth: JWT cookie (team admin of this team OR global admin).

Errors:
- `400` — nothing to update, or weak password, or empty team name
- `403` — wrong role
- `404` — team not found
- `409` — team name already in use
- `500` — DB error

---

## Resetting a forgotten password

Only **Team 0000 (global admin)** can reset another team's password. They open **Team Settings** while logged in as global admin and use the **🔐 Reset Team Passwords** card:

```
POST /api/reset_team_password
{
  "team_number": "5987",
  "password":      "NewUserPass1",      // optional
  "adminPassword": "NewAdminPass2"      // optional
}
```

See [Global Admin →](globalAdmin.md).

---

**Next:** [Team Settings →](teamSettings.md)
