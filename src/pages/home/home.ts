import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FramDetailPage } from '../fram-detail/fram-detail';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

items: FirebaseListObservable<any[]>;   
   key:string;   
   topic:string;   
   dueDate:string;   
   isToogle:boolean = false; 
   
  constructor(
  				private af: AngularFireDatabase,
                 public navCtrl: NavController,                
                 public navParams: NavParams) {
      
  	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirebasePage');
  }
   ionViewWillEnter() {     
   	this.showData();   
   }

   showData() {     
   	this.items=this.af.list('https://app-project-d97a3.firebaseio.com/');//.subscribe(item => console.log(item)); //ใส url ของผูอาน   
   }

   select(item) {     //console.log(item);     
   	this.isToogle = true;     
   	this.topic = item.note.topic;     
   	this.dueDate = item.note.dueDate;     
   	this.key = item.$key;   
   	} 
   	 save(note: any) {     //console.log(blog);     
   	 	this.items.push({ note });     
   	 	this.isToogle = false;   
   	 } 
 
//อัปเดตขอมูลตาม key ที่สงมา   
update(note: any) {     
	if (this.key) {     
		this.items.update(this.key, {note});     
		this.isToogle = false;     
	}   
}
delete(item:any) {     
	this.items.remove(item.$key);     
	this.isToogle = false;   
}
openProduct(prod){
    this.navCtrl.push(FramDetailPage,{image:prod.image,
      moisture:prod.moisture,
      status:prod.status,
      key:prod.$key
    });
}
}
