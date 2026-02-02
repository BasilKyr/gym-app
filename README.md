# Gym App — Development & Deployment Guide

This document explains the day‑to‑day workflow for developing and deploying the **Gym App** using:

- **Git**
- **GitHub**
- **Vercel**
- Two environments: **Testing (Preview)** and **Production (Live)**

---

## Table of Contents

- [Getting Started (Local Development)](#getting-started-local-development)
- [Branch Strategy](#branch-strategy)
- [One‑Time Setup](#one-time-setup)
- [Daily Workflow (Testing)](#daily-workflow-testing)
- [Promote to Production](#promote-to-production)
- [Quick Checks](#quick-checks)
- [Troubleshooting: 403 Permission denied](#troubleshooting-403-permission-denied)
- [Cheat Sheet](#cheat-sheet)
- [Project Links](#project-links)

---

## Getting Started (Local Development)

Install dependencies and run the dev server:

```bash
npm install
npm run dev
# or: yarn dev / pnpm dev / bun dev
```

Open:

- http://localhost:3000

---

## Branch Strategy

We use two long‑living branches:

- **main** → **Production** (LIVE on the internet)
- **develop** → **Testing** (Preview deployments)

Every `git push` triggers a deploy on **Vercel**:

- Push to **develop** → Vercel **Preview** deployment (Testing)
- Push to **main** → Vercel **Production** deployment (Live)

You can see each deploy under **Vercel → Deployments**.

---

## One‑Time Setup

### 1) Make sure you are in the correct folder

You should be in the folder that contains `package.json`:

```bash
pwd
ls
```

### 2) Ensure `.gitignore` includes build & secrets

Recommended entries:

```gitignore
node_modules
.next
.env.local
.env.*.local
.DS_Store
```

### 3) First commit (if not already done)

```bash
git add .
git commit -m "Initial commit"
```

### 4) Verify your GitHub remote

```bash
git remote -v
```

### 5) Create the Testing branch (`develop`) — once

```bash
git checkout -b develop
git push -u origin develop
```

---

## Daily Workflow (Testing)

Do your day‑to‑day work on **develop**:

```bash
git checkout develop
# make changes
git add .
git commit -m "Describe your change"
git push
```

**Result:**

- Vercel creates a new **Preview** deployment
- The **Visit** link is your **Testing** environment URL

---

## Promote to Production

Once testing looks good, merge `develop` into `main`:

```bash
git checkout main
git pull
git merge develop
git push
```

**Result:**

- Vercel creates a new **Production** deployment
- The **Visit** link is your **Live** site URL

---

## Quick Checks

### Check current branch

```bash
git branch --show-current
```

### See recent commits

```bash
git log --oneline -n 10
```

---

## Troubleshooting: 403 Permission denied

This usually means your GitHub credentials/token are not set correctly on your machine.

### macOS (recommended): GitHub CLI

```bash
brew install gh
gh auth login
```

Then retry:

```bash
git push
```

---

## Cheat Sheet

### 🧪 Testing (develop)

```bash
git checkout develop
git add .
git commit -m "Code changes"
git push
```

### 🚀 Production (main)

```bash
git checkout main
git pull
git merge develop
git push
```

---

## Project Links

### GitHub
- https://github.com/BasilKyr/gym-app/

### Vercel Project
- https://vercel.com/basilkyrs-projects/gym-app

### Production
- https://gym-app-git-main-basilkyrs-projects.vercel.app/workouts

### Development (Preview)
- https://gym-app-git-develop-basilkyrs-projects.vercel.app/workouts
