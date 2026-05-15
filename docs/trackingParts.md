# Tracking Parts on the Shop Floor

This page is for **builders** — students, mentors, and anyone updating progress as parts move through the shop.

You'll be signed in with the **user** password (or admin — same controls). The page you spend the most time on is the **system BOM**:

```
/{team_number}/{robot_name}/{system}
```

---

## The three stages

Each in-house part has up to three quantity counters:

| Stage          | When you bump it                                           |
|----------------|------------------------------------------------------------|
| **Pre Process**| Raw stock cut, drilled, deburred, or otherwise prepared.   |
| **Process 1**  | Primary operation (CNC, lathe, mill, 3D print, etc.).       |
| **Process 2**  | Secondary operation (powder coat, sanding, anodize, etc.).  |

A part is **finished** when all three (or however many are configured) hit the required quantity.

> **Pre Process is optional.** Many parts skip it entirely — they jump straight from raw stock to Process 1.

---

## Updating progress

On a part card, each stage has:

- A current count (e.g. `4 / 12`)
- `+` and `-` buttons
- A long-press option to type a number directly (mobile)

Tap `+` once for every finished unit. The page:

1. Updates the visible counter immediately (optimistic UI).
2. Sends `POST /api/save_bom_for_robot_system` to persist.
3. Emits a Socket.IO event so other browsers viewing the same system jump to the new value.

If the new value hits the part's required quantity, the dashboard pops a **confetti modal** with a 3D preview of the part.

> If a tap doesn't seem to land, check the bell icon for queued requests, or refresh — your JWT cookie may have expired (it lasts 30 days).

---

## Live "Now Making"

On the **System Dashboard** (`/{team_number}/Admin/{robot_name}/{system}/Dashboard`) you get a real-time list of:

- Parts that have been bumped in the last few minutes
- Who's currently working on them (when the user is signed in)
- An aggregate "X parts in progress" counter

This is great to throw on a TV in the shop.

---

## Available quantity

`available_qty` is a separate counter that tracks **stock on hand**. It's used by:

- The **FRCTools Orders** exporter (subtracts available from required when generating CSVs).
- The dashboard "still need" arithmetic.

You can edit it the same way as the process counters — `+` / `-` next to "Avail".

---

## Filters that help builders

- **In-House** filter → hide COTS noise; show only parts you're actually making.
- **Material filter** → "what's left in 1/8\" aluminum?"
- **Bulk material download** → grab all CAD for a material in one click for a CNC operator.

---

## Mobile tips

- The grid collapses to one column on phones.
- `+` / `-` buttons are big enough to thumb-tap.
- The bell icon stays pinned top-right; pull up the download queue any time.
- The 3D viewer works on mobile but is GPU-heavy; if it stutters, use the **Show Completed Parts** mode which renders fewer meshes.

---

## What you can't do as a non-admin

- Add manual parts
- Delete or restore parts
- Re-fetch BOM
- Change system or team settings
- Toggle Order Mode or export CSVs

Need any of those? Log out and sign in with the admin password.

---

**Next:**
- [Robot & System Dashboards →](dashboards.md)
- [3D Viewer & CAD Download →](viewer.md)
