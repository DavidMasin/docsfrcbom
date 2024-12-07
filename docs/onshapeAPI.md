# **FRC BOM System - Getting Onshape API Keys**

---

## **Introduction**

To connect the FRC BOM System to your Onshape CAD models, you need to generate API keys from Onshape. These keys allow the system to securely fetch BOM data from your Onshape documents.

---

## **Step 1: Accessing the Onshape Developer Portal**

1. **Visit the Onshape Developer Portal:**  
   Open this link: [Onshape Developer Portal](https://dev-portal.onshape.com).

2. **Log in to Your Onshape Account:**  
   Use the same credentials you use for accessing Onshape.

---

## **Step 2: Creating a New API Application**

1. **Click "Create New Application":**
    - On the Developer Portal dashboard, click the **"Create New Application"** button.

2. **Enter Application Details:**
    - **Application Name:** Enter a descriptive name, such as "FRC BOM Integration".
    - **OAuth Type:** Choose **"API Keys"**.
    - **Description:** Provide a brief description (optional).

3. **Click "Create Application":**
    - Your new application will be created, and you will be redirected to the application management page.

---

## **Step 3: Generating API Keys**

1. **Navigate to the API Keys Tab:**
    - In your application management view, click the **"API Keys"** tab.

2. **Click "Create API Key":**
    - Click the **"Create API Key"** button.

3. **Copy and Save the Keys:**
    - You will see two keys:
        - **Access Key**
        - **Secret Key**

> ⚠️ **Important:** Copy these keys and store them securely. You won’t be able to view the **Secret Key** again once you leave this page.

---

## **Step 4: Setting Permissions**

1. **Navigate to the "Permissions" Tab:**
    - In your application management page, click the **"Permissions"** tab.

2. **Add Required Permissions:**
    - Select the following permissions:
        - **Read Documents:** Allow the application to access your Onshape CAD documents.
        - **Read Assemblies:** Allow access to the parts and assemblies in your documents.

3. **Save Permissions:**
    - Click **"Save"** to apply the permissions.

---
## **Troubleshooting Tips**

| **Issue**                          | **Solution**                          |
|-------------------------------------|----------------------------------------|
| **Invalid Credentials Error**       | Ensure the keys were entered correctly. |
| **Missing Permissions Error**       | Double-check API permissions in Onshape.|
| **BOM Fetch Fails**                 | Ensure the document URL is correct and public permissions are allowed. |

---

## **Security Recommendations**

- **Store Keys Securely:** Use a password manager or secure notes to store your API keys.
- **Regenerate Keys When Needed:** If you suspect your keys have been exposed, regenerate them from the Onshape Developer Portal.
- **Use Unique Keys:** Create different API keys for different applications if needed.

---

## **What’s Next?**

- Learn how to [Use the FeatureScript](FeatureScriptSetup.md) for process assignments.
- See the full [Getting Started Guide](getStarted.md) to start managing your BOM.

---

**Happy Building! 🚀**  
**~ The FRC BOM Team**  
