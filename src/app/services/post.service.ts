import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  collectionSnapshots,
  doc,
  documentId,
  FieldValue,
  Firestore,
  getDoc,
  increment,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

import * as firebase from '@angular/fire';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private afs: Firestore) {}

  loadFeaturedData() {
    //This query is used to retrieve data from the database where isFeatured is true
    const collectionReference = collection(this.afs, 'posts');
    //Options is used to retrieve the postID that is the unique ID of the document
    const options = { idField: 'id' };
    const q = query(
      collectionReference,
      where('isFeatured', '==', true),
      limit(4)
    );
    console.log(q);
    const data = collectionData(q, options) as Observable<[]>;
    return data;
  }

  // loadData() {
  //   const collectionInstance = collection(this.afs, 'posts');
  //   return collectionSnapshots(collectionInstance).pipe(
  //     map((doc) => {
  //       return doc.map((d) => {
  //         const id = d.id;
  //         const data = d.data();
  //         //console.log(id, data);
  //         return { id, ...data };
  //       });
  //     })
  //   );
  // }

  loadLatest() {
    const collectionReference = collection(this.afs, 'posts');
    const options = { idField: 'id' };
    const q = query(collectionReference, orderBy('createdAt'));
    console.log(q);

    return collectionData(q, options) as Observable<[]>;
  }

  loadCategoryPosts(categoryId) {
    //This query is used to retrieve data from the database where isFeatured is true
    const collectionReference = collection(this.afs, 'posts');
    //Options is used to retrieve the postID that is the unique ID of the document
    const options = { idField: 'id' };
    const q = query(
      collectionReference,
      where('category.categoryId', '==', categoryId)
    );
    const data = collectionData(q, options) as Observable<[]>;
    return data;
  }

  async loadOnePost(postId) {
    const postDoc = doc(this.afs, `posts/${postId}`);
    const docSnap = await getDoc(postDoc);
    let data;
    if (docSnap.exists()) {
      data = docSnap.data();
      console.log(docSnap.data());
    } else {
      console.log('Document does not exist');
    }
    return data;
  }

  loadSimilar(catId) {
    //This query is used to retrieve data from the database where isFeatured is true
    const collectionReference = collection(this.afs, 'posts');
    //Options is used to retrieve the postID that is the unique ID of the document
    const options = { idField: 'id' };
    const q = query(
      collectionReference,
      where('category.categoryId', '==', catId),
      limit(4)
    );
    const data = collectionData(q, options) as Observable<[]>;
    return data;
  }

  countViews(postId) {
    //increasing views count
    const viewsCount = {
      views: increment(1),
    };
    const postDoc = doc(this.afs, `posts/${postId}`);
    updateDoc(postDoc, viewsCount).then(() => {
      console.log('view counts updated');
    });
  }
}
