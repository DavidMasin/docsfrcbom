# FRCTools Orders (COTS)

FRC BOM ships with native support for **[FRCTools Orders](https://orders.frctools.com)** — a community-run service that lets FRC teams group COTS parts by vendor and generate clean order sheets.

The integration lives on the **system BOM** and **Main** pages (admin only). It's only visible when the **COTS** filter is active.

---

## Why use it

A typical FRC BOM has 200+ COTS rows pulled in from CAD. Doing the manual "what do we still need from REV / WCP / AndyMark / The Thrifty Bot" lookup is painful. FRCTools Orders solves the "which product is this?" half of the problem — FRC BOM solves the "how do I get those mappings out as a vendor CSV?" half.

End result:

- A drop-in mapping flow: pick the COTS row → search FRCTools → choose the product → done.
- A toggle that dismisses parts you already have on the shelf.
- One click to export a CSV per vendor, ready to paste into the vendor's order form.

---

## Where to find it

1. Open a system BOM page or `/{robot}/Main`.
2. Click the **COTS** filter button at the top.
3. The **🛒 Order Mode** control bar appears (admin only).

| Control                  | Action                                                       |
|--------------------------|--------------------------------------------------------------|
| 🛒 **Order Mode**        | Toggles per-row order controls (Link / Dismiss / Quantity).  |
| ⬇️ **Export Vendor CSVs**| Generates one CSV per vendor and triggers download.          |
| Totals strip             | Live count of mapped / unmapped / dismissed parts.           |

---

## Mapping a COTS row to a vendor product

In Order Mode, each COTS card shows a **🔗 Link** button:

1. Click **🔗 Link** on a part row.
2. A modal opens with a search box. Pre-fills with the part's name when there's a sensible default.
3. Type a query and press **Search**. FRC BOM forwards your query to FRCTools Orders via `GET /api/frctools/vendors/search?q=…`.
4. Pick the right product. The mapping is saved on the robot via `POST /api/cots_order_set`.

Once mapped, the row shows the vendor logo + SKU. The mapping is keyed by `part_key` (the part name slug) and is **shared across systems** in the same robot — link a part in one system and the Main view shows it linked everywhere.

### Auto-detect by URL
If your COTS row already has a vendor URL in the description, FRC BOM will hit `GET /api/frctools/vendors/by_url?url=…` to try to fetch the mapping automatically — you may not need to open the modal at all.

---

## Dismissing a part

For parts you already have on the shelf:

1. In Order Mode, click **Dismiss**.
2. The card switches to a "dismissed" look; the part is excluded from the export.
3. Click again to un-dismiss.

API: `POST /api/cots_order_dismiss` with `{team_number, robot_name, part_key, dismissed: true|false}`.

State is saved on `robot.cots_order` per `part_key`:
```json
{
  "rev-spark-max": {
    "mapping": { "vendor": "REV Robotics", "sku": "REV-11-2158", "url": "…" },
    "dismissed": false
  }
}
```

---

## Exporting CSVs

Click **⬇️ Export Vendor CSVs**:

- FRC BOM groups every mapped, non-dismissed row by vendor.
- For each vendor it builds a CSV with columns: SKU, name, quantity, URL.
- One file per vendor is triggered into your browser's download queue (file names follow `vendor-{slug}.csv`).

Common columns include:
- `SKU`
- `Description`
- `Quantity Needed`
- `Already Have`
- `Vendor Product URL`

> Quantity logic respects the part's required quantity minus its `available_qty`. If you already have stock, the export pre-subtracts it.

---

## API surface

| Endpoint                                       | Purpose                                          |
|------------------------------------------------|--------------------------------------------------|
| `GET  /api/cots_order_state?team_number=…&robot=…` | Read the full order map for a robot              |
| `POST /api/cots_order_set`                     | Save a mapping `{part_key, mapping, dismissed}`  |
| `POST /api/cots_order_dismiss`                 | Toggle `dismissed` for a `part_key`              |
| `GET  /api/frctools/vendors/search?q=…`        | Proxy to FRCTools Orders product search          |
| `GET  /api/frctools/vendors/by_url?url=…`      | Proxy to FRCTools Orders lookup-by-URL           |

Auth: all require a JWT and the caller must be admin of the team (or global admin).

---

## Privacy

FRC BOM proxies your search queries through its own backend (so FRCTools Orders sees the FRC BOM server, not your browser). No PII is forwarded.

---

**Next:** [3D Viewer & CAD Download →](viewer.md)
