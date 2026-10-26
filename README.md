# KrishiConnect (कृषि कनेक्ट)
> **Connecting Farmers with Agricultural Experts**

KrishiConnect is a modern, responsive web application built with **React**, **TypeScript**, and **Vite**. It connects farmers across India with certified agricultural specialists for crop diagnosis, disease management, and yield enhancement.

- **Repository**: `26-oct-1`
- **Live GitHub Pages URL**: [https://rahulmeher815-awesome.github.io/26-oct-1/](https://rahulmeher815-awesome.github.io/26-oct-1/)

---

## 🌾 Highlights

- **Standard React 19 + TypeScript + Vite**: Built with modern web standards and Tailwind CSS.
- **Zero Backend / Zero API Key Dependencies**: Runs 100% client-side with browser `localStorage` persistence.
- **GitHub Pages Configured**: Vite production base path configured to `/26-oct-1/` so that all assets, styles, and scripts load properly.
- **Automated Deployment**: GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys the site on every push to `main`.

---

## ⚙️ GitHub Pages Deployment Configuration

### Why Two Deployment Checks Appeared
If you saw both:
1. `Deploy KrishiConnect to GitHub Pages / build-and-deploy (push)`
2. `pages build and deployment / build (dynamic)`

This happens when GitHub's repository settings are still configured to use the legacy **"Deploy from a branch"** option. In that mode:
- GitHub attempts to run its default Jekyll dynamic builder (`pages build and deployment`), which fails to compile React/Vite single-page applications.
- At the same time, the custom `.github/workflows/deploy.yml` workflow runs and encounters permission/configuration conflicts.

### The Fix (Single Consistent Deployment Workflow)
We use the official **GitHub Actions** deployment approach (`.github/workflows/deploy.yml`):
1. Go to your repository on GitHub: `https://github.com/rahulmeher815-awesome/26-oct-1`.
2. Click **Settings** (tab at the top).
3. In the left navigation, click **Pages**.
4. Under **Build and deployment** > **Source**, change the dropdown from **Deploy from a branch** to **GitHub Actions**.
5. Once **GitHub Actions** is selected, GitHub automatically disables the competing dynamic workflow and uses `.github/workflows/deploy.yml` exclusively.

---

## 💻 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` in your browser.

### 3. Build for Production
```bash
npm run build
```
Generates production assets into `dist/` with base path `/26-oct-1/`.

---

## 🧑‍🌾 Pre-Loaded Demonstration Accounts

| Role | Name | Email | Password | Details |
| :--- | :--- | :--- | :--- | :--- |
| **Farmer** | Ramesh Patel | `ramesh.patel@gmail.com` | `farmer123` | Ludhiana, Punjab (Wheat & Potato) |
| **Farmer** | Sunita Devi | `sunita.devi@gmail.com` | `farmer123` | Nashik, Maharashtra (Tomato & Chili) |
| **Expert** | Dr. Rajesh Sharma | `rajesh.sharma@krishiconnect.in` | `expert123` | Ph.D. Plant Pathology (Fee: ₹450) |
| **Expert** | Dr. Anita Deshmukh | `anita.deshmukh@krishiconnect.in` | `expert123` | Ph.D. Entomology & IPM (Fee: ₹500) |
| **Expert** | Prof. Suresh Verma | `suresh.verma@krishiconnect.in` | `expert123` | Ph.D. Agronomy (Fee: ₹400) |
