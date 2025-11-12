# Quick Start Guide

Get your PayloadCMS Posts App running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- MongoDB running locally OR MongoDB Atlas account

## Option 1: Local Development (Fastest)

### Step 1: Install MongoDB Locally (if you don't have it)

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**
Download from https://www.mongodb.com/try/download/community

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### Step 2: Install Dependencies
```bash
cd /Users/admin/Desktop/Projects/payload-posts-app
npm install
```

### Step 3: Configure Environment
The `.env` file is already created with local MongoDB settings:
```env
DATABASE_URI=mongodb://localhost:27017/payload-posts
PAYLOAD_SECRET=your-secret-key-change-this-in-production
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

**Optional**: Change `PAYLOAD_SECRET` to a more secure random string for production.

### Step 4: Run the App
```bash
npm run dev
```

### Step 5: Open Your Browser
Visit: http://localhost:3000

Login with:
- **Email**: `test@test.com`
- **Password**: `test`

**That's it!** 🎉

The test user is automatically created on first run.

---

## Option 2: Using MongoDB Atlas (Cloud)

If you prefer cloud database:

### Step 1: Create MongoDB Atlas Cluster
1. Go to https://mongodb.com/cloud/atlas
2. Sign up and create a FREE cluster
3. Create a database user
4. Whitelist your IP (or use 0.0.0.0/0)
5. Get connection string

### Step 2: Update .env
Replace `DATABASE_URI` in `.env`:
```env
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/payload-posts?retryWrites=true&w=majority
```

### Step 3: Install and Run
```bash
npm install
npm run dev
```

---

## What You Can Do

### 1. Login to Main App
- Visit: http://localhost:3000
- Login: `test@test.com` / `test`
- See welcome message: "Здравствуйте test"
- Create posts using the form

### 2. Access Admin Panel
- Visit: http://localhost:3000/admin
- Login with same credentials
- Full CMS interface to:
  - Manage Users
  - Create/Edit Posts
  - Create/Edit Categories
  - Set up relationships

### 3. Create Your First Post
1. Login to homepage
2. Fill the form:
   - **Title**: My First Post
   - **Slug**: Auto-generated (or customize)
   - **Content**: Your amazing content
3. Click "Create Post"
4. Post appears in the list below!

---

## Project Structure

```
payload-posts-app/
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── components/        # React components
│   │   ├── page.tsx           # Homepage with login/post form
│   │   └── (payload)/admin/   # Admin panel
│   ├── collections/           # Payload collections
│   │   ├── Users.ts
│   │   ├── Posts.ts
│   │   └── Categories.ts
│   ├── server/actions/        # Server actions
│   └── payload.config.ts      # Payload configuration
└── package.json
```

---

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run Payload CLI commands
npm run payload

# Generate TypeScript types
npm run generate:types
```

---

## API Endpoints

Once running, you have:

- **Homepage**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **GraphQL Playground**: http://localhost:3000/api/graphql
- **REST API**: http://localhost:3000/api/[collection-name]

Example API calls:
```bash
# Get all posts
curl http://localhost:3000/api/posts

# Get all categories
curl http://localhost:3000/api/categories
```

---

## Next Steps

### Deploy to Production
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete Vercel deployment instructions.

### Customize Collections
Edit files in `src/collections/` to add more fields or change behavior.

### Add More Features
- Add images to posts
- Implement comments
- Add search functionality
- Create custom admin views

---

## Troubleshooting

### Port 3000 already in use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

### MongoDB connection failed
- Check MongoDB is running: `brew services list` (Mac)
- Verify DATABASE_URI in .env is correct
- For Atlas: Check network access allows your IP

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

### Test user not created
The seed runs automatically on `npm run dev`. If it doesn't work:
```bash
# Check logs for errors in the terminal
# Or manually create user in admin panel at /admin
```

---

## Tech Stack

- **Frontend**: Next.js 15 + React 19
- **Backend**: PayloadCMS 3.x
- **Database**: MongoDB
- **Language**: TypeScript
- **Styling**: CSS

---

## Need Help?

- 📚 [PayloadCMS Docs](https://payloadcms.com/docs)
- 📚 [Next.js Docs](https://nextjs.org/docs)
- 🐛 Check the browser console for errors
- 🔍 Check terminal for server errors

---

## Test Credentials

**Never forget these! 😊**

- Email: `test@test.com`
- Password: `test`

---

Happy coding! 🚀

