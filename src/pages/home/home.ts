import {Component} from '@angular/core';

import {ModalController, NavController} from 'ionic-angular';
import {MyProvider} from "../../providers/my-provider";
import {SecondPagePage} from "../second-page/second-page";
import {ModalPage} from "../modal/modal";

class Friend {
  constructor(public name: string, public description: string, public picture: string) {
  }
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: any[];

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public myProvider: MyProvider) {
    this.items = [
      new Friend('cyper', 'hello', '/assets/img/adam.jpg'),
      new Friend('cyper', 'hello world', '/assets/img/adam.jpg'),
      new Friend('cyper', 'hello', '/assets/img/adam.jpg')
    ]
  }

  ngOnInit() {
    // this.myProvider.load().then(theResult => {
    //   this.app_id = theResult.app_id;
    // })
  }

  getItems(query) {
  }

  nextPage() {
    this.navCtrl.push(SecondPagePage, {message: 'hello my name is cyper.'});
  }

  showModal() {
    let myModal = this.modalCtrl.create(ModalPage);
    myModal.onDidDismiss(data => {
      console.log(data);
    });

    myModal.present();
  }

  testSqlite() {
    this.myProvider.createSqlLiteDb().then(function (res) {
      alert(JSON.stringify(res));
    }).catch(function (err) {
      alert(err);
    });
  }

}
