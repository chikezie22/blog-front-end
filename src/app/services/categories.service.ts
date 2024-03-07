import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  collectionSnapshots,
  Firestore,
  query,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private afs: Firestore) {}

  loadData() {
    // const collectionInstance = collection(this.afs, 'newCollections');
    // //console.log(collectionInstance);
    // return collectionSnapshots(collectionInstance).pipe(
    //   map((doc) => {
    //     return doc.map((d) => {
    //       const id = d.id;
    //       const data = d.data();
    //       //console.log(id, data);
    //       return { id, ...data };
    //     });
    //   })
    // );

    //This query is used to retrieve data from the database where isFeatured is true
    const collectionReference = collection(this.afs, 'newCollections');
    //Options is used to retrieve the postID that is the unique ID of the document
    const options = { idField: 'id' };
    const q = query(collectionReference);
    console.log(q);
    const data = collectionData(q, options) as Observable<[]>;
    console.log(data);
    return data;
  }
}
