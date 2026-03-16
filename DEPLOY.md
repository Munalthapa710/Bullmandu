# Deployment Guide - Render.com

This guide walks you through deploying your ShareAnalysis app to **Render.com** (free tier).

---

## 📋 Prerequisites

- GitHub account
- Render.com account ([sign up free](https://render.com/register))
- Your code pushed to GitHub

---

## 🚀 Deploy to Render (Step-by-Step)

### Step 1: Push to GitHub

```bash
# Add all changes
git add .

# Commit
git commit -m "Prepare for Render deployment"

# Push to GitHub
git push origin main
```

### Step 2: Connect Render to GitHub

1. Go to [https://render.com](https://render.com)
2. Click **"New +"** → **"Blueprint"**
3. Click **"Connect GitHub"** and authorize Render
4. Select your repository (`sharemarketanalysis-`)
5. Render will auto-detect the `render.yaml` configuration

### Step 3: Deploy

1. Review the configuration (should show `shareanalysis-app` web service)
2. Click **"Apply"**
3. Wait 2-5 minutes for the build to complete

### Step 4: Get Your Live URL

Once deployed, your app will be live at:
```
https://shareanalysis-app-<random-id>.onrender.com
```

Find your URL:
- In Render dashboard → Click your service → Copy the URL at the top

---

## ⚙️ Configuration Details

### render.yaml (Already Configured)

| Setting | Value |
|---------|-------|
| **Service Type** | Web Service |
| **Environment** | Node.js |
| **Plan** | Starter (Free) |
| **Build Command** | `npm install && npx prisma generate && npm run build` |
| **Start Command** | `npx prisma db push && npm run seed && npx next start` |
| **Database** | SQLite (1GB persistent disk) |
| **Health Check** | `/login` |

### Environment Variables

Render auto-sets these from `render.yaml`:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | SQLite database path |
| `JWT_SECRET` | Auto-generated secure random string |
| `NEXT_PUBLIC_APP_URL` | Your app's public URL |
| `SEED_DEMO_USER_EMAIL` | Demo user email |
| `SEED_DEMO_USER_PASSWORD` | Demo user password |

---

## 🧪 Test Your Deployment

1. Visit your Render URL
2. Login with demo credentials:
   - **Email:** `demo@shareanalysis.app`
   - **Password:** `DemoPass123!`
3. Test the dashboard and features

---

## ⚠️ Important Notes

### Cold Starts (Free Tier Limitation)

- **Issue:** Free services spin down after 15 minutes of inactivity
- **Impact:** First request after idle takes ~30 seconds to wake up
- **Solution:** Upgrade to paid plan ($7/month) to prevent spin-down

### Database Persistence

- SQLite database is stored on persistent disk (`/prisma/data/prod.db`)
- Data survives restarts and redeploys
- **Backup:** Download database via Render dashboard if needed

### Updating Your App

After pushing to GitHub:
```bash
git push origin main
```

Render auto-deploys on every push. Monitor progress in the Render dashboard.

---

## 🛠️ Troubleshooting

### Build Fails

Check logs in Render dashboard → Logs tab. Common issues:

- **Node version mismatch:** Render auto-detects from `package.json`
- **Missing dependencies:** Ensure all deps are in `package.json`
- **Prisma errors:** Verify `schema.prisma` is valid

### App Won't Start

1. Check logs for errors
2. Verify `DATABASE_URL` is set correctly
3. Ensure health check path (`/login`) is accessible

### Database Errors

Reset database (⚠️ deletes all data):
```bash
# In Render dashboard → Shell
rm prisma/data/prod.db
npx prisma db push
npm run seed
```

---

## 📈 Upgrade Options (Optional)

| Plan | Price | Benefits |
|------|-------|----------|
| **Starter** | Free | Current plan |
| **Standard** | $7/month | No cold starts, more RAM |
| **Pro** | $25/month | Production-grade performance |

Upgrade in Render dashboard → Settings → Plan

---

## 🔗 Useful Links

- [Render Docs: Node.js Services](https://render.com/docs/node)
- [Render Docs: Persistent Disks](https://render.com/docs/disks)
- [Render Pricing](https://render.com/pricing)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

---

**Need help?** Check Render's support or open an issue in your repo.
