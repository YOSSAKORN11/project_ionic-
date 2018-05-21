import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import  {UploadsSharedUploadProvider} from '../../providers/uploads-shared-upload/uploads-shared-upload';
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
	image:string;
	moisture:number;
	status:boolean;
	key:string;
	items: any;
  selectedFiles: FileList;
  currentUpload: any;


  constructor(private upSvc:UploadsSharedUploadProvider,private af: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams ) {
  	this.image = navParams.get('image');
  	this.moisture = navParams.get('moisture');
  	this.status = navParams.get('status');
  	this.key = navParams.get('key');
  	this.af.object(this.key).subscribe((data)=>{
      this.items={
        image:data.image
      }
      console.log(this.items)
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FramDetailPage');
  }
  public notify() {
  this.items.update(this.key, {status:this.status}); 
  console.log("Toggled: "+ this.status); 
}

detectFiles(event) {
      this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload,this.key)
  }


}
