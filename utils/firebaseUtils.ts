import { db } from "@/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

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

export { getUserProfile };
