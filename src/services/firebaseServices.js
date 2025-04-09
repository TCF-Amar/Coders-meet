import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore";
import { firebaseAuth, firestore } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// 🔹 Sign In with Email & Password
export const signIn = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  const user = userCredential.user;
  const userDocRef = doc(firestore, "users", user.uid);
  const userDocSnap = await getDoc(userDocRef);
  if (!userDocSnap.exists()) {
    await setDoc(userDocRef, {
      lastLogin: new Date().toLocaleString(),
    });
  }
  return userCredential;
};

// 🔹 Logout Function
export const logout = async () => {
  await firebaseSignOut(firebaseAuth);
};

// 🔹 Sign In with Google
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  // Add required scopes
  provider.addScope("profile");
  provider.addScope("email");
  provider.setCustomParameters({
    prompt: "select_account",
  });

  try {
    const userCredential = await signInWithPopup(firebaseAuth, provider);
    const user = userCredential.user;

    const userDocRef = doc(firestore, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
        photoURL: user.photoURL,
        username: user.email.split("@")[0],
        createdAt: new Date().toLocaleString(),
      });
    }

    return userCredential;
  } catch (error) {
    console.error("Google Sign In Error:", error.code, error.message);
    if (error.code === "auth/popup-closed-by-user") {
      throw new Error("Sign in cancelled by user");
    } else if (error.code === "auth/popup-blocked") {
      throw new Error(
        "Pop-up blocked by browser. Please allow pop-ups for this site"
      );
    } else {
      throw new Error("Failed to sign in with Google. Please try again");
    }
  }
};

// 🔹 Create User with Email & Password
export const createUser = async (email, password, displayName) => {
  const userCredential = await createUserWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  const user = userCredential.user;

  await setDoc(doc(firestore, "users", user.uid), {
    email,
    displayName,
    uid: user.uid,
    username: email.split("@")[0],
    createdAt: new Date().toLocaleString(),
  });

  return userCredential;
};

// 🔹 Get User Document from Firestore
export const getUserDoc = async (uid) => {
  const userDocSnap = await getDoc(doc(firestore, "users", uid));
  return userDocSnap.data();
};

// 🔹 Update User Document in Firestore
export const updateUserDoc = async (uid, data) => {
  const userDocRef = doc(firestore, "users", uid);
  await updateDoc(userDocRef, data);
};

// 🔹 Get All Posts from Firestore
export const getUserPosts = async () => {
  const postsCollectionRef = collection(firestore, "posts");
  const postsSnapshot = await getDocs(postsCollectionRef);
  const allPosts = postsSnapshot.docs.map((doc) => doc.data()); // Fetch all posts
  return allPosts;
};

// 🔹 Get User Blogs from Firestore
export const getUserBlogs = async (uid) => {
  const blogsCollectionRef = collection(firestore, "users", uid, "blogs");
  const blogsSnapshot = await getDocs(blogsCollectionRef);
  return blogsSnapshot.docs.map((doc) => doc.data());
};

// 🔹 Get User Snippets from Firestore
export const getUserSnippets = async (uid) => {
  const snippetsCollectionRef = collection(firestore, "users", uid, "snippets");
  const snippetsSnapshot = await getDocs(snippetsCollectionRef);
  return snippetsSnapshot.docs.map((doc) => doc.data());
};

// 🔹 Get User Projects from Firestore
export const getUserProjects = async (uid) => {
  const projectsCollectionRef = collection(firestore, "users", uid, "projects");
  const projectsSnapshot = await getDocs(projectsCollectionRef);
  return projectsSnapshot.docs.map((doc) => doc.data());
};

// 🔹 Get User Comments from Firestore
export const getUserComments = async (uid) => {
  const commentsCollectionRef = collection(firestore, "users", uid, "comments");
  const commentsSnapshot = await getDocs(commentsCollectionRef);
  return commentsSnapshot.docs.map((doc) => doc.data());
};

export const addFollowers = async (uid, followerId) => {
  if (!uid || !followerId) return;

  try {
    const followerRef = doc(firestore, "users", uid, "followers", followerId);
    const followingRef = doc(firestore, "users", followerId, "following", uid);

    const followerDoc = await getDoc(followerRef);

    if (followerDoc.exists()) {
      await deleteDoc(followerRef);
      await deleteDoc(followingRef);
      console.log("Unfollowed user:", uid);
    } else {
      await setDoc(followerRef, { followedAt: serverTimestamp() });
      await setDoc(followingRef, { followingAt: serverTimestamp() });
      console.log("Followed user:", uid);
    }
  } catch (error) {
    console.error("Error handling followers:", error);
  }
};

//   get Followers
export const getFollowers = async (uid) => {
  const followersCollectionRef = collection(
    firestore,
    "users",
    uid,
    "followers"
  );
  const followersSnapshot = await getDocs(followersCollectionRef);
  return followersSnapshot.docs.map((doc) => doc.data());
};

//   get Following
export const getFollowing = async (uid) => {
  const followingCollectionRef = collection(
    firestore,
    "users",
    uid,
    "following"
  );
  const followingSnapshot = await getDocs(followingCollectionRef);
  return followingSnapshot.docs.map((doc) => doc.data());
};

// Follow a user
export const followUser = async (followerId, followingId) => {
  try {
    const followerRef = doc(
      firestore,
      "users",
      followerId,
      "following",
      followingId
    );
    const followingRef = doc(
      firestore,
      "users",
      followingId,
      "followers",
      followerId
    );

    // Get both users' data
    const followerDoc = await getDoc(doc(firestore, "users", followerId));
    const followingDoc = await getDoc(doc(firestore, "users", followingId));

    // Add to following collection of follower
    await setDoc(followerRef, {
      uid: followingId,
      displayName: followingDoc.data().displayName,
      photoURL: followingDoc.data().photoURL,
      timestamp: new Date().toISOString(),
    });

    // Add to followers collection of following
    await setDoc(followingRef, {
      uid: followerId,
      displayName: followerDoc.data().displayName,
      photoURL: followerDoc.data().photoURL,
      timestamp: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error("Error following user:", error);
    throw error;
  }
};

// Unfollow a user
export const unfollowUser = async (followerId, followingId) => {
  try {
    const followerRef = doc(
      firestore,
      "users",
      followerId,
      "following",
      followingId
    );
    const followingRef = doc(
      firestore,
      "users",
      followingId,
      "followers",
      followerId
    );

    await deleteDoc(followerRef);
    await deleteDoc(followingRef);

    return true;
  } catch (error) {
    console.error("Error unfollowing user:", error);
    throw error;
  }
};

// Check if user is following another user
export const checkIfFollowing = async (followerId, followingId) => {
  try {
    const followerRef = doc(
      firestore,
      "users",
      followerId,
      "following",
      followingId
    );
    const docSnap = await getDoc(followerRef);
    return docSnap.exists();
  } catch (error) {
    console.error("Error checking follow status:", error);
    return false;
  }
};

// Add the updateUserProfile function to update user profiles
export const updateUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(firestore, "users", userId);
    await updateDoc(userRef, userData);
    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// 🔹 Create Post Like
export const createPostLike = async (postId, userId) => {
  const postRef = doc(firestore, "posts", postId, "likes", userId);
  await updateDoc(postRef, {
    likes: arrayUnion(userId),
  });
};

// 🔹 Delete Post Like
export const deletePostLike = async (postId, userId) => {
  const postRef = doc(firestore, "posts", postId, "likes", userId);
  await updateDoc(postRef, {
    likes: arrayRemove(userId),
  });
};

// 🔹 Get Post Likes
export const getPostLikes = async (postId) => {
  const postRef = doc(firestore, "posts", postId, "likes");
  const postDoc = await getDoc(postRef);
  return postDoc.data().likes;
};

// 🔹 Get Post Comments
export const getPostComments = async (postId) => {
  const postRef = doc(firestore, "posts", postId, "comments");
  const postDoc = await getDoc(postRef);
  return postDoc.data().comments;
};

// 🔹 Create Post Comment
