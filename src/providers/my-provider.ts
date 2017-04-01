import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';

/*
 Generated class for the MyProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
declare var sqlitePlugin;
@Injectable()
export class MyProvider {
  data: any;

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello MyProvider Provider');
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get('/assets/data.json')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        })
    });
  }

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


  useIonicStorage(){
    this.storage.set('hello', 'world');
    return this.storage.get('hello');
  }


}
