React + Supabase User Management App

Overview
This project is a React application built with Vite that provides user registration, email verification, login, and profile management features. It leverages modern React capabilities like lazy loading and integrates with Supabase for backend authentication and user data management.

Technologies Used :---

React (v16+) with hooks for frontend UI and state management

Vite for fast development and bundling

React Router for client-side routing with lazy loading

Supabase as backend providing authentication and user data storage

react-hook-form and Yup for robust form validation

react-hot-toast for user-friendly toast notifications

React Bootstrap for responsive UI components and styling

Features:--

Lazy Loading: All major pages (Register, Login, Profile) are lazy-loaded for faster initial load and better performance

Email Verification: After registration, users receive an email with a confirmation link to verify their account

Secure Authentication: Login via email and password using Supabase authentication

Profile Management: Users can view their profile, edit their name and phone number, and save changes back to Supabase

Logout: Secure logout functionality that redirects users to the login page

Validation: All forms are validated on the client side with clear error handling using react-hook-form and Yup

Toast Notifications: Success and error messages are shown with react-hot-toast for enhanced user experience

How to Use:----

Register:
Users fill out the registration form with name, email, password, and phone number. Upon submission, a verification email is sent.

Verify Email:
Users must click the verification link in the email. The email contains a link that directs users to the login page for security confirmation.

Login:
After verifying their email, users log in using their credentials.

Profile:
Upon successful login, users are redirected to the profile page where they can view their email, edit their full name and phone number, save changes, or logout.

Project Structure:---
src/auth/register — Registration page with form validation and Supabase signup

src/auth/login — Login page with form validation and Supabase login

src/auth/profile — Profile page fetching and updating user data through Supabase API

src/component/loader — Loader component used with React Suspense

src/supabase.js — Supabase client initialization using environment variables
