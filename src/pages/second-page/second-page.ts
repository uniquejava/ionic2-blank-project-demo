import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the SecondPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-second-page',
  templateUrl: 'second-page.html'
})
export class SecondPagePage {
  username: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SecondPagePage');
    console.log('name=', this.navParams.get('message'));
  }

  login() {
    console.log('login:', this.username, this.password);
  }

}
