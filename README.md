Building mobile app with ionic 2
---

page 149/758
## 环境
```bash
Your system information:

Cordova CLI: 6.5.0 
Ionic Framework Version: 2.3.0
Ionic CLI Version: 2.2.1
Ionic App Lib Version: 2.2.0
Ionic App Scripts Version: 1.1.4
ios-deploy version: 1.9.1 
ios-sim version: 5.0.13 
OS: macOS Sierra
Node Version: v6.10.0
Xcode version: Xcode 8.3 Build version 8E162

```


## ionic和ng命令的区别
```bash
ionic help start
ionic start --list
ionic start blank-project blank --skip-npm


ng new blank-project --skip-install --routing true
ng help new

```

## my notes
所有的Page既要写入declarations又要写到entryComponents

generate的时候命名可以小写(用`-`分隔)比如my-component, 也可以直接写类名MyComponent, 效果一样.
```bash

ionic g component MyComponent => components/my-component/MyComponent
ionic g directive MyDirective => components/my-directive/MyDirective
iocin g pipe MyPipe => pipes/MyPipe  但是实际上pipe的名字不允许有-, 得从my-pipe改成myPipe
ionic g page MyPage ==> pages/my-page/MyPagePage (所以生成Page的时候不要加Page后缀)
ionic g provider MyProvider ==> providers/MyProvider (并没有@Provider,是用@Injectable表示的)
```

只有唯一的RootComponent => app.component.ts+app.html, RootComponent唯一并且不可改变.

而通过RootComponent中指定的RootPage(默认是HomePage), 是可以随时切换的.

Modal和Page一样创建,只是不是通过nav.pop呈现, 也非nav.setRoot而是用modalCtrl.create然后present, 参见HomePage#showModal方法.


## blank 和 tabs的区别
只有一个区别: app.html中的ion-nav变成了ion-tabs, 前者只能指定一个root, 后者可以指定多个root. 各个root都会通过push/pop维护自己的nav history.

## sidemenu
1)在RootComponent上加上icon-menu, `[content]`指定sidemenu绑定的content area.
使用`#content`引用ion-nav或ion-tabs,他们就是实际的content area.
```html
<ion-menu [content]="content">
  <ion-content>
    <ion-list>
      <button ion-item (click)="openPage(rootPage)">Home</button>
      <button ion-item (click)="openPage(rootPage2)">Second</button>
      <button ion-item (click)="openPage(rootPage3)">Third</button>
    </ion-list>
  </ion-content>
</ion-menu>

<!--<ion-nav #content [root]="rootPage"></ion-nav>-->
<ion-tabs #content>
  <ion-tab [root]="rootPage" tabTitle="Tab 1" tabIcon="navigate"></ion-tab>
  <ion-tab [root]="rootPage2" tabTitle="Tab 2" tabIcon="person"></ion-tab>
  <ion-tab [root]="rootPage3" tabTitle="Tab 3" tabIcon="bookmarks"></ion-tab>
</ion-tabs>

```
在RootComponent上,不能使用直接注入NavController, 会报错, 要使用如下方式
```ts
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  rootPage2:any = SecondPagePage;
  rootPage3:any = ThirdPage;

  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page);
  }
}

```

2)在需要显示侧边栏的page中加上相应的汉堡按钮(用menuToggle标识)
```html
<ion-header>
  <ion-navbar color="secondary">

    <button ion-button menuToggle>
      <ion-icon name="menu"></ion-icon>
    </button>
    
    <ion-title>
      My Friends
    </ion-title>
```
## Simple Form
见SecondPage
form标签都不需要, 在input控件上用双向绑定: `<ion-input value="" [(ngModel)]="username"></ion-input>`,然后在ts中使用username.

## FormBuilder.group [formGroup]="myForm" formControlName="field1"
见ThirdPage, 比较简单, 直接上代码
html
```html
  <form [formGroup]="myForm" (submit)="saveForm($event)">
    <ion-item>
      <ion-label stacked>Field 1</ion-label>
      <ion-input formControlName="field1"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label stacked>Field 2</ion-label>
      <ion-input formControlName="field2"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label stacked>Field 2</ion-label>
      <ion-input formControlName="field2"></ion-input>
    </ion-item>

    <button ion-button type="submit">Save Form</button>
  </form>

```

ts数组中的第一个元素是input的初始值, 第二个是validator(可以是数组)
```js
export class ThirdPage {
  myForm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.myForm = formBuilder.group({
      field1: ['', Validators.required],
      field2: ['', Validators.required],
      field3: [''],
    });
  }
  saveForm(event) {
    event.preventDefault();
    console.log(this.myForm.value);
  }

}

```

## theme
找图标: https://ionicframework.com/docs/ionicons/

ion-label有fixed(左右排列)和stack(上下排列)两种风格

## storage

**localStorage**: 最多存储5M的数据
```js
// set
localStorage.setItem('key1', 'value1');
// get
let value = localStorage.getItem('key1');
```

**SQLLITE**(需要在设备上测试)

ionic plugin add https://github.com/litehelpers/Cordova-sqlite-storage

用法见my-provider.ts以及github上的README.

```js
declare var sqlitePlugin;
createSqlLiteDb() {
  return new Promise(function (resolve, reject) {
    let db = sqlitePlugin.openDatabase({name: 'demo.db', location: 'default'});
    db.transaction(function (tx) {
      tx.executeSql('drop table if exists test_table');
      tx.executeSql('create table if not exists test_table (id integer primary key, data text, data_num integer)');
      tx.executeSql('insert into test_table(data, data_num) values(?,?)', ['test', 100], function (tx, res) {
        console.log('insertId: ', res.insertId, ' -- probably 1');
        console.log('rowsAffected: ', res.rowsAffected, ' -- should be 1');

        resolve(res)
      }, function (e) {
        console.log('ERROR: ', e.message);

        reject('ERROR: ' + e.message);
      });

    });
  })
}

```

**IonicStorage**: 
ionic storage和localStorage不一样, get方法返回的是Promise. ionic storage根据当前环境自动选择不同的技术进行数据存储.
```js
imports: [IonicModule.forRoot(MyApp), IonicStorageModule.forRoot()]

import {Storage} from '@ionic/storage';
useIonicStorage(){
  this.storage.set('hello', 'world');
  return this.storage.get('hello');
}
```

## ng命令自动生成的routes模板
```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```
