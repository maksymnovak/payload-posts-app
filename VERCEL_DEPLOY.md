# 🚀 Deploy to Vercel - Quick Guide

## Step 1: Push to GitHub

```bash
# Make sure you have a GitHub repository
# If not, create one at: https://github.com/new

# Add remote (replace with YOUR username/repo)
git remote add origin https://github.com/YOUR_USERNAME/payload-posts-app.git

# Push code
git push -u origin master
```

## Step 2: Deploy on Vercel

1. Go to: **https://vercel.com**
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

## Step 3: Add Environment Variables

In Vercel project settings, add:

```
DATABASE_URI=mongodb+srv://payloaduser:Payload12345@payload-posts-cluster.bxxraha.mongodb.net/payload-posts?retryWrites=true&w=majority&appName=payload-posts-cluster

PAYLOAD_SECRET=your-production-secret-key-change-this

NEXT_PUBLIC_SERVER_URL=https://your-app-name.vercel.app
```

**⚠️ IMPORTANT**: Change `PAYLOAD_SECRET` to a random secure string!

Generate a secure secret:
```bash
openssl rand -base64 32
```

## Step 4: Deploy!

Click **"Deploy"** and wait ~2-3 minutes.

## Step 5: Test

1. Go to your Vercel URL: `https://your-app-name.vercel.app`
2. Login with: `test@test.com` / `test`
3. Create posts!

---

## ✅ Done!

Your app is now live on Vercel with:
- ✅ Dark theme
- ✅ MongoDB Atlas
- ✅ Categories with dropdown
- ✅ Post creation
- ✅ Authentication

## 🔧 Troubleshooting

**If you see "Internal Server Error":**
- Check Vercel logs
- Verify `DATABASE_URI` is correct
- Make sure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

**If "test@test.com" login doesn't work:**
- The seed only runs locally
- Go to: `https://your-app.vercel.app/admin`
- Create a user manually

