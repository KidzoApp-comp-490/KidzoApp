import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  setDoc,
  doc,
  query,
  where,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { app, db } from "../Config";

const firestoreDB = getFirestore(app);

async function addComment(postId, currentUserId, commentText, commentImage) {
  await addDoc(
    collection(firestoreDB, "comments"),
    postId,
    currentUserId,
    commentText,
    commentImage
  );
}

async function deleteComment(id) {
  await deleteDoc(doc(firestoreDB, "comments", id));
}

async function getCommentsInfo(id) {
  const usersRef = collection(firestoreDB, "comments");
  const q = query(usersRef, where("id", "==", id));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

async function getComments() {
  const mCol = collection(firestoreDB, "comments");
  const addressSnapshot = await getDocs(mCol);
  return addressSnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

function subscribeComment(callback) {
  const unsubscribe = onSnapshot(
    query(collection(firestoreDB, "comments")),
    (snapshot) => {
      const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
      snapshot.docChanges().forEach((change) => {
        if (callback) callback({ change, snapshot });
      });
    }
  );
  return unsubscribe;
}
export {
  addComment,
  deleteComment,
  getCommentsInfo,
  getComments,
  subscribeComment,
};
