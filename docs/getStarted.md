# **FRC BOM System - Documentation**

---

## **Getting Started**

Welcome to the FRC BOM System! This guide will help you get started using the platform to manage your robot’s manufacturing processes. Follow these steps to register, log in, and manage your team's parts efficiently.

---

### **📋 Step 1: Register Your Team**

1. **Navigate to the Website**  
   Open the website [frcbom.com](https://frcbom.com/#signInForm) in your preferred browser.

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
   - **Password:** Enter your account password (either User or Admin).

3. **Click "Log In"**
   - Upon successful login, you will be redirected to your team-specific dashboard:  
     `frcbom.com/{team_number}` OR `frcbom.com/{team_number}/Admin` (if logged in with an Admin account).

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

#### **1. Create a New Robot - TEAM ADMIN ONLY**
1. Enter your new robot's name.
2. Click **OK**.
3. You will be redirected to:  
   `frcbom.com/{team_number}/Admin/{robot_name}`.

---

#### **2. Use the Custom FeatureScript in Onshape**
Before fetching your BOM, you **must use the custom FeatureScript in Onshape** to set the processes for each part.

1. **Add the Custom FeatureScript:**
   - In your Onshape CAD document, add the FRC BOM FeatureScript from this document, [setProcesses](https://cad.onshape.com/documents/2ab53c1cecf1cb8d258c9308/w/d6c4bbfad44d288bc9cdc221/e/c0f603bee2bd62b76af7d8ac), and this FeatureScript (to set materials, not necessary) - [SetMaterials](https://cad.onshape.com/documents/2ab53c1cecf1cb8d258c9308/w/d6c4bbfad44d288bc9cdc221/e/c0f603bee2bd62b76af7d8ac).

2. **Set the Processes:**
   - Open the BOM FeatureScript in your Onshape assembly.
   - For each part, set the following processes:
      - **Pre-Process** (if needed)
      - **Process 1** (main process, e.g., CNC, Lathe, 3D Printing)
      - **Process 2** (secondary process if applicable)

3. **Save and Update:**
   - Save your Onshape document after defining processes.
   - This will allow the BOM system to read the correct processes when fetching your BOM.

> **Need help adding the FeatureScript?** Check out the [FeatureScript Setup Guide](FeatureScriptSetup.md).

---

#### **3. Fetch BOM from Onshape - TEAM ADMIN ONLY**
> :warning:  I suggest not fetching into the "Main" System!
1. Select the system you want to fetch into the BOM
2. Click **Settings** in the header.
2. Enter the following details:

   - **Onshape Document URL:** Link to your Onshape document.
   - **Access Key:** Your Onshape API access key.
   - **Secret Key:** Your Onshape API secret key.

3. Click **Fetch BOM**.

> **Note:** This action retrieves BOM data from Onshape and displays it in the BOM table.

> **Having trouble generating Onshape API keys?** Visit this [link](onshapeAPI.md).

---

#### **4. Viewing and Filtering Parts**

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

#### **5. Managing Part Quantities**

Each part (In-House only) in the BOM has quantity counters for the following stages:

- **Pre-Process Quantity**
- **Process 1 Quantity**
- **Process 2 Quantity**

**To Update Quantities:**

1. Click the part you want to update.
2. Use the `+` or `-` buttons next to the part’s process field.
3. The BOM updates automatically and saves data locally and on the server.

---

### **💾 Step 6: Saving Your Progress**

Your BOM data is saved automatically whenever you update it.

---

### **🔓 Step 7: Logging Out**

1. Click **Log Out** in the header.
2. This action clears your session and returns you to the login page.

---

## **🎉 You're Ready!**

With these steps, you're ready to manage your team's BOM and track your robot’s parts from CAD to completion!

**Happy Building! 🚀**  
**~ The FRC BOM Team**
