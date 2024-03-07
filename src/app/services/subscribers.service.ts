import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  getDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SubscribersService {
  constructor(private afs: Firestore) {}

  addSubs(subData) {
    const collectionReference = collection(this.afs, 'subscribers');

    addDoc(collectionReference, subData).then((val) => {
      console.log(val);
      console.log('successful');
    });
  }

  checkSubs(subEmail) {
    const collectionReference = collection(this.afs, 'subscribers');

    //query using where
    const q = query(collectionReference, where('email', '==', subEmail));

    const docSnap = getDocs(q);
    return from(docSnap);
  }
}
