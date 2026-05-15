# Onshape API Keys

FRC BOM talks to Onshape with **API keys** (no OAuth needed). Every team needs one **Access Key** and one **Secret Key**.

---

## Where keys are used

| Feature                                       | Needs keys |
|-----------------------------------------------|------------|
| Fetch BOM from an assembly                    | ✅         |
| Auto-create / update the FeatureStudio        | ✅         |
| Per-part CAD download (STEP / STL / GLTF / x_t)| ✅        |
| Robot/system thumbnail caching                | ✅         |
| 3D assembly viewer                            | ✅         |

> Keys are stored per team in `team.keys.access` / `team.keys.secret`. Each system can override them with `system.access_key` / `system.secret_key`; if those are empty, FRC BOM falls back to the team-level keys.

---

## Step 1 — Open the Onshape developer portal

Visit **<https://dev-portal.onshape.com>** and sign in with the Onshape account that should own the keys.

> Best practice: use the **team's shared Onshape account** (often a mentor account), not a student's personal account. If the student leaves, your build still works.

---

## Step 2 — Create the API key

1. Click **API Keys** in the left nav.
2. Click **Create new API keys**.
3. Choose a label (e.g. `FRC BOM — 5987`).
4. Select **all available scopes** (Read, Write, Application data, etc.). FRC BOM needs at minimum:
   - **Read documents**
   - **Write/edit documents** (so it can create the FeatureStudio in your folder)
   - **Application data** (used by the BOM endpoint)
5. Click **Create**.

A modal shows both keys. **Copy them now** — the Secret will never be shown again.

---

## Step 3 — Paste them into FRC BOM

### Team-level (recommended)
Open **Team Settings → Onshape FeatureStudio** and paste the keys into **Access Key** and **Secret Key**. Click **Save Onshape Settings**.

### System-level (override)
Open a system BOM page → **⚙️ Edit System Settings** and paste the keys there. Use this only when a specific subsystem needs to authenticate against a different Onshape account.

---

## Step 4 — Verify

Easiest verification: click **Make / Update FeatureStudio** in Team Settings. If the keys are valid you'll see a green status message and an **Open FS** button. If they're not, the error panel will show the Onshape HTTP error.

You can also run a quick health check from your terminal:

```bash
curl -u "ACCESS:SECRET" https://cad.onshape.com/api/users/sessioninfo
```

A 200 response with your name confirms the keys work.

---

## Rotating keys

If keys leak, revoke them at the developer portal and create new ones. Then paste the new pair into FRC BOM. Existing FRC BOM data is unaffected.

---

## Troubleshooting

| Symptom                                  | Likely cause                                           |
|------------------------------------------|--------------------------------------------------------|
| `401 Invalid credentials`                | Wrong key pair or copy/paste with stray whitespace.    |
| `403 Forbidden`                          | The key lacks the scope. Recreate with all scopes.     |
| BOM fetch returns 0 parts                | Onshape document isn't shared with the key owner.      |
| "Cannot create document in folder"       | Folder URL pasted incorrectly or owner can't write to that folder. |
| Make FS returns 502 with `details.body`  | Check the JSON body in the error panel — usually a scope or document-permission issue. |

---

## Security tips

- **One key per environment.** Don't reuse production keys in dev tests.
- **Never commit keys to Git.** FRC BOM stores them server-side; you don't need them in client code.
- **Use a team-owned Onshape account.** Personal accounts disappear when graduates leave.
- **Rotate at the end of the season** as a hygiene practice.

---

**Next:**
- [Custom Property IDs →](propertyIds.md)
- [Auto-Generated FeatureScript →](autoFeatureScript.md)
- [FeatureScript Setup →](FeatureScriptSetup.md)
