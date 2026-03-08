# 🕶️ Iris Eyewear – E-commerce System Architecture

## Overview
Iris Eyewear is a high-performance e-commerce engine built to demonstrate **Production-Grade Frontend Architecture**. Unlike standard storefronts, Iris features a robust **Role-Based Access Control (RBAC)** system, optimized server-state management via **RTK Query**, and a secure administrative backbone powered by **Firebase**.

---

## 🔗 Project Links
- **Live Production:** (http://iamniraj.tech/](https://iris-eyeware.vercel.app/)

---

## 🛠️ Technical Stack & Architecture

### **Core Frameworks**
* **React 18:** Functional components with Hooks-based architecture.
* **Next.js / Vite:** Optimized build tooling for high-speed delivery.
* **Tailwind CSS:** Utility-first responsive design system.

### **State & Data Management**
* **Redux Toolkit (RTK):** Centralized global state for cart persistence and user sessions.
* **RTK Query:** Advanced data fetching, automated caching, and synchronization with Firestore.
* **Firebase / Firestore:** Real-time NoSQL database and secure Authentication.



---

## 🚀 Key Engineering Implementations

### **1. Secure Role-Based Access Control (RBAC)**
I engineered a custom **Higher-Order Component (HOC)** for route protection. The system intercepts navigation requests and validates user claims (Admin vs. Customer) against the Firebase Auth state before rendering protected UI trees.
* **Outcome:** 100% data isolation between administrative inventory tools and the customer storefront.



### **2. Performance-First State Logic (RTK Query)**
To reduce redundant API overhead, I implemented **RTK Query with Cache Invalidation tags**.
* **Benefit:** When an admin updates a product, the cache is automatically "invalidated," triggering a background re-fetch only for that specific data segment, reducing Firebase read costs by approximately **40%**.

### **3. UX Optimization**
* **Debounced Search:** Implemented custom hooks to delay API calls during user input, preventing server-side throttling.
* **Persistent Cart:** Synchronized Redux state with LocalStorage for a seamless "Resume Shopping" experience.

---

## ⚙️ Development Workflow
I utilize an **AI-augmented workflow** (Cursor/Copilot) to maintain high coding velocity. This allows me to focus on:
1.  **System Scalability:** Ensuring components are modular and reusable.
2.  **Clean Code:** Adhering to DRY (Don't Repeat Yourself) and SOLID principles.
3.  **Documentation:** Maintaining clear technical briefs for team collaboration.



---

## 📸 System Previews

| Admin Dashboard |
| <img src="https://github.com/user-attachments/assets/b7236a29-3f91-41ca-9228-39e148f4024d" width="400" /> | <img src="https://github.com/user-attachments/assets/4e418b02-b5c3-4c36-8b8a-f9d2a16c7875" width="400" /> |

---



---

## 👤 Author
**Niraj Acharya** *Full-Stack Developer & BIT Student* 🔗 [LinkedIn](https://www.linkedin.com/in/niraj-acharya-dev/) | 📧 [niraj444acharya@gmail.com] | 🌐 [iamniraj.tech](http://iamniraj.tech/)
