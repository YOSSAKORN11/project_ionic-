import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import {AngularFireModule } from 'angularfire2/';
import { Upload } from './upload';

import * as firebase from 'firebase';



/*
  Generated class for the UploadsSharedUploadProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UploadsSharedUploadProvider {

  constructor(private af: AngularFireModule, private db: AngularFireDatabase) {
    console.log('Hello UploadsSharedUploadProvider Provider');
  }

 private basePath:string = '/uploads';
  uploads: FirebaseListObservable<Upload[]>;

  pushUpload(upload: Upload,key) {
  	console.log(upload);
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`save/${upload.file.name}`).put(upload.file);

   
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        this.saveFileData(upload,key)
      }
    );
}

private saveFileData(upload: Upload,key) {
    firebase.database().ref().child(`${key}/image/`).set(upload.url)
  }

deleteUpload(upload) {
    this.deleteFileData(upload.$key)
    .then( () => {
      this.deleteFileStorage(upload.name)
    })
    .catch(error => console.log(error))
  }

  // Deletes the file details from the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`save/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`save/${name}`).delete()
  }

}


