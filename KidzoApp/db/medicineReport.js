import {  addDoc, 
    collection, 
    getDocs, 
    getFirestore, 
    setDoc, 
    doc, 
    query, 
    where,
    onSnapshot,
    deleteDoc} from "firebase/firestore";
import { app } from "./Config";
const firestoreDB = getFirestore(app);

async function addMedicineReport(day, description, month, title, year,currentUserid,image) {
    await addDoc(collection(firestoreDB, "medicineReport"),day, description, month, title, year ,currentUserid,image);
}
async function editMedical(medicineReport, idVal) {
  await setDoc(doc(firestoreDB, "medicineReport", idVal), medicineReport);
}

async function updateMedical(medicineReport) {
  await updateDoc(doc(firestoreDB, "medicineReport", medicineReport.id), medicineReport);
}
async function deleteMedicineReport(id) {
    await deleteDoc(doc(firestoreDB, "medicineReport",id));
}
async function getMedicineReport(id) {
    const usersRef = collection(firestoreDB, "medicineReport");
    const q = query(usersRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
        // console.log("here doc", doc)
        return { id: doc.id, ...doc.data() };
    });
}
async function getMedical() {
    const mCol = collection(firestoreDB, "medicineReport");
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
  export { subscribe,addMedicineReport,getMedical, deleteMedicineReport, getMedicineReport, editMedical,updateMedical};