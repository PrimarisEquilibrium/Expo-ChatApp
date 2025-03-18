import { db } from "@/FirebaseConfig";
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

/**
 * Retrieves the user's profile from Firestore.
 * @param uid The users unique identifier.
 * @returns The user's profile if it exists; otherwise null.
 */
const getUserProfile = async (uid: string) => {
  const profileRef = doc(db, "profiles", uid);
  try {
    const profileSnap = await getDoc(profileRef);
    if (profileSnap.exists()) {
      return profileSnap.data();
    } else {
      console.log("Profile not found");
      return null;
    }
  } catch (error) {
    // Typically a connection error
    console.error("Error fetching user profile:", error);
    return null;
  }
};

/**
 * Creates an empty group collection in Firestore.
 * @param db The firestore database.
 * @param senderUid The sender's uid.
 * @param receiverUid The reciever's uid.
 * @returns The group reference.
 */
async function createGroup(
  db: Firestore,
  senderUid: string,
  receiverUid: string
) {
  try {
    const groupRef = await addDoc(collection(db, "groups"), {
      createdAt: serverTimestamp(),
      members: [senderUid, receiverUid],
      recentMessage: null,
    });
    return groupRef;
  } catch (error) {
    console.error("Error adding group:", error);
    throw error;
  }
}

/**
 * Retrieves the user's uid given their email.
 * @param email The user's email.
 * @returns The user's uid.
 */
const getUserUidFromEmail = async (email: string) => {
  const q = query(collection(db, "profiles"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  console.log(querySnapshot);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    const uid = userData.uid;
    console.log("User UID:", uid);
    return uid;
  } else {
    console.log("No user found with this email");
    return null;
  }
};

export { getUserProfile, getUserUidFromEmail, createGroup };
