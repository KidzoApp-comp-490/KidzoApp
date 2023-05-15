import { db } from "../Config";
import {
  getDocs,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  collection,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";

async function getusersInfo() {
  const userCol = collection(db, "users");
  const userSnapshot = await getDocs(userCol);
  const userList = userSnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return userList;
}

async function deleteusers(id) {
  try {
    await deleteDoc(doc(db, "users", id));
    console.log("Document deleted with ID: ", id);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}

async function Addusers(user) {
  try {
    const docRef = await addDoc(collection(db, "users"), user);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
async function edituser(user) {
  await setDoc(doc(db, "users", user.id), user);
}

function subscribe(callback) {
  const unsubscribe = onSnapshot(query(collection(db, "users")), (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (callback) callback({ change, snapshot });
    });
  });
  return unsubscribe;
}

async function getUserById(uid) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

export {
  getusersInfo,
  Addusers,
  edituser,
  deleteusers,
  subscribe,
  getUserById,
};
