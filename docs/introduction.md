### If any assistance is needed, contact me @DavidMasin in Cheif Delphi (you can DM me)

## **Introduction**

The FRC BOM System is designed to simplify the manufacturing management process for FRC teams by offering an intuitive platform for tracking robot parts from CAD models to the final product. This platform bridges the gap between design and production, ensuring that every component needed for your robot is accounted for, processed, and completed efficiently.

---

## **Why Use the FRC BOM System?**

Building a competitive FRC robot is a complex process involving multiple stages, from CAD design to machining, assembly, and final testing. The FRC BOM System helps streamline this process by:

- **Centralizing Part Information:** Manage all parts from your Onshape CAD models in one organized location.
- **Tracking Production Progress:** Know which parts are ready and which are still in progress.
- **Improving Team Collaboration:** Allow different team members to focus on specific processes, such as CNC, 3D Printing, or assembly.
- **Minimizing Errors:** Reduce costly manufacturing errors by ensuring every part follows the correct process flow.

---

## **Key Features**

### 📦 **Bill of Materials Management**
- Automatically fetch BOM data from Onshape CAD documents.
- Organize and display all parts required for your robot’s construction.
- Track part details such as name, material, required quantity, and production steps.

### 🛠️ **Production Process Tracking**
- Monitor production progress with clear stages:
    - **Pre-Process**
    - **Process 1**
    - **Process 2**

- Update part completion with simple `+` and `-` quantity buttons.

### 🔍 **Filtering and Sorting**
- Filter parts based on different criteria:
    - All parts
    - In-house manufactured parts
    - Commercial off-the-shelf (COTS) parts
    - By specific processes like CNC, 3D Printing, Lathe, etc.

### 📊 **Visual Dashboard**
- A visually intuitive dashboard provides quick access to parts requiring action.
- Large filter buttons and an organized BOM table ensure easy navigation.

### 🔒 **Secure Account Management**
- Each FRC team has a unique account.
- Secure login system with JWT tokens ensures that data is protected.

---

## **How It Works**

The FRC BOM System integrates with Onshape to retrieve and display a complete Bill of Materials (BOM). Once the BOM is fetched, team members can track the manufacturing progress of each part in real time.

Here’s a simplified breakdown:

1. **CAD Design in Onshape:**
    - Design your robot in Onshape as usual.
    - Ensure all parts are properly named and configured.
2. **Use the custom FeatureScript**
   - In each of you Part Studios to set the processes needed for each part.
3. **Fetch BOM Data:**
    - Use the system to fetch BOM data from Onshape using API keys.

4. **Production Tracking:**
    - Update part quantities as they move through the production process (Pre-Process, Process 1, Process 2).

5. **Assembly and Final Check:**
    - Once all parts are marked as completed, the system shows which parts are ready for assembly.

---

## **Who Can Benefit from This System?**

The FRC BOM System is designed for **FRC Robotics Teams** of all sizes. It is especially useful for teams that:

- Manufacture custom robot parts using tools like CNC machines, 3D printers, lathes, and mills.
- Use Onshape for CAD design.
- Want a better way to track and manage their robot’s BOM.
- Are looking for a tool that simplifies project management and reduces manufacturing errors.

---

## **How Is It Different from Other Systems?**

Unlike spreadsheets or manual tracking, the FRC BOM System offers:

- **Automated Data Retrieval:** Parts are imported directly from Onshape.
- **Interactive UI:** An intuitive dashboard with clickable filters and action buttons.
- **Process Integration:** Built specifically with FRC manufacturing processes in mind (CNC, 3D Printing, Lathe, etc.).
- **Collaborative Team Management:** Allows multiple team members to update and track part progress simultaneously.

---

## **What You’ll Learn**

Through this documentation, you will learn:

- **How to Set Up Your Team Account**: Register, log in, and configure your system.
- **How to Use the Dashboard**: Explore filtering, sorting, and updating parts.
- **How to Fetch BOM Data from Onshape**: Step-by-step instructions for importing parts.
- **How to Manage Production Processes**: Track parts from start to finish.
- **Best Practices**: Tips to optimize your team's use of the platform.

---

## **Next Steps**

Ready to begin? Head over to the **Getting Started** section to learn how to register your team, fetch your first BOM, and start managing your robot’s production like a pro!

---

**Happy Building! 🚀**  
**~ The FRC BOM Team**  
