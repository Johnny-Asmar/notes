import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
  }



  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  getCurrentUser(): Observable<any> {
    return this.afAuth.authState;
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }


  getNotes(): Observable<any[]> {
    return this.afAuth.user.pipe(
      switchMap((user) => {
        if (!user) return []; // Handle unauthenticated case
        return this.firestore
          .collection('notes', (ref) => ref.where('createdBy', '==', user.uid))
          .valueChanges({ idField: 'id' });
      })
    );
  }

  addNote(note: { title: string; content: string }): Promise<void> {
    return this.afAuth.user
      .pipe(
        switchMap((user) => {
          if (!user) throw new Error('User not authenticated');
          const id = this.firestore.createId();
          return this.firestore.collection('notes').doc(id).set({
            ...note,
            id,
            createdBy: user.uid,
            createdAt: new Date().toISOString(),
          });
        })
      )
      .toPromise();
  }

  


  updateNote(noteId: string, title: string, content: string): Promise<void> {
    return this.getCurrentUser().pipe(
        switchMap((user) => {
        if (user) {
          return this.firestore
            .collection(`notes`)
            .doc(noteId)
            .update({ title, content });
        } else {
          throw new Error('User not authenticated.');
        }
      })
    ).toPromise();
  }

  deleteNote(noteId: string): Promise<void> {
    return this.getCurrentUser().pipe(
        switchMap((user) => {
        if (user) {
          return this.firestore
            .collection(`notes`)
            .doc(noteId)
            .delete();
        } else {
          throw new Error('User not authenticated.');
        }
      })
    ).toPromise();
  }


}
