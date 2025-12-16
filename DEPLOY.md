# Deploying Focus Planner AI

Your project is ready to be deployed to the web! Since we use **Vite**, deploying to platforms like **Vercel** or **Netlify** is very easy.

## Option 1: Vercel (Recommended)

1.  **Push your code to GitHub** (if you haven't already).
2.  Go to [vercel.com](https://vercel.com) and sign up/login.
3.  Click **"Add New..."** -> **"Project"**.
4.  Import your `focus-planner-ai` repository.
5.  **Environment Variables**:
    *   Expand the **"Environment Variables"** section.
    *   Add the variables from your `.env` file:
        *   `VITE_GOOGLE_CLIENT_ID`: `your_client_id_here`
        *   `VITE_GOOGLE_PROJECT_ID`: `your_project_id_here`
6.  Click **Deploy**.

## Option 2: Netlify

1.  **Push your code to GitHub**.
2.  Go to [netlify.com](https://netlify.com) and sign up/login.
3.  Click **"Add new site"** -> **"Import an existing project"**.
4.  Connect to GitHub and select your repository.
5.  **Environment Variables**:
    *   Click on **"Show advanced"** or go to **Site Settings** > **Environment variables** after creating.
    *   Add `VITE_GOOGLE_CLIENT_ID` and `VITE_GOOGLE_PROJECT_ID`.
6.  Click **Deploy site**.

---

## ⚠️ CRITICAL: After Deployment (Google Auth Fix)

Once your site is live (e.g., `https://my-focus-planner.vercel.app`), **Google Auth will stop working** until you do this:

1.  Copy your new domain (e.g., `https://my-focus-planner.vercel.app`).
2.  Go to the [Google Cloud Console Credentials Page](https://console.cloud.google.com/apis/credentials).
3.  Click on your **OAuth 2.0 Web Client ID**.
4.  Adding to **Authorized JavaScript origins**:
    *   Paste your new domain (e.g., `https://my-focus-planner.vercel.app` - **no slash at the end**).
5.  Adding to **Authorized redirect URIs**:
    *   Paste your new domain (e.g., `https://my-focus-planner.vercel.app` - **no slash at the end**).
    *   Also add the version with `auth` if needed, but usually the root is enough for the popup flow.
6.  Click **Save**.

*Note: It may take anywhere from 5 minutes to an hour for Google to update the allowed domains.*
