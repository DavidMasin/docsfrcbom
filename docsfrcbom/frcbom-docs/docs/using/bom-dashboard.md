---
id: system-dashboard
title: System Dashboard
sidebar_position: 3
---

# ⚙️ System Dashboard

The **System Dashboard** gives your team a live overview of the manufacturing progress for a specific subsystem (e.g., Intake, Elevator, Gripper).  
It combines **real-time statistics, a 3D model viewer, and celebration effects** when parts are finished.

---

## 🖥️ Dashboard Layout

- **🔙 Back Button** → Quick link back to the System BOM view.
- **System Title** → Displays the name of the current system.
- **3D Viewer** → Shows the Onshape assembly for the system in a fully interactive window (pan, zoom, rotate).
- **Now Manufacturing List** → Live feed of the most recently completed parts.
- **Stats Panel** → Process progress ring, part counters, and system insights.
- **Confetti Modal** → Celebratory popup when a part is finished, including a rotating 3D view.

---

## 📊 Process Progress

The stats panel displays:
- **Completion Ring** → Percentage of the system BOM that is complete.
- **Overall Counters**:
    - Total parts
    - ✅ Completed parts
    - 🟡 In-progress parts
    - 🔴 Not started parts
- **COTS vs In-House Count** → Breakdown by type.
- **Top Process** → The machine/process currently handling the most parts.

> Stats auto-refresh every 15 seconds.

---

## 🧩 Now Manufacturing

The right-hand column shows a **live log of recently completed parts**.  
This helps keep the team aware of what just finished and what’s coming next.

---

## 🕹️ 3D System Viewer

- Displays the system assembly model (`.glb` or `.gltf`).
- Adjusts orientation automatically for Onshape exports (Z-up → Y-up).
- Supports rotation and zoom controls.
- Refreshes whenever you fetch or update system data.

---

## 🎉 Confetti Celebration

When a part is marked as **finished**:
1. A **popup modal** appears with the part name and system context.
2. The part is shown in a 3D viewer.
3. 🎊 Confetti rains across the modal for a few seconds.
4. The modal auto-closes after ~5.5 seconds.

This makes finishing parts visible, fun, and motivating for the team.

---

## 🔄 Real-Time Updates

- The dashboard automatically polls for:
    - **System stats** (every 15s).
    - **Recent completions** (every 5s).
- Finished parts are acknowledged by the server so celebrations aren’t repeated.
- All team members see the same live data when logged in.

---

## ✅ Summary

The **System Dashboard** is your team’s **command center** for subsystem progress.  
It combines:
- Real-time **manufacturing stats**,
- An interactive **3D viewer**, and
- Engaging **celebrations** when parts are completed.

This ensures the whole team stays aligned and motivated while building each subsystem.
