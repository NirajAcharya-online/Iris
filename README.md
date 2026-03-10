# Iris Eyewear – React E-commerce Application

Iris Eyewear is a modern e-commerce frontend application built using React and Firebase.  
The project demonstrates scalable frontend architecture, role-based access control, and optimized server-state management using Redux Toolkit.

## Live Demo

https://iris-eyeware.vercel.app/

---

## Tech Stack

Frontend  
- HTML5  
- CSS3  
- Tailwind CSS  
- JavaScript  

Frameworks and Libraries  
- React  
- React Router  
- Redux Toolkit  
- RTK Query  

Backend Services  
- Firebase Authentication  
- Firestore Database  

Deployment  
- Vercel

---

## Key Features

### Authentication System
Users can register and log in using Firebase Authentication.

Protected routes ensure that only authenticated users can access restricted pages.

---

### Role-Based Access Control

The application supports two user roles:

Customer  
Admin

Admin users can access inventory management tools and administrative dashboards.

---

### Admin Dashboard

Admin users can manage store products through a dedicated dashboard.

Admin capabilities include:

- Adding products  
- Editing product details  
- Updating product inventory  

---

### Optimized Data Fetching

Server state is managed using Redux Toolkit Query.

Benefits include:

- automatic caching  
- request deduplication  
- cache invalidation after mutations  

This helps reduce unnecessary database requests.

---

### Debounced Product Search

Product search uses a debounced input system to prevent excessive database queries while typing.

---

### Persistent Shopping Cart

Shopping cart state is stored in Redux and synchronized with LocalStorage so users can continue shopping even after refreshing the page.

---

### Responsive Design

The user interface is fully responsive and works across:

- desktop
- tablet
- mobile devices

---

## Installation

Clone the repository and install dependencies.

---

## Author

Niraj Acharya  
Frontend Developer

Portfolio  
https://iamniraj.tech

GitHub  
https://github.com/NirajAcharya-online