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
  Firestore,
  firestore,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { app, db } from "/db/Config";
const firestoreDB = getFirestore(app);
const fetchData = async () => {
  try {
    const collectionRef = collection(firestoreDB, "posts");
    const querySnapshot = await getDocs(collectionRef);

    querySnapshot.forEach((doc) => {
      console.log("Document ID:", doc.id);
      console.log("Document data:", doc.data());
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
async function addpost(text, image, currentUserid, numreact) {
  await addDoc(
    collection(firestoreDB, "post"),
    text,
    image,
    currentUserid,
    numreact
  );
}
async function editpost(Post) {
  await setDoc(doc(db, "post", Post.id), Post);
}

async function deletepost(id) {
  await deleteDoc(doc(firestoreDB, "post", id));
}
async function getpostinfo(id) {
  const usersRef = collection(firestoreDB, "post");
  const q = query(usersRef, where("id", "==", id));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    // console.log("here doc", doc)
    return { id: doc.id, ...doc.data() };
  });
}
async function getpost() {
  const mCol = collection(firestoreDB, "post");
  const addressSnapshot = await getDocs(mCol);
  return addressSnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

function subscribePost(callback) {
  const unsubscribe = onSnapshot(
    query(collection(firestoreDB, "post")),
    (snapshot) => {
      const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
      snapshot.docChanges().forEach((change) => {
        // console.log("changes", change, snapshot.metadata);
        if (callback) callback({ change, snapshot });
      });
      // console.log(source, " data: ", snapshot.data());
    }
  );
  return unsubscribe;
}

export { addpost, deletepost, subscribePost, getpost, getpostinfo, updatePost };
export {
  addpost,
  deletepost,
  subscribe,
  getpost,
  getpostinfo,
  fetchData,
  editpost,
};
