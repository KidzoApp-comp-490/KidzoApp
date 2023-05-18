import {  addDoc, 
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
    serverTimestamp
} from "firebase/firestore";
import { app,db } from "./Config";
const firestoreDB = getFirestore(app);
async function addMessage(content, reciverUid, senderUid,time, type) {
    await addDoc(collection(firestoreDB, "messagesChat"),content, reciverUid, senderUid,time , type);
}
async function getMessage() {
    const mCol = collection(firestoreDB, "messagesChat");
    const addressSnapshot = await getDocs(mCol);
    return addressSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
    });
}
async function getMsgsforChatId(id) {
    const mCol = collection(firestoreDB, "chat",id,"messages");
    const msgSnapshot = await getDocs(mCol);
    return msgSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
    });
}
async function getChat() {
    const mCol = collection(firestoreDB, "chat");
    const msgSnapshot = await getDocs(mCol);
    return msgSnapshot.docs.map((doc) => {
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
  export { subscribe,getMsgsforChatId,getChat,getMessage,addMessage};