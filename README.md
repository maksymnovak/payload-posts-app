# Payload Posts App

A full-stack application built with PayloadCMS 3.x and Next.js 15 for managing posts and categories with user authentication.

## Features

- ✅ User authentication (Login)
- ✅ Create posts with title, slug, and content
- ✅ Posts and Categories collections with relationships
- ✅ Join fields to show related posts in categories
- ✅ Server Actions for data management
- ✅ Beautiful, modern UI with gradient design
- ✅ MongoDB database integration

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **CMS**: PayloadCMS 3.x
- **Database**: MongoDB
- **Language**: TypeScript
- **Styling**: CSS

## Collections

### Users
- email (auth)
- name
- password (hashed)

### Posts
- title
- slug (unique)
- categories (relationship to Categories)
- content (rich text)
- owner (relationship to Users)

### Categories
- title
- slug (unique)
- posts (join field - shows related posts)
- content (rich text)
- owner (relationship to Users)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URI=mongodb://localhost:27017/payload-posts
# OR for MongoDB Atlas:
# DATABASE_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/payload-posts

PAYLOAD_SECRET=your-secret-key-minimum-32-characters
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

**Important**: 
- Replace `DATABASE_URI` with your MongoDB connection string
- Generate a secure `PAYLOAD_SECRET` (at least 32 characters)

### 3. Seed the Database (Create Test User)

The app will automatically create a test user on first run:
- Email: `test@test.com`
- Password: `test`

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### Step 1: Create Git Repository

```bash
git init
git add .
git commit -m "Initial commit"
```

### Step 2: Push to GitHub

```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - `DATABASE_URI` - Your MongoDB connection string (e.g., MongoDB Atlas)
   - `PAYLOAD_SECRET` - A secure random string (min 32 chars)
   - `NEXT_PUBLIC_SERVER_URL` - Your Vercel deployment URL (e.g., https://your-app.vercel.app)
5. Click "Deploy"

### MongoDB Atlas Setup (for Production)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist Vercel's IP addresses (or use 0.0.0.0/0 for all)
5. Get your connection string and add it to Vercel environment variables

## Usage

### Login
1. Open the app
2. Enter credentials: `test@test.com` / `test`
3. You'll see a welcome message: "Здравствуйте test"

### Create a Post
1. After logging in, fill in the form:
   - **Title**: Enter your post title
   - **Slug**: Auto-generated from title (can be edited)
   - **Content**: Enter your post content
2. Click "Create Post"
3. Your post will appear in the list below

### Access Payload Admin Panel

Visit `/admin` to access the full PayloadCMS admin panel where you can:
- Manage users
- Create/edit posts and categories
- Set up relationships between posts and categories

## Server Actions

Located in `src/server/actions/`:

- **authorizeUser**: Handle user login and authentication
- **createPost**: Create new posts with validation

## Project Structure

```
payload-posts-app/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── components/        # React components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── PostForm.tsx
│   │   │   └── PostsList.tsx
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── collections/           # Payload collections
│   │   ├── Users.ts
│   │   ├── Posts.ts
│   │   └── Categories.ts
│   ├── server/
│   │   └── actions/          # Server actions
│   │       ├── authorizeUser.ts
│   │       └── createPost.ts
│   ├── payload.config.ts     # Payload configuration
│   └── seed.ts               # Database seeding
├── .env                      # Environment variables
├── next.config.mjs          # Next.js configuration
├── package.json
└── tsconfig.json
```

## Test Credentials

- **Email**: test@test.com
- **Password**: test

## Development Time

Estimated development time: 3-4 hours for someone unfamiliar with PayloadCMS

## Useful Links

- [PayloadCMS Documentation](https://payloadcms.com/)
- [PayloadCMS Local API](https://payloadcms.com/docs/local-api/overview)
- [PayloadCMS Authentication](https://payloadcms.com/docs/authentication/overview)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment](https://vercel.com/docs)

## License

MIT
