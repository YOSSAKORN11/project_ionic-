import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { UploadsSharedUploadProvider } from '../../providers/uploads-shared-upload/uploads-shared-upload';
import { Upload } from '../../providers/uploads-shared-upload/upload';
/**
 * Generated class for the FramDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fram-detail',
  templateUrl: 'fram-detail.html',
})
export class FramDetailPage {
  image: string;
  moisture1: number;
  moisture2: number;
  moisture3: number;
  status: boolean;
  key: string;
  items: any;
  datafire: any;
  selectedFiles: FileList;
  currentUpload: any;
  zone: NgZone;

  constructor(private upSvc: UploadsSharedUploadProvider, private af: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.zone = new NgZone({});
    this.image = navParams.get('image');
    this.status = navParams.get('status');
    this.key = navParams.get('key');
    this.af.object(this.key).subscribe((data) => {
      this.zone.run(() => {
        this.datafire = this.af.list('https://app-project-d97a3.firebaseio.com/');
        this.moisture1 = data.moisture1;
        this.moisture2 = data.moisture2;
        this.moisture3 = data.moisture3;
        this.status = data.status;
        this.items = {
          image: data.image
        }
      });
      console.log(this.items)
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FramDetailPage');
  }
  notify() {
    this.datafire.update(this.key, { status: this.status });
    console.log("Toggled: " + this.status);
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload, this.key)
  }


}
