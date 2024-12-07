# **FRC BOM System - FeatureScript Setup Guide**

---

## **Introduction**

To ensure seamless integration between your Onshape CAD models and the FRC BOM System, you need to use the **Custom FeatureScript (FS)**. This FeatureScript allows you to assign specific manufacturing processes to each part in your robot’s assembly. When the BOM data is fetched, the system will recognize these processes and update the manufacturing pipeline accordingly.

---

## **Why Use the FeatureScript?**

The FRC BOM FeatureScript enables you to:

- Assign **Pre-Process**, **Process 1**, and **Process 2** to each part in your assembly.
- Ensure that every part follows the correct production path.
- Eliminate manual entry errors when importing BOM data into the FRC BOM System.

---

## **Step 1: Adding the FeatureScript to Your Onshape Document**

1. **Open Onshape:**
    - Visit [Onshape](https://www.onshape.com) and open your CAD document.

2. **Navigate to "Custom Features":**
    - In your Onshape toolbar, click the **"+" (Insert Feature)** button.
    - Select **"Import Custom Feature"**.

3. **Add the FeatureScript:**
    - Use the following public link to access the FeatureScript:  
      [FRC BOM Materials Assignment](https://cad.onshape.com/documents/2ab53c1cecf1cb8d258c9308/w/d6c4bbfad44d288bc9cdc221/e/a1fea5534d5eb55ed15eea58)
   
      [FRC BOM Processes Assignment](https://cad.onshape.com/documents/2ab53c1cecf1cb8d258c9308/w/d6c4bbfad44d288bc9cdc221/e/c0f603bee2bd62b76af7d8ac)
   

---

## **Step 2: Using the FeatureScript in an Assembly**

1. **Open Your Part Studio:**
    - In Onshape, go to the part studio where you want to assign processes.

2. **Add the FeatureScript:**
    - Click the **"Custom Features"** button from the toolbar.
    - Select **"FRC BOM Process Assignment"** from the list.

3. **Assign Processes:**
    - **Select Parts:** Choose the part(s) you want to assign a process to.
    - **Process Fields:**
        - **Pre-Process:** (Optional) Set initial preparation steps (e.g., cutting material).
        - **Process 1:** Main process (e.g., CNC, 3D Printing, Lathe).
        - **Process 2:** Additional process (e.g., assembly or final finishing).

4. **Click "OK"**
    - The processes will be applied and saved automatically.

---


## **Troubleshooting Tips**

| **Issue**                               | **Solution**                        |
|------------------------------------------|--------------------------------------|
| **Processes Not Showing in BOM Table**  | Ensure the FeatureScript was applied correctly in Onshape. |
| **Parts Missing from BOM**              | Verify that parts are visible in the Onshape assembly.     |
| **BOM Fetch Fails**                     | Check API credentials and document permissions.            |

---

## **Next Steps**

- If you’re new, start with the [Getting Started Guide](getStarted.md).
- If you encounter any issues, review the [Onshape API Integration Guide](https://www.onshape.com/en/features/integrations).

---

**Happy Building! 🚀**  
**~ The FRC BOM Team**  
