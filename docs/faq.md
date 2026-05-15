# FAQ & Troubleshooting

> Need help? DM **@DavidMasin** on Chief Delphi.

---

## Accounts & login

**Q: I forgot my admin password.**
Only the Global Admin (Team 0000) can reset it. DM @DavidMasin with your team number and a verification method (e.g. an email from a known team account) and they'll trigger `POST /api/reset_team_password`.

**Q: User vs Admin password — which do I enter?**
The login form auto-detects. If you enter the user password you go to `/{team}`. If you enter the admin password you go to `/{team}/Admin`. There's no separate field.

**Q: I'm in the wrong role.**
Click **Logout** in the top bar and sign in again with the other password.

**Q: Why is my password being rejected?**
The strength rules are: ≥ 8 chars, at least one upper, one lower, one digit. Special chars are allowed but not required. Plain-text legacy passwords still work and get auto-upgraded to scrypt on next login.

**Q: My JWT cookie expired.**
JWT cookies last 30 days. Just sign in again.

---

## Demo teams

**Q: How long does a demo team last?**
24 hours from creation. The team and everything inside it is deleted automatically.

**Q: My Onshape FeatureStudio document is still there after the demo expired.**
That's expected. FRC BOM doesn't have permission to delete documents in your Onshape folder — it only cleans up the team in its own database. Delete the doc in Onshape if you don't want it.

**Q: Can I extend a demo?**
No. Register a real team and reconfigure.

---

## Onshape & API keys

**Q: BOM fetch returns 0 parts.**
Check that:
1. The assembly URL is correct (open it in a new tab as the key owner — does it open?).
2. The Onshape document is owned by, or shared with, the key holder.
3. The API key has at least **Read Documents** scope.

**Q: I see "Invalid credentials" from Onshape.**
Re-copy the Access/Secret pair into Team Settings. Strip whitespace. Make sure you didn't accidentally swap the two fields.

**Q: "Make / Update FeatureStudio" returns 502.**
Open the error panel — it contains the doc/workspace/element IDs and the Onshape response body. Most common causes:
- Key lacks **Write/Edit documents** scope.
- Folder URL doesn't decode to a 24-hex folder ID. Use the URL in Onshape's address bar when you have the folder open.

**Q: I have a Personal license — does this still work?**
Yes. Personal accounts can use the auto-generator. You just can't create classroom-level properties the way Educator/Enterprise accounts can. Either trust the embedded property defaults, or create per-document custom properties manually.

---

## BOM behaviour

**Q: Why are some parts duplicated when I list a subassembly?**
The base assembly already lists the subassembly's parts. When FRC BOM finds a matching subassembly URL, it expands it AND removes the parent row to avoid double-counting. Make sure the subassembly *name* matches between the parent assembly and the subassembly URL exactly.

**Q: My progress counters reset after re-fetching.**
They shouldn't. Counters are matched by `partId` on the original Onshape part. If a part's `partId` changed (it was deleted and re-added in CAD), it'll come back as a fresh row. Use `bom_restore_deleted` or add the part as a manual to preserve counts.

**Q: A part disappeared after I deleted it.**
That's a soft-delete. Click **Restore Deleted Parts** to bring it back.

**Q: Manual parts disappeared.**
They shouldn't. Manual parts live on the system in `bom_manual`. If you deleted the system, they're gone. Re-create them.

**Q: COTS vs In-House classification looks wrong.**
A part is COTS when both `Process 1` and `Process 2` are blank/`N/A`. Add at least one Process value in Onshape (via the FeatureScript) to flip it to In-House.

---

## Real-time

**Q: My teammates don't see my updates instantly.**
The Socket.IO room is keyed by `{team_number}:{robot}:{system}`. Make sure everyone is viewing the same system on the same robot. If a refresh fixes it, your WebSocket connection may have stalled — check browser DevTools.

---

## CAD & viewer

**Q: "Part ID not found in any part studio."**
Add the relevant Part Studio URL in **System Settings → Part Studio URLs**.

**Q: The 3D viewer is blank.**
The assembly may be too large to translate in one request. Try viewing individual systems instead of Main, or check the **Show Completed Parts** mode. Big mobile devices can also hit GPU limits.

**Q: STL files are huge / blocky.**
Tune `angleTolerance`, `chordTolerance`, `minFacetWidth` in the `POST /api/download_cad` body. The UI exposes presets in the per-part download menu.

---

## FRCTools Orders

**Q: I don't see Order Mode.**
Order Mode appears only when (a) you're admin and (b) the **COTS** filter is active.

**Q: A mapping I saved isn't appearing in another system.**
Mappings are per `part_key` (the name slug). If the name is different between two systems, FRC BOM treats them as two different rows. Normalise the names in Onshape.

**Q: Vendor CSV export is empty.**
Make sure the COTS rows are **mapped** and **not dismissed**. Dismissed parts are excluded from the export.

---

## Permissions

**Q: I get a 403 on `/api/...`.**
You're trying to call an admin endpoint as a user. Sign in with the admin password and retry.

**Q: Two teams share an Onshape document. Can they share a BOM?**
Not directly — each team has its own systems and BOM rows. They can both fetch from the same Onshape assembly with their own API keys; the data is duplicated per team.

---

## Performance & scaling

**Q: Can our school's whole alliance use it during build season?**
Yes. The site is sized for hundreds of concurrent teams. If you're hitting limits during a regional you can self-host using the Flask app (`app.py`) on Railway / Render / your VPS of choice.

**Q: Does it work offline?**
No — the page lives at frcbom.com and depends on a live server. If you need offline use, self-hosting on a LAN works.

---

## Self-hosting

**Q: How do I run it on my own server?**
Clone `davidmasin/frcbom`. It's a Flask app:

```bash
pip install -r requirements.txt
export DATABASE_URL=postgresql://…   # or leave for sqlite
export SECRET_KEY=…
export JWT_SECRET_KEY=…
flask --app app run
```

It uses Flask-SocketIO; in production run with `gunicorn -k eventlet -w 1 wsgi:app` or similar. Migrations are managed by Flask-Migrate (`flask db upgrade`).

---

## Privacy

**Q: Is my Onshape data shared with anyone?**
No. FRC BOM stores your Onshape API keys server-side and uses them only to talk to Onshape on your team's behalf. CAD downloads and 3D viewer calls go through your team's keys. The only third-party integration is **FRCTools Orders** which only sees the search queries you choose to send.

---

## Still stuck?

DM **@DavidMasin** on Chief Delphi. Include:
- Your team number
- The URL where the problem happens
- What you expected vs. saw
- Any browser DevTools error / network response
