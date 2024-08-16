'use server'

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server"
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { db } from "../firebase"
import axios from "axios"

export async function createNewDocument(repoName : string) {
    auth().protect();

    const {sessionClaims} = await auth();

    // const id =  Math.random().toString(36).substr(2, 6);s

    // const docCollectionRef = adminDb.collection("documents");
    // const docRef = await docCollectionRef.add({
    //     title: repoName
    // })

    // await adminDb
    // .collection('users')
    // .doc(sessionClaims?.email!)
    // .collection('rooms')
    // .doc(docRef.id)
    // .set({
    //     userId: sessionClaims?.email!,
    //     createdAt: new Date(),
    //     roomId: docRef.id
    // })

    // await adminDb
    // .collection('users')
    // .doc(sessionClaims?.email!)
    // .collection('repoNames')
    // .doc(id)
    // .set({
    //     repoName : repoName
    // })

    // const userDocRef = collection(db, 'users').doc(sessionClaims?.email!);
    const res = await axios.post('http://127.0.0.1:5000/reponame?query=tensorflow/tensorflow');

    const docRef = await addDoc(collection(db, `users/${sessionClaims?.email!}/repoNames`), res.data);

    return { id : docRef.id };
}
