# star_line_bot_backend

透過人臉辨識查詢女星，後端原為Flask，現改為Express處理Line Webhook，並提供管理人員的API供Admin 前端使用

[Line好友連結](https://line.me/R/ti/p/%40bxc5238x)

## 獲獎

獲得[Line today](https://today.line.me/tw/pc/article/%E8%80%81%E5%8F%B8%E6%A9%9F%E5%B9%AB%E4%BD%A0%E5%B8%B6%E8%B7%AF+%E9%AB%92%E6%B2%99%E7%99%BC+LINE+%E6%A9%9F%E5%99%A8%E4%BA%BA%EF%BC%8C%E5%82%B3%E5%9C%96%E5%8D%B3%E5%8F%AF%E7%A5%9E%E5%A5%B3%E5%84%AA-Wn1awQ)、[電腦王阿達](https://www.kocpc.com.tw/archives/233475)、[新聞雲ETtoday](https://www.ettoday.net/news/20181209/1326399.htm?from=pctaglist)、[知名Youtube報導](https://www.youtube.com/watch?v=VkpMwBZsvN4)，約8萬人使用，持續成長中

## 使用技術

* Node.js-Express
* MySQL-ORM: 透過Sequelize.js來對女星MySQL資料庫做物件映射
* Mongo-ODM: 透過Mongoose.js來對管理人員Mongo資料庫做物件映射
* RESTful API: 透過Post, Get, Put, Delete來對應到資料庫的CRUD
* MVC: M用來拿取資料庫與External API的資料，Controller放置業務邏輯並且像M拿取資料，由於採用RESTful API，所以沒有V 
* JWT: 透過Passport.js生成token，再Express-jwt這個middleware在各個Router進行驗證
* Swagger: 透過Swagger-jsdoc，使用註解來撰寫

## 資料庫

### 創建Model

```
docker-compose run app sequelize-cli model:generate --name <model name> --attributes <attribute list>
```

e.g.

```
docker-compose run app sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```

### Migrate

Running

```
docker-compose run app npm run db:migrate
```

Undo

```
docker-compose run app sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-xxxx.js
```