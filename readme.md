# MongoDB Blank

Blank MongoDB
기타 외부라이브러리를 사용하지 않고 쿼리할 수 있다.
몽고디비자체 문법을 사용할수 있는 장점이 있음.

1.0.zip파일을 압축해제하거나 아래쿼리를 실행해야한다.
```
//swich admin db
use admin;

//superuser 생성쿼리;
db.createUser({ user: "tjrwns", pwd: "123qweasdzxc", roles: [ "root" ] } );
```