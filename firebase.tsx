import firebase from "firebase/compat/app";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWmp13mBFfGiHsFFfhQrDXbVPlNegC49Q",
  authDomain: "true-river-365800.firebaseapp.com",
  projectId: "true-river-365800",
  storageBucket: "true-river-365800.appspot.com",
  messagingSenderId: "1050390749213",
  appId: "1:1050390749213:web:1a44ae0e33dd41cbc7e6f4",
  measurementId: "G-LF9MZSCX46",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();
const firestore = firebase.firestore;

export const uriToBlob = (uri: string) => {
  return new Promise<Blob>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      // return the blob
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new Error("uriToBlob failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);

    xhr.send(null);
  });
};
const uploadImage = async (uri: any, name: string, folder: string) => {
  if (!name) return null; // Return early if no name provided

  try {
    const storageRef = ref(storage, `${folder}/${name}`);
    const blobFile = await uriToBlob(uri);

    await uploadBytes(storageRef, blobFile);
    const url = await getDownloadURL(storageRef);

    console.log("urlfireeee", url);
    return url; // Return the URL after successful upload
  } catch (err) {
    console.log(err);
    return null;
  }
};

export { app, auth, storage, firestore, firebase, uploadImage };
