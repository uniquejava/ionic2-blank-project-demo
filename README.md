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

## ng命令自动生成的routes模板
```bash
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
