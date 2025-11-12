# Complete Deployment Guide

This guide will walk you through deploying your PayloadCMS Posts App to Vercel with MongoDB Atlas.

## Prerequisites

- GitHub account
- Vercel account (free tier is fine)
- MongoDB Atlas account (free tier is fine)

## Step 1: Set Up MongoDB Atlas (Database)

### 1.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Click "Build a Database"
4. Choose the FREE tier (M0)
5. Select a cloud provider and region (choose one close to your users)
6. Name your cluster (e.g., "payload-posts-cluster")
7. Click "Create Cluster"

### 1.2 Create Database User
1. In the Atlas dashboard, click "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter a username (e.g., "payloaduser")
5. Generate a secure password (SAVE THIS!)
6. Set "Database User Privileges" to "Read and write to any database"
7. Click "Add User"

### 1.3 Configure Network Access
1. Click "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (or add specific IPs)
   - This adds `0.0.0.0/0` which is needed for Vercel
4. Click "Confirm"

### 1.4 Get Connection String
1. Click "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string (it looks like):
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<username>` and `<password>` with your database user credentials
6. Add a database name before the `?`, e.g.:
   ```
   mongodb+srv://payloaduser:yourpassword@cluster.mongodb.net/payload-posts?retryWrites=true&w=majority
   ```
7. Save this connection string - you'll need it for Vercel!

## Step 2: Push Code to GitHub

### 2.1 Create GitHub Repository
1. Go to https://github.com
2. Click the "+" icon → "New repository"
3. Name it (e.g., "payload-posts-app")
4. Choose "Public" or "Private"
5. DO NOT initialize with README (we already have code)
6. Click "Create repository"

### 2.2 Push Your Code
```bash
cd /Users/admin/Desktop/Projects/payload-posts-app

# If you haven't already initialized git:
git init
git add .
git commit -m "Initial commit"

# Connect to GitHub (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/payload-posts-app.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### 3.1 Import Project
1. Go to https://vercel.com
2. Sign up or log in
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Vercel will detect it as a Next.js app

### 3.2 Configure Environment Variables
Before deploying, click "Environment Variables" and add:

| Name | Value | Description |
|------|-------|-------------|
| `DATABASE_URI` | Your MongoDB Atlas connection string | From Step 1.4 |
| `PAYLOAD_SECRET` | Generate a random 32+ character string | Use a password generator |
| `NEXT_PUBLIC_SERVER_URL` | Leave empty for now | Will add after first deploy |

**To generate PAYLOAD_SECRET**, use one of these:
```bash
# Mac/Linux
openssl rand -base64 32

# Or use an online generator:
# https://www.random.org/passwords/?num=1&len=32&format=plain
```

### 3.3 Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for the build to complete
3. Once deployed, copy your production URL (e.g., `https://your-app.vercel.app`)

### 3.4 Update NEXT_PUBLIC_SERVER_URL
1. Go to your project settings in Vercel
2. Click "Settings" → "Environment Variables"
3. Add or update `NEXT_PUBLIC_SERVER_URL` with your production URL
   - Example: `https://payload-posts-app.vercel.app`
4. Click "Save"
5. Go to "Deployments" tab
6. Click the "..." menu on the latest deployment
7. Click "Redeploy" to apply the new environment variable

## Step 4: Test Your Deployment

### 4.1 Access Your App
1. Visit your Vercel URL (e.g., `https://your-app.vercel.app`)
2. You should see the login page
3. Login with test credentials:
   - Email: `test@test.com`
   - Password: `test`

### 4.2 Access Admin Panel
1. Visit `https://your-app.vercel.app/admin`
2. Login with the same credentials
3. Here you can:
   - Create categories
   - Manage posts
   - Add users

### 4.3 Create Your First Post
1. After logging in on the homepage
2. Fill in the form:
   - Title: "My First Post"
   - Slug: Auto-generated (e.g., "my-first-post")
   - Content: "This is my first post!"
3. Click "Create Post"
4. Your post will appear below

## Troubleshooting

### Build Fails
- Check that all environment variables are set correctly
- Ensure MongoDB connection string is correct
- Check Vercel build logs for specific errors

### Database Connection Issues
- Verify MongoDB Atlas network access allows 0.0.0.0/0
- Check that database user credentials are correct in connection string
- Ensure database user has read/write permissions

### Login Not Working
- Make sure `PAYLOAD_SECRET` is at least 32 characters
- Check that `DATABASE_URI` is correct
- Try redeploying after setting environment variables

### Posts Not Showing
- Check browser console for errors
- Verify you're logged in
- Try refreshing the page

## Advanced: Custom Domain

### Add Your Own Domain
1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Update DNS records as instructed by Vercel
4. Update `NEXT_PUBLIC_SERVER_URL` environment variable
5. Redeploy

## Monitoring and Maintenance

### View Logs
- Go to Vercel project → "Logs"
- Check "Functions" logs for server-side errors
- Check "Build" logs for deployment issues

### Update Code
```bash
# Make changes locally
git add .
git commit -m "Your changes"
git push

# Vercel will automatically deploy the new version
```

### Database Backups
- In MongoDB Atlas, go to "Backup"
- Enable continuous backups (available on paid plans)
- Or manually export data periodically

## Environment Variables Reference

```env
# Required for production
DATABASE_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority
PAYLOAD_SECRET=your-random-32-character-secret-key
NEXT_PUBLIC_SERVER_URL=https://your-app.vercel.app
```

## Support Resources

- [PayloadCMS Docs](https://payloadcms.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Next.js Docs](https://nextjs.org/docs)

## Success Checklist

- ✅ MongoDB Atlas cluster created and running
- ✅ Database user created with read/write access
- ✅ Network access configured (0.0.0.0/0)
- ✅ Connection string saved and tested
- ✅ Code pushed to GitHub
- ✅ Vercel project created and connected to GitHub
- ✅ All environment variables set in Vercel
- ✅ First deployment successful
- ✅ Can access app at production URL
- ✅ Can login with test@test.com / test
- ✅ Can create posts
- ✅ Posts appear in the list

Congratulations! Your app is now live! 🎉

