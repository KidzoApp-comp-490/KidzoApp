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

async function addpost(text, image, currentUserid, numreact) {
  await addDoc(
    collection(firestoreDB, "post"),
    text,
    image,
    currentUserid,
    numreact
  );
}
async function updatePost(post,numReact) {
    console.log("7777777777777777");
    await updateDoc(doc(firestoreDB, "post", post.id), {
      numreact: numReact
    });
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
function subscribe(callback) {
  const unsubscribe = onSnapshot(
    query(collection(firestoreDB, "Address")),
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
export { addpost, deletepost, subscribe, getpost, getpostinfo, updatePost };
