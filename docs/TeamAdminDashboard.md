Welcome to the **Additional Features** section of the FRC BOM System documentation. This document highlights advanced features designed to enhance your team’s workflow, streamline production management, and improve overall efficiency.

---

## **🔧 Custom Features for Enhanced Functionality**

---

### **1. User Roles and Permissions**

The system includes two user roles with different permission levels:

| **Role**    | **Access Level**                  | **Actions Available**            |
|-------------|-----------------------------------|-----------------------------------|
| **Admin**   | Full Access                       | Manage robots, fetch BOM, update parts |
| **User**    | Limited Access (View & Update)   | View and update part quantities, filter BOM data  |

> **Note:** An Admin account is required to create robots, fetch BOM data, and manage system settings.

---

### **2. Multi-Robot Management**

Admins can manage **multiple robots** under one team account.

- **Add a New Robot:**
    - Navigate to the Admin Dashboard (`frcbom.com/{team_number}/Admin`).
    - Click "Create New Robot"
    - Enter a Robot name.
    - Enter a robot name and click **OK**.
    - This creates a new robot project accessible at:  
      `frcbom.com/{team_number}/Admin/{robot_name}`.

---
### **3. Fetching BOM**
> :warning:  DO NOT FETCH IN THE "Main" SYSTEM!
- **Fetch a new BOM:**
  - Navigate to the Admin Dashboard (`frcbom.com/{team_number}/Admin`).
  - If you have any robots they will be shown at the top, choose a robot you want to edit.
  - You will be redirected to (`frcbom.com/{team_number}/Admin/{robot_name}`).
  - Now, pick a system using the system selector in the top-left corner of the screen.
  - You will be redirected to (`frcbom.com/{team_number}/Admin/{robot_name}/{System}`) (for example `frcbom.com/{team_number}/Admin/Robot1/System1` ).


