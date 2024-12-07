# **FRC BOM System - Team Dashboard Overview**

---

## **Introduction**

The **Team Dashboard** is the central hub where your team can manage the Bill of Materials (BOM) for your robot's manufacturing process. This document explains the layout, functionality, and features available in the Team Dashboard.

---

## **Accessing the Dashboard**

- After logging in, your team will be redirected to your **Team Dashboard URL**:  
  `frcbom.com/{team_number}`


---

## **Dashboard Layout Overview**

The Team Dashboard has three main sections:

| **Section**             | **Description**               |
|-------------------------|---------------------------------|
| **Header**              | Displays team info and logout. |
| **Dashboard Controls**  | Provides filters|
| **BOM Table**           | Displays the parts list.      |

---

## **1. Header Section**

The header is located at the top of the page and includes:

- **Team Name and Number:** Displays your registered team number.
- **Logout Button:** Logs the current user out and returns them to the login screen.

---

## **2. Dashboard Controls**

The Dashboard Controls section includes various tools for managing parts and accessing key features.

### **Available Controls:**

### **🔎 Filter Buttons**

| **Button**             | **Function**                          |
|-----------------------|------------------------------------------|
| **Show All**           | Displays all robot parts.              |
| **Show In-House**      | Displays only in-house parts.          |
| **Show COTS**          | Displays only COTS parts.              |
| **CNC**                | Filters parts requiring CNC machining. |
| **Lathe**              | Filters parts requiring lathe work.    |
| **3D Printer**         | Filters parts for 3D printing.         |
| **Gerung**             | Filters parts needing cutting.         |
| **Mill**               | Filters parts needing milling.         |

### **Choose the system:**
- Use the system selector in the top-left corner of the screen to change the System. Main will show all the systems combined
---


## **3. BOM Table**

The BOM Table is the core section of the Team Dashboard. It lists all parts with detailed information.

---

### **Table Columns**

| **Column Name**           | **Description**                 |
|---------------------------|-----------------------------------|
| **Part Name**             | The official part name.         |
| **Description**           | A description of the part.      |
| **Material BOM**          | The material used for the part. |
| **Quantity Required**     | The number of parts needed.     |
| **Pre-Process**           | Preparation steps, if required. |
| **Pre-Process Quantity**  | Current quantity completed.     |
| **Process 1**             | The main production process.    |
| **Process 1 Quantity**    | Quantity completed in Process 1.|
| **Process 2**             | The secondary production process|
| **Process 2 Quantity**    | Quantity completed in Process 2.|

---

### **Table Interactions**

1. **Click on a Part:**
    - Opens the **Part Details View**, where you can:
        - Edit quantities.
        - Update processes.

2. **Adjust Quantities:**
    - Use the `+` and `-` buttons to adjust quantities in real time.

3. **Automatic Saving:**
    - All changes are automatically saved and synced with the server.

---


## **Best Practices**

1. **Regularly Update Quantities:**
    - Ensure part quantities are updated after each manufacturing step.

2. **Check Filter Views:**
    - Use filters to ensure no part is left behind.

3. **Verify Onshape Integration:**
    - Ensure processes are properly set in Onshape using the custom FeatureScript.

---

## **What’s Next?**

Explore other sections of the documentation to learn about more advanced features:

- [Getting Started](GettingStarted.md)
- [FeatureScript Setup](FeatureScriptSetup.md)
- [Onshape API Integration](onshapeAPI.md)

---

**Happy Building! 🚀**  
**~ The FRC BOM Team**  
