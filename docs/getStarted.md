# **FRC BOM System - Documentation**

---

## **Getting Started**

Welcome to the FRC BOM System! This guide will help you get started using the platform to manage your robot’s manufacturing processes. Follow these steps to register, log in, and manage your team's parts efficiently.

---

### **📋 Step 1: Register Your Team**

1. **Navigate to the Website**  
   Open the website [frcbom](https://frcbom.com/#signInForm) in your preferred browser.

2. **Click "Register"**
    - On the login page, click the **Register** button to create an account.

3. **Enter Team Details**
    - **Team Number:** Enter your official FRC team number.
    - **Password:** Choose a strong password for your team.
    - **Admin Password:** Choose a strong password for your team's admin account.

4. **Submit Registration**
    - Click **Register** to create your team account.
    - ✅ A success message will appear upon successful registration.

---

### **🔐 Step 2: Log In**

1. **Go to the Login Page**  
   Visit the login page at [frcbom.com](https://frcbom.com/#signInForm).

2. **Enter Credentials**
    - **Team Number:** Enter your registered team number.
    - **Password:** Enter your account password. (either User or Admin)

3. **Click "Log In"**
    - Upon successful login, you will be redirected to your team-specific dashboard:  
      `frcbom.com/{team_number}` OR `frcbom.com/{team_number}/Admin` (if logged in with an Admin account) 

---

### **💻 Step 3: Using the Dashboard**

After logging in, you’ll see the main dashboard where you can manage your BOM (Bill of Materials).

#### **Dashboard Overview**

| **Section**            | **Description**               |
|------------------------|-------------------------------|
| **Header**             | Displays your team number and the log-out button. |
| **Dashboard Controls** | Contains buttons for filtering and managing parts. |
| **BOM Table**          | Displays all parts required for manufacturing. |

---

### **📦 Step 4: Managing Your BOM**
#### **1. Fetch BOM from Onshape - TEAM ADMIN ONLY**
1. Write you new Robot's name.
2. Click OK
3. You will be redirected to
   `frcbom.com/{team_number}/Admin/{robot_name}`
---
#### **2. Fetch BOM from Onshape - TEAM ADMIN ONLY**

1. Click **Settings** in the header.
2. Enter the following details:

    - **Onshape Document URL:** Link to your Onshape document.
    - **Access Key:** Your Onshape API access key.
    - **Secret Key:** Your Onshape API secret key.

3. Click **Fetch BOM**.

> **Note:** This action retrieves BOM data from Onshape and displays it in the BOM table.
> 
> **Having trouble generating Onshape API code?** Visit this [link](onshapeAPI.md)

---

#### **3. Viewing and Filtering Parts**

Use the filter buttons in the **Dashboard Controls** section to view specific parts:

- **Show All** → Displays all parts.
- **Show In-House** → Displays only in-house manufactured parts.
- **Show COTS** → Displays commercial off-the-shelf parts.

**Filter by Process:**
- 🛠️ **CNC**
- ⚙️ **Lathe**
- 🖨️ **3D Printer**
- ✂️ **Gerung**
- 🏭 **Mill**

---

#### **4. Managing Part Quantities**

Each part (In House) in the BOM has quantity counters for the following stages:

- **Pre-Process Quantity**
- **Process 1 Quantity**
- **Process 2 Quantity**

**To Update Quantities:**

1. Click the part you want to update.
2. Click the `+` or `-` buttons next to a part’s process field.
2. The BOM updates automatically and saves data locally and on the server.

---

### **💾 Step 5: Saving Your Progress**

Your BOM data is saved automatically whenever you update it.

---

### **🔓 Step 6: Logging Out**

1. Click **Log Out** in the header.
2. This action clears your session and returns you to the login page.

---

## **🎉 You're Ready!**

With these steps, you're ready to manage your team's BOM and track your robot’s parts from CAD to completion!

**Happy Building! 🚀**  
**~ The FRC BOM Team**
