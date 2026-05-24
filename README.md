# Kartik Geete — Portfolio

A premium, dark-themed personal portfolio built with **Next.js 14** and **React 18**.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
Make sure you have these installed:
- **Node.js** v18 or higher → [nodejs.org/en/download](https://nodejs.org/en/download)
- **npm** (comes with Node) or **yarn**

Check your versions:
```bash
node --version   # should be v18+
npm --version    # should be 9+
```

### 1. Install dependencies
```bash
npm install
```

### 2. Run the dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

---

## 📁 Project Structure

```
kartik-portfolio/
├── pages/
│   ├── _app.js          # App wrapper (SEO meta, fonts)
│   └── index.jsx        # Main portfolio page (all sections)
├── styles/
│   └── globals.css      # Global resets + keyframe animations
├── public/
│   └── favicon.ico      # Add your favicon here
├── next.config.js
├── package.json
└── README.md
```

---

## ☁️ Deploy to Vercel — Step by Step

Vercel is the easiest and recommended way to host a Next.js site. It's **free** for personal projects.

---

### Step 1 — Push your code to GitHub

1. Create a new repository on [github.com/new](https://github.com/new)
   - Name it `kartik-portfolio`
   - Set it to **Private** or **Public** (both work)
   - Do NOT initialize with README (you already have one)

2. In your project folder, run:
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/kartik-portfolio.git
git push -u origin main
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

---

### Step 2 — Create a Vercel account

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Choose **Continue with GitHub** (recommended — connects your repos automatically)
4. Authorize Vercel to access your GitHub

---

### Step 3 — Import your project

1. On the Vercel dashboard, click **"Add New..."** → **"Project"**
2. Find `kartik-portfolio` in the list and click **"Import"**

---

### Step 4 — Configure the project

Vercel auto-detects Next.js. You should see:

| Setting | Value |
|---------|-------|
| Framework Preset | **Next.js** (auto-detected ✅) |
| Root Directory | `.` (leave as-is) |
| Build Command | `next build` (auto-filled ✅) |
| Output Directory | `.next` (auto-filled ✅) |
| Install Command | `npm install` (auto-filled ✅) |

**No environment variables needed** for this project.

---

### Step 5 — Deploy!

Click the big **"Deploy"** button.

Vercel will:
1. Clone your repo
2. Run `npm install`
3. Run `next build`
4. Deploy to a global CDN

This takes about **60–90 seconds**.

---

### Step 6 — Your site is live! 🎉

You'll get a URL like:
```
https://kartik-portfolio-your-username.vercel.app
```

Share it on LinkedIn, your resume, and anywhere you like.

---

## 🌐 Add a Custom Domain (Optional)

Want a URL like `kartikgeete.dev` or `kartikgeete.com`?

1. Buy a domain from [Namecheap](https://namecheap.com), [GoDaddy](https://godaddy.com), or [Google Domains](https://domains.google)
2. In Vercel dashboard → your project → **Settings** → **Domains**
3. Click **"Add Domain"**, type your domain, click **Add**
4. Vercel gives you DNS records — add them in your domain registrar's DNS settings
5. Takes 5–30 minutes to propagate ✅

---

## 🔄 Auto-Deploy on Every Push

Once connected to GitHub, **every `git push` automatically redeploys** your site.

To update your portfolio:
```bash
# Make changes to index.jsx...
git add .
git commit -m "Update experience section"
git push
```
Vercel will redeploy automatically in ~60 seconds.

---

## 🛠 Common Issues

### "Module not found" error
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### Build fails on Vercel
Check the build logs in Vercel dashboard. Most common fix:
- Make sure `package.json` is at the root of the repo
- Make sure you didn't accidentally delete `pages/_app.js`

### Fonts not loading
The Google Fonts link in `_app.js` requires an internet connection. Works fine on Vercel.

---

## ✏️ Customizing Your Portfolio

All content is in `pages/index.jsx`. Key sections to update:

| What to change | Where in the file |
|---|---|
| Skills list | `const skills = { ... }` |
| Experience | `const experience = [ ... ]` |
| Projects | `const projects = [ ... ]` |
| Contact links | Inside the `Contact()` function |
| Hero stats | Inside `Hero()` — the stats array |
| Color palette | `const COLORS = { ... }` at the top |

---

## 📦 Build for Production Locally

```bash
npm run build   # creates optimized .next/ folder
npm start       # serves the production build at localhost:3000
```

---

## License
MIT — use freely for your personal portfolio.
