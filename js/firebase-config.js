// Firebase Configuration for UAE BIM
// IMPORTANT: Replace these values with your actual Firebase project credentials

var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Check if Firebase should be initialized (only if real credentials are provided)
var firebaseInitialized = false;

try {
    // Only initialize if the API key has been changed from the placeholder
    if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY" && typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        var db = firebase.firestore();
        var blogsCollection = db.collection('blogs');
        firebaseInitialized = true;
        console.log('Firebase initialized successfully!');
    } else {
        console.log('Firebase not configured - using localStorage for blogs. To enable Firebase, update js/firebase-config.js with your credentials.');
    }
} catch (error) {
    console.log('Firebase initialization skipped:', error.message);
}

// ============================================
// BLOG FUNCTIONS (only work if Firebase is initialized)
// ============================================

// Fetch all published blogs (for blog.html)
function fetchPublishedBlogs() {
    return new Promise(function(resolve, reject) {
        if (!firebaseInitialized) {
            reject(new Error('Firebase not initialized'));
            return;
        }
        blogsCollection
            .where('status', '==', 'published')
            .orderBy('createdAt', 'desc')
            .get()
            .then(function(snapshot) {
                var blogs = [];
                snapshot.forEach(function(doc) {
                    var data = doc.data();
                    data.id = doc.id;
                    blogs.push(data);
                });
                resolve(blogs);
            })
            .catch(function(error) {
                console.error('Error fetching blogs:', error);
                reject(error);
            });
    });
}

// Fetch all blogs (for admin panel)
function fetchAllBlogs() {
    return new Promise(function(resolve, reject) {
        if (!firebaseInitialized) {
            reject(new Error('Firebase not initialized'));
            return;
        }
        blogsCollection
            .orderBy('createdAt', 'desc')
            .get()
            .then(function(snapshot) {
                var blogs = [];
                snapshot.forEach(function(doc) {
                    var data = doc.data();
                    data.id = doc.id;
                    blogs.push(data);
                });
                resolve(blogs);
            })
            .catch(function(error) {
                console.error('Error fetching blogs:', error);
                reject(error);
            });
    });
}

// Add a new blog post
function addBlog(blogData) {
    return new Promise(function(resolve, reject) {
        if (!firebaseInitialized) {
            reject(new Error('Firebase not initialized'));
            return;
        }
        blogData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        blogData.updatedAt = firebase.firestore.FieldValue.serverTimestamp();

        blogsCollection.add(blogData)
            .then(function(docRef) {
                resolve({ success: true, id: docRef.id });
            })
            .catch(function(error) {
                console.error('Error adding blog:', error);
                resolve({ success: false, error: error.message });
            });
    });
}

// Update an existing blog post
function updateBlog(blogId, blogData) {
    return new Promise(function(resolve, reject) {
        if (!firebaseInitialized) {
            reject(new Error('Firebase not initialized'));
            return;
        }
        blogData.updatedAt = firebase.firestore.FieldValue.serverTimestamp();

        blogsCollection.doc(blogId).update(blogData)
            .then(function() {
                resolve({ success: true });
            })
            .catch(function(error) {
                console.error('Error updating blog:', error);
                resolve({ success: false, error: error.message });
            });
    });
}

// Delete a blog post
function deleteBlogPost(blogId) {
    return new Promise(function(resolve, reject) {
        if (!firebaseInitialized) {
            reject(new Error('Firebase not initialized'));
            return;
        }
        blogsCollection.doc(blogId).delete()
            .then(function() {
                resolve({ success: true });
            })
            .catch(function(error) {
                console.error('Error deleting blog:', error);
                resolve({ success: false, error: error.message });
            });
    });
}

// Get a single blog by ID
function getBlogById(blogId) {
    return new Promise(function(resolve, reject) {
        if (!firebaseInitialized) {
            reject(new Error('Firebase not initialized'));
            return;
        }
        blogsCollection.doc(blogId).get()
            .then(function(doc) {
                if (doc.exists) {
                    var data = doc.data();
                    data.id = doc.id;
                    resolve(data);
                } else {
                    resolve(null);
                }
            })
            .catch(function(error) {
                console.error('Error getting blog:', error);
                reject(error);
            });
    });
}
