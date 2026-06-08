# Firebase Setup Guide for UAE BIM Blog

Follow these steps to set up Firebase for your blog system.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** (or "Add project")
3. Enter project name: `uaebim-website` (or any name you prefer)
4. Click **Continue**
5. Disable Google Analytics (optional) or enable it if you want
6. Click **Create Project**
7. Wait for the project to be created, then click **Continue**

## Step 2: Create a Firestore Database

1. In the Firebase Console, click **"Build"** in the left sidebar
2. Click **"Firestore Database"**
3. Click **"Create database"**
4. Choose **"Start in test mode"** (we'll secure it later)
5. Select a location closest to UAE (e.g., `europe-west1` or `asia-south1`)
6. Click **Enable**

## Step 3: Get Your Firebase Configuration

1. In Firebase Console, click the **gear icon** (Settings) next to "Project Overview"
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **Web icon** (`</>`) to add a web app
5. Enter app nickname: `UAE BIM Website`
6. Click **Register app**
7. You'll see a code block with your Firebase config. Copy these values:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSy...",           // Copy this
    authDomain: "xxx.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "xxx.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};
```

## Step 4: Update Your Firebase Config File

1. Open the file: `js/firebase-config.js`
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

3. Save the file

## Step 5: Set Up Firestore Security Rules (Important!)

1. In Firebase Console, go to **Firestore Database**
2. Click the **"Rules"** tab
3. Replace the rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read published blogs
    match /blogs/{blogId} {
      allow read: if resource.data.status == 'published';
      allow write: if request.auth != null; // Only authenticated users can write
    }

    // For initial testing, allow all reads/writes (REMOVE THIS IN PRODUCTION)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

4. Click **Publish**

> **Note:** The above rules allow anyone to read/write for testing. Before going live, you should set up proper authentication.

## Step 6: Test Your Setup

### Test Locally:
1. Open `blog.html` in your browser
2. Open browser Developer Tools (F12) → Console
3. You should see: `Firebase initialized successfully!`
4. If you see errors, check your config values

### Test Admin Panel:
1. Open `admin/index.html`
2. Log in to the admin panel
3. Go to **Blog Posts** section
4. Click **"Add New Post"**
5. Fill in the details and click **Save Post**
6. You should see: `Blog post saved successfully to Firebase!`

### Verify in Firebase:
1. Go to Firebase Console → Firestore Database
2. You should see a `blogs` collection with your new post

## Step 7: Deploy to GoDaddy

1. Upload all files to your GoDaddy hosting (including `js/firebase-config.js`)
2. The blog will work the same way on GoDaddy as it does locally
3. Any blogs you add will be stored in Firebase and visible to all visitors

## Troubleshooting

### "Firebase not configured" error
- Make sure you replaced all placeholder values in `js/firebase-config.js`
- Check that the file path is correct

### "Permission denied" error
- Go to Firebase Console → Firestore → Rules
- Make sure you've set up the security rules from Step 5

### Blogs not showing
- Check if blogs have `status: 'published'` (only published blogs show on the website)
- Check browser console for errors

## File Changes Made

1. **js/firebase-config.js** - New file with Firebase configuration and functions
2. **blog.html** - Updated to load blogs from Firebase dynamically
3. **admin/index.html** - Updated to save/delete blogs to Firebase

## Need Help?

If you encounter any issues:
1. Check the browser console (F12) for error messages
2. Verify your Firebase config values are correct
3. Make sure Firestore Database is enabled in Firebase Console
