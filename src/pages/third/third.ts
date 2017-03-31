import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";

/*
  Generated class for the Third page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-third',
  templateUrl: 'third.html'
})
export class ThirdPage {
  myForm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.myForm = formBuilder.group({
      field1: ['', Validators.required],
      field2: ['', Validators.required],
      field3: [''],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThirdPage');
  }

  saveForm(event) {
    event.preventDefault();
    console.log(this.myForm.value);
  }

}
